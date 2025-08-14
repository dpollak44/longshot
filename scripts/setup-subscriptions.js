require('dotenv').config({ path: '.env.local' });

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'longshot-coffee-company.myshopify.com';
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

// Note: Shopify subscriptions require either:
// 1. A subscription app (like ReCharge, Bold Subscriptions, etc.)
// 2. Shopify's native Subscription APIs (requires approval)
// 3. Using Selling Plans (available in Shopify Plus or with specific apps)

// This script will create subscription products as regular products with special tags
// and metadata that can be used with subscription apps

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

async function createSubscriptionVariants() {
  const fetch = (await import('node-fetch')).default;
  
  console.log('🚀 Setting up subscription options for products...\n');
  
  // Get all existing products
  const products = await getAllProducts();
  console.log(`Found ${products.length} products\n`);
  
  // Filter coffee products (exclude sample products)
  const coffeeProducts = products.filter(p => 
    !p.title.toLowerCase().includes('sample') &&
    !p.title.toLowerCase().includes('french roast')
  );
  
  let successCount = 0;
  
  for (const product of coffeeProducts) {
    try {
      console.log(`📦 Processing: ${product.title}`);
      
      // Get existing variants
      const variants = product.variants || [];
      const baseVariant = variants[0];
      
      if (!baseVariant) {
        console.log(`   ⚠️  No base variant found`);
        continue;
      }
      
      // Check if subscription variants already exist
      const hasSubscription = variants.some(v => 
        v.title.toLowerCase().includes('subscription') || 
        v.title.toLowerCase().includes('weekly') ||
        v.title.toLowerCase().includes('monthly')
      );
      
      if (hasSubscription) {
        console.log(`   ✓ Subscription options already exist`);
        successCount++;
        continue;
      }
      
      // Create subscription frequency variants
      const subscriptionOptions = [
        {
          title: 'One-time Purchase',
          price: baseVariant.price,
          option1: 'One-time',
          sku: `${baseVariant.sku || product.handle}-ONCE`,
          inventory_quantity: 100,
          inventory_management: 'shopify',
          fulfillment_service: 'manual',
          compare_at_price: null
        },
        {
          title: 'Weekly Subscription (Save 20%)',
          price: (parseFloat(baseVariant.price) * 0.80).toFixed(2),
          option1: 'Weekly',
          sku: `${baseVariant.sku || product.handle}-WEEK`,
          inventory_quantity: 100,
          inventory_management: 'shopify',
          fulfillment_service: 'manual',
          compare_at_price: baseVariant.price
        },
        {
          title: 'Bi-Weekly Subscription (Save 15%)',
          price: (parseFloat(baseVariant.price) * 0.85).toFixed(2),
          option1: 'Bi-Weekly',
          sku: `${baseVariant.sku || product.handle}-BIWEEK`,
          inventory_quantity: 100,
          inventory_management: 'shopify',
          fulfillment_service: 'manual',
          compare_at_price: baseVariant.price
        },
        {
          title: 'Monthly Subscription (Save 15%)',
          price: (parseFloat(baseVariant.price) * 0.85).toFixed(2),
          option1: 'Monthly',
          sku: `${baseVariant.sku || product.handle}-MONTH`,
          inventory_quantity: 100,
          inventory_management: 'shopify',
          fulfillment_service: 'manual',
          compare_at_price: baseVariant.price
        }
      ];
      
      // Update product with subscription options
      const updateResponse = await fetch(
        `https://${SHOPIFY_DOMAIN}/admin/api/2024-10/products/${product.id}.json`,
        {
          method: 'PUT',
          headers: {
            'X-Shopify-Access-Token': ADMIN_TOKEN,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            product: {
              id: product.id,
              options: [
                {
                  name: 'Purchase Type',
                  values: ['One-time', 'Weekly', 'Bi-Weekly', 'Monthly']
                }
              ],
              variants: subscriptionOptions.map(opt => ({
                ...opt,
                inventory_policy: 'continue',
                requires_shipping: true,
                taxable: true,
                weight: baseVariant.weight || 454, // 1 lb default
                weight_unit: baseVariant.weight_unit || 'g'
              })),
              tags: [...(product.tags || '').split(','), 'subscription-available'].join(','),
              metafields: [
                {
                  namespace: 'subscriptions',
                  key: 'available',
                  value: 'true',
                  type: 'boolean'
                },
                {
                  namespace: 'subscriptions',
                  key: 'frequencies',
                  value: JSON.stringify(['weekly', 'bi-weekly', 'monthly']),
                  type: 'json'
                },
                {
                  namespace: 'subscriptions',
                  key: 'discount_percentage',
                  value: '15',
                  type: 'number_integer'
                }
              ]
            }
          })
        }
      );
      
      const data = await updateResponse.json();
      
      if (data.product) {
        console.log(`   ✅ Added ${subscriptionOptions.length} subscription options`);
        successCount++;
      } else if (data.errors) {
        console.log(`   ❌ Error: ${JSON.stringify(data.errors)}`);
      }
      
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`✨ Subscription setup complete!`);
  console.log(`   ${successCount} products updated with subscription options`);
  console.log('='.repeat(60));
  
  console.log('\n📝 Important Notes:');
  console.log('1. These are subscription-ready products with variant options');
  console.log('2. To enable actual recurring billing, you need to:');
  console.log('   - Install a subscription app (ReCharge, Bold, Seal, etc.)');
  console.log('   - Or use Shopify Subscriptions (if available in your plan)');
  console.log('   - Configure the app to recognize these variants');
  console.log('3. The products are tagged with "subscription-available"');
  console.log('4. Subscription variants have discounted pricing built in');
  
  console.log('\n🧪 Testing subscription products...\n');
  await testSubscriptionProducts();
}

