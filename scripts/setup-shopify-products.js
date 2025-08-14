const { createAdminApiClient } = require('@shopify/admin-api-client');
require('dotenv').config({ path: '.env.local' });

// Initialize Shopify Admin API client
const client = createAdminApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'longshot-coffee-company.myshopify.com',
  apiVersion: '2024-10',
  accessToken: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
});

// Product data from our website
const products = [
  {
    title: 'Ethiopia Yirgacheffe',
    body_html: '<p>A bright and complex coffee with distinctive floral notes and citrus undertones. This exceptional single-origin coffee is sourced from the Yirgacheffe region, known for producing some of Ethiopia\'s most celebrated coffees.</p>',
    vendor: 'Longshot Coffee',
    product_type: 'Coffee',
    tags: ['single-origin', 'light-roast', 'featured', 'floral', 'lemon', 'bergamot'],
    variants: [
      {
        option1: '12 oz',
        price: '24.00',
        sku: 'ETH-YRG-12',
        inventory_quantity: 100,
        weight: 340,
        weight_unit: 'g',
      },
      {
        option1: '5 lb',
        price: '85.00',
        sku: 'ETH-YRG-5LB',
        inventory_quantity: 50,
        weight: 2268,
        weight_unit: 'g',
      }
    ],
    options: [
      {
        name: 'Size',
        values: ['12 oz', '5 lb']
      }
    ],
    images: [
      {
        src: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=1200&h=1200&fit=crop',
        alt: 'Ethiopia Yirgacheffe Coffee Bag'
      }
    ],
    metafields_global_title_tag: 'Ethiopia Yirgacheffe - Single Origin Coffee | Longshot Coffee',
    metafields_global_description_tag: 'Bright, floral Ethiopian coffee with notes of lemon and bergamot. Single-origin from Yirgacheffe. Light roast. Free shipping over $40.',
  },
  {
    title: 'Colombia Geisha',
    body_html: '<p>Exceptional clarity and sweetness with delicate floral aromatics. This rare Geisha variety from Huila, Colombia offers an extraordinary cup with notes of jasmine, peach, and honey.</p>',
    vendor: 'Longshot Coffee',
    product_type: 'Coffee',
    tags: ['single-origin', 'light-roast', 'featured', 'premium', 'jasmine', 'peach', 'honey'],
    variants: [
      {
        option1: '12 oz',
        price: '32.00',
        sku: 'COL-GSH-12',
        inventory_quantity: 50,
        weight: 340,
        weight_unit: 'g',
      },
      {
        option1: '5 lb',
        price: '120.00',
        sku: 'COL-GSH-5LB',
        inventory_quantity: 25,
        weight: 2268,
        weight_unit: 'g',
      }
    ],
    options: [
      {
        name: 'Size',
        values: ['12 oz', '5 lb']
      }
    ],
    images: [
      {
        src: 'https://images.unsplash.com/photo-1559056199-5a47f60c5053?w=1200&h=1200&fit=crop',
        alt: 'Colombia Geisha Coffee Bag'
      }
    ]
  },
  {
    title: 'Longshot House Blend',
    body_html: '<p>Our signature blend, perfect for everyday brewing. A harmonious combination of Central and South American coffees creating a balanced cup with notes of chocolate, caramel, and roasted nuts.</p>',
    vendor: 'Longshot Coffee',
    product_type: 'Coffee',
    tags: ['blends', 'medium-roast', 'featured', 'chocolate', 'caramel', 'nuts'],
    variants: [
      {
        option1: '12 oz',
        price: '18.00',
        sku: 'HSE-BLD-12',
        inventory_quantity: 200,
        weight: 340,
        weight_unit: 'g',
      },
      {
        option1: '5 lb',
        price: '65.00',
        sku: 'HSE-BLD-5LB',
        inventory_quantity: 100,
        weight: 2268,
        weight_unit: 'g',
      }
    ],
    options: [
      {
        name: 'Size',
        values: ['12 oz', '5 lb']
      }
    ],
    images: [
      {
        src: 'https://images.unsplash.com/photo-1599639932525-a93cf1f96a77?w=1200&h=1200&fit=crop',
        alt: 'House Blend Coffee Bag'
      }
    ]
  },
  {
    title: 'Midnight Espresso',
    body_html: '<p>Bold and intense, perfect for espresso and strong coffee lovers. This dark roast blend of Brazilian and Indonesian beans delivers notes of dark chocolate, molasses, and subtle smoke.</p>',
    vendor: 'Longshot Coffee',
    product_type: 'Coffee',
    tags: ['blends', 'dark-roast', 'featured', 'espresso', 'dark-chocolate', 'molasses', 'smoke'],
    variants: [
      {
        option1: '12 oz',
        price: '20.00',
        sku: 'MID-ESP-12',
        inventory_quantity: 150,
        weight: 340,
        weight_unit: 'g',
      },
      {
        option1: '5 lb',
        price: '72.00',
        sku: 'MID-ESP-5LB',
        inventory_quantity: 75,
        weight: 2268,
        weight_unit: 'g',
      }
    ],
    options: [
      {
        name: 'Size',
        values: ['12 oz', '5 lb']
      }
    ],
    images: [
      {
        src: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=1200&h=1200&fit=crop',
        alt: 'Midnight Espresso Coffee Bag'
      }
    ]
  },
  {
    title: 'Kenya AA',
    body_html: '<p>A bold and wine-like coffee with intense blackcurrant notes and bright acidity. This top-grade Kenyan coffee is known for its complex flavor profile and full body.</p>',
    vendor: 'Longshot Coffee',
    product_type: 'Coffee',
    tags: ['single-origin', 'medium-roast', 'blackcurrant', 'wine', 'bright'],
    variants: [
      {
        option1: '12 oz',
        price: '26.00',
        sku: 'KEN-AA-12',
        inventory_quantity: 80,
        weight: 340,
        weight_unit: 'g',
      },
      {
        option1: '5 lb',
        price: '95.00',
        sku: 'KEN-AA-5LB',
        inventory_quantity: 40,
        weight: 2268,
        weight_unit: 'g',
      }
    ],
    options: [
      {
        name: 'Size',
        values: ['12 oz', '5 lb']
      }
    ],
    images: [
      {
        src: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1200&h=1200&fit=crop',
        alt: 'Kenya AA Coffee Bag'
      }
    ]
  },
  {
    title: 'Guatemala Antigua',
    body_html: '<p>Smooth and balanced with chocolate and spice notes. Grown in the volcanic soils of Antigua, this coffee offers a rich, full body with subtle smoky undertones.</p>',
    vendor: 'Longshot Coffee',
    product_type: 'Coffee',
    tags: ['single-origin', 'medium-roast', 'chocolate', 'spice', 'volcanic'],
    variants: [
      {
        option1: '12 oz',
        price: '22.00',
        sku: 'GUA-ANT-12',
        inventory_quantity: 90,
        weight: 340,
        weight_unit: 'g',
      },
      {
        option1: '5 lb',
        price: '80.00',
        sku: 'GUA-ANT-5LB',
        inventory_quantity: 45,
        weight: 2268,
        weight_unit: 'g',
      }
    ],
    options: [
      {
        name: 'Size',
        values: ['12 oz', '5 lb']
      }
    ],
    images: [
      {
        src: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=1200&h=1200&fit=crop',
        alt: 'Guatemala Antigua Coffee Bag'
      }
    ]
  },
  {
    title: 'Decaf Colombia',
    body_html: '<p>All the flavor without the caffeine. This Swiss Water Process decaf maintains the sweet, balanced character of Colombian coffee with notes of chocolate and caramel.</p>',
    vendor: 'Longshot Coffee',
    product_type: 'Coffee',
    tags: ['decaf', 'medium-roast', 'colombia', 'swiss-water', 'chocolate', 'caramel'],
    variants: [
      {
        option1: '12 oz',
        price: '20.00',
        sku: 'DEC-COL-12',
        inventory_quantity: 60,
        weight: 340,
        weight_unit: 'g',
      },
      {
        option1: '5 lb',
        price: '72.00',
        sku: 'DEC-COL-5LB',
        inventory_quantity: 30,
        weight: 2268,
        weight_unit: 'g',
      }
    ],
    options: [
      {
        name: 'Size',
        values: ['12 oz', '5 lb']
      }
    ],
    images: [
      {
        src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&h=1200&fit=crop',
        alt: 'Decaf Colombia Coffee Bag'
      }
    ]
  },
  {
    title: 'Costa Rica Tarrazú',
    body_html: '<p>Clean and bright with citrus and chocolate notes. This high-altitude coffee from the Tarrazú region is known for its exceptional clarity and balanced sweetness.</p>',
    vendor: 'Longshot Coffee',
    product_type: 'Coffee',
    tags: ['single-origin', 'medium-roast', 'citrus', 'chocolate', 'bright'],
    variants: [
      {
        option1: '12 oz',
        price: '23.00',
        sku: 'COS-TAR-12',
        inventory_quantity: 70,
        weight: 340,
        weight_unit: 'g',
      },
      {
        option1: '5 lb',
        price: '84.00',
        sku: 'COS-TAR-5LB',
        inventory_quantity: 35,
        weight: 2268,
        weight_unit: 'g',
      }
    ],
    options: [
      {
        name: 'Size',
        values: ['12 oz', '5 lb']
      }
    ],
    images: [
      {
        src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=1200&fit=crop',
        alt: 'Costa Rica Tarrazú Coffee Bag'
      }
    ]
  },
  {
    title: 'Breakfast Blend',
    body_html: '<p>A smooth, approachable blend perfect for starting your day. Light-medium roast with bright acidity and notes of citrus, nuts, and milk chocolate.</p>',
    vendor: 'Longshot Coffee',
    product_type: 'Coffee',
    tags: ['blends', 'light-roast', 'breakfast', 'citrus', 'nuts', 'milk-chocolate'],
    variants: [
      {
        option1: '12 oz',
        price: '17.00',
        sku: 'BRK-BLD-12',
        inventory_quantity: 120,
        weight: 340,
        weight_unit: 'g',
      },
      {
        option1: '5 lb',
        price: '62.00',
        sku: 'BRK-BLD-5LB',
        inventory_quantity: 60,
        weight: 2268,
        weight_unit: 'g',
      }
    ],
    options: [
      {
        name: 'Size',
        values: ['12 oz', '5 lb']
      }
    ],
    images: [
      {
        src: 'https://images.unsplash.com/photo-1542317873-894ffef09132?w=1200&h=1200&fit=crop',
        alt: 'Breakfast Blend Coffee Bag'
      }
    ]
  },
  {
    title: 'French Roast',
    body_html: '<p>Bold, smoky, and intense. This classic dark roast delivers a powerful cup with notes of dark chocolate, charred wood, and a lingering smoky finish.</p>',
    vendor: 'Longshot Coffee',
    product_type: 'Coffee',
    tags: ['blends', 'dark-roast', 'french', 'smoky', 'bold', 'dark-chocolate'],
    variants: [
      {
        option1: '12 oz',
        price: '19.00',
        sku: 'FRN-RST-12',
        inventory_quantity: 100,
        weight: 340,
        weight_unit: 'g',
      },
      {
        option1: '5 lb',
        price: '69.00',
        sku: 'FRN-RST-5LB',
        inventory_quantity: 50,
        weight: 2268,
        weight_unit: 'g',
      }
    ],
    options: [
      {
        name: 'Size',
        values: ['12 oz', '5 lb']
      }
    ],
    images: [
      {
        src: 'https://images.unsplash.com/photo-1609347744403-fb9600f0ed9a?w=1200&h=1200&fit=crop',
        alt: 'French Roast Coffee Bag'
      }
    ]
  }
];

