const { createAdminApiClient } = require('@shopify/admin-api-client');
require('dotenv').config({ path: '.env.local' });

// Initialize Shopify Admin API client
const client = createAdminApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'longshot-coffee-company.myshopify.com',
  apiVersion: '2024-10',
  accessToken: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
});

// Product data formatted for Shopify Admin API
const products = [
  {
    title: 'Ethiopia Yirgacheffe',
    descriptionHtml: '<p>A bright and complex coffee with distinctive floral notes and citrus undertones. This exceptional single-origin coffee is sourced from the Yirgacheffe region, known for producing some of Ethiopia\'s most celebrated coffees.</p>',
    vendor: 'Longshot Coffee',
    productType: 'Coffee',
    tags: ['single-origin', 'light-roast', 'featured', 'floral', 'lemon', 'bergamot'],
    status: 'ACTIVE',
    seo: {
      title: 'Ethiopia Yirgacheffe - Single Origin Coffee | Longshot Coffee',
      description: 'Bright, floral Ethiopian coffee with notes of lemon and bergamot. Single-origin from Yirgacheffe. Light roast. Free shipping over $40.'
    }
  },
  {
    title: 'Colombia Geisha',
    descriptionHtml: '<p>Exceptional clarity and sweetness with delicate floral aromatics. This rare Geisha variety from Huila, Colombia offers an extraordinary cup with notes of jasmine, peach, and honey.</p>',
    vendor: 'Longshot Coffee',
    productType: 'Coffee',
    tags: ['single-origin', 'light-roast', 'featured', 'premium', 'jasmine', 'peach', 'honey'],
    status: 'ACTIVE'
  },
  {
    title: 'Longshot House Blend',
    descriptionHtml: '<p>Our signature blend, perfect for everyday brewing. A harmonious combination of Central and South American coffees creating a balanced cup with notes of chocolate, caramel, and roasted nuts.</p>',
    vendor: 'Longshot Coffee',
    productType: 'Coffee',
    tags: ['blends', 'medium-roast', 'featured', 'chocolate', 'caramel', 'nuts'],
    status: 'ACTIVE'
  },
  {
    title: 'Midnight Espresso',
    descriptionHtml: '<p>Bold and intense, perfect for espresso and strong coffee lovers. This dark roast blend of Brazilian and Indonesian beans delivers notes of dark chocolate, molasses, and subtle smoke.</p>',
    vendor: 'Longshot Coffee',
    productType: 'Coffee',
    tags: ['blends', 'dark-roast', 'featured', 'espresso', 'dark-chocolate', 'molasses', 'smoke'],
    status: 'ACTIVE'
  },
  {
    title: 'Kenya AA',
    descriptionHtml: '<p>A bold and wine-like coffee with intense blackcurrant notes and bright acidity. This top-grade Kenyan coffee is known for its complex flavor profile and full body.</p>',
    vendor: 'Longshot Coffee',
    productType: 'Coffee',
    tags: ['single-origin', 'medium-roast', 'blackcurrant', 'wine', 'bright'],
    status: 'ACTIVE'
  },
  {
    title: 'Guatemala Antigua',
    descriptionHtml: '<p>Smooth and balanced with chocolate and spice notes. Grown in the volcanic soils of Antigua, this coffee offers a rich, full body with subtle smoky undertones.</p>',
    vendor: 'Longshot Coffee',
    productType: 'Coffee',
    tags: ['single-origin', 'medium-roast', 'chocolate', 'spice', 'volcanic'],
    status: 'ACTIVE'
  },
  {
    title: 'Decaf Colombia',
    descriptionHtml: '<p>All the flavor without the caffeine. This Swiss Water Process decaf maintains the sweet, balanced character of Colombian coffee with notes of chocolate and caramel.</p>',
    vendor: 'Longshot Coffee',
    productType: 'Coffee',
    tags: ['decaf', 'medium-roast', 'colombia', 'swiss-water', 'chocolate', 'caramel'],
    status: 'ACTIVE'
  },
  {
    title: 'Costa Rica Tarrazú',
    descriptionHtml: '<p>Clean and bright with citrus and chocolate notes. This high-altitude coffee from the Tarrazú region is known for its exceptional clarity and balanced sweetness.</p>',
    vendor: 'Longshot Coffee',
    productType: 'Coffee',
    tags: ['single-origin', 'medium-roast', 'citrus', 'chocolate', 'bright'],
    status: 'ACTIVE'
  },
  {
    title: 'Breakfast Blend',
    descriptionHtml: '<p>A smooth, approachable blend perfect for starting your day. Light-medium roast with bright acidity and notes of citrus, nuts, and milk chocolate.</p>',
    vendor: 'Longshot Coffee',
    productType: 'Coffee',
    tags: ['blends', 'light-roast', 'breakfast', 'citrus', 'nuts', 'milk-chocolate'],
    status: 'ACTIVE'
  },
  {
    title: 'French Roast',
    descriptionHtml: '<p>Bold, smoky, and intense. This classic dark roast delivers a powerful cup with notes of dark chocolate, charred wood, and a lingering smoky finish.</p>',
    vendor: 'Longshot Coffee',
    productType: 'Coffee',
    tags: ['blends', 'dark-roast', 'french', 'smoky', 'bold', 'dark-chocolate'],
    status: 'ACTIVE'
  }
];

