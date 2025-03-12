import posts from "../components/posts/postsMap.module.scss"
import { Hero } from "../components/layout/hero";
import States from "../components/states";
import { metadata } from "./layout";
import { TitleLine } from "../components/titleLine";
import PostsGrid from "../components/posts/postsGrid";
import TipsGrid from "../components/tips/tipsGrid";
import { Suspense } from "react";
import Stock from "../components/stocking/stock";
import PostCardSkeleton from "../components/posts/postCardSkeleton";
import TipCardSkeleton from "../components/tips/tipCardSkeleton";

export default function Home() {
  const title = metadata.title as string;

  return (
    <>
      <main>
        <Hero title={title} paragraph="Ook zelf een moestuin beginnen? Lees in dit blog over onze ervaring, tips and tricks." />
        <section>
            <TitleLine title="Blog Updates" />
            <Suspense fallback={
              <div className={posts.blogGrid}>
                <PostCardSkeleton amount={3} />
              </div>
            }>
              <PostsGrid />
            </Suspense>
        </section>
        <Stock />
        <section>
          <TitleLine title="Tips" />
          <Suspense fallback={
               <TipCardSkeleton amount={5} />
            }>    
            <TipsGrid />
            </Suspense>
        </section>
        <Suspense>
            <States />
          </Suspense>
      </main>
    </>
  );
}