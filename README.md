# BluPeak Global Exports - Deployment Guide

## Project Overview

This repository is a `pnpm` workspace monorepo.  
The website app is located at `artifacts/bluepeak` and is built with Vite + React + TypeScript.

This document covers:
- local setup
- production build
- deployment to AWS S3 (static hosting)
- key technical details and operational notes

## Tech Stack

- **Monorepo**: pnpm workspaces
- **Frontend framework**: React 19
- **Build tool**: Vite 7
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI/animation libraries**: Radix UI, Framer Motion
- **3D visuals**: Three.js + `@react-three/fiber` + `@react-three/drei`
- **Routing**: Wouter
- **Data/query utilities**: TanStack Query, Zod

## Important Project Paths

- App package: `artifacts/bluepeak`
- Vite config: `artifacts/bluepeak/vite.config.ts`
- Production build output: `artifacts/bluepeak/dist/public`

## Prerequisites

- Node.js 24.x
- pnpm 10+
- AWS CLI configured (`aws configure`) for S3 deployment

## Environment Variables (Required)

`vite.config.ts` requires these variables for both dev and build:

- `PORT` (example: `3000`)
- `BASE_PATH` (example: `/`)

If not provided, build/dev fails by design.

## Local Development

From repository root:

```bash
pnpm install
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/bluepeak run dev
```

Windows PowerShell:

```powershell
$env:PORT="3000"
$env:BASE_PATH="/"
pnpm --filter @workspace/bluepeak run dev
```

## Production Build (for S3)

From repository root:

```bash
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/bluepeak run build
```

Build files will be generated in:

`artifacts/bluepeak/dist/public`

## Deploy to S3 Bucket

Replace `<your-bucket-name>` with your bucket.

```bash
aws s3 sync artifacts/bluepeak/dist/public s3://<your-bucket-name> --delete
```

Recommended cache strategy (optional but good practice):

```bash
# HTML no-cache
aws s3 cp artifacts/bluepeak/dist/public/index.html s3://<your-bucket-name>/index.html \
  --cache-control "no-cache, no-store, must-revalidate" \
  --content-type "text/html"

# Assets long cache (example for /assets)
aws s3 sync artifacts/bluepeak/dist/public/assets s3://<your-bucket-name>/assets \
  --cache-control "public, max-age=31536000, immutable"
```

## S3 Static Website Configuration

1. Enable static website hosting on the bucket.
2. Set:
   - Index document: `index.html`
   - Error document: `index.html` (for SPA route fallback)
3. If bucket is public website hosting, apply read access policy for `s3:GetObject`.

## CloudFront (Recommended)

If using CloudFront in front of S3:
- Origin: S3 bucket
- Default root object: `index.html`
- Add SPA fallback behavior (404/403 -> `/index.html`)
- Invalidate cache after deployment:

```bash
aws cloudfront create-invalidation --distribution-id <dist-id> --paths "/*"
```

## Deployment Checklist

- `pnpm install` completed successfully
- `PORT` and `BASE_PATH` exported before build
- `pnpm --filter @workspace/bluepeak run build` successful
- files uploaded from `artifacts/bluepeak/dist/public`
- S3 website settings verified
- CloudFront invalidation done (if applicable)

## Troubleshooting

### `PORT environment variable is required`
Set `PORT` before running `dev`, `build`, or `serve`.

### `BASE_PATH environment variable is required`
Set `BASE_PATH` before running `dev`, `build`, or `serve`.

### Rollup/esbuild optional dependency errors on some environments
This workspace has strict platform dependency overrides in `pnpm-workspace.yaml`.  
If your environment differs from the originally targeted platform, verify overrides are compatible with your OS/architecture before install/build.

---

If needed, add this deployment flow to CI/CD (GitHub Actions) using the same build command and `aws s3 sync` step.
