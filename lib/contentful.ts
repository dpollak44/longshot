import { createClient, Entry } from 'contentful';

// Type definitions for your content models
export interface IProduct {
  name: string;
  slug: string;
  price: number;
  origin: string;
  roastLevel: 'light' | 'medium' | 'dark';
  notes: string[];
  description?: string;
  image: {
    fields: {
      file: {
        url: string;
      };
      title: string;
    };
  };
  featured?: boolean;
  category: string[];
  inStock?: boolean;
}

export interface IHeroSlide {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  backgroundColor?: string;
  order: number;
}

export interface IGalleryItem {
  title?: string;
  description?: string;
  image?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  type: 'image' | 'quote' | 'feature';
  category?: string;
  quote?: string;
  author?: string;
  backgroundColor?: string;
  featured?: boolean;
}

export interface IPage {
  title: string;
  slug: string;
  content: any; // Rich text field
  metaDescription?: string;
  metaTitle?: string;
}

export interface IAnnouncementBar {
  text: string;
  link?: string;
  linkText?: string;
  active: boolean;
  backgroundColor?: string;
  textColor?: string;
}

export interface ISiteSettings {
  siteName: string;
  tagline?: string;
  freeShippingThreshold?: number;
  subscriptionDiscount?: number;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
}

// Create Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

// Preview client for draft content
const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
  host: 'preview.contentful.com',
});

// Helper to get the right client
export function getClient(preview = false) {
  return preview ? previewClient : client;
}

// Fetch all products
export async function getAllProducts(preview = false): Promise<Entry<IProduct>[]> {
  const client = getClient(preview);
  const response = await client.getEntries<IProduct>({
    content_type: 'product',
    order: '-fields.featured,-sys.createdAt',
  });
  return response.items;
}

// Fetch featured products
export async function getFeaturedProducts(preview = false): Promise<Entry<IProduct>[]> {
  const client = getClient(preview);
  const response = await client.getEntries<IProduct>({
    content_type: 'product',
    'fields.featured': true,
    limit: 4,
  });
  return response.items;
}

// Fetch single product by slug
export async function getProductBySlug(slug: string, preview = false): Promise<Entry<IProduct> | null> {
  const client = getClient(preview);
  const response = await client.getEntries<IProduct>({
    content_type: 'product',
    'fields.slug': slug,
    limit: 1,
  });
  return response.items[0] || null;
}

// Fetch products by category
export async function getProductsByCategory(category: string, preview = false): Promise<Entry<IProduct>[]> {
  const client = getClient(preview);
  const response = await client.getEntries<IProduct>({
    content_type: 'product',
    'fields.category[in]': category,
  });
  return response.items;
}

// Fetch hero slides
export async function getHeroSlides(preview = false): Promise<Entry<IHeroSlide>[]> {
  const client = getClient(preview);
  const response = await client.getEntries<IHeroSlide>({
    content_type: 'heroSlide',
    order: 'fields.order',
  });
  return response.items;
}

// Fetch gallery items
export async function getGalleryItems(preview = false): Promise<Entry<IGalleryItem>[]> {
  const client = getClient(preview);
  const response = await client.getEntries<IGalleryItem>({
    content_type: 'galleryItem',
    order: '-fields.featured,-sys.createdAt',
  });
  return response.items;
}

// Fetch page by slug
export async function getPageBySlug(slug: string, preview = false): Promise<Entry<IPage> | null> {
  const client = getClient(preview);
  const response = await client.getEntries<IPage>({
    content_type: 'page',
    'fields.slug': slug,
    limit: 1,
  });
  return response.items[0] || null;
}

// Fetch announcement bar
export async function getAnnouncementBar(preview = false): Promise<Entry<IAnnouncementBar> | null> {
  const client = getClient(preview);
  const response = await client.getEntries<IAnnouncementBar>({
    content_type: 'announcementBar',
    'fields.active': true,
    limit: 1,
  });
  return response.items[0] || null;
}

// Fetch site settings
export async function getSiteSettings(preview = false): Promise<Entry<ISiteSettings> | null> {
  const client = getClient(preview);
  const response = await client.getEntries<ISiteSettings>({
    content_type: 'siteSettings',
    limit: 1,
  });
  return response.items[0] || null;
}

// Helper to format Contentful image URL with optimization
export function getOptimizedImageUrl(url: string, options?: { width?: number; height?: number; quality?: number }) {
  if (!url) return '';
  
  // Ensure URL starts with https://
  const imageUrl = url.startsWith('//') ? `https:${url}` : url;
  
  // Add query parameters for image optimization
  const params = new URLSearchParams();
  if (options?.width) params.append('w', options.width.toString());
  if (options?.height) params.append('h', options.height.toString());
  if (options?.quality) params.append('q', options.quality.toString());
  
  return params.toString() ? `${imageUrl}?${params.toString()}` : imageUrl;
}