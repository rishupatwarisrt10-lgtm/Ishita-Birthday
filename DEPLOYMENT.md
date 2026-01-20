# Deployment Guide

## Pre-Deployment Checklist

### ✅ Optimizations Applied

1. **Build Optimization**
   - Terser minification enabled
   - Console logs removed in production
   - Source maps disabled for smaller builds
   - Lightning CSS minification enabled

2. **Code Splitting**
   - Vendor libraries split (React, React-DOM)
   - Motion library split (Framer-motion, GSAP, Lenis)
   - Icons library split (Lucide-react)
   - Optimal chunk caching strategy

3. **Dependency Optimization**
   - Pre-bundled critical dependencies
   - Tree-shaking enabled
   - Unused imports removed

4. **TypeScript Configuration**
   - Strict mode enabled
   - ESModule interop enabled
   - Source maps disabled for production
   - Proper module resolution

5. **Code Quality**
   - Console statements wrapped in `import.meta.env.DEV` checks
   - Error handling with fallbacks
   - Production-safe error messages

## Build Commands

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build:prod
```

### Preview Production Build
```bash
npm run preview
```

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

**Important**: Keep API keys secure. Never commit `.env` files to version control.

## Build Output

Expected bundle sizes (after optimization):
- **Main bundle**: ~150-200KB (gzipped)
- **Vendor chunk**: ~250-300KB (gzipped)
- **Motion chunk**: ~80-100KB (gzipped)

## Deployment Platforms

### Vercel
```bash
npm run build
# Push to GitHub, Vercel will auto-deploy
```

### Netlify
```bash
npm run build
# Deploy the `dist` folder
```

### GitHub Pages
```bash
npm run build
# Deploy the `dist` folder
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## Performance Optimizations

✅ **Implemented**
- Smooth scrolling with Lenis.js
- GSAP ScrollTrigger animations optimized
- Image lazy loading with fallbacks
- Audio autoplay with muted bypass
- Framer-motion animation optimization
- CSS minification
- JavaScript minification & tree-shaking

## Performance Metrics to Monitor

- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1

## Security Checklist

✅ **Completed**
- API keys not exposed in frontend code
- Environment variables properly configured
- Console logs removed from production
- No sensitive data in build output

## Testing Before Deployment

1. Run production build locally
   ```bash
   npm run build
   npm run preview
   ```

2. Test all features:
   - Audio autoplay functionality
   - Image loading and fallbacks
   - Smooth scrolling performance
   - Animation rendering
   - API calls (if applicable)

3. Check browser console for errors

4. Test on multiple devices/browsers

## Post-Deployment

- Monitor error tracking (Sentry, etc.)
- Check performance metrics
- Verify all assets load correctly
- Test user interactions

## Troubleshooting

### Console errors in production
- Check `.env` variables are set correctly
- Verify API keys are valid
- Check network tab for failed requests

### Slow load times
- Check your hosting provider's performance
- Enable gzip compression
- Verify CDN is configured

### Audio not playing
- Check browser autoplay policies
- Verify audio file exists at `/audio/audio.mp3.mp3`
- Check console for specific errors

## Support

For deployment issues, check:
- Build logs for errors
- Network tab in browser devtools
- Console for runtime errors
