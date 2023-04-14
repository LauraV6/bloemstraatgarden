import React from 'react'
import Header from './header'
import Footer from './footer'
import '../styles/index.scss'
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

const Layout = (props) => {

    return (
        <>
            <Header />
            {props.children}
            <Footer />
        </>
    )
}

export default Layout