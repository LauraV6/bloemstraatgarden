import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRight } from "@awesome.me/kit-7d648e8e96/icons/duotone/solid";
import { BLOCKS } from "@contentful/rich-text-types";
import type { Document, Block } from "@contentful/rich-text-types";
import type { Metadata } from "next";
import Sidebar from "@/components/layout/Sidebar";
import { MorePosts } from "@/components/features/posts/MorePosts";
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

interface ContentfulLinks {
  assets: {
    block: ContentfulAsset[];
  };
}

interface Article {
  slug: string;
  title: string;
  date: string;
  articleImage: {
    url: string;
    title?: string;
  };
  details: {
    json: Document;
    links: ContentfulLinks;
  };
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