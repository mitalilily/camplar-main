# Camplar Main

This monorepo groups the Camplar backend, client, and admin panel in one place while preserving the currently deployed links inherited from the earlier forked projects.

## Repository Layout

- `apps/backend` - Camplar API, background jobs, and integrations
- `apps/client` - Camplar merchant-facing client app
- `apps/admin` - Camplar admin operations panel
- `apps/landing` - existing landing app kept in the repo without changing its current deployment wiring

## Run Locally

- Backend: `cd apps/backend && npm install && npm run dev`
- Client: `cd apps/client && npm install && npm run dev`
- Admin: `cd apps/admin && npm install --legacy-peer-deps && npm start`
- Landing: `cd apps/landing && npm install && npm run dev`

## Deployment Safety

Keep the current environment variables, domains, and deployed links unchanged until you intentionally perform a verified cutover.

- Do not change the live API URLs just to rebrand the repo.
- Do not repoint Netlify, Vercel, or Render until the replacement deployment has been checked.
- Do not remove the earlier forked repositories until each hosted app has been reconnected here and validated in production.

## Reconnect Deployments To This Repo

Only after verification, use the app directories below with the same secrets and environment configuration already in use:

- Netlify admin: `apps/admin`, build command `npm run build:netlify`, publish directory `build`, Node `20`, `NPM_FLAGS=--legacy-peer-deps`
- Netlify client: `apps/client`, build command `npm run build:netlify`, publish directory `dist`, Node `20`
- Netlify landing: `apps/landing`, build command `npm run build`, publish directory `dist`
- Vercel client: set the Root Directory to `apps/client`
- Render backend: set the Root Directory to `apps/backend`, or deploy with the root `render.yaml`
