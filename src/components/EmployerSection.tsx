import styles from './EmployerSection.module.scss';
import { Employer } from '../data/portfolio';
import ProjectCard from './ProjectCard';
import ScrollReveal from './ScrollReveal';

export default function EmployerSection({ employer }: { employer: Employer }) {
    return (
        <ScrollReveal>
            <div className={styles.employerSection} style={{ '--brand-color': employer.color } as React.CSSProperties}>
                <div className={styles.header}>
                    <div className={styles.logoContainer}>
                        {employer.logo && employer.logo !== '' && !employer.logo.includes('placeholder') ? (
                            <img
                                src={employer.logo}
                                alt={`${employer.name} Logo`}
                                className={styles.logoImage}
                            />
                        ) : (
                            <div className={styles.logoPlaceholder}>
                                {employer.name.substring(0, 2).toUpperCase()}
                            </div>
                        )}
                    </div>
                    <div className={styles.info}>
                        <h2 className={styles.name}>{employer.name}</h2>
                        {employer.roles && employer.roles.length > 0 ? (
                            <>
                                <p className={styles.description}>{employer.description}</p>
                                <div className={styles.roleTimeline}>
                                    {employer.roles.map((role, idx) => (
                                        <div key={idx} className={styles.roleItem}>
                                            <div className={styles.roleTitle}>
                                                {role.role}
                                                <span className={styles.rolePeriod}>{role.period}</span>
                                            </div>
                                            {role.description && (
                                                <p className={styles.roleDescription}>{role.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={styles.meta}>
                                    <span className={styles.role}>{employer.role}</span>
                                    <span className={styles.dot}>•</span>
                                    <span className={styles.period}>{employer.period}</span>
                                </div>
                                <p className={styles.description}>{employer.description}</p>
                            </>
                        )}
                    </div>
                </div>

                {employer.projects && employer.projects.length > 0 && (
                    <div className={styles.projectsGrid}>
                        {employer.projects.map((project, index) => (
                            <ProjectCard key={index} project={project} />
                        ))}
                    </div>
                )}
            </div>
        </ScrollReveal>
    );
}
