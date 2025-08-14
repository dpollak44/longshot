# Quick Contentful Test Setup (5 minutes)

Follow these steps to test Contentful locally with free account:

## Step 1: Create Free Contentful Account (2 min)

1. Go to https://www.contentful.com/sign-up/
2. Click "Sign up for free"
3. Use your email or sign in with Google/GitHub
4. You'll get a free Community plan (perfect for testing)

## Step 2: Create Your First Space (1 min)

1. After signup, click "Create space"
2. Choose "Create an empty space"
3. Name it "Longshot Coffee Test"
4. Select "Free" plan
5. Click "Create space"

## Step 3: Get Your API Keys (1 min)

1. In your new space, go to **Settings** (gear icon) → **API keys**
2. Click "Add API key"
3. Name it "Development"
4. You'll see:
   - **Space ID**: (looks like: abc123xyz)
   - **Content Delivery API - access token**: (long string)
   - **Content Preview API - access token**: (long string)

## Step 4: Add to Your Local Environment (1 min)

1. Open `.env.local` in your project
2. Replace the placeholder values:

```bash
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_delivery_token_here
CONTENTFUL_PREVIEW_TOKEN=your_preview_token_here
CONTENTFUL_ENVIRONMENT=master
```

## Step 5: Create Quick Test Content

### Option A: Manual (5 min)

1. In Contentful, go to **Content model**
2. Click "Add content type"
3. Create a simple "Product" type:
   - Name: `Product`
   - API ID: `product`
4. Add fields:
   - Click "Add field" → Text → Short text
   - Name: `Name`, Field ID: `name`
   - Click "Add field" → Text → Short text  
   - Name: `Slug`, Field ID: `slug`
   - Click "Add field" → Number → Decimal
   - Name: `Price`, Field ID: `price`
   - Click "Add field" → Text → Short text
   - Name: `Origin`, Field ID: `origin`
   - Click "Add field" → Text → Short text (dropdown)
   - Name: `Roast Level`, Field ID: `roastLevel`
   - Add values: light, medium, dark
   - Click "Add field" → Text → Short text (list)
   - Name: `Notes`, Field ID: `notes`
5. Save the content type

### Option B: Import Sample Content (Faster)

I've created a script to help you set up test data quickly:

## Step 6: Test Your Setup

1. Restart your dev server:
```bash
# Kill current server (Ctrl+C)
# Start again
PORT=3002 npm run dev
```

2. Test the connection by creating a test page:
```bash
# Create test page to verify Contentful works
```

3. Navigate to: http://localhost:3002/test-contentful

## Quick Test Page

Create this file to test your connection: