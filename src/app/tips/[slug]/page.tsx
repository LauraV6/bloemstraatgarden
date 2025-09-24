import type { Metadata } from "next";
import TipsPageClient from "@/components/TipsPageClient";
import TipPostDetail from "@/components/features/tips/TipPostDetail";

interface TipsPageParams {
  slug: string;
}

interface TipsPageProps {
  params: Promise<TipsPageParams>;
}

export async function generateMetadata(): Promise<Metadata> {
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