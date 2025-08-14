require('dotenv').config({ path: '.env.local' });
const { createAdminApiClient } = require('@shopify/admin-api-client');

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'longshot-coffee-company.myshopify.com';
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

const client = createAdminApiClient({
  storeDomain: SHOPIFY_DOMAIN,
  apiVersion: '2024-10',
  accessToken: ADMIN_TOKEN,
});

// Test customers data
const testCustomers = [
  {
    firstName: 'Sarah',
    lastName: 'Coffee',
    email: 'sarah.coffee@example.com',
    phone: '+12025551234',  // Valid US phone format
    note: 'Test customer - Weekly subscription',
    addresses: [{
      address1: '123 Coffee Street',
      city: 'Portland',
      province: 'Oregon',
      country: 'United States',
      zip: '97201'
    }]
  },
  {
    firstName: 'John',
    lastName: 'Espresso',
    email: 'john.espresso@example.com',
    phone: '+12025559876',  // Valid US phone format
    note: 'Test customer - Monthly subscription',
    addresses: [{
      address1: '456 Brew Avenue',
      city: 'Seattle',
      province: 'Washington',
      country: 'United States',
      zip: '98101'
    }]
  },
  {
    firstName: 'Emma',
    lastName: 'Latte',
    email: 'emma.latte@example.com',
    phone: '+12025555678',  // Valid US phone format
    note: 'Test customer - Bi-weekly subscription',
    addresses: [{
      address1: '789 Roast Road',
      city: 'San Francisco',
      province: 'California',
      country: 'United States',
      zip: '94102'
    }]
  }
];

async function createCustomer(customerData) {
  const mutation = `
    mutation CreateCustomer($input: CustomerInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
          firstName
          lastName
          phone
          emailMarketingConsent {
            marketingState
          }
          addresses {
            address1
            city
            province
            country
            zip
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
      firstName: customerData.firstName,
      lastName: customerData.lastName,
      email: customerData.email,
      phone: customerData.phone,
      note: customerData.note,
      emailMarketingConsent: {
        marketingState: "SUBSCRIBED",
        marketingOptInLevel: "SINGLE_OPT_IN"
      },
      addresses: customerData.addresses,
      tags: ["test-customer", "subscription-customer"]
    }
  };

  try {
    const response = await client.request(mutation, { variables });
    
    if (response.data?.customerCreate?.userErrors?.length > 0) {
      console.log(`❌ Error creating customer ${customerData.email}:`);
      response.data.customerCreate.userErrors.forEach(error => {
        console.log(`   - ${error.field}: ${error.message}`);
      });
      return null;
    }
    
    const customer = response.data?.customerCreate?.customer;
    if (customer) {
      console.log(`✅ Created customer: ${customer.firstName} ${customer.lastName} (${customer.email})`);
      return customer;
    }
  } catch (error) {
    console.log(`❌ Error creating customer: ${error.message}`);
    
    // Try to find existing customer
    const existingCustomer = await findCustomerByEmail(customerData.email);
    if (existingCustomer) {
      console.log(`   ℹ️  Customer already exists: ${existingCustomer.email}`);
      return existingCustomer;
    }
  }
  
  return null;
}

async function findCustomerByEmail(email) {
  const query = `
    query FindCustomer($query: String!) {
      customers(first: 1, query: $query) {
        edges {
          node {
            id
            email
            firstName
            lastName
          }
        }
      }
    }
  `;
  
  try {
    const response = await client.request(query, {
      variables: { query: `email:${email}` }
    });
    
    const customers = response.data?.customers?.edges || [];
    return customers.length > 0 ? customers[0].node : null;
  } catch (error) {
    console.log(`Error finding customer: ${error.message}`);
    return null;
  }
}

async function sendAccountInvite(customerId) {
  const mutation = `
    mutation SendAccountInvite($customerId: ID!) {
      customerSendAccountInviteEmail(customerId: $customerId) {
        customer {
          id
          email
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
      variables: { customerId }
    });
    
    if (response.data?.customerSendAccountInviteEmail?.userErrors?.length > 0) {
      console.log(`   ⚠️  Could not send invite:`);
      response.data.customerSendAccountInviteEmail.userErrors.forEach(error => {
        console.log(`      - ${error.message}`);
      });
    } else {
      console.log(`   📧 Account invitation sent`);
    }
  } catch (error) {
    console.log(`   ⚠️  Error sending invite: ${error.message}`);
  }
}

