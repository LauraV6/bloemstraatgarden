import type { Document } from "@contentful/rich-text-types";
import type { Metadata } from "next";
import TipsPageClient from "@/components/TipsPageClient";
import TipPostDetail from "@/components/features/tips/TipPostDetail";

interface TipsPageParams {
  slug: string;
}

interface TipsPageProps {
  params: Promise<TipsPageParams>;
}

interface ContentfulAsset {
  sys: { id: string };
  url: string;
  title: string;
  description?: string;
}

// Since this page now uses TipPostDetail component with its own styled components,
// we don't need the local styles anymore

// Generate metadata for each tip page
export async function generateMetadata({ params }: TipsPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  return {
    title: `Moestuin Tips - Bloemstraat Garden`,
    description: `Lees onze moestuin tips`,
  };
}

// Static params generation - disabled for now since we're using Apollo
export async function generateStaticParams(): Promise<TipsPageParams[]> {
  return [];
}

export default async function TipsPage({ params }: TipsPageProps) {
  const { slug } = await params;
  
  return (
    <main role="main">
      <TipsPageClient>
        <TipPostDetail slug={slug} />
      </TipsPageClient>
    </main>
  );
}