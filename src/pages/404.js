import React from "react";
import { Link } from 'gatsby'
import Aside from '../components/aside'
import Layout from '../components/layout'

const NotFound = () => {
    return (
        <Layout>
            <main class="post-content">
                <div>
                    <h1>🤔 Pagina niet gevonden...</h1>
                    <p>Niet getreurd! Er zijn genoeg andere verhalen te lezen. Ga terug naar de start pagina om ze allemaal te bekijken.</p>
                    <Link to='/'>Terug naar startpagina</Link>                  
                </div>
                <Aside />
            </main>
        </Layout>
    )
}

export default NotFound