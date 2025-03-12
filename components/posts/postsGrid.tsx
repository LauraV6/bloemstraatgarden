import { getAllArticles } from "@/../lib/api";
import PostsMap from "./postsMap";
import { draftMode } from "next/headers";

export default async function PostsGrid() {

    const { isEnabled } = await draftMode();
    const articles = await getAllArticles(10, isEnabled);

    return (
        <PostsMap articles={articles} />
    );
}