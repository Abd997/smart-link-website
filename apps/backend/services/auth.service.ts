import { BadRequestError } from "../errors/bad-request.error"
import { UserSignupDto } from "../dtos/user-signup.dto"
import { UserLoginDto } from "../dtos/user-login.dto"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { env } from "../utils/env"
import { db, usersTable } from "../database"

class AuthService {
  async signup(data: UserSignupDto) {
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, data.email))
    if (existingUser.length > 0) {
      throw new BadRequestError("User already exists")
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await db
      .insert(usersTable)
      .values({
        username: data.username,
        email: data.email,
        password: hashedPassword,
        role: data.role,
      })
      .returning()
    return user
  }

  async login(data: UserLoginDto) {
    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, data.email))
    const user = users?.[0]
    if (!user) {
      throw new BadRequestError("User does not exists")
    }
    const isMatch = await bcrypt.compare(data.password, user.password)
    if (!isMatch) {
      throw new BadRequestError("Invalid password")
    }
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      env.JWT_SECRET,
      { expiresIn: "1h" }
    )
    return { token, user: { role: user.role, id: user.id } }
  }
}

const authService = new AuthService()

export default authService
