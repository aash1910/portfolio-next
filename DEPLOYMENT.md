# Deployment Guide

This guide explains how to deploy your Next.js portfolio to shared hosting.

## Quick Start

```bash
# 1. Build the project
npm run build

# 2. Upload the 'out' folder contents to your hosting
# (See detailed instructions below)
```

## What Gets Generated

After running `npm run build`, the `out/` folder contains:

- **HTML Files**: All pages as static HTML
- **CSS/JS**: Optimized bundles in `_next/` folder
- **Assets**: Your images, fonts, and vendor files in `assets/` folder
- **Total Size**: ~268 MB

## Deployment Options

### Option 1: FTP/SFTP Upload

**Tools**: FileZilla, Cyberduck, or any FTP client

1. Build the project:
   ```bash
   npm run build
   ```

2. Connect to your hosting via FTP:
   - Host: ftp.yourdomain.com
   - Username: your-username
   - Password: your-password

3. Navigate to `public_html` or `www` directory

4. Upload all contents from `out/` folder to your hosting root

5. Your site is now live at your domain!

### Option 2: cPanel File Manager

1. Build the project:
   ```bash
   npm run build
   ```

2. Compress the `out/` folder:
   ```bash
   cd out
   zip -r ../portfolio.zip .
   ```

3. Log into cPanel

4. Open File Manager → Navigate to `public_html`

5. Upload `portfolio.zip`

6. Extract the zip file

7. Move all files from the extracted folder to `public_html`

8. Delete the zip file and empty folder

### Option 3: Git + Hosting Auto-Deploy

If your hosting supports Git deployment (like cPanel Git Version Control):

1. Create a `.gitignore` in the `out/` folder to allow committing built files:
   ```
   # In next-portfolio/.gitignore, remove 'out' from ignore list
   ```

2. Build and commit:
   ```bash
   npm run build
   git add out/
   git commit -m "Build for deployment"
   git push
   ```

3. Configure your hosting to pull from the repository

4. Set deployment path to the `out/` directory

## Post-Deployment Checklist

After uploading, verify:

- ✅ Home page loads: `https://yourdomain.com/`
- ✅ Portfolio pages work: `https://yourdomain.com/portfolio/pos/`
- ✅ Images display correctly
- ✅ Navigation links work
- ✅ Mobile responsiveness

## Updating Your Site

### Full Update

```bash
# 1. Make your changes in src/
# 2. Build
npm run build

# 3. Delete old files on hosting
# 4. Upload new 'out/' folder contents
```

### Quick Content Update

If you only changed text/content:

```bash
# 1. Edit files in src/components/ or src/data/
# 2. Rebuild
npm run build

# 3. Upload only changed HTML files from out/
```

### Quick Image Update

If you only changed images:

```bash
# 1. Replace images in public/assets/
# 2. Upload new images to hosting assets/ folder
# (No rebuild needed if only replacing images with same names)
```

## Common Issues

### Issue: Pages show 404 errors

**Solution**: Ensure you uploaded ALL files including folders:
- `_next/` folder (contains JavaScript)
- `assets/` folder (contains CSS and images)
- All HTML files in portfolio folders

### Issue: Images not loading

**Solution**: 
1. Check image paths in `src/data/portfolio.ts`
2. Verify images exist in `public/assets/portfolio/`
3. Re-upload assets folder to hosting

### Issue: Styling not working

**Solution**:
1. Verify `assets/` folder uploaded correctly
2. Check browser console for CSS loading errors
3. Ensure all vendor CSS files in `assets/vendor/` are present

### Issue: Portfolio filtering not working

**Solution**:
1. Verify JavaScript files uploaded (`_next/` folder)
2. Check `assets/js/main.js` is present
3. Ensure all vendor JS files in `assets/vendor/` are uploaded

## File Permissions

Recommended permissions on shared hosting:

- **Folders**: 755
- **Files**: 644

If pages aren't loading:
```bash
# On your hosting terminal or via SSH
find out/ -type d -exec chmod 755 {} \;
find out/ -type f -exec chmod 644 {} \;
```

## Performance Tips

### 1. Enable Gzip Compression

Add to `.htaccess` in your hosting root:

```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

### 2. Browser Caching

Add to `.htaccess`:

```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### 3. CDN Setup (Optional)

For better performance, you can use a CDN like Cloudflare:

1. Sign up for Cloudflare (free plan available)
2. Add your domain
3. Update nameservers at your domain registrar
4. Enable caching and optimizations in Cloudflare dashboard

## Backup Strategy

Before updating your live site:

```bash
# On your local machine
# 1. Backup current 'out' folder
cp -r out out-backup-$(date +%Y%m%d)

# On hosting (via FTP)
# 2. Download current live files before replacing
```

## Domain Configuration

### Using Custom Domain

1. Point your domain A record to hosting IP
2. Wait for DNS propagation (up to 48 hours)
3. Test site at your domain

### Using Subdomain

1. Create subdomain in cPanel (e.g., portfolio.yourdomain.com)
2. Upload files to subdomain's public_html folder
3. Access at subdomain URL

## SSL Certificate

Most shared hosting providers offer free SSL:

1. Enable SSL in cPanel (Let's Encrypt)
2. Force HTTPS redirect in `.htaccess`:

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## Monitoring

### Check Site Status

- Use uptimerobot.com for free uptime monitoring
- Set up email alerts for downtime

### Analytics (Optional)

Add Google Analytics by editing `src/app/layout.tsx`:

```typescript
// Add in <head> section
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script dangerouslySetInnerHTML={{
  __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `
}}/>
```

Then rebuild and redeploy.

## Support

For deployment issues:
- Contact your hosting provider's support
- Email: ashraful1910@gmail.com

---

**Remember**: Every time you make changes, you need to:
1. Edit files in `src/`
2. Run `npm run build`
3. Upload new `out/` folder contents

This ensures your changes appear on the live site.
