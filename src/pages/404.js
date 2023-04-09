import React from "react";
import { Link } from 'gatsby'
import Layout from '../components/layout'

const NotFound = () => {
    return (
        <Layout>
            <h1>Pagina niet gevonden...</h1>
            <Link to='/'>Naar startpagina</Link>
        </Layout>
    )
}

export default NotFound