require('dotenv').config({ path: '.env.local' });

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'longshot-coffee-company.myshopify.com';
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

async function getOnlineStorePublication() {
  const fetch = (await import('node-fetch')).default;
  // First, get the Online Store publication ID
  const response = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2024-10/publications.json`, {
    headers: {
      'X-Shopify-Access-Token': ADMIN_TOKEN,
      'Content-Type': 'application/json'
    }
  });
  
  const data = await response.json();
  const onlineStore = data.publications?.find(pub => pub.name === 'Online Store');
  
  if (!onlineStore) {
    console.error('Online Store publication not found');
    return null;
  }
  
  return onlineStore.id;
}

async function getAllProducts() {
  const fetch = (await import('node-fetch')).default;
  const response = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2024-10/products.json?limit=250`, {
    headers: {
      'X-Shopify-Access-Token': ADMIN_TOKEN,
      'Content-Type': 'application/json'
    }
  });
  
  const data = await response.json();
  return data.products || [];
}

async function publishProductToStorefront(productId, publicationId) {
  const fetch = (await import('node-fetch')).default;
  const response = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2024-10/product_listings/${productId}.json`, {
    method: 'PUT',
    headers: {
      'X-Shopify-Access-Token': ADMIN_TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      product_listing: {
        product_id: productId
      }
    })
  });
  
  return response.ok;
}

async function updateProductStatus(productId) {
  const fetch = (await import('node-fetch')).default;
  // Also ensure the product is active and published
  const response = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2024-10/products/${productId}.json`, {
    method: 'PUT',
    headers: {
      'X-Shopify-Access-Token': ADMIN_TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      product: {
        id: productId,
        status: 'active',
        published: true,
        published_scope: 'global'
      }
    })
  });
  
  const data = await response.json();
  return data.product;
}

async function publishAllProducts() {
  console.log('🚀 Publishing all products to Storefront API...\n');
  
  // Get all products
  const products = await getAllProducts();
  console.log(`Found ${products.length} products\n`);
  
  // Get Online Store publication ID
  const publicationId = await getOnlineStorePublication();
  if (!publicationId) {
    console.error('Could not find Online Store publication');
    return;
  }
  
  console.log(`Online Store Publication ID: ${publicationId}\n`);
  
  // Publish each product
  for (const product of products) {
    try {
      // Update product status to active and published
      const updated = await updateProductStatus(product.id);
      
      if (updated) {
        console.log(`✅ Published: ${product.title}`);
        console.log(`   Status: ${updated.status}`);
        console.log(`   Published Scope: ${updated.published_scope}`);
      } else {
        console.log(`⚠️  Could not publish: ${product.title}`);
      }
    } catch (error) {
      console.log(`❌ Error publishing ${product.title}:`, error.message);
    }
  }
  
  console.log('\n✨ Publishing complete!');
  console.log('🔄 Restart your Next.js dev server to see the changes');
  console.log('🌐 Visit http://localhost:3002/test-shopify to verify');
}

// Also need to ensure Storefront API access is configured
async function checkStorefrontAccess() {
  console.log('\n📋 Checking Storefront API configuration...\n');
  
  const { createStorefrontApiClient } = require('@shopify/storefront-api-client');
  
  const client = createStorefrontApiClient({
    storeDomain: SHOPIFY_DOMAIN,
    apiVersion: '2024-10',
    publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  });
  
  const query = `
    query {
      shop {
        name
      }
      products(first: 1) {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `;
  
  try {
    const response = await client.request(query);
    console.log('✅ Storefront API is working');
    console.log(`   Shop: ${response.data?.shop?.name}`);
    console.log(`   Products accessible: ${response.data?.products?.edges?.length > 0 ? 'Yes' : 'No'}\n`);
  } catch (error) {
    console.log('❌ Storefront API error:', error.message);
    console.log('\nMake sure your Storefront API token has these permissions:');
    console.log('- Read products');
    console.log('- Read product listings');
    console.log('- Read collections\n');
  }
}

async function main() {
  await publishAllProducts();
  await checkStorefrontAccess();
}

main().catch(console.error);