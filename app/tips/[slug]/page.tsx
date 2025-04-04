import Link from "next/link";
import { getAllTips, getTip } from "@/../lib/api";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRight } from "@awesome.me/kit-7d648e8e96/icons/duotone/solid";
import styles from "../../[slug]/page.module.scss";
import Sidebar from "@/../components/layout/sidebar";
import { notFound } from "next/navigation";
import { BLOCKS } from "@contentful/rich-text-types";
import Image from "next/image";
import { MorePosts } from "../../../components/posts/morePosts";

function renderOptions(links: any) {
  const assetMap = new Map();
  for (const asset of links.assets.block) {
    assetMap.set(asset.sys.id, asset);
  }

  return {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const asset = assetMap.get(node.data.target.sys.id);
        return (
          <Image
            src={asset.url}
            alt={asset.title}
            width={900}
            height={500}
            style={{ width: '100%', height: 'auto' }}
          />
        );
      },
    },
  };
}

export async function generateStaticParams() {
  const AllTips = await getAllTips();

  return AllTips.map((article: any) => ({
    slug: article.slug,
  }));
}

export default async function TipsPage({ params }: { params: any }) {
  const { slug } = await params;
  const article = await getTip(slug);
  const allTips = await getAllTips();

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        return <p>{JSON.stringify(node)}</p>;
      },
    },
  };

  if (!article) {
    notFound();
  }
  return (
    <main>
      <section
        className={styles.postheader}
        style={{ backgroundImage: `url(${article.articleImage.url})` }}
      >
        <div className={styles.postheader__content}>
          <div>
            <h1>{article.title}</h1>
            <span>
              {new Date(article.date).toLocaleDateString("NL", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </section>
      <section className={styles.postcontent}>
        <div>
          <div className="breadcrumbs">
            <Link href="/">Blog</Link>
            <FontAwesomeIcon icon={faRight} />
            <span>{article.title}</span>
          </div>
          <div className={styles.postcontent__story}>
            {documentToReactComponents(
              article.details.json,
              renderOptions(article.details.links)
            )}
          </div>
          <MorePosts title="Meer moestuin tips" slug={article.slug} articles={allTips} url="/tips" />
        </div>
        <Sidebar />
      </section>
    </main>
  );
}