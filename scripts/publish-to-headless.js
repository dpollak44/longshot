require('dotenv').config({ path: '.env.local' });

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'longshot-coffee-company.myshopify.com';
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

async function getHeadlessPublication() {
  const fetch = (await import('node-fetch')).default;
  
  // Get all publications/sales channels
  const response = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2024-10/publications.json`, {
    headers: {
      'X-Shopify-Access-Token': ADMIN_TOKEN,
      'Content-Type': 'application/json'
    }
  });
  
  const data = await response.json();
  console.log('\n📱 Available Sales Channels:');
  data.publications?.forEach(pub => {
    console.log(`   - ${pub.name} (ID: ${pub.id})`);
  });
  
  // Look for Headless channel
  const headless = data.publications?.find(pub => 
    pub.name.toLowerCase().includes('headless') || 
    pub.name.toLowerCase().includes('hydrogen') ||
    pub.name.toLowerCase().includes('storefront')
  );
  
  if (!headless) {
    console.log('\n⚠️  Headless channel not found. You may need to:');
    console.log('1. Go to Shopify Admin → Settings → Apps and sales channels');
    console.log('2. Add "Headless" or "Hydrogen" sales channel');
    console.log('3. Or create a custom app with Storefront API access');
    return null;
  }
  
  console.log(`\n✅ Found Headless channel: ${headless.name} (ID: ${headless.id})`);
  return headless.id;
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

async function publishProductToChannel(productId, publicationId) {
  const fetch = (await import('node-fetch')).default;
  
  // Use the product_publications endpoint to publish to specific channel
  const response = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2024-10/publications/${publicationId}/product_listings.json`, {
    method: 'POST',
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
  
  if (response.status === 422) {
    // Product might already be published
    return { already_published: true };
  }
  
  const data = await response.json();
  return data;
}

async function ensureProductActive(productId) {
  const fetch = (await import('node-fetch')).default;
  
  // Ensure product is active
  const response = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2024-10/products/${productId}.json`, {
    method: 'PUT',
    headers: {
      'X-Shopify-Access-Token': ADMIN_TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      product: {
        id: productId,
        status: 'active'
      }
    })
  });
  
  const data = await response.json();
  return data.product;
}

async function publishAllToHeadless() {
  console.log('🚀 Publishing products to Headless channel...\n');
  
  // Get Headless publication ID
  const headlessId = await getHeadlessPublication();
  if (!headlessId) {
    console.log('\n❌ Could not find Headless channel. Please set it up in Shopify Admin.');
    return;
  }
  
  // Get all products
  const products = await getAllProducts();
  console.log(`\n📦 Found ${products.length} products to publish\n`);
  
  let successCount = 0;
  let alreadyPublished = 0;
  
  // Publish each product to Headless channel
  for (const product of products) {
    try {
      // First ensure product is active
      await ensureProductActive(product.id);
      
      // Then publish to Headless channel
      const result = await publishProductToChannel(product.id, headlessId);
      
      if (result.already_published) {
        console.log(`✓ ${product.title} - already published`);
        alreadyPublished++;
      } else if (result.product_listing || !result.errors) {
        console.log(`✅ ${product.title} - published to Headless`);
        successCount++;
      } else {
        console.log(`⚠️  ${product.title} - ${JSON.stringify(result.errors)}`);
      }
    } catch (error) {
      console.log(`❌ ${product.title} - Error: ${error.message}`);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`✨ Publishing complete!`);
  console.log(`   ${successCount} products newly published`);
  console.log(`   ${alreadyPublished} products already published`);
  console.log('='.repeat(60));
  
  // Test Storefront API access
  console.log('\n🧪 Testing Storefront API access...\n');
  await testStorefrontAPI();
}

async function testStorefrontAPI() {
  const { createStorefrontApiClient } = require('@shopify/storefront-api-client');
  
  const client = createStorefrontApiClient({
    storeDomain: SHOPIFY_DOMAIN,
    apiVersion: '2024-10',
    publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  });
  
  const query = `
    query {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            availableForSale
          }
        }
      }
    }
  `;
  
  try {
    const response = await client.request(query);
    const products = response.data?.products?.edges || [];
    
    console.log(`✅ Storefront API can access ${products.length} products:`);
    products.forEach(({ node }) => {
      console.log(`   - ${node.title} (${node.handle}) - Available: ${node.availableForSale}`);
    });
    
    if (products.length === 0) {
      console.log('\n⚠️  No products accessible via Storefront API');
      console.log('   Make sure products are published to the Headless channel');
      console.log('   Check your Storefront API token permissions');
    }
  } catch (error) {
    console.log('❌ Storefront API error:', error.message);
  }
  
  console.log('\n🌐 Visit http://localhost:3002/test-shopify to see products on your site');
}

publishAllToHeadless().catch(console.error);