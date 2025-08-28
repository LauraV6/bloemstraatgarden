import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostsMap from '@/components/features/posts/PostsMap';

// Mock framer-motion properly to avoid prop warnings
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, layout, variants, initial, animate, exit, whileHover, transition, ...props }: any) => (
      <div {...props}>{children}</div>
    ),
    button: ({ children, whileHover, transition, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
    section: ({ children, initial, animate, transition, ...props }: any) => (
      <section {...props}>{children}</section>
    ),
  },
  AnimatePresence: ({ children, mode }: any) => <>{children}</>,
}));

// Mock PostCard component
jest.mock('@/components/features/posts/PostCard', () => ({
  PostCard: ({ props, priority }: any) => (
    <div data-testid="post-card" data-priority={priority}>
      <h3>{props.title}</h3>
      <p>{props.summary}</p>
    </div>
  )
}));

describe('PostsMap', () => {
  const mockArticles = Array.from({ length: 10 }, (_, i) => ({
    sys: { id: `post-${i + 1}` },
    slug: `post-${i + 1}`,
    title: `Post ${i + 1}`,
    date: '2024-01-01',
    summary: `Summary for post ${i + 1}`,
    articleImage: { url: `https://example.com/${i + 1}.jpg`, title: `Image ${i + 1}` }
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders initial posts correctly', () => {
    render(<PostsMap articles={mockArticles} />);

    const postCards = screen.getAllByTestId('post-card');
    expect(postCards).toHaveLength(6); // Default initialPostCount
  });

  it('renders with custom initialPostCount', () => {
    render(<PostsMap articles={mockArticles} initialPostCount={3} />);

    const postCards = screen.getAllByTestId('post-card');
    expect(postCards).toHaveLength(3);
  });

  it('shows load more button when there are more posts', () => {
    render(<PostsMap articles={mockArticles} initialPostCount={3} />);

    expect(screen.getByText('Geef water voor meer berichten')).toBeInTheDocument();
  });

  it('hides load more button when all posts are displayed', () => {
    const threeArticles = mockArticles.slice(0, 3);
    render(<PostsMap articles={threeArticles} initialPostCount={3} />);

    expect(screen.queryByText('Geef water voor meer berichten')).not.toBeInTheDocument();
  });

  it('loads more posts when button is clicked', () => {
    render(<PostsMap articles={mockArticles} initialPostCount={3} loadMoreIncrement={2} />);

    const loadMoreButton = screen.getByText('Geef water voor meer berichten');
    fireEvent.click(loadMoreButton);

    const postCards = screen.getAllByTestId('post-card');
    expect(postCards).toHaveLength(5); // 3 initial + 2 increment
  });

  it('applies priority to first two posts', () => {
    render(<PostsMap articles={mockArticles} />);

    const postCards = screen.getAllByTestId('post-card');
    expect(postCards[0]).toHaveAttribute('data-priority', 'true');
    expect(postCards[1]).toHaveAttribute('data-priority', 'true');
    expect(postCards[2]).toHaveAttribute('data-priority', 'false');
  });

  it('renders empty state when no articles', () => {
    render(<PostsMap articles={[]} />);

    expect(screen.getByText('Geen artikelen beschikbaar.')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('handles null articles array', () => {
    render(<PostsMap articles={null as any} />);

    expect(screen.getByText('Geen artikelen beschikbaar.')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <PostsMap articles={mockArticles} className="custom-class" />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('passes url prop to PostCard components', () => {
    render(<PostsMap articles={mockArticles} url="/blog" initialPostCount={1} />);

    expect(screen.getByTestId('post-card')).toBeInTheDocument();
  });

  it('loads more posts multiple times', () => {
    render(<PostsMap articles={mockArticles} initialPostCount={2} loadMoreIncrement={2} />);

    // First load more
    fireEvent.click(screen.getByText('Geef water voor meer berichten'));
    expect(screen.getAllByTestId('post-card')).toHaveLength(4);

    // Second load more
    fireEvent.click(screen.getByText('Geef water voor meer berichten'));
    expect(screen.getAllByTestId('post-card')).toHaveLength(6);

    // Third load more
    fireEvent.click(screen.getByText('Geef water voor meer berichten'));
    expect(screen.getAllByTestId('post-card')).toHaveLength(8);
  });

  it('hides load more button after loading all posts', () => {
    render(<PostsMap articles={mockArticles.slice(0, 4)} initialPostCount={2} loadMoreIncrement={2} />);

    expect(screen.getByText('Geef water voor meer berichten')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Geef water voor meer berichten'));

    expect(screen.queryByText('Geef water voor meer berichten')).not.toBeInTheDocument();
    expect(screen.getAllByTestId('post-card')).toHaveLength(4);
  });

  it('renders correct aria labels', () => {
    render(<PostsMap articles={mockArticles} initialPostCount={3} />);

    const loadMoreSection = screen.getByLabelText('Meer artikelen laden');
    expect(loadMoreSection).toBeInTheDocument();

    const loadMoreButton = screen.getByRole('button', { 
      name: /Geef water voor meer berichten - Laad meer artikelen/i 
    });
    expect(loadMoreButton).toBeInTheDocument();
  });

  it('maintains post order when loading more', () => {
    render(<PostsMap articles={mockArticles} initialPostCount={2} loadMoreIncrement={2} />);

    let postCards = screen.getAllByTestId('post-card');
    expect(postCards[0]).toHaveTextContent('Post 1');
    expect(postCards[1]).toHaveTextContent('Post 2');

    fireEvent.click(screen.getByText('Geef water voor meer berichten'));

    postCards = screen.getAllByTestId('post-card');
    expect(postCards[0]).toHaveTextContent('Post 1');
    expect(postCards[1]).toHaveTextContent('Post 2');
    expect(postCards[2]).toHaveTextContent('Post 3');
    expect(postCards[3]).toHaveTextContent('Post 4');
  });
});