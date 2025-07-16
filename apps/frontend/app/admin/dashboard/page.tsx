"use client"

import React, { useState, useEffect } from "react"
import styled from "styled-components"
import apiService from "@/utils/apiService"

const categories = ["Technology", "Design", "Education", "Business", "Health"]

export type Link = {
    id: number
    siteUrl: string
    title: string
    coverImage: string
    category: string
    description: string
}

const Container = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  @media (max-width: 600px) {
    margin: 16px auto;
    padding: 8px;
    border-radius: 8px;
  }
`

const Section = styled.div`
  margin-bottom: 32px;
  @media (max-width: 600px) {
    margin-bottom: 20px;
  }
`

const FormRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  align-items: center;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 8px;
    align-items: stretch;
  }
`

const Label = styled.label`
  min-width: 120px;
  font-weight: 500;
`

const Input = styled.input`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  flex: 1;
  font-size: 1rem;
  @media (max-width: 600px) {
    font-size: 0.95rem;
    padding: 6px;
  }
`

const Select = styled.select`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  @media (max-width: 600px) {
    font-size: 0.95rem;
    padding: 6px;
  }
`

const Button = styled.button`
  padding: 8px 16px;
  background: #0078d4;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  &:hover {
    background: #005fa3;
  }
  @media (max-width: 600px) {
    padding: 8px 12px;
    font-size: 0.95rem;
  }
`

const DescriptionBox = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  resize: vertical;
  font-size: 1rem;
  @media (max-width: 600px) {
    font-size: 0.95rem;
    padding: 6px;
    min-height: 60px;
  }
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  font-size: 1rem;
  @media (max-width: 600px) {
    font-size: 0.95rem;
  }
`

const Th = styled.th`
  background: #f4f4f4;
  padding: 12px;
  border-bottom: 2px solid #eaeaea;
  text-align: left;
  @media (max-width: 600px) {
    padding: 8px;
  }
`

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #eaeaea;
  @media (max-width: 600px) {
    padding: 8px;
  }
`

const SearchFilterRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 8px;
  }
`

const CategoryFilter = styled.select`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  @media (max-width: 600px) {
    font-size: 0.95rem;
    padding: 6px;
  }
`

const ErrorComponent = styled.div`
  color: #d32f2f;
  background: #fff0f0;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  text-align: center;
