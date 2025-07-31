"use client";

import styles from "./tipsGrid.module.scss";
import { TipCard } from './tipCard';
import { motion } from "framer-motion";

const containerVariants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    initial: { 
        opacity: 0, 
        x: -30,
        scale: 0.95
    },
    animate: { 
        opacity: 1, 
        x: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 20
        }
    }
};

interface TipsGridClientProps {
    tips: any[];
}

export default function TipsGridClient({ tips }: TipsGridClientProps) {
    return (
        <motion.div 
            className={styles.tipsGrid}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            {
                tips.map((tip: any, index: number) => (
                    <motion.div
                        key={tip.sys.id}
                        variants={itemVariants}
                        whileHover={{ 
                            scale: 1.05,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <TipCard props={tip} />
                    </motion.div>
                ))
            }
        </motion.div>
    );
}