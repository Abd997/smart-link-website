# Smart Link Website

## Technologies Used

- This is a monorepo with both backend and frontend inside apps/
- Common modules can be put inside libs/

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
   pnpm install -r
   ```
2. Create `.env` files in both `apps/backend` and `apps/frontend` as needed:
   - **Backend**:
     ```env
     GEMINI_API_KEY=your_gemini_api_key
     JWT_SECRET=your_jwt_secret
     PORT=8080
     DATABASE_URL=postgres://user:password@localhost:5432/db
     ```
   - **Frontend**:
     ```env
     NEXT_PUBLIC_NODE_ENV=dev
     NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
     ```

## How to Run from root

- `pnpm build` This will build both frontend and backend
- Run docker compose to start database

```
docker compose up -d
```

- Apply drizzle migrations

```
cd apps/backend
pnpm db:migrate
```

- To start both backend and frontend

```
cd ../..
pnpm dev
```
