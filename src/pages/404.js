import React from "react";
import { Link } from 'gatsby'
import Sidebar from '../components/sidebar'
import Layout from '../components/layout'
import { Helmet } from 'react-helmet'

const NotFound = () => {
    return (
        <Layout>
            <Helmet>
                <title>Bloemstraat pagina niet gevonden</title>
            </Helmet>
            <main className="post-content">
                <div>
                    <h1>🤔 Pagina niet gevonden...</h1>
                    <p>Niet getreurd! Er zijn genoeg andere verhalen te lezen. Ga terug naar de start pagina om ze allemaal te bekijken.</p>
                    <Link to='/'>Terug naar startpagina</Link>                  
                </div>
                <Sidebar />
            </main>
        </Layout>
    )
}

export default NotFound