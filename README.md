# D&S Water Restore Solutions — React MVP

Responsive single-page React/Vite website based on the supplied mockup.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The static production site will be created in `dist/`.

## Estimate request form

The form works in two modes:

1. Add `VITE_FORM_ENDPOINT` to a `.env` file to post requests to Formspree or another JSON-compatible form endpoint.
2. Without an endpoint, the button opens the visitor's email application with the request pre-filled for `dswaterrestore@gmail.com`.

Copy `.env.example` to `.env` and replace the placeholder endpoint when ready.

## Content to replace before launch

- Social profile links
- Final customer reviews
- Final gallery photos
- Form service endpoint
- Any business copy, service area, or contact information that changes
