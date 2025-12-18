'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.scss';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
            setIsScrolled(scrollTop > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        // Trigger once to capture initial state
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Erfahrung', href: '#experience' },
        { name: 'Bildung', href: '#education' },
        { name: 'Downloads', href: '#downloads' },
    ];

    if (isLoginPage) return null;

    return (
        <motion.nav
            className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className={`container ${styles.navContent}`}>
                <a href="#" className={styles.logo}>
                    <span>LC</span>
                </a>

                <ul className={styles.navLinks}>
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <a href={item.href}>{item.name}</a>
                        </li>
                    ))}
                    <li>
                        <a href="mailto:l.christ.bewerbung@gmail.com" className={styles.contactBtn}>
                            Kontakt
                        </a>
                    </li>
                </ul>
            </div>
        </motion.nav>
    );
}
