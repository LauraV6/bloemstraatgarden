import React from 'react';
import { motion, useScroll } from "framer-motion";

const ProgressBar = () => {
    const { scrollYProgress } = useScroll();

    return (
        <motion.div className="post-progressbar" style={{ scaleX: scrollYProgress }} />
    )
}

export default ProgressBar