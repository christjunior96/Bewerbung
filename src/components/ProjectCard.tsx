'use client';

import styles from './ProjectCard.module.scss';
import { Project } from '../data/portfolio';
import TiltCard from './TiltCard';

export default function ProjectCard({ project }: { project: Project }) {
    const hasLink = project.link && project.link !== '#';

    const CardContent = (
        <>
            <div className={styles.imageContainer} style={{ transform: "translateZ(50px)" }}>
                <div className={styles.placeholderImage} style={{ backgroundImage: `url(${project.image})` }}></div>
                {hasLink && (
                    <div className={styles.overlay}>
                        <span className={styles.viewProject}>Projekt Ansehen ↗</span>
                    </div>
                )}
            </div>
            <div className={styles.content} style={{ transform: "translateZ(30px)" }}>
                <h3 className={styles.title}>{project.name}</h3>
                <p className={styles.description}>{project.description}</p>
                <div className={styles.tags}>
                    {project.tags.map((tag, i) => (
                        <span key={i} className={styles.tag}>{tag}</span>
                    ))}
                </div>
            </div>
        </>
    );

    return (
        <TiltCard className={styles.cardWrapper}>
            {hasLink ? (
                <a href={project.link} className={styles.card} target="_blank" rel="noopener noreferrer">
                    {CardContent}
                </a>
            ) : (
                <div className={styles.card}>
                    {CardContent}
                </div>
            )}
        </TiltCard>
    );
}
