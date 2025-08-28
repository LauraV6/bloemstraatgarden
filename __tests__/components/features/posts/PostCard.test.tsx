import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PostCard } from '@/components/features/posts/PostCard';

// Mock Next.js components
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, priority, fill, ...props }: any) => (
    <img 
      src={src} 
      alt={alt} 
      data-priority={priority}
      data-fill={fill}
      {...props}
    />
  ),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock date formatter
jest.mock('@/utils/DateFormatter', () => ({
  formatDate: jest.fn((date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('nl-NL', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  })
}));

describe('PostCard', () => {
  const mockPost = {
    slug: 'test-post',
    title: 'Test Post Title',
    summary: 'This is a test summary for the post card component that will be truncated if it is too long',
    date: '2024-01-15',
    articleImage: {
      url: 'https://example.com/image.jpg',
      title: 'Test Image Title'
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders post title', () => {
    render(<PostCard props={mockPost} />);
    
    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
  });

  it('renders truncated summary', () => {
    render(<PostCard props={mockPost} />);
    
    const summary = screen.getByText(/This is a test summary/);
    expect(summary).toBeInTheDocument();
    expect(summary.textContent).toContain('...');
  });

  it('truncates very long summaries correctly', () => {
    const longSummaryPost = {
      ...mockPost,
      summary: 'A'.repeat(200) // 200 characters
    };

    render(<PostCard props={longSummaryPost} />);
    
    const summary = screen.getByText(/A+/);
    expect(summary.textContent?.length).toBeLessThanOrEqual(174); // 170 chars + "..."
  });

  it('handles short summaries without extra dots', () => {
    const shortSummaryPost = {
      ...mockPost,
      summary: 'Short'
    };

    render(<PostCard props={shortSummaryPost} />);
    
    expect(screen.getByText('Short..')).toBeInTheDocument();
  });

  it('renders formatted date', () => {
    render(<PostCard props={mockPost} />);
    
    const dateElement = screen.getByText('15 januari 2024');
    expect(dateElement).toBeInTheDocument();
    expect(dateElement.tagName).toBe('TIME');
    expect(dateElement).toHaveAttribute('dateTime', '2024-01-15');
  });

  it('renders image with correct attributes', () => {
    render(<PostCard props={mockPost} />);
    
    const image = screen.getByAltText('Test Image Title');
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(image).toHaveAttribute('data-fill', 'true');
  });

  it('uses post title as alt text when image title is missing', () => {
    const postWithoutImageTitle = {
      ...mockPost,
      articleImage: {
        url: 'https://example.com/image.jpg',
        title: undefined
      }
    };

    render(<PostCard props={postWithoutImageTitle} />);
    
    const image = screen.getByAltText('Test Post Title');
    expect(image).toBeInTheDocument();
  });

  it('generates correct link URL without base URL', () => {
    render(<PostCard props={mockPost} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test-post');
  });

  it('generates correct link URL with base URL', () => {
    render(<PostCard props={mockPost} url="/blog" />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/blog/test-post');
  });

  it('adds accessibility label to link', () => {
    render(<PostCard props={mockPost} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', 'Lees meer over: Test Post Title');
  });

  it('applies priority prop to image', () => {
    render(<PostCard props={mockPost} priority={true} />);
    
    const image = screen.getByAltText('Test Image Title');
    expect(image).toHaveAttribute('data-priority', 'true');
    expect(image).toHaveAttribute('loading', 'eager');
  });

  it('applies lazy loading when priority is false', () => {
    render(<PostCard props={mockPost} priority={false} />);
    
    const image = screen.getByAltText('Test Image Title');
    expect(image).toHaveAttribute('data-priority', 'false');
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('uses default priority of false', () => {
    render(<PostCard props={mockPost} />);
    
    const image = screen.getByAltText('Test Image Title');
    expect(image).toHaveAttribute('data-priority', 'false');
  });

  it('applies custom className', () => {
    render(<PostCard props={mockPost} className="custom-class" />);
    
    const article = screen.getByRole('article');
    expect(article).toHaveClass('custom-class');
  });

  it('applies default styles', () => {
    render(<PostCard props={mockPost} />);
    
    const article = screen.getByRole('article');
    expect(article).toHaveClass('postItem');
    expect(article).toHaveClass('active');
  });

  it('handles empty summary gracefully', () => {
    const postWithoutSummary = {
      ...mockPost,
      summary: ''
    };

    render(<PostCard props={postWithoutSummary} />);
    
    expect(screen.queryByText(/\.\./)).toBeInTheDocument();
  });

  it('renders complete post structure', () => {
    render(<PostCard props={mockPost} />);
    
    // Check overall structure
    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();

    // Check link wraps content
    const link = screen.getByRole('link');
    expect(link).toContainElement(screen.getByText('Test Post Title'));
    expect(link).toContainElement(screen.getByAltText('Test Image Title'));

    // Check content hierarchy
    const title = screen.getByText('Test Post Title');
    expect(title.tagName).toBe('H2');
  });

  it('adds title attribute to date for tooltip', () => {
    render(<PostCard props={mockPost} />);
    
    const dateElement = screen.getByText('15 januari 2024');
    expect(dateElement).toHaveAttribute('title', 'Gepubliceerd op 15 januari 2024');
  });

  it('preserves link class for styling', () => {
    render(<PostCard props={mockPost} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveClass('postLink');
  });
});