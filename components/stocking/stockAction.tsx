"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRight } from '@awesome.me/kit-7d648e8e96/icons/duotone/solid'
import { motion } from "framer-motion";
import Link from "next/link";

export default function StackAction() {
    return (
        <motion.div       
            whileHover={{ scale: [null, 1.1, 1.05] }}
            transition={{ duration: 0.3 }}>
            <Link className='button button--cta' href='/verkrijgbaar'>Bekijk onze voorraad <FontAwesomeIcon icon={faRight}/></Link>
        </motion.div>
    );
}