require('dotenv').config({ path: '.env.local' });

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'longshot-coffee-company.myshopify.com';
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

// Coffee images from Unsplash
const productImages = {
  'ethiopia-yirgacheffe': [
    'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=800&h=800&fit=crop'
  ],
  'colombia-geisha': [
    'https://images.unsplash.com/photo-1559056199-5a47f60c5053?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1607681034540-2c46cc71896d?w=800&h=800&fit=crop'
  ],
  'longshot-house-blend': [
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=800&h=800&fit=crop'
  ],
  'midnight-espresso': [
    'https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=800&h=800&fit=crop'
  ],
  'kenya-aa': [
    'https://images.unsplash.com/photo-1604908550665-327363165423?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1625021659472-16f40f8a75db?w=800&h=800&fit=crop'
  ],
  'guatemala-antigua': [
    'https://images.unsplash.com/photo-1565299798102-87fcc6e88a1f?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=800&h=800&fit=crop'
  ],
  'decaf-colombia': [
    'https://images.unsplash.com/photo-1621955511667-e2c316e4575d?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=800&h=800&fit=crop'
  ],
  'costa-rica-tarrazu': [
    'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1578321926534-133e9fde8f34?w=800&h=800&fit=crop'
  ],
  'breakfast-blend': [
    'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&h=800&fit=crop'
  ],
  'peru-organic': [
    'https://images.unsplash.com/photo-1601876819102-5d025c86abbf?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1598908314732-07113901949e?w=800&h=800&fit=crop'
  ]
};

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

async function updateProductImages(productId, images) {
  const fetch = (await import('node-fetch')).default;
  
  const response = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2024-10/products/${productId}.json`, {
    method: 'PUT',
    headers: {
      'X-Shopify-Access-Token': ADMIN_TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      product: {
        id: productId,
        images: images.map((src, index) => ({
          src,
          position: index + 1,
          alt: `Product image ${index + 1}`
        }))
      }
    })
  });
  
  const data = await response.json();
  return data.product;
}

async function addImagesToProducts() {
  console.log('🚀 Adding images to Shopify products...\n');
  
  // Get all products
  const products = await getAllProducts();
  console.log(`Found ${products.length} products\n`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const product of products) {
    // Create handle from product title for matching
    const handle = product.handle || product.title.toLowerCase().replace(/\s+/g, '-');
    
    // Find matching images
    const images = productImages[handle];
    
    if (images) {
      try {
        console.log(`📸 Adding images to: ${product.title}`);
        const updated = await updateProductImages(product.id, images);
        
        if (updated && updated.images && updated.images.length > 0) {
          console.log(`   ✅ Added ${updated.images.length} images`);
          successCount++;
        } else {
          console.log(`   ⚠️  No images added`);
          errorCount++;
        }
      } catch (error) {
        console.log(`   ❌ Error: ${error.message}`);
        errorCount++;
      }
    } else {
      console.log(`⚠️  No images found for: ${product.title} (${handle})`);
      
      // Add a default coffee image for products without specific images
      try {
        const defaultImages = [
          'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=800&h=800&fit=crop',
          'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=800&fit=crop'
        ];
        
        const updated = await updateProductImages(product.id, defaultImages);
        if (updated && updated.images) {
          console.log(`   ✅ Added default images`);
          successCount++;
        }
      } catch (error) {
        console.log(`   ❌ Error adding default images: ${error.message}`);
        errorCount++;
      }
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`✨ Image upload complete!`);
  console.log(`   ${successCount} products updated successfully`);
  if (errorCount > 0) {
    console.log(`   ${errorCount} products had errors`);
  }
  console.log('='.repeat(60));
  
  console.log('\n🧪 Testing Storefront API to verify images...\n');
  await testStorefrontImages();
}

async function testStorefrontImages() {
  const { createStorefrontApiClient } = require('@shopify/storefront-api-client');
  
  const client = createStorefrontApiClient({
    storeDomain: SHOPIFY_DOMAIN,
    apiVersion: '2024-10',
    publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  });
  
  const query = `
    query {
      products(first: 3) {
        edges {
          node {
            title
            handle
            featuredImage {
              url
              altText
            }
            images(first: 2) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;
  
  try {
    const response = await client.request(query);
    const products = response.data?.products?.edges || [];
    
    console.log(`✅ Storefront API can access product images:`);
    products.forEach(({ node }) => {
      const imageCount = node.images?.edges?.length || 0;
      const featuredImage = node.featuredImage?.url ? '✓' : '✗';
      console.log(`   - ${node.title}: Featured image ${featuredImage}, Total images: ${imageCount}`);
    });
    
    console.log('\n🌐 Visit http://localhost:3002 to see the updated product images!');
  } catch (error) {
    console.log('❌ Storefront API error:', error.message);
  }
}

addImagesToProducts().catch(console.error);