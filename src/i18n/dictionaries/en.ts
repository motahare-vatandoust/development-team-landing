export const en = {
  meta: {
    title: 'Velo Studio — We build websites & apps from zero',
    description:
      'Velo Studio designs, builds, and ships websites, mobile apps, and enterprise systems from the ground up.',
    ogDescription:
      'Landing pages, web apps, mobile experiences, and the systems behind them — designed, built, and shipped.',
    ogLocale: 'en_US',
  },
  common: {
    brand: 'Velo Studio',
    getInTouch: 'Get in touch',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    primaryNav: 'Primary',
    mobileNav: 'Mobile',
    footerNav: 'Footer',
    language: 'Language',
  },
  nav: {
    work: 'Work',
    services: 'Services',
    process: 'Process',
    about: 'About',
    team: 'Team',
    contact: 'Contact',
  },
  hero: {
    line1Muted: 'We build ',
    line1Accent: 'websites & apps',
    line2Muted: 'from ',
    line2Accent: 'zero.',
    description:
      'Landing pages, web apps, mobile experiences, and the systems behind them — designed, built, and shipped as production-ready products.',
    ctaPrimary: 'Start a project',
    ctaSecondary: 'See what we build',
  },
  work: {
    label: 'Our work',
    title: "Products we've shipped",
    description:
      "From MVPs to production platforms — here's the kind of work we deliver for clients and startups.",
    projects: [
      {
        title: 'Inventory Management System (IMS)',
        description:
          'An enterprise inventory solution developed to streamline stock tracking, product management, and day-to-day warehouse operations. Features interactive dashboards, role-based permissions, powerful data visualization, and real-time inventory monitoring for improved operational control.',
        image: '/assets/images/ims-web.png',
        tags: ['React', 'TypeScript', 'C#', 'Redux', 'PostgreSQL', 'Figma'],
        type: 'Web',
      },
      {
        title: 'Inventory Management System (IMS) — Mobile',
        description:
          'A cross-platform mobile application built for warehouse staff to simplify inventory management. Supports barcode scanning, order picking, stock updates, and reliable API integration using scalable state management architecture.',
        image: '/assets/images/ims-app.png',
        tags: ['Flutter', 'Dart', 'BLoC', 'Cubit', 'REST API'],
        type: 'Mobile',
      },
      {
        title: 'Internal Workflow & Approval System',
        description:
          'A business process automation platform that digitizes internal requests, including leave applications, expense approvals, and administrative workflows. Provides configurable forms, approval pipelines, and permission-based access to improve efficiency and transparency.',
        image: '/assets/images/automation.png',
        tags: ['React', 'TypeScript', 'C#', 'RBAC', 'Workflow', 'Admin Panel'],
        type: 'Web',
      },
      {
        title: 'Distribution Management Platform',
        description:
          'A web platform created to manage product distribution and order allocation across business operations. Includes advanced filtering, searchable data grids, and intuitive navigation to help users organize and monitor large volumes of information efficiently.',
        image: '/assets/images/distribution.png',
        tags: ['React', 'TypeScript', 'C#', 'Zustand', 'Figma'],
        type: 'Web',
      },
      {
        title: 'Shima Shoes Middleware',
        description:
          'A backend middleware platform that synchronizes product, inventory, and sales data between Rahkaran, Website and retail sales channels. Handles order processing, calculates product pricing and stock availability, and ensures reliable data consistency across multiple systems and databases.',
        image: '/assets/images/shima-middleware.png',
        tags: [
          'C#',
          '.NET Framework',
          'PostgreSQL',
          'MariaDB',
          'SQL Server',
          'Integration',
        ],
        type: 'Backend',
      },
      {
        title: 'Payroll & HR Management System',
        description:
          'A web-based payroll and HR platform that automates employee salary calculations, generates digital payslips, and streamlines payroll operations. Integrated with Rahkaran ERP and a Bale chatbot, allowing employees to securely access their payslips and payroll information directly through the messaging platform.',
        image: '/assets/images/payroll-system.png',
        tags: ['React', 'TypeScript', 'C#', 'PostgreSQL', 'Bot'],
        type: 'Web & Bot',
      },
    ],
  },
  services: {
    label: 'Services',
    title: 'What we build',
    description:
      'We cover the full stack — design implementation, frontend, backend, and deployment.',
    items: [
      {
        id: 'websites',
        title: 'Websites & landing pages',
        description:
          'Fast, responsive marketing sites and landing pages built for conversion and SEO.',
      },
      {
        id: 'webapps',
        title: 'Web applications',
        description:
          'Full-stack apps with dashboards, auth, APIs, and integrations — built to scale.',
      },
      {
        id: 'mobile',
        title: 'Mobile apps',
        description:
          'iOS and Android experiences with native feel, offline support, and push notifications.',
      },
      {
        id: 'infra',
        title: 'APIs & infrastructure',
        description:
          'Backend services, databases, analytics (Metabase), deployments, and DevOps to keep your product reliable and scalable.',
      },
    ],
  },
  process: {
    label: 'Process',
    title: 'How we work',
    description:
      'A straightforward flow from idea to production — transparent at every step.',
    steps: [
      {
        step: '01',
        title: 'Discover',
        description:
          'We learn your goals, users, and constraints — then scope the right solution together.',
      },
      {
        step: '02',
        title: 'Design & plan',
        description:
          'Wireframes, tech stack, and milestones. No surprises — you know what ships and when.',
      },
      {
        step: '03',
        title: 'Build',
        description:
          'Iterative development with regular demos. Clean code, tests, and performance baked in.',
      },
      {
        step: '04',
        title: 'Launch & support',
        description:
          'Deploy to production, hand off docs, and stay on for fixes, updates, and new features.',
      },
    ],
  },
  about: {
    label: 'About us',
    title: 'Independent team, production impact',
    description:
      'We are an independent software team that ships websites, apps, and enterprise systems — from first idea to long-term delivery. We design and operate technology for growing organizations, including Shima Shoes.',
    body: 'Our strength is turning complex requirements into integrated products: management systems (ERP, CRM, SCM), B2B and B2C platforms, and the automation that connects them. We replace fragmented workflows with unified, data-driven software — and stay on as a technology partner from architecture through production support.',
    stats: [
      { value: '10+', label: 'Enterprise systems delivered' },
      { value: 'ERP', label: 'CRM, SCM & unified management' },
      { value: 'B2B/B2C', label: 'Commerce & org platforms' },
      { value: 'End-to-end', label: 'From requirements to production' },
    ],
  },
  team: {
    label: 'Team',
    title: 'The people behind the work',
    description:
      'A small, senior team — close collaboration, clear ownership, and production focus.',
    onLinkedin: '{name} on LinkedIn',
    members: [
      {
        name: 'Amirhossein Izadjoo',
        role: 'Technical Team Lead & DevOps',
        bio: 'Leads the technical team and oversees DevOps — from architecture and delivery standards to reliable production infrastructure.',
        image: '/assets/images/izad.jpg',
        linkedin: 'https://www.linkedin.com/in/amirhosein-izadjou-8526a81a4/',
      },
      {
        name: 'Helia Tari',
        role: 'Frontend & Mobile Engineer',
        bio: 'Builds frontend and mobile experiences — from UI implementation to cross-platform apps shipped to production.',
        image: '/assets/images/helia.jpg',
        linkedin: 'https://www.linkedin.com/in/helia-yaghoubpour-tari/',
      },
      {
        name: 'Motahare Vatandoust',
        role: 'Frontend & UI Engineer',
        bio: 'Focuses on frontend and UI — polished interfaces, design systems, and user-facing web experiences.',
        image: '/assets/images/motahare.JPG',
        linkedin: 'https://www.linkedin.com/in/motahare-vatandoust/',
      },
      {
        name: 'Soheyl Sayyah',
        role: 'Backend Engineer & Product Manager',
        bio: 'Works across backend systems and product direction — APIs, data, requirements, and the foundation that keeps products reliable.',
        image: '/assets/images/soheyl.jpg',
        linkedin: 'https://www.linkedin.com/in/soheylsayyah/',
      },
    ],
  },
  contact: {
    label: 'Contact',
    title: "Let's build something",
    description:
      "Tell us about your project — we'll get back within 24 hours with next steps.",
    emailLabel: 'Email',
    responseLabel: 'Response time',
    responseValue: 'Usually within 24 hours',
    availabilityLabel: 'Availability',
    availabilityValue: 'Freelance & contract work',
    preferChat:
      "Prefer a quick chat? Email us with a one-liner about what you need and we'll suggest the best next step.",
  },
  form: {
    name: 'Name',
    namePlaceholder: 'Your name',
    email: 'Email',
    emailPlaceholder: 'you@company.com',
    projectType: 'Project type',
    selectOne: 'Select one',
    message: 'Message',
    messagePlaceholder:
      'What are you building? Timeline, goals, or anything else we should know.',
    hint: 'Opens your email app with a prefilled message. We usually reply within 24 hours.',
    send: 'Send message',
    opening: 'Opening…',
    errorRequired: 'Please fill in your name, email, and a short message.',
    errorEmail: 'Please enter a valid email address.',
    sentTitle: 'Draft ready in your mail app',
    sentBody: 'If nothing opened, email us directly at',
    sendAnother: 'Send another message',
    mailSubject: 'Project inquiry{type} from {name}',
    mailName: 'Name',
    mailEmail: 'Email',
    mailProjectType: 'Project type',
    projectTypes: [
      'Website / landing page',
      'Web app',
      'Mobile app',
      'Backend / API',
      'Something else',
    ],
  },
  footer: {
    rights: 'All rights reserved.',
    tagline: 'Websites, apps & systems — built from zero.',
  },
  mobileCta: {
    startProject: 'Start a project',
  },
}

export type Dictionary = typeof en