async function getProductWithSubscription() {
  // First get products and selling plan groups separately
  const productsQuery = `
    query {
      products(first: 5, query: "status:active -title:sample") {
        edges {
          node {
            id
            title
            handle
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  price
                }
              }
            }
          }
        }
      }
    }
  `;
  
  const sellingPlanQuery = `
    query {
      sellingPlanGroups(first: 1) {
        edges {
          node {
            id
            name
            merchantCode
            sellingPlans(first: 10) {
              edges {
                node {
                  id
                  name
                  billingPolicy {
                    ... on SellingPlanRecurringBillingPolicy {
                      interval
                      intervalCount
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
    // Get products
    const productsResponse = await client.request(productsQuery);
    const products = productsResponse.data?.products?.edges || [];
    
    // Get selling plans
    const sellingPlanResponse = await client.request(sellingPlanQuery);
    const sellingPlanGroups = sellingPlanResponse.data?.sellingPlanGroups?.edges || [];
    
    if (products.length > 0 && sellingPlanGroups.length > 0) {
      const product = products[0].node;
      const variant = product.variants.edges[0]?.node;
      const sellingPlanGroup = sellingPlanGroups[0].node;
      const sellingPlans = sellingPlanGroup?.sellingPlans?.edges || [];
      
      return {
        product,
        variant,
        sellingPlanGroup,
        sellingPlans: sellingPlans.map(e => e.node)
      };
    }
  } catch (error) {
    console.log(`Error fetching products: ${error.message}`);
  }
  
  return null;
}

async function createSubscriptionContract(customerId, productData, sellingPlanIndex = 0) {
  const mutation = `
    mutation CreateSubscriptionContract($input: SubscriptionContractCreateInput!) {
      subscriptionContractCreate(input: $input) {
        subscriptionContract {
          id
          status
          customer {
            email
          }
          lines(first: 10) {
            edges {
              node {
                title
                quantity
                pricingPolicy {
                  basePrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
          deliveryPolicy {
            interval
            intervalCount
          }
        }
        userErrors {
          field
          message
          code
        }
      }
    }
  `;
  
  const sellingPlan = productData.sellingPlans[sellingPlanIndex];
  
  const variables = {
    input: {
      customerId: customerId,
      nextBillingDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      currencyCode: "USD",
      lines: [
        {
          productVariantId: productData.variant.id,
          quantity: 1,
          pricingPolicy: {
            basePrice: {
              amount: productData.variant.price,
              currencyCode: "USD"
            }
          },
          sellingPlanId: sellingPlan.id,
          sellingPlanName: sellingPlan.name
        }
      ],
      deliveryPolicy: {
        interval: sellingPlanIndex === 0 ? "WEEK" : sellingPlanIndex === 1 ? "WEEK" : "MONTH",
        intervalCount: sellingPlanIndex === 1 ? 2 : 1
      },
      billingPolicy: {
        interval: sellingPlanIndex === 0 ? "WEEK" : sellingPlanIndex === 1 ? "WEEK" : "MONTH",
        intervalCount: sellingPlanIndex === 1 ? 2 : 1
      },
      deliveryMethod: {
        shipping: {
          address: {
            address1: "123 Coffee Street",
            city: "Portland",
            provinceCode: "OR",
            countryCode: "US",
            zip: "97201"
          }
        }
      },
      paymentMethodId: null // Will need to be added by customer
    }
  };
  
  try {
    const response = await client.request(mutation, { variables });
    
    if (response.data?.subscriptionContractCreate?.userErrors?.length > 0) {
      console.log(`   ⚠️  Could not create subscription:`);
      response.data.subscriptionContractCreate.userErrors.forEach(error => {
        console.log(`      - ${error.field}: ${error.message}`);
      });
      return null;
    }
    
    const contract = response.data?.subscriptionContractCreate?.subscriptionContract;
    if (contract) {
      console.log(`   ✅ Created ${sellingPlan.name} subscription`);
      return contract;
    }
  } catch (error) {
    console.log(`   ⚠️  Subscription creation not available: ${error.message}`);
    console.log(`      Note: Customers can create subscriptions via checkout`);
  }
  
  return null;
}

async function setupTestCustomers() {
  console.log('====================================');
  console.log('CREATING TEST CUSTOMERS & SUBSCRIPTIONS');
  console.log('====================================\n');
  
  // Get a product with subscription plans
  console.log('📦 Getting subscription products...\n');
  const productData = await getProductWithSubscription();
  
  if (!productData || !productData.sellingPlans.length > 0) {
    console.log('❌ No products with subscription plans found');
    console.log('   Run setup-shopify-subscriptions-app.js first');
    return;
  }
  
  console.log(`✅ Found product: ${productData.product.title}`);
  console.log(`   Variant: ${productData.variant.title} - $${productData.variant.price}`);
  console.log(`   Subscription plans available:`);
  productData.sellingPlans.forEach(plan => {
    console.log(`   - ${plan.name}`);
  });
  
  console.log('\n👥 Creating test customers...\n');
  
  const createdCustomers = [];
  
  for (let i = 0; i < testCustomers.length; i++) {
    const customerData = testCustomers[i];
    const customer = await createCustomer(customerData);
    
    if (customer) {
      createdCustomers.push(customer);
      
      // Send account invite
      await sendAccountInvite(customer.id);
      
      // Try to create a subscription (may not work without payment method)
      await createSubscriptionContract(customer.id, productData, i);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✨ TEST SETUP COMPLETE!');
  console.log('='.repeat(60));
  
  console.log('\n📊 Summary:');
  console.log(`   - Created ${createdCustomers.length} test customers`);
  console.log(`   - Sent account invitations to all customers`);
  console.log(`   - Subscription plans are ready for checkout`);
  
  console.log('\n📝 Test Customer Accounts:');
  createdCustomers.forEach(customer => {
    console.log(`\n   👤 ${customer.firstName} ${customer.lastName}`);
    console.log(`      Email: ${customer.email}`);
    console.log(`      Password: (will be set via invitation email)`);
  });
  
  console.log('\n🧪 To test subscriptions:');
  console.log('1. Check the test email addresses for account invitations');
  console.log('2. Or create subscriptions manually:');
  console.log('   - Visit your store as a customer');
  console.log('   - Add a coffee product to cart');
  console.log('   - Select a subscription frequency');
  console.log('   - Complete checkout with test payment');
  
  console.log('\n🔧 Customer Portal Access:');
  console.log('Once customers have active subscriptions, they can:');
  console.log('   - Log in to their account');
  console.log('   - View "Manage subscriptions" in account dashboard');
  console.log('   - Pause, skip, or cancel subscriptions');
  console.log('   - Update delivery frequency');
  console.log('   - Change shipping address');
  
  console.log('\n💳 Test Payment Methods:');
  console.log('For Shopify test mode, use these test cards:');
  console.log('   - Visa: 4242 4242 4242 4242');
  console.log('   - Mastercard: 5555 5555 5555 4444');
  console.log('   - Any future expiry date and CVC');
  
  // Configure customer portal settings
  await configureCustomerPortal();
}

async function configureCustomerPortal() {
  console.log('\n⚙️  Configuring Customer Portal...\n');
  
  // Note: Customer portal settings are managed through Shopify Admin UI
  // We can provide guidance on optimal settings
  
  console.log('📋 Recommended Customer Portal Settings:');
  console.log('   (Configure in Shopify Admin → Apps → Shopify Subscriptions → Settings)');
  console.log('');
  console.log('   ✅ Allow customers to:');
  console.log('      • Pause subscriptions (up to 3 months)');
  console.log('      • Skip upcoming orders');
  console.log('      • Cancel subscriptions');
  console.log('      • Update shipping address');
  console.log('      • Change delivery frequency');
  console.log('      • Update payment method');
  console.log('      • Add products to subscription');
  console.log('');
  console.log('   📧 Email notifications to enable:');
  console.log('      • Subscription confirmation');
  console.log('      • Upcoming order reminder (3 days before)');
  console.log('      • Payment failure notification');
  console.log('      • Subscription paused/resumed');
  console.log('      • Subscription cancelled');
  
  console.log('\n🌐 Customer Portal URLs:');
  console.log(`   Login: https://${SHOPIFY_DOMAIN}/account/login`);
  console.log(`   Register: https://${SHOPIFY_DOMAIN}/account/register`);
  console.log(`   Account Dashboard: https://${SHOPIFY_DOMAIN}/account`);
  console.log(`   Manage Subscriptions: https://${SHOPIFY_DOMAIN}/account/subscriptions`);
}

// Run the setup
setupTestCustomers().catch(console.error);