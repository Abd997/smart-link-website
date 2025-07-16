# Frontend

## Technologies Used

- Next.js (React framework)
- Redux Toolkit (state management)
- Styled Components
- Zod (validation)
- Google Fonts (Inter)

## Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Configure environment variables in `.env`:

   ```env
   NEXT_PUBLIC_NODE_ENV=dev
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
   ```

## How to Run

- Development:

  ```bash
  pnpm run dev
  ```

## Deployment Options

- **Vercel:**
  - Connect GitHub repo and deploy automatically.
  - Set environment variables in the Vercel dashboard.

- **Netlify:**
  - Connect your repo and configure build settings.

- **Custom Server:**
  - Use PM2 or similar process managers to run the production build on your own server.
