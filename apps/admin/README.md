# Camplar Admin Panel

This app is the Camplar admin workspace for operations, users, billing, support, and platform controls.

## Run Locally

```bash
npm install --legacy-peer-deps
npm start
```

## Notes

- Keep the current deployed API base URL and hosted admin wiring intact until you intentionally switch environments.
- This app stays in the monorepo alongside `apps/backend` and `apps/client`.
- Brand utilities live in `src/utils/brand.js` and the public logo assets under `public/logo/`.