`

export default function AdminDashboard() {
    const [links, setLinks] = useState<Link[]>([])
    const [form, setForm] = useState({
        siteUrl: "",
        title: "",
        coverImage: "",
        category: categories[0],
        description: "",
    })
    const [editingId, setEditingId] = useState<number | null>(null)
    const [search, setSearch] = useState("")
    const [filterCategory, setFilterCategory] = useState("All")
    const [aiLoading, setAiLoading] = useState(false)
    const [error, setError] = useState("")

    const fetchLinks = async () => {
        try {
            const fetchedLinks = await apiService.getAllSites()
            setLinks(fetchedLinks)
        } catch (error: unknown) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Error fetching links'

            setError(message)
        }
    }

    useEffect(() => {
        fetchLinks()
    }, [])

    const handleFormChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleAddOrChange = async () => {
        if (!form.siteUrl || !form.title) return
        try {
            if (editingId !== null) {
                await apiService.updateSite(editingId, form)
                setEditingId(null)
            } else {
                await apiService.addSite(form)
            }
            fetchLinks()
            setForm({
                siteUrl: "",
                title: "",
                coverImage: "",
                category: categories[0],
                description: "",
            })
            setError("")
        } catch (error: unknown) {
                const message =
                    error instanceof Error
                        ? error.message
                        : 'Error adding or changing link'

                setError(message)
        }
    }

    const handleEdit = (id: number) => {
        const link = links.find((l) => l.id === id)
        if (link) {
            setForm({
                siteUrl: link.siteUrl,
                title: link.title,
                coverImage: link.coverImage,
                category: link.category,
                description: link.description,
            })
            setEditingId(id)
        }
    }

    const handleRemove = async (id: number) => {
        try {
            await apiService.deleteSite(id)
            fetchLinks()
            if (editingId === id) {
                setEditingId(null)
                setForm({
                    siteUrl: "",
                    title: "",
                    coverImage: "",
                    category: categories[0],
                    description: "",
                })
            }
            setError("")
        } catch (error: unknown) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Error removing link"
            setError(message)
        }
    }

    const handleAskAI = async () => {
        setAiLoading(true)
        try {
            const aiDescription = await apiService.generateDescription(
                form.title,
                form.category
            )
            setForm((form) => ({
                ...form,
                description: aiDescription,
            }))
            setError("")
        } catch (error: unknown) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Error generating AI description"
            setError(message)
        } finally {
            setAiLoading(false)
        }
    }

    const filteredLinks = links.filter((link) => {
        const matchesSearch =
            link.title.toLowerCase().includes(search.toLowerCase()) ||
            link.siteUrl.toLowerCase().includes(search.toLowerCase())
        const matchesCategory = filterCategory === "All" || link.category === filterCategory
        return matchesSearch && matchesCategory
    })

    return (
        <Container>
            <Section>
                <h2>Manage Links</h2>
                {error && <ErrorComponent>{error}</ErrorComponent>}
                <FormRow>
                    <Label htmlFor="siteUrl">Website Address</Label>
                    <Input
                        name="siteUrl"
                        value={form.siteUrl}
                        onChange={handleFormChange}
                        placeholder="https://example.com"
                    />
                </FormRow>
                <FormRow>
                    <Label htmlFor="title">Title</Label>
                    <Input
                        name="title"
                        value={form.title}
                        onChange={handleFormChange}
                        placeholder="Website Title"
                    />
                </FormRow>
                <FormRow>
                    <Label htmlFor="picture">Picture Link</Label>
                    <Input
                        name="picture"
                        value={form.coverImage}
                        onChange={handleFormChange}
                        placeholder="https://image.com/pic.jpg"
                    />
                </FormRow>
                <FormRow>
                    <Label htmlFor="category">Category</Label>
                    <Select name="category" value={form.category} onChange={handleFormChange}>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </Select>
                </FormRow>
                <FormRow>
                    <Label htmlFor="description">Description</Label>
                    <DescriptionBox
                        name="description"
                        value={form.description}
                        onChange={handleFormChange}
                        placeholder="Description of the website"
                    />
                </FormRow>
                <Button type="button" onClick={handleAddOrChange}>
                    {editingId !== null ? "Change Link" : "Add Link"}
                </Button>
                <Button
                    type="button"
                    onClick={handleAskAI}
                    disabled={aiLoading}
                    style={{ marginLeft: "16px", minWidth: "180px" }}
                >
                    {aiLoading ? "Asking AI..." : "Ask AI for Description"}
                </Button>
            </Section>

            <Section>
                <h2>Links List</h2>
                <SearchFilterRow>
                    <Input
                        placeholder="Search by Title or Website"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <CategoryFilter
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <option value="All">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </CategoryFilter>
                </SearchFilterRow>
                <Table>
                    <thead>
                        <tr>
                            <Th>Title</Th>
                            <Th>Category</Th>
                            <Th>Description</Th>
                            <Th>Actions</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLinks.map((link) => (
                            <tr key={link.id}>
                                <Td>{link.title}</Td>
                                <Td>{link.category}</Td>
                                <Td>{link.description}</Td>
                                <Td style={{ display: "flex", gap: "8px" }}>
                                    <Button type="button" onClick={() => handleEdit(link.id)}>
                                        Change
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => handleRemove(link.id)}
                                        style={{ background: "#d32f2f" }}
                                    >
                                        Remove
                                    </Button>
                                </Td>
                            </tr>
                        ))}
                        {filteredLinks.length === 0 && (
                            <tr>
                                <Td colSpan={4} style={{ textAlign: "center", color: "#888" }}>
                                    No links found.
                                </Td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Section>
        </Container>
    )
}
