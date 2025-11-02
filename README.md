# HackerAzmi - Cyberpunk Portfolio Website
<a href="https://hackerazmi201.github.io">Visit</a>

A modern, fully 3D portfolio website with a hacker/cyberpunk terminal aesthetic. Built with HTML, CSS, JavaScript, Three.js, and GSAP animations.

## 🚀 Features

- **3D WebGL Scenes**: Interactive cyber city, floating terminal fragments, and matrix rain effects
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **GSAP Animations**: Smooth scroll-triggered animations and hover effects
- **Cyberpunk Aesthetic**: Neon green & cyan accents on dark backgrounds
- **Web3Form Integration**: Contact form with spam protection
- **Accessibility**: Semantic HTML, keyboard navigation, ARIA roles
- **Performance Optimized**: Lazy loading, critical CSS inline, optimized assets

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **3D Graphics**: Three.js (WebGL)
- **Animations**: GSAP with ScrollTrigger
- **Forms**: Web3Form API
- **Fonts**: Fira Code (monospace), Inter (sans-serif)
- **Icons**: SVG-based favicon and icons

## 📁 Project Structure

```
hacker-portfolio/
├── index.html              # Main HTML file
├── styles/
│   └── main.css            # Main stylesheet
├── scripts/
│   ├── main.js             # Main JavaScript functionality
│   ├── 3d-scenes.js        # Three.js 3D scenes
│   └── animations.js       # GSAP animations
├── assets/
│   └── favicon.svg         # SVG favicon
├── robots.txt              # SEO robots file
├── sitemap.xml             # SEO sitemap
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- Modern web browser with WebGL support
- Web server (for local development)
- Web3Form API key (for contact form)

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd hacker-portfolio
   ```

3. **Customize content**
   - Update personal information in `index.html`
   - Modify project data in `scripts/main.js`
   - Adjust colors and styling in `styles/main.css`

4. **Deploy**
   - Upload all files to your web server
   - Ensure HTTPS is enabled for Web3Form to work
   - Update `sitemap.xml` and `robots.txt` with your domain



## 🎨 Customization

### Updating Projects

To add or modify projects, edit the `projects` object in `scripts/main.js`:

```javascript
const projects = {
    'project-id': {
        title: 'Project Title',
        description: 'Project description...',
        tech: ['Technology1', 'Technology2'],
        features: ['Feature 1', 'Feature 2'],
        github: 'https://github.com/hackerazmi201/repo',
        demo: 'https://demo-url.com'
    }
};
```

### Updating Certificates

Modify the certificate cards in `index.html`:

```html
<div class="certificate-card">
    <div class="certificate-front">
        <div class="cert-logo">LOGO</div>
        <h3 class="cert-title">Certificate Name</h3>
    </div>
    <div class="certificate-back">
        <h4>Issuing Organization</h4>
        <p class="cert-date">2024</p>
        <p class="cert-description">Description...</p>
        <a href="#" class="cert-verify">Verify</a>
    </div>
</div>
```

### Color Scheme

Update CSS variables in `styles/main.css`:

```css
:root {
    --primary-green: #00ff41;    /* Neon green */
    --primary-cyan: #00ffff;     /* Neon cyan */
    --bg-dark: #0a0a0a;         /* Dark background */
    --bg-charcoal: #1a1a1a;     /* Charcoal background */
    --text-light: #e0e0e0;       /* Light text */
    --text-muted: #888;          /* Muted text */
}
```

## 📱 Responsive Breakpoints

- **Mobile**: ≤ 640px
- **Tablet**: 641px - 1024px  
- **Desktop**: ≥ 1025px

The site automatically adapts 3D scenes and animations based on device capabilities.

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA roles and labels
- Keyboard navigation support
- High contrast mode support
- Reduced motion preferences
- Screen reader friendly
- Focus indicators
- Color contrast compliant

## 🚀 Performance Optimizations

- Critical CSS inlined
- Lazy loading for 3D assets
- Optimized images and assets
- Preconnect for external resources
- Efficient animation loops
- Mobile-specific optimizations
- WebGL performance monitoring

## 🔧 Browser Support

- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+
- **Mobile browsers**: iOS Safari 12+, Chrome Mobile 60+

## 📊 SEO Features

- Meta tags and Open Graph
- Structured data markup
- XML sitemap
- Robots.txt
- Semantic HTML
- Fast loading times
- Mobile-friendly design

## 🐛 Troubleshooting

### 3D Scenes Not Loading
- Ensure WebGL is supported in your browser
- Check browser console for errors
- Try disabling browser extensions
- Verify Three.js CDN is accessible

### Contact Form Not Working
- Verify Web3Form API key is correct
- Ensure HTTPS is enabled
- Check browser console for errors
- Verify form fields match Web3Form requirements

### Animations Not Smooth
- Check if GSAP CDN is loading
- Verify ScrollTrigger plugin is registered
- Check for JavaScript errors in console
- Ensure sufficient device performance

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support or questions:
- Email: hackerazmi@example.com
- GitHub Issues: [Create an issue](https://github.com/hackerazmi201/repo/issues)

## 🔄 Updates

### Version 1.0.0
- Initial release
- 3D WebGL scenes
- GSAP animations
- Web3Form integration
- Responsive design
- Accessibility features

---

**Built with ❤️ by HackerAzmi**

*"I find and fix the holes others miss."*
