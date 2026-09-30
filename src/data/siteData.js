// Site Configuration and Content Data
// Designed for easy integration with a backend and admin dashboard in the future.

export const COLOR_MAP = {
  bl: 'var(--bl)',
  gr: 'var(--gr)',
  or: 'var(--or)',
  pu: 'var(--pu)',
  rd: 'var(--rd)',
  go: 'var(--go)',
  nv: 'var(--nv)',
  tl: '#1f8a8a',
  mg: '#b03a7c',
};

export const siteConfig = {
  name: 'Bethesda Charitable Trust',
  shortName: 'BCT',
  tagline: 'Empowering Lives. Transforming Communities.',
  subTagline: 'Serving with compassion, dignity and hope since 2009',
  sinceYear: '2009',
  logo: '/logo.png',
  contact: {
    address: 'Valsao Pale, South Goa, India',
    phone: '+91 8087772008',
    whatsappHelp: '918623965098',
    whatsappReceipt: '918087772008',
    email: 'bethesdatrust2009@gmail.com',
    mapsUrl: 'https://share.google/Y9UmIrC5cQf7vxMhg',
    volunteerFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSewhEf_xUlaq0HcB6YEZnrDLnW2lSJpSyr7Rxcl2Lh2I6KQRg/viewform?usp=header',
  },
  social: [
    { name: 'Facebook', letter: 'f', bg: '#1877f2', url: '#' },
    { name: 'Instagram', letter: '◎', bg: '#d6249f', url: '#' },
    { name: 'YouTube', letter: '▶', bg: '#e0231f', url: '#' },
  ],
  navLinks: [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'projects', label: 'Our Projects' },
    { id: 'involved', label: 'Get Involved' },
    { id: 'donate', label: 'Donate' },
    { id: 'contact', label: 'Contact' },
  ],
};

export const homeContent = {
  hero: {
    eyebrow: 'Since 2009',
    title: 'Bethesda Charitable Trust',
    subtitle: 'Empowering Lives. Transforming Communities.',
    description:
      'A faith-based, non-profit charitable organization serving vulnerable individuals, families and communities with compassion, dignity and hope.',
    avatar: '🧒',
    actions: [
      { label: 'About Us →', target: 'about', variant: 'gold' },
      { label: 'Get Involved', target: 'involved', variant: 'white-outline' },
      { label: 'Donate Now', target: 'donate', variant: 'white-outline' },
    ],
  },
  supportAreas: {
    title: 'Where Your Support Can Go',
    items: [
      {
        icon: '📖',
        color: 'bl',
        title: 'Education',
        desc: 'Project Hope & Child Development',
        target: 'projects',
      },
      {
        icon: '🍲',
        color: 'gr',
        title: 'Meals',
        desc: 'Project SMS',
        target: 'projects',
      },
      {
        icon: '✂',
        color: 'or',
        title: 'Skills',
        desc: 'Project Sakhi',
        target: 'projects',
      },
      {
        icon: '✚',
        color: 'bl',
        title: 'Healthcare',
        desc: 'Compassion & Care',
        target: 'projects',
      },
      {
        icon: '🧒',
        color: 'or',
        title: 'Children',
        desc: 'Morning Star & Child Development',
        target: 'projects',
      },
      {
        icon: '❤',
        color: 'rd',
        title: 'Family Support',
        desc: 'Family Care & Counselling',
        target: 'projects',
      },
    ],
  },
  help: {
    title: 'Need Help?',
    description:
      "Have a question, need guidance, or want help with anything else? Choose what it's about, then write to us by email or message us on WhatsApp. A ready-made message opens, so you only need to add your details.",
    topics: [
      'General query',
      'Volunteering',
      'Donation help',
      'Receipt request',
      'Partnership',
      'Any other work',
    ],
    emailButtonText: '✉ WRITE AN EMAIL →',
    whatsappButtonText: '💬 CHAT ON WHATSAPP →',
  },
  impactStrip: {
    badge: 'Since 2009',
    heading: 'One Person. One Family. One Child.\nOne Community at a Time.',
    description:
      'What began in 2009 with support for families affected by HIV/AIDS has grown into seven areas of service. The journey continues as we serve communities with compassion, dignity, faith and hope.',
  },
};

export const footerContent = {
  organization: {
    name: 'Bethesda Charitable Trust',
    tagline: 'Empowering Lives. Transforming Communities.',
  },
  quickLinks: [
    { label: 'Home', target: 'home' },
    { label: 'About Us', target: 'about' },
    { label: 'Our Projects', target: 'projects' },
    { label: 'Get Involved', target: 'involved' },
    { label: 'Donate', target: 'donate' },
  ],
  ourWork: [
    { label: 'Education', target: 'projects' },
    { label: 'Child Development', target: 'projects' },
    { label: 'Project SMS', target: 'projects' },
    { label: "Women's Empowerment", target: 'projects' },
    { label: 'Healthcare', target: 'projects' },
  ],
  copyright: '© 2026 Bethesda Charitable Trust. All Rights Reserved.',
  credit: {
    title: 'Designed & developed by Nexora Technologies',
    subtitle: 'Websites • Apps • Digital Solutions',
    email: 'nexoratech05@gmail.com',
  },
};
