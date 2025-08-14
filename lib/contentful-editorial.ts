import { createClient, Entry } from 'contentful';

// CONTENTFUL HANDLES ONLY EDITORIAL CONTENT
// Products, Collections, Checkout, Coupons = Shopify
// Hero Slides, Gallery, Pages, Blog, About Content = Contentful

// Type definitions for editorial content only
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
  // Can link to Shopify collection or product
  shopifyHandle?: string;
  linkType?: 'collection' | 'product' | 'page' | 'external';
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
  type: 'image' | 'quote' | 'video';
  category?: string;
  quote?: string;
  author?: string;
  backgroundColor?: string;
  featured?: boolean;
  link?: string;
}

export interface IPage {
  title: string;
  slug: string;
  content: any; // Rich text field
  metaDescription?: string;
  metaTitle?: string;
  heroImage?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
}

export interface IBlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: any; // Rich text
  author: string;
  publishDate: string;
  featuredImage?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  tags: string[];
  relatedProducts?: string[]; // Shopify product handles
}

export interface ITestimonial {
  name: string;
  content: string;
  rating?: number;
  location?: string;
  productHandle?: string; // Link to Shopify product
  featured?: boolean;
}

export interface IAnnouncementBar {
  text: string;
  link?: string;
  linkText?: string;
  active: boolean;
  backgroundColor?: string;
  textColor?: string;
  dismissible?: boolean;
}

export interface ISiteSettings {
  siteName: string;
  tagline?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  aboutTitle?: string;
  aboutContent?: any; // Rich text
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    tiktok?: string;
    youtube?: string;
  };
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
    hours?: string;
  };
  footerContent?: any; // Rich text
}

export interface IFaq {
  question: string;
  answer: any; // Rich text
  category: string;
  order: number;
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

// Fetch blog posts
export async function getBlogPosts(limit = 10, preview = false): Promise<Entry<IBlogPost>[]> {
  const client = getClient(preview);
  const response = await client.getEntries<IBlogPost>({
    content_type: 'blogPost',
    order: '-fields.publishDate',
    limit,
  });
  return response.items;
}

// Fetch single blog post
export async function getBlogPostBySlug(slug: string, preview = false): Promise<Entry<IBlogPost> | null> {
  const client = getClient(preview);
  const response = await client.getEntries<IBlogPost>({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  });
  return response.items[0] || null;
}

// Fetch testimonials
export async function getTestimonials(preview = false): Promise<Entry<ITestimonial>[]> {
  const client = getClient(preview);
  const response = await client.getEntries<ITestimonial>({
    content_type: 'testimonial',
    order: '-fields.featured,-sys.createdAt',
  });
  return response.items;
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

// Fetch FAQs
export async function getFaqs(category?: string, preview = false): Promise<Entry<IFaq>[]> {
  const client = getClient(preview);
  const query: any = {
    content_type: 'faq',
    order: 'fields.order',
  };
  
  if (category) {
    query['fields.category'] = category;
  }
  
  const response = await client.getEntries<IFaq>(query);
  return response.items;
}

// Helper to format Contentful image URL with optimization
export function getOptimizedImageUrl(url: string, options?: { width?: number; height?: number; quality?: number; format?: string }) {
  if (!url) return '';
  
  // Ensure URL starts with https://
  const imageUrl = url.startsWith('//') ? `https:${url}` : url;
  
  // Add query parameters for image optimization
  const params = new URLSearchParams();
  if (options?.width) params.append('w', options.width.toString());
  if (options?.height) params.append('h', options.height.toString());
  if (options?.quality) params.append('q', options.quality.toString());
  if (options?.format) params.append('fm', options.format);
  params.append('fit', 'fill'); // Ensure images fill their container
  
  return params.toString() ? `${imageUrl}?${params.toString()}` : imageUrl;
}