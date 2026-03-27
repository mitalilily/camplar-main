# Camplar Client

This app is the merchant-facing Camplar client used for shipment booking, tracking, billing, and support workflows.

## Run Locally

```bash
npm install
npm run dev
```

## Notes

- The app continues to support the currently deployed backend URLs unless you explicitly change environment variables.
- Keep deployment bindings unchanged until the replacement deployment has been verified.
- Shared brand assets live in `src/utils/brand.ts` and `public/logo/`.
