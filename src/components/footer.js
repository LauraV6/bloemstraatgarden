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
    return (
        <footer>
            <div className='copyright-bar'>
                <label>Created by {data.site.siteMetadata.author} © 2023</label>
            </div>
        </footer>
    )
}

export default Footer