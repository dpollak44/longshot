# Contentful CMS Setup Guide

This guide will help you set up Contentful as your content management system for the Longshot Coffee website.

## Step 1: Create a Contentful Account

1. Go to [Contentful.com](https://www.contentful.com)
2. Sign up for a free account (or paid plan if needed)
3. Create a new Space for your website

## Step 2: Get Your API Keys

1. In your Contentful Space, go to **Settings → API keys**
2. Create a new API key
3. Copy the following values:
   - **Space ID**
   - **Content Delivery API - access token**
   - **Content Preview API - access token**

## Step 3: Configure Environment Variables

1. Copy the `.env.local.example` file to `.env.local`
2. Replace the placeholder values with your actual Contentful credentials:
   ```
   CONTENTFUL_SPACE_ID=your_actual_space_id
   CONTENTFUL_ACCESS_TOKEN=your_actual_access_token
   CONTENTFUL_PREVIEW_TOKEN=your_actual_preview_token
   ```

## Step 4: Create Content Models in Contentful

Go to **Content model** in your Contentful space and create the following content types:

### 1. Product
**API Identifier:** `product`

Fields:
- **Name** (Short text, Required)
- **Slug** (Short text, Required, Unique)
- **Price** (Number, Required)
- **Origin** (Short text, Required)
- **Roast Level** (Short text, Dropdown: light, medium, dark)
- **Tasting Notes** (Short text, List)
- **Description** (Long text)
- **Image** (Media, Single image)
- **Featured** (Boolean)
- **Category** (Short text, List: single-origin, blends, decaf)
- **In Stock** (Boolean, Default: true)

### 2. Hero Slide
**API Identifier:** `heroSlide`

Fields:
- **Title** (Short text, Required)
- **Subtitle** (Short text, Required)
- **CTA Text** (Short text, Required)
- **CTA Link** (Short text, Required)
- **Background Image** (Media, Single image)
- **Background Color** (Short text, Default: #f5f5f5)
- **Order** (Number, Required)

### 3. Gallery Item
**API Identifier:** `galleryItem`

Fields:
- **Title** (Short text)
- **Description** (Short text)
- **Image** (Media, Single image)
- **Type** (Short text, Dropdown: image, quote, feature)
- **Category** (Short text)
- **Quote** (Long text, for quote type)
- **Author** (Short text, for quote type)
- **Background Color** (Short text)
- **Featured** (Boolean)

### 4. Page
**API Identifier:** `page`

Fields:
- **Title** (Short text, Required)
- **Slug** (Short text, Required, Unique)
- **Content** (Rich text, Required)
- **Meta Title** (Short text)
- **Meta Description** (Long text)

### 5. Announcement Bar
**API Identifier:** `announcementBar`

Fields:
- **Text** (Short text, Required)
- **Link** (Short text)
- **Link Text** (Short text)
- **Active** (Boolean, Required)
- **Background Color** (Short text, Default: #000000)
- **Text Color** (Short text, Default: #ffffff)

### 6. Site Settings
**API Identifier:** `siteSettings`

Fields:
- **Site Name** (Short text, Required)
- **Tagline** (Short text)
- **Free Shipping Threshold** (Number, Default: 40)
- **Subscription Discount** (Number, Default: 15)
- **Facebook URL** (Short text)
- **Instagram URL** (Short text)
- **Twitter URL** (Short text)
- **Contact Email** (Short text)
- **Contact Phone** (Short text)
- **Contact Address** (Long text)

## Step 5: Add Sample Content

After creating the content models, add some sample content:

1. **Products**: Add at least 4-8 coffee products
2. **Hero Slides**: Add 2-3 hero slides for the homepage carousel
3. **Gallery Items**: Add 10-12 gallery items (mix of images, quotes, and features)
4. **Announcement Bar**: Create one active announcement
5. **Site Settings**: Create one site settings entry

## Step 6: How to Manage Content

### Adding/Editing Products
1. Go to **Content** in Contentful
2. Click **Add entry** → **Product**
3. Fill in all required fields
4. Upload a product image
5. Click **Publish**

### Updating Hero Slides
1. Go to **Content** → Filter by **Hero Slide**
2. Edit existing slides or add new ones
3. Use the **Order** field to control the sequence
4. Remember to publish changes

### Managing the Announcement Bar
1. Only one announcement bar can be active at a time
2. Set **Active** to true for the current announcement
3. Set **Active** to false for all others

### Creating Landing Pages
1. Use the **Page** content type for custom pages
2. The slug will be the URL path (e.g., slug: "about-us" → /about-us)
3. Use the rich text editor for formatting

## Step 7: Preview Mode

To preview unpublished content:
1. Add `?preview=true` to any page URL
2. This will show draft content from Contentful

## Best Practices

1. **Images**: 
   - Upload high-quality images (at least 1200px wide)
   - Contentful will automatically optimize them
   - Use descriptive file names

2. **Slugs**: 
   - Use lowercase letters
   - Replace spaces with hyphens
   - Keep them short and descriptive

3. **Content Updates**:
   - Changes are live immediately after publishing
   - Use scheduled publishing for time-sensitive content
   - Keep a backup of important content

4. **SEO**:
   - Fill in meta titles and descriptions for pages
   - Use descriptive product names and descriptions
   - Keep URLs (slugs) consistent

## Support

For Contentful documentation: https://www.contentful.com/help/
For technical issues with the website integration, contact your developer.