"use client"

import { env } from "@/utils/env"
import logger from "@/utils/logger"
import React, { useState } from "react"
import styled from "styled-components"
import { useRouter } from "next/navigation"
import { Form, Label, Input, ErrorComponent, Success, Button } from "@/components/Form"

const Container = styled.div`
  max-width: 400px;
  margin: 40px auto;
  padding: 32px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: #fafbfc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`

const Title = styled.h2`
  text-align: center;
  margin-bottom: 24px;
  color: #222;
`

const CustomForm = styled(Form)`
  display: flex;
  flex-direction: column;
`

const Signup: React.FC = () => {
  const router = useRouter()
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    // Manual input checks
    if (form.username.length < 3 || form.username.length > 50) {
      setError("Username must be between 3 and 50 characters.")
      setLoading(false)
      return
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) || form.email.length > 255) {
      setError("Please enter a valid email address (max 255 characters).")
      setLoading(false)
      return
    }
    if (form.password.length < 6 || form.password.length > 255) {
      setError("Password must be between 6 and 255 characters.")
      setLoading(false)
      return
    }

    try {
      const res = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        logger.info("Registration failed:", res.statusText)
        setError("Something went wrong")
        return
      }
      setSuccess(true)
      setForm({ username: "", email: "", password: "", role: "user" })
      router.push("/login")
    } catch (err: any) {
      logger.error(err)
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Title>Register</Title>
      <CustomForm onSubmit={handleSubmit}>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          type="text"
          value={form.username}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <Label htmlFor="role">Role</Label>
        <select
          id="role"
          name="role"
          value={form.role}
          onChange={handleChange}
          disabled={loading}
          style={{
            marginBottom: "18px",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #d0d7de",
            fontSize: "15px",
            background: "#fff",
          }}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        {error && <ErrorComponent>{error}</ErrorComponent>}
        {success && <Success>Registration successful!</Success>}
        <Button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </CustomForm>
    </Container>
  )
}

export default Signup
