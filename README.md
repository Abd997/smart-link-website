# Smart Link Website

## Technologies Used

### Backend

- Drizzle ORM (TypeScript SQL ORM)
- Express Promise Router (async/await routing)
- Zod (schema validation)
- Google Generative AI (Gemini API)
- JWT (authentication)

### Frontend

- Next.js (React framework)
- Redux Toolkit (state management)
- Styled Components (CSS-in-JS)
- Zod (validation)
- Google Fonts (Inter)

## Setup

1. Install dependencies for the entire workspace:
   ```bash
   pnpm install
   ```
2. Create `.env` files in both `apps/backend` and `apps/frontend` as needed:
   - **Backend**:
     ```env
     GEMINI_API_KEY=your_gemini_api_key
     JWT_SECRET=your_jwt_secret
     PORT=8080
     ```
   - **Frontend**:
     ```env
     NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
     ```
3. Configure your database connection in `@lib/database`.

## How to Run

- **Backend (Development):**
  ```bash
  pnpm --filter ./apps/backend dev
  ```
- **Frontend (Development):**
  ```bash
  pnpm --filter ./apps/frontend dev
  ```
- **Production:**
  ```bash
  pnpm run build
  pnpm start
  ```
