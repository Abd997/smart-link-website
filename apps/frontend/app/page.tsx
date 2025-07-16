"use client"

import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Image from "next/image"
import apiService from "@/utils/apiService"

const Main = styled.main`
  margin: 0 auto;
  padding: 2rem 1rem;
  background: #f8fafc;
  min-height: 100vh;
`

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #1e293b;
  text-align: center;
`

const CategoryBar = styled.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
`

const CategoryButton = styled.button<{ selected: boolean }>`
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  border: none;
  font-weight: 500;
  background: ${({ selected }) => (selected ? "#2563eb" : "#e5e7eb")};
  color: ${({ selected }) => (selected ? "#fff" : "#1e293b")};
  box-shadow: ${({ selected }) => (selected ? "0 2px 8px #2563eb33" : "none")};
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s,
    box-shadow 0.2s;
  &:hover {
    background: ${({ selected }) => (selected ? "#1d4ed8" : "#cbd5e1")};
  }
`

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Card = styled.a`
  display: block;
  border-radius: 1rem;
  box-shadow: 0 2px 12px #00000014;
  background: #fff;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
  transition:
    box-shadow 0.2s,
    transform 0.2s;
  &:hover {
    box-shadow: 0 4px 24px #2563eb22;
    transform: translateY(-2px) scale(1.02);
  }
`

const CardImageWrapper = styled.div`
  width: 100%;
  height: 180px;
  position: relative;
  background: #f1f5f9;
`

const CardContent = styled.div`
  padding: 1.25rem;
`

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1e293b;
`

const CardDesc = styled.p`
  color: #64748b;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
`

const CardCategory = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  background: #f3f4f6;
  border-radius: 9999px;
  color: #334155;
  font-weight: 500;
`

export default function Page() {
  const [links, setLinks] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [categories, setCategories] = useState<string[]>(["All"])

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const fetchedLinks = await apiService.getAllSites()
        setLinks(fetchedLinks)
        const uniqueCategories = Array.from(
          new Set(fetchedLinks.map((link: any) => link.category))
        )
        setCategories(["All", ...uniqueCategories])
      } catch (error) {
        console.error("Error fetching links:", error)
      }
    }
    fetchLinks()
  }, [])

  const filteredLinks =
    selectedCategory === "All"
      ? links
      : links.filter((link) => link.category === selectedCategory)

  return (
    <Main>
      <Title>Public Website Links</Title>
      <CategoryBar>
        {categories.map((cat) => (
          <CategoryButton
            key={cat}
            selected={selectedCategory === cat}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </CategoryButton>
        ))}
      </CategoryBar>
      <Grid>
        {filteredLinks.map((link) => (
          <Card
            key={link.id}
            href={link.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CardImageWrapper>
              <Image
                src={link.coverImage || "/file.svg"}
                alt={link.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 900px) 100vw, 300px"
                unoptimized
              />
            </CardImageWrapper>
            <CardContent>
              <CardTitle>{link.title}</CardTitle>
              <CardDesc>{link.description}</CardDesc>
              <CardCategory>{link.category}</CardCategory>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Main>
  )
}
