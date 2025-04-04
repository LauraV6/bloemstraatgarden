"use client";

import styles from "./postsMap.module.scss";
import { PostCard } from "./postCard";
import { useState } from "react";
import { motion } from "framer-motion";
import FadeIn from "../fadeIn";

export default function PostsMap({ articles }: any) {
  let showMore = true;

  const [postNum, setPostNum] = useState(6);
  const waveAmount = 9;

  function loadMore() {
    setPostNum((prevPostNum) => prevPostNum + 6);
  }

  articles.length + 1 <= postNum ? (showMore = false) : (showMore = true);

  return (
    <>
      <div className={styles.blogGrid}>
        {articles.slice(0, postNum).map((blog: any) => (
          <div key={blog.sys.id}>
            <FadeIn>
              <PostCard props={blog} />
            </FadeIn>
          </div>
        ))}
      </div>
      <section className={styles.blogBtn}>
        {showMore && (
          <motion.button
            onClick={loadMore}
            whileHover={{ scale: [null, 1.1, 1.05] }}
            transition={{ duration: 0.3 }}
          >
            <span>Geef water voor meer berichten</span>
            {[...Array(waveAmount)].map((e, i) => (
              <div className={styles.wave} key={i}></div>
            ))}
          </motion.button>
        )}
      </section>
    </>
  );
}