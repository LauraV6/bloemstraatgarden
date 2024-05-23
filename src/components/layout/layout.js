import React from 'react'
import Header from './header'
import Footer from './footer'
import '../../styles/index.scss'
import { config } from "@fortawesome/fontawesome-svg-core";
import { CartContextProvider } from '../../store/cartContext';
import { UserProgressContextProvider } from '../../store/userProgressContext';
import ShoppingCart from '../order/shoppingCart'
import CheckOut from '../order/checkOut';
config.autoAddCss = false;

const Layout = ({children}) => {

    return (
        <UserProgressContextProvider>
            <CartContextProvider>        
                <Header />
                    {children}
                <Footer />
                <ShoppingCart />
                <CheckOut />
            </CartContextProvider>
        </UserProgressContextProvider>
    )
}

export default Layout