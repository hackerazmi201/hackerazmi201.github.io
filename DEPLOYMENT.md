# Deployment Guide - HackerAzmi Portfolio

## 🚀 Quick Deployment Options

### 1. Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd hacker-portfolio
   vercel
   ```

3. **Configure**
   - Follow the prompts
   - Set up custom domain if needed
   - Configure environment variables for Web3Form

### 2. Netlify

1. **Drag & Drop**
   - Go to [Netlify](https://netlify.com)
   - Drag the `hacker-portfolio` folder to the deploy area

2. **Git Integration**
   ```bash
   # Connect to GitHub repository
   # Netlify will auto-deploy on push
   ```

### 3. GitHub Pages

1. **Create Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/hacker-portfolio.git
   git push -u origin main
   ```

2. **Enable Pages**
   - Go to repository Settings > Pages
   - Select source: Deploy from a branch
   - Choose main branch

### 4. Traditional Web Hosting

1. **Upload Files**
   - Upload all files via FTP/SFTP
   - Ensure HTTPS is enabled
   - Configure proper MIME types

2. **Configure Server**
   ```apache
   # .htaccess for Apache
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

## ⚙️ Configuration Steps

### 1. Web3Form Setup

1. **Get API Key**
   - Visit [Web3Form](https://web3forms.com/)
   - Sign up and get your API key

2. **Update Form**
   ```html
   <!-- In index.html, replace: -->
   <input type="hidden" name="access_key" value="YOUR_WEB3FORM_API_KEY" />
   
   <!-- With: -->
   <input type="hidden" name="access_key" value="your-actual-api-key" />
   ```

3. **Set Redirect URL**
   ```html
   <input type="hidden" name="redirect" value="https://yourdomain.com/thank-you" />
   ```

### 2. Update Domain References

1. **Sitemap**
   ```xml
   <!-- Replace all instances of "yourdomain.com" with your actual domain -->
   <loc>https://yourdomain.com/</loc>
   ```

2. **Robots.txt**
   ```txt
   Sitemap: https://yourdomain.com/sitemap.xml
   ```

3. **Meta Tags**
   ```html
   <!-- Update Open Graph URLs -->
   <meta property="og:url" content="https://yourdomain.com" />
   ```

### 3. Customize Content

1. **Personal Information**
   - Update name, bio, and contact details
   - Modify social media links
   - Update email addresses

2. **Projects**
   - Edit project data in `scripts/main.js`
   - Update GitHub and demo links
   - Add/remove projects as needed

3. **Certificates**
   - Update certificate information
   - Add verification links
   - Modify issuing organizations

## 🔧 Environment Variables

### Vercel
```bash
vercel env add WEB3FORM_API_KEY
```

### Netlify
- Go to Site Settings > Environment Variables
- Add `WEB3FORM_API_KEY`

## 📊 Performance Optimization

### 1. Image Optimization
- Use WebP format for images
- Implement lazy loading
- Compress images before upload

### 2. CDN Setup
- Use Cloudflare or similar CDN
- Enable caching for static assets
- Configure proper cache headers

### 3. Monitoring
- Set up Google Analytics
- Monitor Core Web Vitals
- Use Lighthouse for performance audits

## 🔒 Security Considerations

### 1. HTTPS
- Ensure SSL certificate is valid
- Redirect HTTP to HTTPS
- Use HSTS headers

### 2. Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;">
```

### 3. Form Security
- Web3Form handles spam protection
- Honeypot field included
- Rate limiting configured

## 🧪 Testing Checklist

### Before Deployment
- [ ] All links work correctly
- [ ] Contact form submits successfully
- [ ] 3D scenes load on desktop
- [ ] Mobile responsiveness verified
- [ ] Cross-browser compatibility tested
- [ ] Performance metrics acceptable
- [ ] SEO meta tags complete
- [ ] Accessibility features working

### Post-Deployment
- [ ] HTTPS redirect working
- [ ] Contact form emails received
- [ ] Analytics tracking active
- [ ] Search engine indexing
- [ ] Social media previews working
- [ ] Mobile performance verified

## 🚨 Troubleshooting

### Common Issues

1. **3D Scenes Not Loading**
   - Check WebGL support
   - Verify Three.js CDN accessibility
   - Check browser console for errors

2. **Contact Form Not Working**
   - Verify API key is correct
   - Ensure HTTPS is enabled
   - Check form field names match Web3Form

3. **Slow Loading**
   - Optimize images
   - Enable compression
   - Use CDN for assets

4. **Mobile Issues**
   - Test on actual devices
   - Check viewport meta tag
   - Verify touch interactions

## 📈 Analytics Setup

### Google Analytics 4
```html
<!-- Add to <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Search Console
- Verify domain ownership
- Submit sitemap
- Monitor indexing status

## 🎯 SEO Checklist

- [ ] Meta titles and descriptions
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] Structured data markup
- [ ] XML sitemap
- [ ] Robots.txt
- [ ] Canonical URLs
- [ ] Alt text for images
- [ ] Internal linking
- [ ] Page speed optimization

---

**Ready to deploy! 🚀**

For additional support, refer to the main README.md file or create an issue in the repository.
