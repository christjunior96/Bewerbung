'use client';

import styles from './Downloads.module.scss';
import { portfolioData } from '../data/portfolio';
import TiltCard from './TiltCard';

export default function Downloads() {
    const { downloads } = portfolioData;

    const sections = [
        {
            title: "Lebenslauf",
            icon: "📄",
            items: downloads.cv
        },
        {
            title: "Arbeitszeugnisse",
            icon: "💼",
            items: downloads.references
        },
        {
            title: "Zertifikate",
            icon: "🎓",
            items: downloads.certificates
        }
    ];

    return (
        <section id="downloads" className={`section ${styles.downloadsSection}`}>
            <div className="container">
                <h2 className={styles.sectionTitle}>Dokumente</h2>
                <div className={styles.grid}>
                    {sections.map((section, idx) => (
                        <TiltCard key={idx} intensity={15}>
                            <div className={styles.downloadCard}>
                                <div className={styles.icon} style={{ transform: "translateZ(50px)" }}>{section.icon}</div>
                                <h3 className={styles.cardTitle} style={{ transform: "translateZ(30px)" }}>{section.title}</h3>
                                <div className={styles.linksContainer} style={{ transform: "translateZ(20px)" }}>
                                    {section.items.map((item, i) => (
                                        <a key={i} href={item.path} download className={styles.downloadLink}>
                                            {item.label} <span>↓</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
