# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Docker Build
```bash
# Build Docker image
docker build -t nextjs-redis-app .

# Run with Redis connection
docker run -e REDIS_URL=redis://your-redis-url:6379 -p 3000:3000 nextjs-redis-app
```

## Architecture Overview

This is a Next.js application that integrates with Redis for state management. The application demonstrates a simple view counter with manual increment functionality.

### Key Components

- **Next.js Pages Router**: Uses the `pages/` directory structure
- **Redis Integration**: Uses `ioredis` client for Redis connections
- **API Routes**: 
  - `/api/incr` - Increments and returns the counter value
  - `/api/v` - Returns version information with release metadata
- **Environment Variables**:
  - `REDIS_URL` - Required for Redis connection
  - `RELEASEVERSION` - Set during Docker build from `baseversion` file
  - `RELEASEDATE` - Automatically generated during build

### Redis Connection Pattern

The application creates Redis connections in two places:
1. **Server-side rendering** in `pages/index.js` for initial page load
2. **API routes** for client-side interactions

Both use the `REDIS_URL` environment variable for connection configuration.

### Docker Deployment

The Dockerfile includes a build-time version tracking system:
- Reads version from `baseversion` file
- Generates release date and ISO timestamp
- Writes these values to `.env.production` for runtime access

## Dependencies

- Next.js 14.x
- React 18.x
- ioredis 5.x
- Node.js 20 (Alpine Linux in Docker)