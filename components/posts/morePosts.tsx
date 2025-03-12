"use client";

import styles from "./postsMap.module.scss";
import FadeIn from "../fadeIn";
import { PostCard } from "./postCard";
import { Suspense } from "react";
import PostCardSkeleton from "./postCardSkeleton";
import { shuffle } from "../../utils/shuffle";

interface Props {
    title: any;
    slug: any;
    articles: any;
    url? : any;
  }

export const MorePosts:  React.FC<Props> = ({ title, slug, articles, url }) => {
  const allPosts = articles.map((allposts: any) => ({ ...allposts }));
  const filteredPosts = allPosts.filter((post: any) => slug !== post.slug);
  const shuffledPosts = shuffle(filteredPosts).slice(0, 3);

  return (
    <div className={styles.morePosts}>
      <h3>{title}</h3>
      <div className={styles.blogGrid}>
        <Suspense
          fallback={
            <div className={styles.blogGrid}>
              <PostCardSkeleton amount={3} />
            </div>
          }
        >
          {shuffledPosts.map((blog: any) => (
            <FadeIn key={blog.sys.id}>
              <PostCard props={blog} url={url} />
            </FadeIn>
          ))}
        </Suspense>
      </div>
    </div>
  );
}
