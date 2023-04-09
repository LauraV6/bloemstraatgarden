import React from 'react';
import { graphql, useStaticQuery } from 'gatsby'
import profile from "../images/profile.jpg";

const Aside = () => {  
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    author
                    description
                }
            }
        }
    `) 
    return (
        <aside className='aside'>
            <div className='aside__intro'>
                <div>
                    <img src={profile} alt="profile"></img>
                    <h3>Hallo, ik ben {data.site.siteMetadata.author}</h3>
                    <p>{data.site.siteMetadata.description}</p>
                </div>
                <div>
                    <h3>To do</h3>
                    <ul className='todo'>
                        <li>Nieuwe schuur bouwen</li>
                        <li>Veel planten</li>
                        <li>Zithoekjes maken</li>
                        <li>Groente en fruit kweken</li>
                    </ul>
                </div>
            </div>
        </aside>
    )
}

export default Aside