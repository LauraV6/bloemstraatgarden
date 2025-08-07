import { Suspense } from "react";
import { Hero } from "@/components/layout/hero";
import { TitleLine } from "@/components/common/TitleLine/titleLine";
import PostsGrid from "@/components/features/posts/postsGrid";
import TipsGrid from "@/components/features/tips/tipsGridWrapper";
import States from "@/components/features/states/states";
import Stock from "@/components/features/stocking/stock";
import PostCardSkeleton from "@/components/features/posts/postCardSkeleton";
import TipCardSkeleton from "@/components/features/tips/tipCardSkeleton";
import posts from "@/components/features/posts/postsMap.module.scss";
import HomePageClient from "@/components/homePageClient";

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
  const siteTitle = "Bloemstraat Garden";

  return (
    <main role="main">
      <HomePageClient siteTitle={siteTitle}>
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
      </HomePageClient>
    </main>
  );
}