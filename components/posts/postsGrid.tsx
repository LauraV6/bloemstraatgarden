import { getAllArticles } from "@/../lib/api";
import PostsMap from "./postsMap";

export default async function PostsGrid() {

    const articles = await getAllArticles();

    return (
        <PostsMap articles={articles} />
    );
}