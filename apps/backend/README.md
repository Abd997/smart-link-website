# Backend

## Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Create a `.env` file in the backend directory with required variables:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   JWT_SECRET=your_jwt_secret
   PORT=8080
   DATABASE_URL=your_database_url
   ```
3. Setup Drizzle:
   - Run migrations:
     ```bash
     pnpm db:generate
     pnpm db:migrate
     ```

## How to Run

- Development:
  ```bash
  pnpm run dev
  ```

## Deployment Options

- **AWS EC2:**
  - Provision an EC2 instance (Ubuntu).
  - Install Node.js, pnpm, and PM2 on the instance.
  - Clone your repository and set up your `.env` file.
  - Go to backend directory
  - Run:
    ```bash
    pnpm install
    pnpm build
    pnpm start
    ```
  - Use AWS Security Groups to open the required port (default: 8080).

- **AWS Elastic Beanstalk:**
  - Create a Node.js environment.
  - Add a `Procfile` with:
    ```Procfile
    web: pnpm run start
    ```
  - Deploy your code using the AWS EB CLI or console.
  - Set environment variables in the Elastic Beanstalk console.
