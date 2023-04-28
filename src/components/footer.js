import React from 'react';
import { graphql, useStaticQuery } from 'gatsby'

const Footer = () => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    author
                }
            }
        }
    `)   
    const siteMeta = data.site.siteMetadata;
    const author = siteMeta.author;
    return (
        <footer>
            <div className='copyright-bar'>
                <label>Created by {author} © 2023</label>
            </div>
        </footer>
    )
}

export default Footer