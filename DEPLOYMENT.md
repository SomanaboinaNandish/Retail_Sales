# Deployment Guide

This guide covers deployment options for the Retail Sales Management System.

## Prerequisites

- Supabase account with a project set up
- Node.js 18+ installed
- Git repository (for deployment platforms)

## Environment Setup

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=3001
```

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Local Development

### 1. Install Dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Start Backend Server

```bash
cd backend
npm start
```

Backend runs on `http://localhost:3001`

### 3. Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend runs on `http://localhost:5173`

## Production Deployment

### Option 1: Vercel (Recommended for Frontend)

#### Frontend Deployment

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy frontend:
```bash
cd frontend
vercel
```

3. Set environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

4. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

#### Backend Deployment

The backend can be deployed to:
- Vercel Serverless Functions
- Railway
- Render
- Fly.io
- AWS Lambda

### Option 2: Railway

1. Create account at [railway.app](https://railway.app)

2. Deploy backend:
```bash
cd backend
railway login
railway init
railway up
```

3. Add environment variables in Railway dashboard

4. Deploy frontend separately or use a monorepo setup

### Option 3: Render

1. Create account at [render.com](https://render.com)

2. Create Web Service for backend:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Add environment variables

3. Create Static Site for frontend:
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/dist`
   - Add environment variables

### Option 4: Docker Deployment

#### Backend Dockerfile

Create `backend/Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
```

#### Frontend Dockerfile

Create `frontend/Dockerfile`:

```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      - SUPABASE_URL=${SUPABASE_URL}
      - SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
      - PORT=3001
    restart: unless-stopped

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

## Database Migration

The database schema is automatically created using Supabase migrations. Ensure migrations are applied before deploying:

1. Check migrations in Supabase dashboard
2. Verify tables are created
3. Test RLS policies

## Data Import

To import sales data from CSV:

```bash
cd backend
npm run import path/to/sales-data.csv
```

## Production Checklist

- [ ] Database migrations applied
- [ ] Environment variables configured
- [ ] CORS configured for production domains
- [ ] Error tracking set up (Sentry, LogRocket)
- [ ] Performance monitoring enabled
- [ ] SSL/TLS certificates configured
- [ ] API rate limiting implemented
- [ ] Database backups scheduled
- [ ] CDN configured for static assets
- [ ] Health check endpoints tested

## Monitoring

### Backend Health Check

```bash
curl http://your-backend-url/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "API is running"
}
```

### Frontend Health Check

Access your frontend URL and verify:
- Page loads without errors
- API calls work correctly
- Search, filter, sort, pagination function properly

## Troubleshooting

### Backend Issues

**Connection errors:**
- Verify Supabase credentials
- Check network connectivity
- Review CORS settings

**API errors:**
- Check server logs
- Verify environment variables
- Test database connection

### Frontend Issues

**Build failures:**
- Clear node_modules and reinstall
- Check TypeScript errors
- Verify all imports

**Runtime errors:**
- Check browser console
- Verify API endpoint URLs
- Test network requests

## Scaling Considerations

### Backend Scaling
- Use load balancer for multiple instances
- Implement caching (Redis)
- Optimize database queries
- Add connection pooling

### Frontend Scaling
- Use CDN for static assets
- Enable gzip compression
- Implement code splitting
- Optimize images and assets

## Security Best Practices

1. Never commit `.env` files
2. Use environment variables for secrets
3. Enable HTTPS/TLS
4. Implement rate limiting
5. Regular security updates
6. Database access controls
7. Input validation and sanitization
8. CORS configuration review

## Support

For issues or questions:
1. Check documentation in `docs/architecture.md`
2. Review README files in each directory
3. Check GitHub issues
4. Contact development team
