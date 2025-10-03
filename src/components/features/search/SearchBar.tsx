'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { useArticles } from '@/hooks/useContentful'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 2rem;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 20px;
  font-size: 16px;
  border: 1px solid #a8a8a8ff;
  border-radius: 25px;
  outline: none;
  transition: border-color 0.3s;
  background: ${props => props.theme.colors.transparent1};
  color: ${props => props.theme.colors.text};
  text-align: center;
  max-width: 400px;

  &:focus {
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    background-color: ${props => props.theme.colors.gray[100]};
  }
`

const SearchResults = styled.div<{ position?: { top: number; left: number; width: number } }>`
  position: fixed;
  ${props => props.position && css`
    top: ${props.position.top}px;
    left: ${props.position.left}px;
    width: ${props.position.width}px;
  `}
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 10px;
  box-shadow: ${props => props.theme.shadows.lg};
  max-height: 400px;
  overflow-y: auto;
  z-index: 9999;
`

const ResultItem = styled(Link)`
  display: block;
  padding: 12px 20px;
  color: ${props => props.theme.colors.text};
  transition: background-color 0.2s;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  border-radius: 0;

  &:hover {
    background-color: ${props => props.theme.colors.green5};
  }

  &:focus {
    outline: none;
    background-color: ${props => props.theme.colors.transparent};
  }

  &:last-child {
    border-bottom: none;
  }
`

const ResultTitle = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`

const ResultSummary = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const NoResults = styled.div`
  padding: 20px;
  text-align: center;
  color: ${props => props.theme.colors.textMuted};
`

const LoadingMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
`

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [inputPosition, setInputPosition] = useState<{ top: number; left: number; width: number } | null>(null)
  const [mounted, setMounted] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Fetch articles with error handling
  const { articles, loading, error } = useArticles(100)

  // Check if API is available
  const isDisabled = !!error || (!loading && (!articles || articles.length === 0))

  // Set mounted state
  useEffect(() => {
    setMounted(true)
  }, [])

  // Update position when showing results
  useEffect(() => {
    if (showResults && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect()
      setInputPosition({
        top: rect.bottom,
        left: rect.left,
        width: rect.width
      })
    }
  }, [showResults])

  // Update position on scroll/resize
  useEffect(() => {
    const updatePosition = () => {
      if (showResults && inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect()
        setInputPosition({
          top: rect.bottom,
          left: rect.left,
          width: rect.width
        })
      }
    }

    if (showResults) {
      window.addEventListener('scroll', updatePosition)
      window.addEventListener('resize', updatePosition)

      return () => {
        window.removeEventListener('scroll', updatePosition)
        window.removeEventListener('resize', updatePosition)
      }
    }
  }, [showResults])

  // Filter articles based on search term using useMemo
  const filteredArticles = useMemo(() => {
    if (!searchTerm.trim() || !articles || articles.length === 0) {
      return []
    }

    const lowerSearchTerm = searchTerm.toLowerCase()

    return articles
      .filter(article =>
        article?.title?.toLowerCase().includes(lowerSearchTerm) ||
        article?.summary?.toLowerCase().includes(lowerSearchTerm)
      )
      .slice(0, 8)
  }, [searchTerm, articles])

  // Handle clicking outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (searchRef.current && !searchRef.current.contains(target)) {
        // Check if click is on portal content
        const portalElement = document.getElementById('search-portal-content')
        if (portalElement && !portalElement.contains(target)) {
          setShowResults(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    if (e.target.value.trim()) {
      setShowResults(true)
    } else {
      setShowResults(false)
    }
  }

  const handleResultClick = () => {
    setSearchTerm('')
    setShowResults(false)
  }

  // Log error for debugging
  if (error) {
    console.error('SearchBar API error:', error)
  }

  return (
    <SearchContainer ref={searchRef}>
      <SearchInput
        ref={inputRef}
        type="search"
        placeholder={isDisabled ? "Zoeken tijdelijk niet beschikbaar" : "Zoek moestuin artikel..."}
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => {
          if (searchTerm.trim() && !isDisabled) {
            setShowResults(true)
          }
        }}
        disabled={isDisabled}
        title={isDisabled ? "Zoekfunctie is momenteel niet beschikbaar" : undefined}
      />

      {mounted && showResults && searchTerm.trim() && !isDisabled && inputPosition && createPortal(
        <SearchResults id="search-portal-content" position={inputPosition}>
          {loading && (
            <LoadingMessage>Zoeken...</LoadingMessage>
          )}

          {!loading && filteredArticles.length > 0 && (
            <>
              {filteredArticles.map((article) => (
                <ResultItem
                  key={article.sys.id}
                  href={`/${article.slug}`}
                  onClick={handleResultClick}
                >
                  <ResultTitle>{article.title}</ResultTitle>
                  {article.summary && (
                    <ResultSummary>{article.summary}</ResultSummary>
                  )}
                </ResultItem>
              ))}
            </>
          )}

          {!loading && filteredArticles.length === 0 && (
            <NoResults>Geen artikelen gevonden</NoResults>
          )}
        </SearchResults>,
        document.body
      )}
    </SearchContainer>
  )
}

export default SearchBar