import React from 'react'
import PostCard from "./postCard";
import useAllPosts from '../hooks/allposts';
import { shuffle } from '../utils/helpers';

const MorePosts = ( bottom ) => {
    const { allposts } = useAllPosts();
    const newPostsArray = allposts.map(allposts => ({...allposts}))
    const filteredPosts = newPostsArray.filter(post => post.node.title !== newPostsArray.title);
    const shuffledPosts = shuffle(filteredPosts).slice(0, 3);

    return (
        <div className={`more-posts ${bottom ? 'more-posts--bottom' : ''}`}>
            <h3>Bekijk posts over onze tuin</h3>
            <div className='more-posts__container'>
                <div className='post-items'>
                {shuffledPosts.map((edge, key) => {
                    const post = edge.node;
                    return <PostCard 
                                key={key}
                                slug={post.slug}
                                img={post.featuredimage.url} 
                                alt={post.featuredimage.title} 
                                title={post.title} 
                                description={post.description.description}
                                recommend={true}
                                publishedDate={post.publishedDate}
                            />;
                })}
                </div>
            </div>
        </div>
    )
}

export default MorePosts