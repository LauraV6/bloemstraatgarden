import { Suspense } from "react";
import { metadata } from "./layout";
import { Hero } from "../components/layout/hero";
import { TitleLine } from "../components/titleLine";
import PostsGrid from "../components/posts/postsGrid";
import TipsGrid from "../components/tips/tipsGrid";
import States from "../components/states";
import Stock from "../components/stocking/stock";
import PostCardSkeleton from "../components/posts/postCardSkeleton";
import TipCardSkeleton from "../components/tips/tipCardSkeleton";
import posts from "../components/posts/postsMap.module.scss";

// Remove the HomePageProps interface - not needed for Next.js app directory pages

interface PageSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

// Constants
const PAGE_CONTENT = {
  heroSubtitle: "Ook zelf een moestuin beginnen? Lees in dit blog over onze ervaring, tips and tricks.",
  sections: {
    blog: "Blog Updates",
    tips: "Tips"
  },
  skeletonCounts: {
    posts: 3,
    tips: 5
  }
} as const;

// Page Section Component
const PageSection: React.FC<PageSectionProps> = ({ title, children, className }) => (
  <section className={className}>
    <TitleLine title={title} />
    {children}
  </section>
);

// Loading Components
const PostsLoadingFallback = () => (
  <div className={posts.blogGrid}>
    <PostCardSkeleton amount={PAGE_CONTENT.skeletonCounts.posts} />
  </div>
);

const TipsLoadingFallback = () => (
  <TipCardSkeleton amount={PAGE_CONTENT.skeletonCounts.tips} />
);

// Remove the props parameter - Next.js app directory pages don't receive props
export default function Home() {
  // Safely extract metadata with fallback
  const siteTitle = (metadata.title as string) || "Bloemstraat Garden";

  return (
    <main role="main">
      <Hero title={siteTitle} paragraph={PAGE_CONTENT.heroSubtitle}/>

      {/* Blog Posts Section */}
      <PageSection title={PAGE_CONTENT.sections.blog}>
        <Suspense fallback={<PostsLoadingFallback />}>
          <PostsGrid />
        </Suspense>
      </PageSection>

      {/* Stock Section */}
      <Suspense fallback={<div>Laden...</div>}>
        <Stock />
      </Suspense>

      {/* Tips Section */}
      <PageSection title={PAGE_CONTENT.sections.tips}>
        <Suspense fallback={<TipsLoadingFallback />}>
          <TipsGrid />
        </Suspense>
      </PageSection>

      {/* States Section */}
      <Suspense fallback={<div>Statistieken laden...</div>}>
        <States />
      </Suspense>
    </main>
  );
}