'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import styles from './Hero.module.scss';
import { portfolioData } from '../data/portfolio';
import Scene3D from './Scene3D';
import TiltCard from './TiltCard';

export default function Hero() {
    const { hero } = portfolioData;
    const [textIndex, setTextIndex] = useState(0);
    const roles = ["Technischer Projektleiter", "Frontend Entwickler", "UX/UI Enthusiast"];

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8 }
        }
    };

    return (
        <section className={styles.hero}>
            <Scene3D />

            <div className={`container ${styles.heroContent}`}>
                <motion.div
                    className={styles.textContent}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.span variants={itemVariants} className={styles.greeting}>
                        {hero.greeting}
                    </motion.span>

                    <motion.h1 variants={itemVariants} className={styles.name}>
                        {hero.name}
                    </motion.h1>

                    <motion.div variants={itemVariants} className={styles.roleContainer}>
                        <span className={styles.roleStatic}>Ich bin </span>
                        <div className={styles.roleWrapper}>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={textIndex}
                                    className={styles.roleDynamic}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {roles[textIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    <motion.p variants={itemVariants} className={styles.description}>
                        {hero.description}
                    </motion.p>

                    <motion.div variants={itemVariants} className={styles.ctaGroup}>
                        <a href="mailto:l.christ.bewerbung@gmail.com" className={styles.btnPrimary}>
                            Projekt anfragen
                            <span className={styles.btnIcon}>→</span>
                        </a>
                        <a href="#experience" className={styles.btnSecondary}>Erfahrungen</a>
                    </motion.div>
                </motion.div>

                <TiltCard
                    className={styles.imageWrapper}
                    intensity={15}
                >
                    <div className={styles.floatingCard} style={{ transform: "translateZ(0)" }}>
                        <div className={styles.imageInner}>
                            {hero.image ? (
                                <img
                                    src={hero.image.startsWith('/') || hero.image.startsWith('http') ? hero.image : `/${hero.image}`}
                                    alt={hero.name}
                                    className={styles.profileImage}
                                />
                            ) : (
                                <span>LC</span>
                            )}
                        </div>
                    </div>

                    {/* Interactive Badges with extra motion and 3D depth */}
                    <motion.div
                        className={`${styles.badge} ${styles.badge1}`}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        style={{ transform: "translateZ(120px)" }}
                    >
                        <span>🚀</span> React & Next.js
                    </motion.div>
                    <motion.div
                        className={`${styles.badge} ${styles.badge2}`}
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        style={{ transform: "translateZ(100px)" }}
                    >
                        <span>💼</span> PM Expert
                    </motion.div>
                </TiltCard>
            </div>

            <motion.div
                className={styles.scrollIndicator}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
            >
                <div className={styles.mouse}>
                    <div className={styles.wheel}></div>
                </div>
            </motion.div>
        </section>
    );
}
