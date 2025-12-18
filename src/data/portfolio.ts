export interface Project {
    name: string;
    description: string;
    image: string;
    link?: string;
    tags: string[];
}

export interface Employer {
    name: string;
    role: string;
    period: string;
    roles?: {
        role: string;
        period: string;
        description?: string;
    }[];
    description: string;
    logo: string;
    color: string; // Brand color for styling
    projects?: Project[];
}

export interface DownloadItem {
    label: string;
    path: string;
}

export interface Education {
    institution: string;
    degree?: string;
    period: string;
    description?: string;
}

export const portfolioData = {
    hero: {
        greeting: "Hallo, ich bin",
        name: "Louis Christ",
        role: "Technischer Projektleiter & Frontend Entwickler",
        description: "Ich verbinde technisches Verständnis mit Projektmanagement-Skills, um digitale Visionen Realität werden zu lassen. Mit Leidenschaft für sauberen Code und effiziente Prozesse.",
        image: "louis.JPG"
    },
    employers: [
        {
            name: "RYZE",
            role: "Technischer Projektleiter",
            period: "06.2023 - Heute",
            description: "RYZE Digital, eine mittelständische Agentur mit Sitz in Darmstadt, bot mir die Möglichkeit, an verschiedenen Webprojekten für namhafte Unternehmen mitzuwirken. Meine Tätigkeiten umfassten sowohl die Wartung als auch die komplette Neuentwicklung dieser Projekte. Durch die Unterstützung eines erfahrenen Mentors konnte ich meine Fähigkeiten in HTML5, SCSS/CSS und JavaScript erheblich erweitern und auf ein höheres Niveau bringen.",
            roles: [
                {
                    role: "Technischer Projektmanager",
                    period: "12.2025 - Heute",
                    description: "Als technischer Projektmanager bei RYZE Digital bin ich verantwortlich für die Konzeption, Entwicklung und Umsetzung digitaler Geschäftsberichte. Mein Fokus liegt auf der technischen Architektur, Performance-Optimierung und einer nahtlosen User Experience. Mit meinem Know-how unerstütze ich die Projektmanager und Kunden bei der Umsetzung der digitalen Geschäftsberichte. Ich stelle sicher, dass unsere Lösungen nicht nur visuell überzeugen, sondern auch effizient und skalierbar sind."
                },
                {
                    role: "Frontend Developer",
                    period: "06.2023 - 12.2025",
                    description: "Als Frontend Developer bin ich verantwortlich für die Entwicklung von anspruchsvollen Frontends mit Hilfe von HTML5, SCSS/CSS und JavaScript."
                }
            ],
            logo: "/logos/ryze.avif", // Placeholder
            color: "#ff641e", // Example brand color
            projects: [
                {
                    name: "Brain Zwingenberg & Brain Group",
                    description: "Aufbau einer neuen Website",
                    image: "/projects/brain-zw.png",
                    tags: ["ECOMA", "HTML", "SCSS", "JavaScript"],
                    link: "https://www.brain-biotech.com/en/"
                },
                {
                    name: "Capol",
                    description: "Aufbau einer neuen Website",
                    image: "/projects/capol.png",
                    tags: ["ECOMA", "HTML", "SCSS", "JavaScript"],
                    link: "https://www.capol.de/de/"
                },
                {
                    name: "STILL & Linde",
                    description: "Nachhaltigkeitsbericht",
                    image: "/projects/still.png",
                    tags: ["ECOMA", "HTML", "SCSS", "JavaScript"],
                    link: "https://sustainability.still.eu/stories/de/"
                },
                {
                    name: "Covestro Geschäftsbericht",
                    description: "Online Geschäftsbericht",
                    image: "/projects/covestro.png",
                    tags: ["ECOMA", "HTML", "SCSS", "JavaScript"],
                    link: "https://geschaeftsbericht.covestro.com/annual-financial-report-2024/de/"
                },
                {
                    name: "Lufthansa Geschäftsbericht",
                    description: "Online Geschäftsbericht",
                    image: "/projects/lufthansa.png",
                    tags: ["ECOMA", "HTML", "SCSS", "JavaScript"],
                    link: "https://report.lufthansagroup.com/2024/annual-report/de/"
                }
            ]
        },
        {
            name: "ecozins",
            role: "Full Stack Developer",
            period: "05.2021 - 04.2023",
            description: "Während meiner Tätigkeit bei der AUDITcapital war ich für die kontinuierliche Weiterentwicklung der ecozins-Website verantwortlich. Dies umfasste das Design und die Implementierung neuer Seiten sowie die Schaffung zusätzlicher Funktionen. Die Website wurde unter Verwendung von WordPress erstellt und ist vollständig responsiv gestaltet. Darüber hinaus habe ich Newsletter-Templates für Cleverreach entwickelt.",
            logo: "/logos/ecozins.png",
            color: "#5ea378CC",
            projects: [
                {
                    name: "Investment Plattform",
                    description: "Frontend-Entwicklung für Crowdinvesting in erneuerbare Energien.",
                    image: "/projects/ecozins.png",
                    tags: ["Wordpress", "JavaScript", "SCSS", "CSS", "HTML5"],
                    link: "https://www.ecozins.de"
                },
                {
                    name: "Rotary Spendenplattform",
                    description: "Spendenplattform",
                    image: "/projects/rotary.png",
                    tags: ["Wordpress", "JavaScript", "SCSS", "CSS", "HTML5"],
                    link: "https://giessen-spendet.de"
                },
                {
                    name: "REON Whitelabel",
                    description: "Whitelabel Lösung",
                    image: "/projects/reon.png",
                    tags: ["Wordpress", "JavaScript", "SCSS", "CSS", "HTML5"],
                    link: "https://reon-invest.com"
                },
                {
                    name: "Neue ecozins Platform",
                    description: "Leider wurde dieses Projekt nie abgeschlossen, dennoch hätte es mein bisher größtes Vorhaben bis dahin werden können. Ich möchte daher hier präsentieren, was bis zu diesem Zeitpunkt entstanden ist. Anstatt ein konventionelles CMS zu nutzen, wurde ein eigenes CMS mit NextJS entwickelt, um die Themen und Projektseiten zu verwalten.",
                    image: "/projects/Projektfinanz.png",
                    tags: ['NextJS', 'TypeScript', 'Prisma', 'PostgreSQL', 'Styled Components', 'JWT Token', 'HTML', 'CSS', 'figma'],
                }
            ]
        },
        {
            name: "tripuls media innovations GmbH",
            role: "Werkstudent Online-Projektmanagement",
            period: "05.2028 - 04.2021",
            description: "Agenturgeschäft mit Fokus auf performante Webseiten.",
            logo: "/logos/tripuls.jpg",
            color: "#f4793b",
        }
    ] as Employer[],
    education: [
        {
            institution: "Universität Wien",
            degree: "M.Sc. in Wirtschaftsinformatik",
            period: "10.2020 – 01.2023",
        },
        {
            institution: "Universität Marburg",
            degree: "B.Sc. Wirtschaftsinformatik",
            period: "10.2016 – 07.2020",
        },
        {
            institution: "Work & Travel in Australien",
            period: "08.2015 – 08.2016",
        },
        {
            degree: "Fachabitur im Bereich Informatik",
            period: "07.2014 – 06.2015",
            institution: "Max-Eyth-Schule Alsfeld"
        }
    ] as Education[],
    downloads: {
        cv: [
            { label: "Deutsch", path: "/downloads/Lebenslauf.pdf" },
            { label: "English", path: "/downloads/Lebenslauf_EN.pdf" }
        ],
        references: [
            { label: "ecozins", path: "/downloads/Arbeitszeugnis_AUDITcapital.pdf" },
            { label: "tripuls", path: "/downloads/AZ_tripuls.pdf" }
        ],
        certificates: [
            { label: "Flutter", path: "/downloads/Zertifikat-Flutter.pdf" },
            { label: "SAP", path: "/downloads/Zertifikat-SAP.pdf" },
            { label: "Websecurity", path: "/downloads/Zertifikat-Websecurity.pdf" }
        ]
    }
};
