'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './page.module.scss';
import SceneLogin from '../../components/SceneLogin';
import TiltCard from '../../components/TiltCard';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const sessionAuth = sessionStorage.getItem('is_authenticated');
        if (sessionAuth === 'true') {
            router.push('/');
        }
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simutlate some work
        setTimeout(() => {
            if (password === 'louis_bewerbung') {
                sessionStorage.setItem('is_authenticated', 'true');
                setError(false);
                router.push('/');
            } else {
                setError(true);
                setPassword('');
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div className={styles.loginPage}>
            <SceneLogin />

            <div className={styles.loginContainer}>
                <TiltCard intensity={10} className={styles.tiltWrapper}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className={styles.loginCard}
                    >
                        <div className={styles.cardContent}>
                            <h1 className={styles.title}>Louis Portfolio</h1>

                            <form onSubmit={handleLogin} className={styles.form}>
                                <div className={styles.inputWrapper}>
                                    <input
                                        type="password"
                                        placeholder="Passwort"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={error ? styles.inputError : ''}
                                        disabled={isLoading}
                                    />
                                </div>

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={styles.errorMessage}
                                    >
                                        Ungültiges Passwort
                                    </motion.div>
                                )}

                                <button
                                    type="submit"
                                    className={`${styles.loginButton} ${isLoading ? styles.loading : ''}`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Lade...' : 'Eintreten'}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </TiltCard>
            </div>
        </div>
    );
}
