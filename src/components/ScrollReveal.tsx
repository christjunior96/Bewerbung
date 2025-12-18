'use client';

import { motion } from 'framer-motion';

interface ScrollRevealProps {
    children: React.ReactNode;
    delay?: number; // ms
    width?: "fit-content" | "100%";
}

export default function ScrollReveal({ children, delay = 0, width = "100%" }: ScrollRevealProps) {
    return (
        <div style={{ position: "relative", width, overflow: "visible" }}>
            <motion.div
                initial={{ opacity: 0, y: 30, rotateX: 15, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                    duration: 0.8,
                    delay: delay / 1000,
                    ease: [0.21, 0.47, 0.32, 0.98]
                }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {children}
            </motion.div>
        </div>
    );
}