async function testSubscriptionProducts() {
  const { createStorefrontApiClient } = require('@shopify/storefront-api-client');
  
  const client = createStorefrontApiClient({
    storeDomain: SHOPIFY_DOMAIN,
    apiVersion: '2024-10',
    publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  });
  
  const query = `
    query {
      products(first: 5, query: "tag:subscription-available") {
        edges {
          node {
            title
            handle
            tags
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  compareAtPriceV2 {
                    amount
                    currencyCode
                  }
                  availableForSale
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
    
    console.log(`✅ Found ${products.length} subscription-enabled products:`);
    products.forEach(({ node }) => {
      console.log(`\n   📦 ${node.title}`);
      node.variants.edges.forEach(({ node: variant }) => {
        const savings = variant.compareAtPriceV2 
          ? ` (Save $${(parseFloat(variant.compareAtPriceV2.amount) - parseFloat(variant.priceV2.amount)).toFixed(2)})`
          : '';
        console.log(`      - ${variant.title}: $${variant.priceV2.amount}${savings}`);
      });
    });
    
    console.log('\n🌐 Visit http://localhost:3002/subscribe to see subscription options!');
  } catch (error) {
    console.log('❌ Storefront API error:', error.message);
  }
}

// Alternative: Create a simple selling plan (requires Shopify Plus or specific apps)
async function createSellingPlanGroup() {
  const fetch = (await import('node-fetch')).default;
  
  console.log('\n📋 Attempting to create Selling Plan Group...\n');
  
  const sellingPlanGroup = {
    selling_plan_group: {
      name: 'Coffee Subscription',
      merchant_code: 'coffee-sub',
      description: 'Subscribe and save on your favorite coffee',
      options: ['Delivery Frequency'],
      position: 1,
      selling_plans: [
        {
          name: 'Weekly Delivery',
          description: 'Delivered every week',
          billing_policy: {
            recurring: {
              interval: 'WEEK',
              interval_count: 1
            }
          },
          delivery_policy: {
            recurring: {
              interval: 'WEEK',
              interval_count: 1
            }
          },
          pricing_policies: [
            {
              fixed: {
                adjustment_type: 'PERCENTAGE',
                adjustment_value: 20
              }
            }
          ]
        },
        {
          name: 'Monthly Delivery',
          description: 'Delivered every month',
          billing_policy: {
            recurring: {
              interval: 'MONTH',
              interval_count: 1
            }
          },
          delivery_policy: {
            recurring: {
              interval: 'MONTH',
              interval_count: 1
            }
          },
          pricing_policies: [
            {
              fixed: {
                adjustment_type: 'PERCENTAGE',
                adjustment_value: 15
              }
            }
          ]
        }
      ]
    }
  };
  
  try {
    const response = await fetch(
      `https://${SHOPIFY_DOMAIN}/admin/api/2024-10/graphql.json`,
      {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': ADMIN_TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
            mutation {
              sellingPlanGroupCreate(input: {
                name: "Coffee Subscription"
                merchantCode: "coffee-sub"
                options: ["Delivery Frequency"]
                sellingPlansToCreate: [
                  {
                    name: "Weekly Delivery"
                    billingPolicy: {
                      recurring: {
                        interval: WEEK
                        intervalCount: 1
                      }
                    }
                    deliveryPolicy: {
                      recurring: {
                        interval: WEEK
                        intervalCount: 1
                      }
                    }
                    pricingPolicies: [
                      {
                        fixed: {
                          adjustmentType: PERCENTAGE
                          adjustmentValue: { percentage: 20.0 }
                        }
                      }
                    ]
                  }
                ]
              }) {
                sellingPlanGroup {
                  id
                }
                userErrors {
                  field
                  message
                }
              }
            }
          `
        })
      }
    );
    
    const data = await response.json();
    
    if (data.errors) {
      console.log('⚠️  Selling Plans API not available');
      console.log('   This feature requires Shopify Plus or a subscription app');
      console.log('   Using variant-based subscriptions instead');
    } else {
      console.log('✅ Selling Plan Group created successfully');
    }
  } catch (error) {
    console.log('⚠️  Selling Plans API not available in your Shopify plan');
    console.log('   Using variant-based subscription options instead');
  }
}

// Run the setup
async function main() {
  await createSubscriptionVariants();
  
  // Try to create selling plans (will fail gracefully if not available)
  await createSellingPlanGroup();
}

main().catch(console.error);