// Variant data for each product
const productVariants = {
  'Ethiopia Yirgacheffe': [
    { optionName: 'Size', optionValue: '12 oz', price: '24.00', sku: 'ETH-YRG-12', inventoryQuantity: 100 },
    { optionName: 'Size', optionValue: '5 lb', price: '85.00', sku: 'ETH-YRG-5LB', inventoryQuantity: 50 }
  ],
  'Colombia Geisha': [
    { optionName: 'Size', optionValue: '12 oz', price: '32.00', sku: 'COL-GSH-12', inventoryQuantity: 50 },
    { optionName: 'Size', optionValue: '5 lb', price: '120.00', sku: 'COL-GSH-5LB', inventoryQuantity: 25 }
  ],
  'Longshot House Blend': [
    { optionName: 'Size', optionValue: '12 oz', price: '18.00', sku: 'HSE-BLD-12', inventoryQuantity: 200 },
    { optionName: 'Size', optionValue: '5 lb', price: '65.00', sku: 'HSE-BLD-5LB', inventoryQuantity: 100 }
  ],
  'Midnight Espresso': [
    { optionName: 'Size', optionValue: '12 oz', price: '20.00', sku: 'MID-ESP-12', inventoryQuantity: 150 },
    { optionName: 'Size', optionValue: '5 lb', price: '72.00', sku: 'MID-ESP-5LB', inventoryQuantity: 75 }
  ],
  'Kenya AA': [
    { optionName: 'Size', optionValue: '12 oz', price: '26.00', sku: 'KEN-AA-12', inventoryQuantity: 80 },
    { optionName: 'Size', optionValue: '5 lb', price: '95.00', sku: 'KEN-AA-5LB', inventoryQuantity: 40 }
  ],
  'Guatemala Antigua': [
    { optionName: 'Size', optionValue: '12 oz', price: '22.00', sku: 'GUA-ANT-12', inventoryQuantity: 90 },
    { optionName: 'Size', optionValue: '5 lb', price: '80.00', sku: 'GUA-ANT-5LB', inventoryQuantity: 45 }
  ],
  'Decaf Colombia': [
    { optionName: 'Size', optionValue: '12 oz', price: '20.00', sku: 'DEC-COL-12', inventoryQuantity: 60 },
    { optionName: 'Size', optionValue: '5 lb', price: '72.00', sku: 'DEC-COL-5LB', inventoryQuantity: 30 }
  ],
  'Costa Rica Tarrazú': [
    { optionName: 'Size', optionValue: '12 oz', price: '23.00', sku: 'COS-TAR-12', inventoryQuantity: 70 },
    { optionName: 'Size', optionValue: '5 lb', price: '84.00', sku: 'COS-TAR-5LB', inventoryQuantity: 35 }
  ],
  'Breakfast Blend': [
    { optionName: 'Size', optionValue: '12 oz', price: '17.00', sku: 'BRK-BLD-12', inventoryQuantity: 120 },
    { optionName: 'Size', optionValue: '5 lb', price: '62.00', sku: 'BRK-BLD-5LB', inventoryQuantity: 60 }
  ],
  'French Roast': [
    { optionName: 'Size', optionValue: '12 oz', price: '19.00', sku: 'FRN-RST-12', inventoryQuantity: 100 },
    { optionName: 'Size', optionValue: '5 lb', price: '69.00', sku: 'FRN-RST-5LB', inventoryQuantity: 50 }
  ]
};

