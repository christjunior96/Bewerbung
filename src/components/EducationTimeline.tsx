import styles from './EducationTimeline.module.scss';
import { portfolioData } from '../data/portfolio';
import ScrollReveal from './ScrollReveal';
import Floating3DBackground from './Floating3DBackground';

export default function EducationTimeline() {
    const { education } = portfolioData;

    return (
        <section id="education" className={`section ${styles.educationSection}`} style={{ position: 'relative', overflow: 'hidden' }}>
            <Floating3DBackground />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <ScrollReveal>
                    <h2 className={styles.sectionTitle}>Ausbildung & Studium</h2>
                </ScrollReveal>

                <div className={styles.timeline}>
                    {education.map((edu, index) => (
                        <ScrollReveal key={index} delay={index * 200}>
                            <div className={styles.timelineItem}>
                                <div className={styles.dot}></div>
                                <div className={styles.content}>
                                    <div className={styles.header}>
                                        <h3 className={styles.institution}>{edu.institution}</h3>
                                        <span className={styles.period}>{edu.period}</span>
                                    </div>
                                    {edu.degree && <h4 className={styles.degree}>{edu.degree}</h4>}
                                    {edu.description && <p className={styles.description}>{edu.description}</p>}
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
