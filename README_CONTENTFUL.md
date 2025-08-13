# Longshot Coffee - Contentful Integration

This website is integrated with Contentful CMS, allowing you to manage all content without touching code.

## 🚀 Quick Start

### For Content Editors

1. **Log into Contentful**: Go to [app.contentful.com](https://app.contentful.com)
2. **Select your space**: Choose the Longshot Coffee space
3. **Edit content**: Click on "Content" to view and edit all website content
4. **Publish changes**: Click "Publish" to make changes live on the website

### What You Can Edit

- **Products**: All coffee products, prices, descriptions, and images
- **Hero Banners**: Homepage carousel slides
- **Gallery**: Coffee culture images and quotes
- **Pages**: About, wholesale, and other static pages
- **Announcement Bar**: Top banner messages
- **Site Settings**: Global settings like shipping threshold

## 🔧 For Developers

### Initial Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Contentful**:
   - Copy `.env.local.example` to `.env.local`
   - Add your Contentful credentials

3. **Run development server**:
   ```bash
   npm run dev
   ```

### How It Works

The website uses two approaches for Contentful integration:

#### Option 1: Full Contentful Mode (Recommended for Production)
- Rename `app/page-contentful.tsx` to `app/page.tsx`
- All content comes from Contentful
- Requires Contentful space to be set up with content

#### Option 2: Hybrid Mode (Current Setup)
- Static content with option to switch to Contentful
- Good for development and testing
- Can gradually migrate to full Contentful

### File Structure

```
/lib
  /contentful.ts         # Contentful client and API functions
/components
  /HeroSlideshowContentful.tsx  # Contentful-ready hero component
  /GallerySectionContentful.tsx # Contentful-ready gallery
/app
  /page.tsx             # Current static homepage
  /page-contentful.tsx  # Contentful-powered homepage
```

### Content Types

All content types are defined in `/lib/contentful.ts`:

- **Product**: Coffee products with all details
- **HeroSlide**: Homepage carousel slides
- **GalleryItem**: Gallery images, quotes, and features
- **Page**: Static pages with rich text content
- **AnnouncementBar**: Top banner messages
- **SiteSettings**: Global configuration

### API Functions

```typescript
// Fetch all products
const products = await getAllProducts();

// Fetch featured products
const featured = await getFeaturedProducts();

// Fetch single product
const product = await getProductBySlug('ethiopia-yirgacheffe');

// Fetch hero slides
const slides = await getHeroSlides();
```

### Image Optimization

Contentful images are automatically optimized:

```typescript
const optimizedUrl = getOptimizedImageUrl(url, {
  width: 800,
  height: 600,
  quality: 85
});
```

## 📝 Content Guidelines

### Product Images
- Minimum 1200px wide
- Square aspect ratio preferred
- JPEG format for photos
- PNG for graphics with transparency

### Hero Slides
- 1920px wide minimum
- 16:9 aspect ratio
- Keep text overlay areas in mind

### Rich Text Content
- Use heading levels consistently
- Add alt text to all images
- Keep paragraphs concise
- Use lists for better readability

## 🔄 Deployment

### Vercel Deployment

1. **Add environment variables in Vercel**:
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.local`

2. **Deploy**:
   ```bash
   git push origin main
   ```

3. **Webhook for Auto-Deploy** (Optional):
   - In Contentful: Settings → Webhooks
   - Add Vercel deploy hook URL
   - Trigger deploys on content publish

### Preview Mode

To preview unpublished content:
- Add `?preview=true` to any URL
- Shows draft content from Contentful
- Useful for reviewing before publishing

## 🆘 Troubleshooting

### Content Not Showing
- Check environment variables are set
- Verify content is published in Contentful
- Check browser console for errors

### Images Not Loading
- Ensure images are published in Contentful
- Check image URLs are properly formatted
- Verify Next.js image domains config

### Build Errors
- Run `npm run build` locally to test
- Check TypeScript errors
- Verify all required environment variables

## 📚 Resources

- [Contentful Documentation](https://www.contentful.com/developers/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Deployment Guide](./CONTENTFUL_SETUP.md)

## 🤝 Support

For technical issues, contact your developer.
For content questions, refer to the Contentful help center.