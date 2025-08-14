import { createStorefrontApiClient } from '@shopify/storefront-api-client';

// Initialize Shopify Storefront API client
const client = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
  apiVersion: '2024-10',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
});

// Product Types
export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
      };
    }>;
  };
  collections: {
    edges: Array<{
      node: {
        handle: string;
        title: string;
      };
    }>;
  };
  tags: string[];
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image?: {
    url: string;
    altText: string | null;
  };
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
}

// Fetch products with options
export async function getProducts(options: { first?: number } = {}) {
  const { first = 20 } = options;
  return getAllProducts(first);
}

// Fetch all products
export async function getAllProducts(first = 20) {
  const query = `
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            handle
            title
            description
            tags
            featuredImage {
              url
              altText
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 2) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  availableForSale
                }
              }
            }
            collections(first: 5) {
              edges {
                node {
                  handle
                  title
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await client.request(query, {
    variables: { first },
  });

  return response.data?.products?.edges?.map((edge: any) => edge.node) || [];
}

// Fetch featured products (by collection or tag)
export async function getFeaturedProducts() {
  const query = `
    query GetFeaturedProducts {
      collection(handle: "featured") {
        products(first: 4) {
          edges {
            node {
              id
              handle
              title
              description
              tags
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 1) {
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
    }
  `;

  const response = await client.request(query);
  return response.data?.collection?.products?.edges?.map((edge: any) => edge.node) || [];
}


// Fetch collection by handle
export async function getCollectionByHandle(handle: string, productsFirst = 20) {
  const query = `
    query GetCollection($handle: String!, $productsFirst: Int!) {
      collection(handle: $handle) {
        id
        handle
        title
        description
        image {
          url
          altText
        }
        products(first: $productsFirst) {
          edges {
            node {
              id
              handle
              title
              description
              tags
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    availableForSale
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await client.request(query, {
    variables: { handle, productsFirst },
  });

  return response.data?.collection;
}

// Get collections with alias
export async function getCollections() {
  return getAllCollections();
}

// Get all collections
export async function getAllCollections() {
  const query = `
    query GetCollections {
      collections(first: 20) {
        edges {
          node {
            id
            handle
            title
            description
            image {
              url
              altText
            }
          }
        }
      }
    }
  `;

  const response = await client.request(query);
  return response.data?.collections?.edges?.map((edge: any) => edge.node) || [];
}

// Create checkout
export async function createCheckout(lineItems: Array<{ variantId: string; quantity: number }>) {
  const query = `
    mutation CreateCheckout($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
          lineItems(first: 20) {
            edges {
              node {
                title
                quantity
                variant {
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
          totalPriceV2 {
            amount
            currencyCode
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const response = await client.request(query, {
    variables: {
      input: {
        lineItems,
      },
    },
  });

  return response.data?.checkoutCreate;
}

// Add items to checkout
export async function addToCart(checkoutId: string, lineItems: Array<{ variantId: string; quantity: number }>) {
  const query = `
    mutation AddToCart($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
      checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
        checkout {
          id
          webUrl
          lineItems(first: 20) {
            edges {
              node {
                title
                quantity
                variant {
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
          totalPriceV2 {
            amount
            currencyCode
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const response = await client.request(query, {
    variables: {
      checkoutId,
      lineItems,
    },
  });

  return response.data?.checkoutLineItemsAdd;
}

// Apply discount code
export async function applyDiscountCode(checkoutId: string, discountCode: string) {
  const query = `
    mutation ApplyDiscountCode($checkoutId: ID!, $discountCode: String!) {
      checkoutDiscountCodeApplyV2(checkoutId: $checkoutId, discountCode: $discountCode) {
        checkout {
          id
          webUrl
          discountApplications(first: 1) {
            edges {
              node {
                ... on DiscountCodeApplication {
                  code
                  applicable
                }
              }
            }
          }
          totalPriceV2 {
            amount
            currencyCode
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const response = await client.request(query, {
    variables: {
      checkoutId,
      discountCode,
    },
  });

  return response.data?.checkoutDiscountCodeApplyV2;
}

// Get product by handle
export async function getProductByHandle(handle: string) {
  const query = `
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        id
        handle
        title
        description
        vendor
        tags
        featuredImage {
          url
          altText
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              availableForSale
            }
          }
        }
      }
    }
  `;
  
  // Always use direct fetch for server components
  try {
    const directResponse = await fetch(`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      },
      body: JSON.stringify({
        query,
        variables: { handle },
      }),
    });
    const data = await directResponse.json();
    return data?.data?.product || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Get selling plan groups
export async function getSellingPlanGroups() {
  const query = `
    query {
      sellingPlanGroups(first: 10) {
        edges {
          node {
            id
            name
            options {
              name
              values
            }
            sellingPlans(first: 10) {
              edges {
                node {
                  id
                  name
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
            products(first: 100) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    }
  `;
  
  try {
    // Use direct fetch for server components
    const directResponse = await fetch(`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      },
      body: JSON.stringify({ query }),
    });
    const data = await directResponse.json();
    return data.data?.sellingPlanGroups?.edges?.map((e: any) => e.node) || [];
  } catch (error) {
    console.error('Error fetching selling plan groups:', error);
    return [];
  }
}

// Helper function to format Shopify money
export function formatMoney(amount: string, currencyCode: string = 'USD') {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  });
  return formatter.format(parseFloat(amount));
}