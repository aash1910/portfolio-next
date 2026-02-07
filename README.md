# Next.js Portfolio - Static Site

This is a Next.js portfolio website converted from PHP, configured for static export. It generates pure HTML, CSS, and JavaScript files that can be uploaded to any shared hosting.

## Features

- ✅ **Static Export**: Generates pure HTML/CSS/JS files
- ✅ **21 Portfolio Projects**: All project detail pages pre-generated
- ✅ **Responsive Design**: Works on all devices
- ✅ **Modern Stack**: Next.js 14, React, TypeScript
- ✅ **Easy Deployment**: Upload to any shared hosting

## Project Structure

```
next-portfolio/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # Root layout with HTML head
│   │   ├── page.tsx         # Home page
│   │   └── portfolio/
│   │       └── [id]/
│   │           └── page.tsx # Dynamic portfolio pages
│   ├── components/          # React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ResumeSection.tsx
│   │   └── PortfolioSection.tsx
│   └── data/
│       └── portfolio.ts     # Portfolio data (21 projects)
├── public/
│   └── assets/              # Static assets (CSS, JS, images)
├── next.config.ts           # Next.js configuration
└── out/                     # Generated static files (after build)
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

```bash
cd next-portfolio
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

Generate static files:

```bash
npm run build
```

This creates an `out/` folder with all static files.

## Deployment to Shared Hosting

### Step 1: Build the Project

```bash
npm run build
```

### Step 2: Upload Files

Upload the contents of the `out/` folder to your hosting:

1. Connect to your hosting via FTP/SFTP or cPanel File Manager
2. Navigate to your public_html or www directory
3. Upload all files and folders from `out/` directory
4. Your site will be live at your domain!

### File Structure After Upload

```
your-domain.com/
├── index.html              # Home page
├── portfolio/
│   ├── pos/
│   │   └── index.html     # POS project page
│   ├── wms/
│   │   └── index.html     # WMS project page
│   └── ... (19 more projects)
├── assets/                 # All your images, CSS, JS
├── _next/                  # Next.js runtime files
└── ... (other static files)
```

## Making Changes

### 1. Edit Content

Update content in the relevant files:

- **About/Resume**: Edit `src/components/AboutSection.tsx` and `src/components/ResumeSection.tsx`
- **Portfolio Projects**: Edit `src/data/portfolio.ts`
- **Styling**: Modify files in `public/assets/css/`

### 2. Rebuild

```bash
npm run build
```

### 3. Re-upload

Upload the updated `out/` folder contents to your hosting.

## Portfolio Data Structure

Portfolio projects are defined in `src/data/portfolio.ts`:

```typescript
{
  id: 'project-id',              // URL-friendly ID
  title: 'Project Title',
  shortDescription: 'Brief description',
  category: 'Software',          // Software, App, or Website
  filter: 'filter-product',      // filter-product, filter-app, filter-website
  thumbnail: '/assets/portfolio/PROJECT/1.png',
  images: [...],                 // Array of image paths
  projectDate: '2020-21',
  demoUrl: 'https://...',       // Optional
  techStack: 'Laravel, Vue.js',
  overview: 'Detailed overview...',
  keyFeatures: [...],
  challenges: [...],
  achievements: [...]
}
```

## Adding a New Portfolio Project

1. Add project images to `public/assets/portfolio/NEW-PROJECT/`
2. Add project data to `src/data/portfolio.ts`
3. Run `npm run build`
4. Upload the new `out/` folder

## Configuration

### Static Export Configuration

The project is configured for static export in `next.config.ts`:

```typescript
{
  output: 'export',              // Enable static export
  images: {
    unoptimized: true,          // Required for static export
  },
  trailingSlash: true,          // Clean URLs with folders
}
```

### URL Structure

- Home: `/`
- Portfolio: `/portfolio/pos/`, `/portfolio/wms/`, etc.
- Clean URLs with trailing slashes

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Bootstrap 5, Custom CSS
- **UI Libraries**: 
  - AOS (Animate On Scroll)
  - GLightbox (Image gallery)
  - Swiper (Image slider)
  - Isotope (Portfolio filtering)

## Build Output

After running `npm run build`:

- **Output Size**: ~268 MB (includes all images and assets)
- **Pages Generated**: 25 total
  - 1 Home page
  - 21 Portfolio detail pages
  - 3 System pages (404, etc.)

## Troubleshooting

### Build Errors

If you encounter build errors:

```bash
# Clear cache and rebuild
rm -rf .next out
npm run build
```

### Large File Size

The build is large due to images. To optimize:

1. Compress images before adding them
2. Use WebP format for better compression
3. Remove unused assets from `public/assets/`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (generates `out/`)
- `npm run start` - Not used (static export only)
- `npm run lint` - Run ESLint

## License

This portfolio project is private. All rights reserved.

## Support

For issues or questions, contact: ashraful1910@gmail.com

---

**Last Updated**: February 2026
