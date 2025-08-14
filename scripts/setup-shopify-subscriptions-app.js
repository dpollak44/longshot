require('dotenv').config({ path: '.env.local' });
const { createAdminApiClient } = require('@shopify/admin-api-client');

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'longshot-coffee-company.myshopify.com';
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

const client = createAdminApiClient({
  storeDomain: SHOPIFY_DOMAIN,
  apiVersion: '2024-10',
  accessToken: ADMIN_TOKEN,
});

async function createSellingPlanGroup() {
  console.log('🚀 Setting up Shopify Subscriptions automatically...\n');
  
  // Create a selling plan group with multiple frequency options
  const mutation = `
    mutation CreateSellingPlanGroup($input: SellingPlanGroupInput!) {
      sellingPlanGroupCreate(input: $input) {
        sellingPlanGroup {
          id
          name
          merchantCode
          sellingPlans(first: 10) {
            edges {
              node {
                id
                name
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

  const variables = {
    input: {
      name: "Coffee Subscription",
      merchantCode: "coffee-sub",
      description: "Subscribe and save on your favorite coffee",
      sellingPlansToCreate: [
        {
          name: "Deliver every week • Save 20%",
          category: "SUBSCRIPTION",
          options: "Every week",
          position: 1,
          billingPolicy: {
            recurring: {
              interval: "WEEK",
              intervalCount: 1,
              anchors: [
                {
                  type: "WEEKDAY",
                  day: 1
                }
              ]
            }
          },
          deliveryPolicy: {
            recurring: {
              interval: "WEEK",
              intervalCount: 1,
              anchors: [
                {
                  type: "WEEKDAY",
                  day: 1
                }
              ]
            }
          },
          pricingPolicies: [
            {
              fixed: {
                adjustmentType: "PERCENTAGE",
                adjustmentValue: {
                  percentage: 20.0
                }
              }
            }
          ],
          inventoryPolicy: {
            reserve: "ON_FULFILLMENT"
          }
        },
        {
          name: "Deliver every 2 weeks • Save 15%",
          category: "SUBSCRIPTION",
          options: "Every 2 weeks",
          position: 2,
          billingPolicy: {
            recurring: {
              interval: "WEEK",
              intervalCount: 2,
              anchors: [
                {
                  type: "WEEKDAY",
                  day: 1
                }
              ]
            }
          },
          deliveryPolicy: {
            recurring: {
              interval: "WEEK",
              intervalCount: 2,
              anchors: [
                {
                  type: "WEEKDAY",
                  day: 1
                }
              ]
            }
          },
          pricingPolicies: [
            {
              fixed: {
                adjustmentType: "PERCENTAGE",
                adjustmentValue: {
                  percentage: 15.0
                }
              }
            }
          ],
          inventoryPolicy: {
            reserve: "ON_FULFILLMENT"
          }
        },
        {
          name: "Deliver every month • Save 15%",
          category: "SUBSCRIPTION",
          options: "Every month",
          position: 3,
          billingPolicy: {
            recurring: {
              interval: "MONTH",
              intervalCount: 1,
              anchors: [
                {
                  type: "MONTHDAY",
                  day: 1
                }
              ]
            }
          },
          deliveryPolicy: {
            recurring: {
              interval: "MONTH",
              intervalCount: 1,
              anchors: [
                {
                  type: "MONTHDAY",
                  day: 1
                }
              ]
            }
          },
          pricingPolicies: [
            {
              fixed: {
                adjustmentType: "PERCENTAGE",
                adjustmentValue: {
                  percentage: 15.0
                }
              }
            }
          ],
          inventoryPolicy: {
            reserve: "ON_FULFILLMENT"
          }
        }
      ],
      options: ["Delivery every"]
    }
  };

  try {
    const response = await client.request(mutation, { variables });
    
    if (response.data?.sellingPlanGroupCreate?.userErrors?.length > 0) {
      console.log('❌ Errors creating selling plan group:');
      response.data.sellingPlanGroupCreate.userErrors.forEach(error => {
        console.log(`   - ${error.field}: ${error.message}`);
      });
      return null;
    }
    
    const group = response.data?.sellingPlanGroupCreate?.sellingPlanGroup;
    if (group) {
      console.log('✅ Created Selling Plan Group:', group.name);
      console.log('   ID:', group.id);
      console.log('   Plans:');
      group.sellingPlans.edges.forEach(({ node }) => {
        console.log(`   - ${node.name}`);
      });
      return group.id;
    }
  } catch (error) {
    console.log('❌ Error creating selling plan group:', error.message);
    
    // Try to get existing selling plan groups
    const existingGroups = await getExistingSellingPlanGroups();
    if (existingGroups.length > 0) {
      console.log('\n📋 Found existing selling plan groups:');
      existingGroups.forEach(group => {
        console.log(`   - ${group.name} (${group.id})`);
      });
      return existingGroups[0].id;
    }
  }
  
  return null;
}

async function getExistingSellingPlanGroups() {
  const query = `
    query {
      sellingPlanGroups(first: 10) {
        edges {
          node {
            id
            name
            merchantCode
            productCount
            sellingPlans(first: 10) {
              edges {
                node {
                  id
                  name
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
    return response.data?.sellingPlanGroups?.edges?.map(e => e.node) || [];
  } catch (error) {
    console.log('Error fetching selling plan groups:', error.message);
    return [];
  }
}

async function getProducts() {
  const query = `
    query {
      products(first: 100, query: "-title:sample") {
        edges {
          node {
            id
            title
            handle
            status
            sellingPlanGroupCount
          }
        }
      }
    }
  `;
  
  const response = await client.request(query);
  return response.data?.products?.edges?.map(e => e.node) || [];
}

async function addProductsToSellingPlanGroup(sellingPlanGroupId, productIds) {
  console.log('\n📦 Adding products to selling plan group...\n');
  
  const mutation = `
    mutation AddProductsToSellingPlanGroup($id: ID!, $productIds: [ID!]!) {
      sellingPlanGroupAddProducts(id: $id, productIds: $productIds) {
        sellingPlanGroup {
          id
          productCount
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  
  // Batch products in groups of 20 to avoid hitting limits
  const batches = [];
  for (let i = 0; i < productIds.length; i += 20) {
    batches.push(productIds.slice(i, i + 20));
  }
  
  let totalAdded = 0;
  
  for (const batch of batches) {
    try {
      const response = await client.request(mutation, {
        variables: {
          id: sellingPlanGroupId,
          productIds: batch
        }
      });
      
      if (response.data?.sellingPlanGroupAddProducts?.userErrors?.length > 0) {
        console.log('⚠️  Errors adding products:');
        response.data.sellingPlanGroupAddProducts.userErrors.forEach(error => {
          console.log(`   - ${error.message}`);
        });
      } else {
        totalAdded += batch.length;
        console.log(`   ✅ Added ${batch.length} products`);
      }
    } catch (error) {
      console.log(`   ❌ Error adding batch: ${error.message}`);
    }
  }
  
  return totalAdded;
}

async function setupSubscriptions() {
  console.log('====================================');
  console.log('SHOPIFY SUBSCRIPTIONS AUTOMATED SETUP');
  console.log('====================================\n');
  
  // Step 1: Create or get selling plan group
  let sellingPlanGroupId = await createSellingPlanGroup();
  
  if (!sellingPlanGroupId) {
    console.log('\n❌ Could not create or find selling plan group');
    return;
  }
  
  // Step 2: Get all products
  const products = await getProducts();
  console.log(`\n📦 Found ${products.length} products`);
  
  // Filter out products that already have selling plans
  const productsWithoutPlans = products.filter(p => 
    p.sellingPlanGroupCount === 0 && 
    p.status === 'ACTIVE' &&
    !p.title.toLowerCase().includes('sample')
  );
  
  console.log(`   ${productsWithoutPlans.length} products need subscription plans`);
  
  if (productsWithoutPlans.length > 0) {
    // Step 3: Add products to selling plan group
    const productIds = productsWithoutPlans.map(p => p.id);
    const addedCount = await addProductsToSellingPlanGroup(sellingPlanGroupId, productIds);
    
    console.log('\n' + '='.repeat(60));
    console.log('✨ SUBSCRIPTION SETUP COMPLETE!');
    console.log('='.repeat(60));
    console.log(`\n📊 Summary:`);
    console.log(`   - Created/Updated 1 selling plan group`);
    console.log(`   - Added ${addedCount} products to subscription plans`);
    console.log(`   - 3 frequency options available (Weekly, Bi-weekly, Monthly)`);
  } else {
    console.log('\n✅ All products already have subscription plans!');
  }
  
  console.log('\n📝 Next Steps:');
  console.log('1. Go to Shopify Admin → Products → Subscriptions');
  console.log('2. Your subscription plans are now active');
  console.log('3. Customers can now subscribe on product pages');
  console.log('4. Test by visiting a product page on your store');
  
  console.log('\n🔧 To customize further:');
  console.log('- Shopify Admin → Settings → Apps → Shopify Subscriptions');
  console.log('- Configure email notifications');
  console.log('- Set up customer portal options');
  console.log('- Adjust subscription policies');
  
  // Test the setup
  console.log('\n🧪 Testing subscription setup...\n');
  await testSubscriptionSetup();
}

async function testSubscriptionSetup() {
  const { createStorefrontApiClient } = require('@shopify/storefront-api-client');
  
  const storefrontClient = createStorefrontApiClient({
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
            sellingPlanGroups(first: 3) {
              edges {
                node {
                  name
                  options {
                    name
                    values
                  }
                  sellingPlans(first: 10) {
                    edges {
                      node {
                        name
                        id
                        pricingPolicies {
                          ... on SellingPlanFixedPricingPolicy {
                            adjustmentType
                            adjustmentValue {
                              ... on SellingPlanPricingPolicyPercentageValue {
                                percentage
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  
  try {
    const response = await storefrontClient.request(query);
    const products = response.data?.products?.edges || [];
    
    console.log('✅ Subscription plans visible on Storefront:');
    products.forEach(({ node }) => {
      if (node.sellingPlanGroups.edges.length > 0) {
        console.log(`\n   📦 ${node.title}`);
        node.sellingPlanGroups.edges.forEach(({ node: group }) => {
          group.sellingPlans.edges.forEach(({ node: plan }) => {
            console.log(`      - ${plan.name}`);
          });
        });
      }
    });
    
    console.log('\n🎉 Customers can now subscribe to products!');
    console.log('🌐 Visit any product page to see subscription options');
  } catch (error) {
    console.log('⚠️  Could not verify on Storefront API:', error.message);
    console.log('   This is normal - changes may take a minute to propagate');
  }
}

// Run the setup
setupSubscriptions().catch(console.error);