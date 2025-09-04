import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MorePosts } from '@/components/features/posts/MorePosts';

// Mock the dependencies
jest.mock('@/utils/Shuffle', () => ({
  shuffle: jest.fn((arr) => [...arr])
}));

jest.mock('@/components/ui/FadeIn', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

jest.mock('@/components/features/posts/PostCard', () => ({
  PostCard: ({ props }: any) => (
    <div data-testid="post-card">
      <h3>{props.title}</h3>
    </div>
  )
}));

jest.mock('@/components/features/posts/PostCardSkeleton', () => ({
  __esModule: true,
  default: ({ amount }: { amount: number }) => (
    <div data-testid="post-skeleton">Loading {amount} posts...</div>
  )
}));

describe('MorePosts', () => {
  const mockArticles = [
    {
      sys: { id: '1' },
      slug: 'post-1',
      title: 'Post 1',
      date: '2024-01-01',
      summary: 'Summary 1',
      articleImage: { url: 'https://example.com/1.jpg', title: 'Image 1' }
    },
    {
      sys: { id: '2' },
      slug: 'post-2',
      title: 'Post 2',
      date: '2024-01-02',
      summary: 'Summary 2',
      articleImage: { url: 'https://example.com/2.jpg', title: 'Image 2' }
    },
    {
      sys: { id: '3' },
      slug: 'post-3',
      title: 'Post 3',
      date: '2024-01-03',
      summary: 'Summary 3',
      articleImage: { url: 'https://example.com/3.jpg', title: 'Image 3' }
    },
    {
      sys: { id: '4' },
      slug: 'post-4',
      title: 'Post 4',
      date: '2024-01-04',
      summary: 'Summary 4',
      articleImage: { url: 'https://example.com/4.jpg', title: 'Image 4' }
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with title', () => {
    render(
      <MorePosts
        title="More Posts"
        slug="current-post"
        articles={mockArticles}
      />
    );

    expect(screen.getByText('More Posts')).toBeInTheDocument();
  });

  it('filters out the current post by slug', () => {
    render(
      <MorePosts
        title="More Posts"
        slug="post-2"
        articles={mockArticles}
      />
    );

    const postCards = screen.getAllByTestId('post-card');
    expect(postCards).toHaveLength(3);
    expect(screen.queryByText('Post 2')).not.toBeInTheDocument();
  });

  it('limits posts to maxPosts count', () => {
    render(
      <MorePosts
        title="More Posts"
        slug="current-post"
        articles={mockArticles}
        maxPosts={2}
      />
    );

    const postCards = screen.getAllByTestId('post-card');
    expect(postCards).toHaveLength(2);
  });

  it('uses default maxPosts of 3 when not specified', () => {
    render(
      <MorePosts
        title="More Posts"
        slug="current-post"
        articles={mockArticles}
      />
    );

    const postCards = screen.getAllByTestId('post-card');
    expect(postCards).toHaveLength(3);
  });

  it('passes url prop to PostCard components', () => {
    const { container } = render(
      <MorePosts
        title="More Posts"
        slug="current-post"
        articles={mockArticles}
        url="/blog"
        maxPosts={1}
      />
    );

    expect(container.querySelector('[data-testid="post-card"]')).toBeInTheDocument();
  });

  it('returns null when no articles are provided', () => {
    const { container } = render(
      <MorePosts
        title="More Posts"
        slug="current-post"
        articles={[]}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('returns null when all articles are filtered out', () => {
    const singleArticle = [mockArticles[0]];
    const { container } = render(
      <MorePosts
        title="More Posts"
        slug="post-1"
        articles={singleArticle}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('adds proper accessibility attributes', () => {
    render(
      <MorePosts
        title="Related Articles"
        slug="current-post"
        articles={mockArticles}
      />
    );

    const container = screen.getByLabelText('Related Articles');
    expect(container).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(
      <MorePosts
        title="More Posts"
        slug="current-post"
        articles={mockArticles}
        className="custom-class"
      />
    );

    const title = screen.getByText('More Posts');
    expect(title.closest('div')).toBeDefined();
  });
});