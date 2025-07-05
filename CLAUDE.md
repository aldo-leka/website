# CLAUDE.md - Personal Portfolio/Blog Site

## Project Overview
Build a minimalist personal portfolio and blog site inspired by https://templargin.com/. The site should follow KISS principles with a focus on content over flashy design.

## Core Requirements

### Design Philosophy
- **Ultra-minimalist**: Black text on white background, minimal colors
- **Typography-focused**: Let the content breathe with generous whitespace
- **No unnecessary animations or effects**
- **Fast loading, no bloat**
- **Mobile-first responsive design**

### Site Structure
```
/                   - Home page with brief intro
/projects           - Showcase of 2 main projects
/blog               - Blog listing page
/blog/[slug]        - Individual blog posts
/about              - Extended bio and contact
```

### Navigation
- Simple sidebar navigation (like templargin.com)
- Categories:
    - Home
    - Projects
    - Programming (blog category)
    - Investing (blog category)
    - About

### Content Sections

#### Home Page
- Brief welcome message (2-3 sentences)
- Recent blog posts (last 3-5)
- No hero section, just text

#### Projects Page
Display two projects with:
1. **SuperInvestor (www.getsuperinvestor.com)**
    - Built with Blazor Server .NET
    - SEC filing note-taking app
    - Shareable links feature
    - Technical implementation details
    - GitHub link

2. **StockPortfolio (www.stockportfolio.me)**
    - Built with Next.js
    - Portfolio sharing with donut charts
    - Technical implementation details
    - GitHub link

#### Blog
- MDX-based blog posts
- Two main categories: Programming and Investing
- Simple list view with title, date, and excerpt
- Posts stored as .mdx files in the repo

#### About Page
- Professional bio
- Current focus/activities
- Interests: programming and investing
- Social links (GitHub, LinkedIn, Twitter/X)

## Technical Stack

### Core Technologies
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS (minimal custom styles)
- **Content**: MDX for blog posts
- **Deployment**: Vercel
- **Font**: System font stack or Inter

### Key Features
- Static site generation for all pages
- MDX files in `/app/blog/posts/` directory
- No CMS - just Git-based content management
- RSS feed for blog
- Sitemap generation
- SEO meta tags

### File Structure
```
app/
├── layout.tsx          # Root layout with sidebar
├── page.tsx            # Home page
├── projects/
│   └── page.tsx        # Projects showcase
├── blog/
│   ├── page.tsx        # Blog listing
│   ├── [slug]/
│   │   └── page.tsx    # Blog post template
│   └── posts/          # MDX files go here
│       ├── first-post.mdx
│       └── ...
├── about/
│   └── page.tsx        # About page
└── globals.css         # Minimal global styles

components/
├── Sidebar.tsx         # Navigation sidebar
├── BlogPost.tsx        # Blog post component
├── ProjectCard.tsx     # Project display component
└── MDXComponents.tsx   # Custom MDX components

lib/
├── mdx.ts              # MDX processing utilities
└── posts.ts            # Blog post utilities
```

## Styling Guidelines
- Max width: 650px for content
- Font size: 16px base
- Line height: 1.6-1.8
- Generous margins between sections
- No drop shadows, gradients, or rounded corners
- Links: Simple underline or color change on hover
- Code blocks: Simple gray background

## MDX Setup
- Support for code syntax highlighting
- Custom components for:
    - Code blocks with language labels
    - Notes/callouts
    - Images with captions
- Frontmatter for metadata (title, date, category, excerpt)

## Performance Requirements
- Lighthouse score: 95+ on all metrics
- No JavaScript for navigation (use Next.js Link)
- Minimal client-side JavaScript
- Optimize images with next/image

## Future Considerations (NOT for MVP)
- Search functionality
- Newsletter signup
- Comments system
- Analytics

## Example MDX Blog Post
```mdx
---
title: "Building a Blazor Server App for SEC Filings"
date: "2024-03-15"
category: "programming"
excerpt: "How I built SuperInvestor to help investors take notes on SEC filings"
---

# Building a Blazor Server App for SEC Filings

Content here...
```

## Deployment Workflow
1. Write blog post as .mdx file
2. Commit and push to GitHub
3. Vercel automatically deploys
4. No manual deployment needed

Keep it simple. Focus on content and readability above all else.