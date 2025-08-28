// Cart & Order Types
export interface CartItem {
  id: string;
  title: string;
  image: string;
  amount: string;
  date: string;
  quantity: number;
}

export interface Customer {
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

export interface OrderRequest {
  items: CartItem[];
  customer: Customer;
  timestamp?: string;
}

export interface OrderResponse {
  success: boolean;
  message: string;
  orderId?: string;
  error?: string;
  totalItems?: number;
}

// Product Types
export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  amount: string;
  date: string;
  available: boolean;
}

// Blog/Post Types
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  image: string;
  tags: string[];
  author?: string;
  slug: string;
}

export interface PostsApiResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  pageSize: number;
}

// Quiz Types
export interface QuizQuestion {
  id: string;
  question: string;
  answers: QuizAnswer[];
  correctAnswerId: string;
}

export interface QuizAnswer {
  id: string;
  text: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
}

// Theme Types
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Navigation Types
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ComponentType;
  children?: NavigationItem[];
}

// API Types
export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
  details?: Record<string, unknown>;
}

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: ApiError;
  success: boolean;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  consent: boolean;
}

export interface NewsletterFormData {
  email: string;
  consent: boolean;
}

// Component Props Types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'water';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

// Utility Types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type AsyncState<T> = {
  data: Nullable<T>;
  loading: boolean;
  error: Nullable<Error>;
};