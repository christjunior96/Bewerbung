'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    intensity?: number;
}

export default function TiltCard({ children, className, intensity = 10 }: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    // Mouse position for tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth movement
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    // Rotation values
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${intensity}deg`, `-${intensity}deg`]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${intensity}deg`, `${intensity}deg`]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: "1000px"
            }}
            whileHover={{ scale: 1.02 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
