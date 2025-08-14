require('dotenv').config({ path: '.env.local' });
const { createAdminApiClient } = require('@shopify/admin-api-client');

const client = createAdminApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'longshot-coffee-company.myshopify.com',
  apiVersion: '2024-10',
  accessToken: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
});

async function getPublications() {
  const query = `
    query {
      publications(first: 10) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `;
  
  const response = await client.request(query);
  return response.data?.publications?.edges || [];
}

async function getProducts() {
  const query = `
    query {
      products(first: 100) {
        edges {
          node {
            id
            title
            handle
            status
          }
        }
      }
    }
  `;
  
  const response = await client.request(query);
  return response.data?.products?.edges || [];
}

async function publishProductsToPublication(productIds, publicationId) {
  const mutation = `
    mutation PublishProducts($id: ID!, $input: [PublicationInput!]!) {
      publishablePublish(id: $id, input: $input) {
        publishable {
          ... on Product {
            id
            title
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  
  const results = [];
  
  for (const productId of productIds) {
    try {
      const response = await client.request(mutation, {
        variables: {
          id: productId,
          input: [
            {
              publicationId: publicationId
            }
          ]
        }
      });
      
      results.push(response);
    } catch (error) {
      console.log(`Error publishing product ${productId}:`, error.message);
    }
  }
  
  return results;
}

async function publishAllToHeadless() {
  console.log('🚀 Publishing products to Headless channel using GraphQL...\n');
  
  // Get all publications
  const publications = await getPublications();
  console.log('📱 Available Sales Channels:');
  publications.forEach(({ node }) => {
    console.log(`   - ${node.name} (${node.id})`);
  });
  
  // Find headless publication
  const headless = publications.find(({ node }) => 
    node.name.toLowerCase().includes('headless')
  );
  
  if (!headless) {
    console.log('\n❌ Headless channel not found');
    console.log('Please add the Headless channel in Shopify Admin → Settings → Apps and sales channels');
    return;
  }
  
  console.log(`\n✅ Found Headless channel: ${headless.node.name}`);
  
  // Get all products
  const products = await getProducts();
  console.log(`\n📦 Found ${products.length} products\n`);
  
  // Get product IDs
  const productIds = products.map(({ node }) => node.id);
  
  // Publish all products to headless
  console.log('Publishing products...\n');
  const results = await publishProductsToPublication(productIds, headless.node.id);
  
  let successCount = 0;
  products.forEach(({ node }, index) => {
    const result = results[index];
    if (result?.data?.publishablePublish?.publishable) {
      console.log(`✅ ${node.title} - published`);
      successCount++;
    } else if (result?.data?.publishablePublish?.userErrors?.length > 0) {
      const errors = result.data.publishablePublish.userErrors;
      if (errors.some(e => e.message.includes('already published'))) {
        console.log(`✓ ${node.title} - already published`);
      } else {
        console.log(`⚠️  ${node.title} - ${errors.map(e => e.message).join(', ')}`);
      }
    }
  });
  
  console.log('\n' + '='.repeat(60));
  console.log(`✨ Publishing complete! ${successCount} products published`);
  console.log('='.repeat(60));
  
  // Test Storefront API
  console.log('\n🧪 Testing Storefront API...\n');
  await testStorefront();
}

async function testStorefront() {
  const { createStorefrontApiClient } = require('@shopify/storefront-api-client');
  
  const client = createStorefrontApiClient({
    storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
    apiVersion: '2024-10',
    publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  });
  
  const query = `
    query {
      products(first: 20) {
        edges {
          node {
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
    
    console.log(`✅ Storefront API can now access ${products.length} products:`);
    products.forEach(({ node }) => {
      console.log(`   - ${node.title} (Available: ${node.availableForSale})`);
    });
    
    console.log('\n🌐 Visit http://localhost:3002/test-shopify to see all products!');
  } catch (error) {
    console.log('❌ Storefront API error:', error.message);
  }
}

publishAllToHeadless().catch(console.error);