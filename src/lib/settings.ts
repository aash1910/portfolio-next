import { prisma } from '@/lib/prisma';

export type SocialLink = { url: string; icon: string };
export type NavLink = { label: string; href: string; icon?: string };
export type InfoItem = { label: string; value: string };
export type EducationItem = {
  title: string;
  year: string;
  institution: string;
  description: string;
};
export type ExperienceItem = {
  title: string;
  dates: string;
  company: string;
  bullets: string[];
};

export type HeaderSettings = {
  siteName: string;
  profileImage: string;
  socialLinks: SocialLink[];
  navLinks: NavLink[];
};

export type AboutSettings = {
  sectionTitle: string;
  introParagraph: string;
  profileImage: string;
  fullName: string;
  bioParagraph: string;
  infoItems: InfoItem[];
  bottomParagraph: string;
};

export type ResumeSettings = {
  sectionTitle: string;
  summaryName: string;
  summaryDescription: string;
  summaryContactInfo: string[];
  education: EducationItem[];
  experience: ExperienceItem[];
};

export type SiteSettingsData = {
  header: HeaderSettings;
  about: AboutSettings;
  resume: ResumeSettings;
};

const defaultHeader: HeaderSettings = {
  siteName: 'Ashraful Islam',
  profileImage: '/assets/img/profile1.jpg',
  socialLinks: [
    { url: 'https://github.com/ash1910', icon: 'github' },
    { url: 'https://www.facebook.com/Masum7', icon: 'facebook' },
    { url: 'https://www.linkedin.com/in/ash1910', icon: 'linkedin' },
  ],
  navLinks: [
    { label: 'About', href: '/#about', icon: 'person' },
    { label: 'Resume', href: '/#resume', icon: 'file-earmark-text' },
    { label: 'Portfolio', href: '/#portfolio', icon: 'images' },
  ],
};

const defaultAbout: AboutSettings = {
  sectionTitle: 'About',
  introParagraph:
    'With 14 years of experience as a full-stack web application developer, I specialize in PHP, MySQL, PostgreSQL, Web APIs, and modern frameworks like Laravel, Vue.js, React, and Next.js. My expertise extends to JavaScript, React Native, Swift, WordPress, ExpressionEngine, and implementing MVC design patterns. Proficient in object-oriented programming, Linux CLI commands, and version control with GIT, I bring a comprehensive approach to building scalable and efficient web solutions.',
  profileImage: '/assets/img/profile2.jpg',
  fullName: 'Full Stack Web Developer',
  bioParagraph:
    "I thrive in fast-paced, results-driven environments, consistently delivering projects within tight deadlines. While I am capable of working independently, I genuinely enjoy collaborating as part of a team. I have also mentored junior developers, helping them accelerate their growth and achieve their potential. Known for being a quick learner, approachable, and focused on achieving results, I bring a positive and driven attitude to every project.",
  infoItems: [
    { label: 'Birthday', value: '19 Oct 1988' },
    { label: 'Website', value: 'https://equation.wmd-hosting.com/' },
    { label: 'Phone', value: '+880171 250 1289' },
    { label: 'City', value: 'Dhaka, Bangladesh' },
    { label: 'Age', value: '36' },
    { label: 'Degree', value: 'Bachelor in CSE' },
    { label: 'Email', value: 'ashraful1910@gmail.com' },
    { label: 'Status', value: 'Available' },
  ],
  bottomParagraph:
    "I specialize in web and mobile application development, data migration, and business intelligence, using technologies like Laravel, React, MySQL, and REST APIs. With expertise in performance optimization, API integration, advanced PHP, and process modeling, I've contributed to scalable public-facing applications and enterprise solutions, ensuring efficiency and seamless functionality throughout projects.",
};

const defaultResume: ResumeSettings = {
  sectionTitle: 'Resume',
  summaryName: 'MD Ashraful Islam Masum',
  summaryDescription:
    'Innovative and results-driven Full Stack Developer with 14+ years of experience designing, developing, and optimizing user-focused web and mobile applications, from initial concept to scalable and high-performance solutions. Skilled in modern frameworks, Next.js, React Native, Swift, WordPress, Laravel, React, Vue.js, ExpressionEngine and advanced PHP, API integrations, and process modeling, with a proven track record of meeting strict deadlines and delivering excellence.',
  summaryContactInfo: [
    '43/5/A, West Matikata, Dhaka Cantonment, Dhaka',
    '+880171 250 1289',
    'ashraful1910@gmail.com',
  ],
  education: [
    {
      title: 'Bachelor in Computer Science and Engineering',
      year: 'Passed in 2010',
      institution: 'Rajshahi University of Engineering & Technology(RUET)',
      description: 'CGPA: 3.5 (4.0 Scale)',
    },
    {
      title: 'Higher Secondary Certificate',
      year: 'Passed in 2005',
      institution: 'B A F Shaheen College, Tejgaon, Dhaka',
      description: 'CGPA: 4.90 (5.0 Scale)',
    },
    {
      title: 'Secondary School Certificate',
      year: 'Passed in 2003',
      institution: 'Shaheed Ramiz Uddin High School, Dhaka',
      description: 'CGPA: 4.88 (5.0 Scale)',
    },
  ],
  experience: [
    {
      title: 'Senior Full Stack Software Engineer',
      dates: '2025 - Present',
      company: 'Ternaryweb, Bangladesh',
      bullets: [
        'Lead full-stack development of web and mobile applications using Laravel, React, Vue.js, and React Native, architecting scalable RESTful APIs and database schemas.',
        'Implement third-party integrations including payment gateways (Stripe, Bkash, SSLCommerz), authentication systems (OAuth2, JWT, Passport), and external APIs.',
        'Optimize system performance through code refactoring, database query optimization, and caching strategies, improving response times by up to 40%.',
        'Mentor junior developers, conduct code reviews, and establish coding standards. Deploy to AWS, Firebase, and VPS environments.',
      ],
    },
    {
      title: 'Senior Software Engineer',
      dates: '2014 - 2024',
      company: 'WMD d.o.o, Croatia',
      bullets: [
        "At WMD, I developed scalable web applications and APIs using Laravel, React.js, and Next.js, ensuring performance, reliability, and seamless database integration.",
        'Collaborated with cross-functional teams to deliver high-quality products and mentored junior developers through code reviews, fostering skill enhancement and adherence to software engineering best practices.',
        "Streamlined workflows, improved coding standards, and implemented emerging technologies to enhance project scalability, efficiency, and innovation, contributing to high-impact software solutions and reliable system performance.",
      ],
    },
    {
      title: 'Software Engineer',
      dates: '2010 - 2014',
      company: 'BG Interactive LLC, Bangladesh',
      bullets: [
        'As a Junior Software Engineer, I gained foundational experience in coding, debugging, and understanding software development lifecycle processes.',
        'Collaborated with senior developers, assisted in small tasks, and contributed to projects by writing and testing code under supervision.',
        'Enhanced technical skills by learning new programming languages, frameworks, and best practices while actively seeking opportunities for growth and improvement.',
      ],
    },
  ],
};

export const defaultSettings: SiteSettingsData = {
  header: defaultHeader,
  about: defaultAbout,
  resume: defaultResume,
};

export async function getSettings(): Promise<SiteSettingsData> {
  const row = await prisma.siteSettings.findUnique({
    where: { id: 'default' },
  });
  if (!row || !row.data) {
    return defaultSettings;
  }
  const data = row.data as Partial<SiteSettingsData>;
  return {
    header: { ...defaultHeader, ...data.header },
    about: { ...defaultAbout, ...data.about },
    resume: { ...defaultResume, ...data.resume },
  };
}
