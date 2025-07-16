import "dotenv/config"
import { env } from "./utils/env"
import express from "express"
import errorHandler from "./middlewares/error.middleware"
import publicRouter from "./routes/public.routes"
import privateRoutes from "./routes/auth.routes"
import adminCheckMiddleware from "./middlewares/jwt.middleware"
import notFoundHandler from "./middlewares/not-found.middleware"
import { verifyDbConnection } from "./database"

const app = express()

verifyDbConnection()
  .then(() => {
    console.log("Database connection established")
  })
  .catch((err) => {
    console.error("Database connection failed:", err)
    process.exit(1)
  })

app.use(express.json())

app.use("/api", publicRouter)
app.use("/api", adminCheckMiddleware, privateRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

const PORT = env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