// Collections to create
const collections = [
  {
    title: 'Featured',
    body_html: '<p>Our handpicked selection of exceptional coffees, carefully chosen for their unique characteristics and outstanding quality.</p>',
    rules: [
      {
        column: 'tag',
        relation: 'equals',
        condition: 'featured'
      }
    ],
    disjunctive: false,
    sort_order: 'best-selling'
  },
  {
    title: 'Single Origin',
    body_html: '<p>Explore the unique characteristics of coffee from specific regions around the world. Each single-origin coffee tells a story of its terroir, processing, and the farmers who grew it.</p>',
    rules: [
      {
        column: 'tag',
        relation: 'equals',
        condition: 'single-origin'
      }
    ],
    disjunctive: false,
    sort_order: 'manual'
  },
  {
    title: 'Blends',
    body_html: '<p>Expertly crafted combinations that bring together the best characteristics of different origins, creating harmonious and complex flavor profiles.</p>',
    rules: [
      {
        column: 'tag',
        relation: 'equals',
        condition: 'blends'
      }
    ],
    disjunctive: false,
    sort_order: 'manual'
  },
  {
    title: 'Decaf',
    body_html: '<p>Full flavor without the caffeine. Our decaf coffees are processed using the Swiss Water method, preserving the coffee\'s natural flavors.</p>',
    rules: [
      {
        column: 'tag',
        relation: 'equals',
        condition: 'decaf'
      }
    ],
    disjunctive: false,
    sort_order: 'manual'
  },
  {
    title: 'Light Roast',
    body_html: '<p>Bright, complex, and nuanced. Light roasts highlight the coffee\'s origin characteristics and natural flavors.</p>',
    rules: [
      {
        column: 'tag',
        relation: 'equals',
        condition: 'light-roast'
      }
    ],
    disjunctive: false,
    sort_order: 'manual'
  },
  {
    title: 'Medium Roast',
    body_html: '<p>Balanced and versatile. Medium roasts offer the perfect balance between origin flavors and roast characteristics.</p>',
    rules: [
      {
        column: 'tag',
        relation: 'equals',
        condition: 'medium-roast'
      }
    ],
    disjunctive: false,
    sort_order: 'manual'
  },
  {
    title: 'Dark Roast',
    body_html: '<p>Bold and intense. Dark roasts deliver rich, robust flavors with notes of chocolate and caramelization.</p>',
    rules: [
      {
        column: 'tag',
        relation: 'equals',
        condition: 'dark-roast'
      }
    ],
    disjunctive: false,
    sort_order: 'manual'
  }
];