async function createProduct(productData) {
  const mutation = `
    mutation CreateProduct($input: ProductInput!) {
      productCreate(input: $input) {
        product {
          id
          title
          handle
          variants(first: 10) {
            edges {
              node {
                id
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const response = await client.request(mutation, {
      variables: {
        input: productData
      }
    });
    
    return response;
  } catch (error) {
    console.error('Request error:', error);
    throw error;
  }
}

async function updateProductVariants(productId, variantData) {
  // Update each variant with proper inventory tracking
  const mutation = `
    mutation UpdateVariant($input: ProductVariantInput!) {
      productVariantUpdate(input: $input) {
        productVariant {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  // Note: This would need the variant IDs from the created product
  // For now, we'll use the REST API for complete variant control
}

async function createProductWithREST(productData, variants) {
  const fetch = (await import('node-fetch')).default;
  
  const restProduct = {
    product: {
      title: productData.title,
      body_html: productData.descriptionHtml,
      vendor: productData.vendor,
      product_type: productData.productType,
      tags: productData.tags.join(', '),
      status: 'active',
      variants: variants.map(v => ({
        option1: v.optionValue,
        price: v.price,
        sku: v.sku,
        inventory_management: 'shopify',
        inventory_quantity: v.inventoryQuantity,
        weight: v.optionValue === '12 oz' ? 340 : 2268,
        weight_unit: 'g'
      })),
      options: [
        {
          name: 'Size',
          values: variants.map(v => v.optionValue)
        }
      ]
    }
  };

  const response = await fetch('https://longshot-coffee-company.myshopify.com/admin/api/2024-10/products.json', {
    method: 'POST',
    headers: {
      'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(restProduct)
  });

  const data = await response.json();
  return data;
}

async function createSmartCollection(title, tag) {
  const fetch = (await import('node-fetch')).default;
  
  const collection = {
    smart_collection: {
      title: title,
      rules: [
        {
          column: 'tag',
          relation: 'equals',
          condition: tag
        }
      ],
      disjunctive: false
    }
  };

  const response = await fetch('https://longshot-coffee-company.myshopify.com/admin/api/2024-10/smart_collections.json', {
    method: 'POST',
    headers: {
      'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(collection)
  });

  const data = await response.json();
  return data;
}

async function setupShopify() {
  console.log('🚀 Setting up Shopify products and collections...\n');

  // Create products using REST API for better control
  console.log('📦 Creating products with REST API...\n');
  for (const product of products) {
    try {
      const variants = productVariants[product.title] || [];
      const response = await createProductWithREST(product, variants);
      
      if (response.product) {
        console.log(`✅ Created product: ${product.title} (${response.product.id})`);
      } else if (response.errors) {
        console.log(`⚠️  Error creating ${product.title}:`, response.errors);
      }
    } catch (error) {
      console.log(`❌ Failed to create ${product.title}:`, error.message);
    }
  }

  // Create smart collections
  console.log('\n📁 Creating smart collections...\n');
  const collections = [
    { title: 'Featured', tag: 'featured' },
    { title: 'Single Origin', tag: 'single-origin' },
    { title: 'Blends', tag: 'blends' },
    { title: 'Decaf', tag: 'decaf' },
    { title: 'Light Roast', tag: 'light-roast' },
    { title: 'Medium Roast', tag: 'medium-roast' },
    { title: 'Dark Roast', tag: 'dark-roast' }
  ];

  for (const collection of collections) {
    try {
      const response = await createSmartCollection(collection.title, collection.tag);
      
      if (response.smart_collection) {
        console.log(`✅ Created collection: ${collection.title}`);
      } else if (response.errors) {
        console.log(`⚠️  Error creating ${collection.title}:`, response.errors);
      }
    } catch (error) {
      console.log(`❌ Failed to create ${collection.title}:`, error.message);
    }
  }

  console.log('\n✨ Shopify setup complete!');
  console.log('📱 Visit your store: https://admin.shopify.com/store/longshot-coffee-company');
  console.log('🌐 Storefront: https://longshot-coffee-company.myshopify.com');
}

setupShopify().catch(console.error);