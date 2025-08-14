# Shopify + Contentful Hybrid Setup

This website uses a powerful combination:
- **Shopify**: Handles all e-commerce (products, collections, cart, checkout, payments, inventory, discounts)
- **Contentful**: Manages editorial content (hero banners, pages, blog, galleries, testimonials)

## Architecture Overview

```
┌─────────────────────────────────────────┐
│            Your Website                  │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────┐  ┌─────────────────┐ │
│  │   SHOPIFY    │  │   CONTENTFUL    │ │
│  ├──────────────┤  ├─────────────────┤ │
│  │ • Products   │  │ • Hero Slides   │ │
│  │ • Collections│  │ • Gallery       │ │
│  │ • Cart       │  │ • Blog Posts    │ │
│  │ • Checkout   │  │ • About Pages   │ │
│  │ • Payments   │  │ • Testimonials  │ │
│  │ • Inventory  │  │ • FAQs          │ │
│  │ • Discounts  │  │ • Site Content  │ │
│  │ • Orders     │  │ • Announcements │ │
│  │ • Customers  │  │                 │ │
│  └──────────────┘  └─────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

## What Goes Where?

### Shopify Handles ✅
- **Products**: All coffee products, variants, pricing
- **Collections**: Categories like "Single Origin", "Blends", "Equipment"
- **Inventory**: Stock levels, availability
- **Cart & Checkout**: Shopping cart, payment processing
- **Discounts**: Coupon codes, sales, promotions
- **Subscriptions**: Recurring orders (with Shopify Subscriptions app)
- **Customer Accounts**: Login, order history, addresses
- **Shipping**: Rates, zones, fulfillment
- **Analytics**: Sales data, conversion tracking
- **Email**: Order confirmations, shipping notifications

### Contentful Handles ✅
- **Hero Banners**: Homepage carousel slides
- **Gallery**: Coffee culture images, quotes
- **Blog**: Coffee education, brewing guides, stories
- **Pages**: About Us, Our Story, Contact, Terms
- **Testimonials**: Customer reviews (display only)
- **FAQs**: Help content, shipping info
- **Site Settings**: Social links, contact info
- **Announcements**: Top bar messages

## Setup Instructions

### Step 1: Shopify Setup

1. **Create Shopify Store**
   - Go to [shopify.com](https://www.shopify.com)
   - Start free trial or use existing store

2. **Create Private App for Storefront API**
   - Settings → Apps → Develop apps
   - Create app → Name it "Longshot Coffee Storefront"
   - Configure Storefront API scopes:
     - Read products
     - Read collections
     - Read inventory
     - Manage checkouts
     - Read customer accounts

3. **Get API Credentials**
   - Copy your Storefront API access token
   - Note your store domain (yourstore.myshopify.com)

4. **Set Up Collections**
   - Products → Collections → Create collection
   - Create these collections:
     - "Featured" (for homepage)
     - "Single Origin"
     - "Blends"
     - "Decaf"
     - "Equipment"
     - "Merchandise"

5. **Add Products**
   - Products → Add product
   - Include:
     - Title, description, images
     - Price and compare at price
     - Inventory tracking
     - SEO settings
     - Tags (use for filtering)

### Step 2: Contentful Setup (Editorial Only)

1. **Content Models to Create**:

   **Hero Slide**
   - title (Text)
   - subtitle (Text)
   - ctaText (Text)
   - ctaLink (Text)
   - shopifyHandle (Text) - Optional: Link to Shopify collection/product
   - backgroundImage (Media)
   - order (Number)

   **Gallery Item**
   - title (Text)
   - description (Text)
   - image (Media)
   - type (Dropdown: image, quote, video)
   - link (Text) - Can link to Shopify products

   **Blog Post**
   - title (Text)
   - slug (Text)
   - excerpt (Text)
   - content (Rich Text)
   - author (Text)
   - publishDate (Date)
   - featuredImage (Media)
   - relatedProducts (List) - Shopify product handles

   **Page**
   - title (Text)
   - slug (Text)
   - content (Rich Text)
   - metaTitle (Text)
   - metaDescription (Text)

   **Testimonial**
   - name (Text)
   - content (Long Text)
   - rating (Number)
   - productHandle (Text) - Link to Shopify product
   - featured (Boolean)

   **Site Settings**
   - siteName (Text)
   - tagline (Text)
   - socialLinks (JSON)
   - contactInfo (JSON)
   - footerContent (Rich Text)

### Step 3: Environment Variables

Add to `.env.local`:

```bash
# Shopify
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=yourstore.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token_here

# Contentful
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_PREVIEW_TOKEN=your_preview_token
CONTENTFUL_ENVIRONMENT=master
```

## How They Work Together

### Example: Homepage

```typescript
// Fetch editorial content from Contentful
const heroSlides = await getHeroSlides();
const gallery = await getGalleryItems();
const testimonials = await getTestimonials();

// Fetch products from Shopify
const featuredProducts = await getFeaturedProducts();

// Combine for display
return (
  <>
    <HeroCarousel slides={heroSlides} />
    <FeaturedProducts products={featuredProducts} />
    <Gallery items={gallery} />
    <Testimonials items={testimonials} />
  </>
);
```

### Example: Product Page

```typescript
// Get product from Shopify (price, inventory, variants)
const product = await getProductByHandle(handle);

// Get related content from Contentful
const relatedBlogPosts = await getRelatedBlogPosts(handle);
const productTestimonials = await getProductTestimonials(handle);

// Combine for rich product page
return (
  <>
    <ProductDetails product={product} />
    <RelatedBlogPosts posts={relatedBlogPosts} />
    <ProductReviews testimonials={productTestimonials} />
  </>
);
```

## Content Management Workflow

### For Products/Commerce:
1. Log into Shopify Admin
2. Manage products, inventory, prices
3. Process orders, handle refunds
4. Create discount codes
5. View analytics

### For Editorial Content:
1. Log into Contentful
2. Update hero banners
3. Write blog posts
4. Edit about pages
5. Add testimonials
6. Update announcements

## Benefits of This Approach

✅ **Best of Both Worlds**
- Shopify's robust e-commerce features
- Contentful's flexible content management

✅ **Single Source of Truth**
- Products/pricing always from Shopify
- Editorial content always from Contentful

✅ **Scalability**
- Can handle high traffic
- CDN for both platforms

✅ **SEO Optimized**
- Server-side rendering with Next.js
- Dynamic meta tags from both sources

✅ **Developer Friendly**
- TypeScript support
- Clear separation of concerns
- Easy to maintain

## Common Tasks

### Adding a New Product
1. Add in Shopify with all variants
2. Add to "Featured" collection if needed
3. Create related blog post in Contentful (optional)
4. Add testimonials in Contentful (optional)

### Creating a Sale/Promotion
1. Create discount code in Shopify
2. Update announcement bar in Contentful
3. Create hero slide in Contentful linking to sale collection

### Launching New Collection
1. Create collection in Shopify
2. Add products to collection
3. Create hero slide in Contentful
4. Write blog post about the collection

## Troubleshooting

### Products Not Showing
- Check Shopify product status (Active)
- Verify product is in stock
- Check API permissions
- Clear Next.js cache

### Content Not Updating
- Ensure content is published in Contentful
- Check environment variables
- Restart dev server after .env changes

### Checkout Issues
- Verify Shopify Storefront API token
- Check checkout permissions
- Test in Shopify's checkout

## Support Resources

- [Shopify Storefront API Docs](https://shopify.dev/docs/api/storefront)
- [Contentful Documentation](https://www.contentful.com/developers/docs/)
- [Next.js Documentation](https://nextjs.org/docs)