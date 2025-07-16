"use client"

import React, { useState } from "react"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { login } from "../../store/userSlice"
import logger from "@/utils/logger"
import { useRouter } from "next/navigation"
import apiService from "@/utils/apiService"
import { Form, Label, Input, ErrorComponent, Button } from "@/components/Form"

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

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!email || !password) {
      setError("Please enter both email and password.")
      return
    }
    try {
      const data = await apiService.login(email, password)
      dispatch(login(data))
      if (data.user.role === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/")
      }
    } catch (err) {
      logger.error("Login error:", err)
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Something went wrong.")
      }
    }
  }

  return (
    <Container>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <ErrorComponent>{error}</ErrorComponent>}
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  )
}

export default LoginPage