async function createProduct(productData) {
  const mutation = `
    mutation CreateProduct($input: ProductInput!) {
      productCreate(input: $input) {
        product {
          id
          title
          handle
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
    
    console.log('Product response:', JSON.stringify(response, null, 2));
    return response;
  } catch (error) {
    console.error('Request error:', error);
    throw error;
  }
}

async function createCollection(collectionData) {
  // For smart collections (automated)
  const mutation = `
    mutation CreateCollection($input: CollectionInput!) {
      collectionCreate(input: $input) {
        collection {
          id
          title
          handle
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
        input: collectionData
      }
    });
    
    console.log('Collection response:', JSON.stringify(response, null, 2));
    return response;
  } catch (error) {
    console.error('Request error:', error);
    throw error;
  }
}

async function setupShopify() {
  console.log('🚀 Setting up Shopify products and collections...\n');

  // Create products
  console.log('📦 Creating products...\n');
  for (const product of products) {
    try {
      const response = await createProduct(product);
      if (response.data?.productCreate?.product) {
        console.log(`✅ Created product: ${product.title}`);
      } else if (response.data?.productCreate?.userErrors?.length > 0) {
        console.log(`⚠️  Error creating ${product.title}:`, response.data.productCreate.userErrors);
      }
    } catch (error) {
      console.log(`❌ Failed to create ${product.title}:`, error.message);
    }
  }

  // Create collections
  console.log('\n📁 Creating collections...\n');
  for (const collection of collections) {
    try {
      const response = await createCollection(collection);
      if (response.data?.collectionCreate?.collection) {
        console.log(`✅ Created collection: ${collection.title}`);
      } else if (response.data?.collectionCreate?.userErrors?.length > 0) {
        console.log(`⚠️  Error creating ${collection.title}:`, response.data.collectionCreate.userErrors);
      }
    } catch (error) {
      console.log(`❌ Failed to create ${collection.title}:`, error.message);
    }
  }

  console.log('\n✨ Shopify setup complete!');
  console.log('📱 Visit your store: https://quickstart-fa8f8c5f.myshopify.com/admin');
}

setupShopify().catch(console.error);