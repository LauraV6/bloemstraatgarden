import React from 'react';
import { useSiteMetadata } from "../../hooks/metadata";
import profile from "../../images/profile.jpg";
import { Link } from 'gatsby';
import { motion } from "framer-motion";

const Sidebar = () => {  
    const { author, description } = useSiteMetadata()
    return (
        <aside className='aside'>
            <div className='aside__content'>
                <div className='intro'>
                    <img src={profile} alt="profile"></img>
                    <div>
                        <div>
                            <h4>Hallo, ik ben {author}</h4>
                            <p>{description}</p>
                        </div>
                    </div>
                </div>
                <div className='test'>
                    <div>
                        <div>
                            <h4>Wil je jouw moestuin kennis testen?</h4>
                            <p>Doe mee aan onze moestuin quiz en stel jouw kennis op de proef! Elke maand zijn er nieuwe vragen.</p>
                        </div>
                        <motion.div       
                            whileHover={{ scale: [null, 1.1, 1.05] }}
                            transition={{ duration: 0.3 }}>
                            <Link className='button button--cta' to='/quiz'>Start de quiz</Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar