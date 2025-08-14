const contentfulManagement = require('contentful-management');
require('dotenv').config({ path: '.env.local' });

// Your Contentful Management Token
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

async function setupContentful() {
  try {
    const client = contentfulManagement.createClient({
      accessToken: MANAGEMENT_TOKEN,
    });

    console.log('🚀 Connecting to Contentful...\n');

    // Get all spaces
    const spaces = await client.getSpaces();
    
    if (spaces.items.length === 0) {
      console.log('No spaces found. Please create a space first at app.contentful.com');
      return;
    }

    console.log('Available spaces:');
    spaces.items.forEach((space, index) => {
      console.log(`${index + 1}. ${space.name} (ID: ${space.sys.id})`);
    });

    // For now, we'll use the first space
    // In production, you'd want to let the user choose
    const space = spaces.items[0];
    console.log(`\n✅ Using space: ${space.name}\n`);

    // Get the environment
    const environment = await space.getEnvironment('master');

    // Create content types
    console.log('📦 Creating content types...\n');

    // 1. Create Product content type
    try {
      const productType = await environment.createContentTypeWithId('product', {
        name: 'Product',
        displayField: 'name',
        fields: [
          {
            id: 'name',
            name: 'Name',
            type: 'Symbol',
            required: true,
          },
          {
            id: 'slug',
            name: 'Slug',
            type: 'Symbol',
            required: true,
            validations: [{ unique: true }],
          },
          {
            id: 'price',
            name: 'Price',
            type: 'Number',
            required: true,
          },
          {
            id: 'origin',
            name: 'Origin',
            type: 'Symbol',
            required: true,
          },
          {
            id: 'roastLevel',
            name: 'Roast Level',
            type: 'Symbol',
            required: true,
            validations: [
              {
                in: ['light', 'medium', 'dark'],
              },
            ],
          },
          {
            id: 'notes',
            name: 'Tasting Notes',
            type: 'Array',
            items: {
              type: 'Symbol',
            },
          },
          {
            id: 'description',
            name: 'Description',
            type: 'Text',
          },
          {
            id: 'image',
            name: 'Image',
            type: 'Link',
            linkType: 'Asset',
          },
          {
            id: 'featured',
            name: 'Featured',
            type: 'Boolean',
            defaultValue: { 'en-US': false },
          },
          {
            id: 'category',
            name: 'Category',
            type: 'Array',
            items: {
              type: 'Symbol',
              validations: [
                {
                  in: ['single-origin', 'blends', 'decaf'],
                },
              ],
            },
          },
          {
            id: 'inStock',
            name: 'In Stock',
            type: 'Boolean',
            defaultValue: { 'en-US': true },
          },
        ],
      });
      await productType.publish();
      console.log('✅ Created Product content type');
    } catch (err) {
      if (err.message.includes('already exists')) {
        console.log('⚠️  Product content type already exists');
      } else {
        throw err;
      }
    }

    // 2. Create Hero Slide content type
    try {
      const heroSlideType = await environment.createContentTypeWithId('heroSlide', {
        name: 'Hero Slide',
        displayField: 'title',
        fields: [
          {
            id: 'title',
            name: 'Title',
            type: 'Symbol',
            required: true,
          },
          {
            id: 'subtitle',
            name: 'Subtitle',
            type: 'Symbol',
            required: true,
          },
          {
            id: 'ctaText',
            name: 'CTA Text',
            type: 'Symbol',
            required: true,
          },
          {
            id: 'ctaLink',
            name: 'CTA Link',
            type: 'Symbol',
            required: true,
          },
          {
            id: 'backgroundImage',
            name: 'Background Image',
            type: 'Link',
            linkType: 'Asset',
          },
          {
            id: 'backgroundColor',
            name: 'Background Color',
            type: 'Symbol',
            defaultValue: { 'en-US': 'bg-gradient-to-br from-gray-100 to-gray-200' },
          },
          {
            id: 'order',
            name: 'Order',
            type: 'Number',
            required: true,
          },
        ],
      });
      await heroSlideType.publish();
      console.log('✅ Created Hero Slide content type');
    } catch (err) {
      if (err.message.includes('already exists')) {
        console.log('⚠️  Hero Slide content type already exists');
      } else {
        throw err;
      }
    }

    // 3. Create Announcement Bar content type
    try {
      const announcementType = await environment.createContentTypeWithId('announcementBar', {
        name: 'Announcement Bar',
        displayField: 'text',
        fields: [
          {
            id: 'text',
            name: 'Text',
            type: 'Symbol',
            required: true,
          },
          {
            id: 'link',
            name: 'Link',
            type: 'Symbol',
          },
          {
            id: 'linkText',
            name: 'Link Text',
            type: 'Symbol',
          },
          {
            id: 'active',
            name: 'Active',
            type: 'Boolean',
            required: true,
            defaultValue: { 'en-US': true },
          },
          {
            id: 'backgroundColor',
            name: 'Background Color',
            type: 'Symbol',
            defaultValue: { 'en-US': '#000000' },
          },
          {
            id: 'textColor',
            name: 'Text Color',
            type: 'Symbol',
            defaultValue: { 'en-US': '#ffffff' },
          },
        ],
      });
      await announcementType.publish();
      console.log('✅ Created Announcement Bar content type');
    } catch (err) {
      if (err.message.includes('already exists')) {
        console.log('⚠️  Announcement Bar content type already exists');
      } else {
        throw err;
      }
    }

    // Get API keys
    console.log('\n🔑 Getting API keys...\n');
    const apiKeys = await space.getApiKeys();
    
    let apiKey;
    if (apiKeys.items.length > 0) {
      apiKey = apiKeys.items[0];
      console.log('Using existing API key:', apiKey.name);
    } else {
      apiKey = await space.createApiKey({
        name: 'Longshot Coffee Development',
      });
      console.log('Created new API key:', apiKey.name);
    }

    // Output configuration
    console.log('\n' + '='.repeat(60));
    console.log('✅ CONTENTFUL SETUP COMPLETE!');
    console.log('='.repeat(60));
    console.log('\nAdd these to your .env.local file:\n');
    console.log(`CONTENTFUL_SPACE_ID=${space.sys.id}`);
    console.log(`CONTENTFUL_ACCESS_TOKEN=${apiKey.accessToken}`);
    console.log(`CONTENTFUL_PREVIEW_TOKEN=${apiKey.preview_api_key.sys.id}`);
    console.log(`CONTENTFUL_ENVIRONMENT=master`);
    console.log('\n' + '='.repeat(60));

    // Create sample content
    console.log('\n📝 Creating sample content...\n');

    // Create sample products
    const sampleProducts = [
      {
        name: 'Ethiopia Yirgacheffe',
        slug: 'ethiopia-yirgacheffe',
        price: 24.00,
        origin: 'Yirgacheffe, Ethiopia',
        roastLevel: 'light',
        notes: ['Floral', 'Lemon', 'Bergamot'],
        description: 'A bright and complex coffee with distinctive floral notes.',
        featured: true,
        category: ['single-origin'],
      },
      {
        name: 'Colombia Geisha',
        slug: 'colombia-geisha',
        price: 32.00,
        origin: 'Huila, Colombia',
        roastLevel: 'light',
        notes: ['Jasmine', 'Peach', 'Honey'],
        description: 'Exceptional clarity and sweetness with delicate floral aromatics.',
        featured: true,
        category: ['single-origin'],
      },
      {
        name: 'House Blend',
        slug: 'house-blend',
        price: 18.00,
        origin: 'Central & South America',
        roastLevel: 'medium',
        notes: ['Chocolate', 'Caramel', 'Nuts'],
        description: 'Our signature blend, perfect for everyday brewing.',
        featured: true,
        category: ['blends'],
      },
      {
        name: 'Midnight Espresso',
        slug: 'midnight-espresso',
        price: 20.00,
        origin: 'Brazil & Indonesia',
        roastLevel: 'dark',
        notes: ['Dark Chocolate', 'Molasses', 'Smoke'],
        description: 'Bold and intense, perfect for espresso and strong coffee lovers.',
        featured: true,
        category: ['blends'],
      },
    ];

    for (const productData of sampleProducts) {
      try {
        const product = await environment.createEntry('product', {
          fields: Object.fromEntries(
            Object.entries(productData).map(([key, value]) => [key, { 'en-US': value }])
          ),
        });
        await product.publish();
        console.log(`✅ Created product: ${productData.name}`);
      } catch (err) {
        console.log(`⚠️  Error creating product ${productData.name}:`, err.message);
      }
    }

    // Create sample hero slides
    const sampleSlides = [
      {
        title: 'New Arrival: Ethiopia Yirgacheffe',
        subtitle: 'Bright, floral notes with hints of lemon',
        ctaText: 'Shop Now',
        ctaLink: '/shop/single-origin',
        order: 1,
      },
      {
        title: 'Subscribe & Save 15%',
        subtitle: 'Never run out of your favorite coffee',
        ctaText: 'Start Subscription',
        ctaLink: '/subscribe',
        order: 2,
      },
    ];

    for (const slideData of sampleSlides) {
      try {
        const slide = await environment.createEntry('heroSlide', {
          fields: Object.fromEntries(
            Object.entries(slideData).map(([key, value]) => [key, { 'en-US': value }])
          ),
        });
        await slide.publish();
        console.log(`✅ Created hero slide: ${slideData.title}`);
      } catch (err) {
        console.log(`⚠️  Error creating slide:`, err.message);
      }
    }

    console.log('\n🎉 Setup complete! Your Contentful space is ready to use.');
    console.log('📖 Next steps:');
    console.log('1. Copy the environment variables above to your .env.local file');
    console.log('2. Restart your Next.js dev server');
    console.log('3. Visit http://localhost:3002/test-contentful to see it working');

  } catch (error) {
    console.error('❌ Error setting up Contentful:', error.message);
    console.error('\nFull error:', error);
  }
}

setupContentful();