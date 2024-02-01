import React from 'react';
import { useSiteMetadata } from "../hooks/metadata"
import profile from "../images/profile.jpg";

const Sidebar = () => {  
    const { author, description } = useSiteMetadata()
    return (
        <aside className='aside'>
            <div className='aside__intro'>
                <img src={profile} alt="profile"></img>
                <div>
                    <div>
                        <h4>Hallo, ik ben {author}</h4>
                        <p>{description}</p>
                    </div>
                    <div>
                        <h4>To do</h4>
                        <ul className='todo'>
                            <li>Nieuwe schuur bouwen</li>
                            <li>Veel planten</li>
                            <li>Zithoekjes maken</li>
                            <li>Groente en fruit kweken</li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar