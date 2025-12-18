import styles from './Experience.module.scss';
import { portfolioData } from '../data/portfolio';
import EmployerSection from './EmployerSection';
import Floating3DBackground from './Floating3DBackground';

export default function Experience() {
    const { employers } = portfolioData;

    return (
        <section id="experience" className={`section ${styles.experienceSection}`} style={{ position: 'relative', overflow: 'hidden' }}>
            <Floating3DBackground variant="experience" />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <h2 className={styles.sectionTitle}>Berufserfahrung & Projekte</h2>
                <div className={styles.list}>
                    {employers.map((employer, index) => (
                        <EmployerSection key={index} employer={employer} />
                    ))}
                </div>
            </div>
        </section>
    );
}
