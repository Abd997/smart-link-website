"use client"

import { env } from "./env"
import { Link } from "@/app/admin/dashboard/page"
import { store } from "@/store/store"

class ApiService {
  private baseUrl: string

  constructor() {
    this.baseUrl = env.NEXT_PUBLIC_API_BASE_URL
  }

  getToken() {
    return store.getState().user.token
  }

  async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const token = this.getToken()
    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string>),
    }
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    })
    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.error || "An error occurred")
    }
    return res.json()
  }

  async login(email: string, password: string) {
    return this.request<{
      token: string
      user: { role: string; id: string }
    }>("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
  }

  async signup(data: {
    username: string
    email: string
    password: string
    role: string
  }) {
    return this.request("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  }

  async getLinks(): Promise<Link[]> {
    return this.request<Link[]>("/api/sites", { method: "GET" })
  }

  async addLink(link: Partial<Link>): Promise<void> {
    await this.request("/api/sites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(link),
    })
  }

  async updateLink(id: number, link: Partial<Link>): Promise<void> {
    await this.request(`/api/sites/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(link),
    })
  }

  async deleteLink(id: number): Promise<void> {
    await this.request(`/api/sites/${id}`, { method: "DELETE" })
  }

  async getAllSites() {
    return this.request<Link[]>("/api/sites", { method: "GET" })
  }

  async addSite(data: Omit<Link, "id">) {
    return this.request<Link>("/api/sites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
  }

  async updateSite(id: number, data: Omit<Link, "id">) {
    return this.request<Link>(`/api/sites/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
  }

  async deleteSite(id: number) {
    return this.request(`/api/sites/${id}`, {
      method: "DELETE",
    })
  }

  async generateDescription(title: string, category: string): Promise<string> {
    const response = await this.request<{ description: string }>(
      "/api/ai/generate-description",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category }),
      }
    )
    return response.description
  }
}

const apiService = new ApiService()
export default apiService
