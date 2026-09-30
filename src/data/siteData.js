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

export const aboutContent = {
  hero: {
    eyebrow: 'About Us —',
    title: 'Bethesda Charitable Trust',
    subtitle: 'Empowering Lives. Transforming Communities.',
    description:
      'Bethesda Charitable Trust (BCT) is a faith-based, non-profit charitable organization committed to serving vulnerable individuals, families, and communities with compassion, dignity, and hope.',
    avatar: '🧒',
    actions: [
      { label: 'Learn More →', target: 'projects', variant: 'gold' },
    ],
  },
  story: {
    title: 'Our Story',
    paragraphs: [
      'Established in 2009, Bethesda Charitable Trust began its journey by reaching out to families affected by HIV/AIDS. Our early work focused on providing monthly grocery support, moral support, encouragement, and counselling to families facing difficult circumstances.',
      "What began as a small act of care has gradually grown into a wider community-focused ministry addressing education, child development, food insecurity, women's empowerment, healthcare, counselling, and community care.",
    ],
    quote:
      'We believe meaningful change begins when we see people, listen to their stories, understand their needs, and walk alongside them.',
    cardEmoji: '🤝',
    cardWords: ['Compassion', 'Dignity', 'Hope ♡'],
  },
  journey: {
    title: 'Our Journey',
    subtitle: 'From One Beginning to Seven Areas of Service',
    description:
      'Since 2009, we have grown through the needs we have encountered while serving communities. Each project has developed from a desire to respond practically and compassionately to those who need support.',
    projects: [
      {
        icon: '👪',
        color: 'pu',
        title: 'Family Care & Counselling',
        desc: 'Support for families affected by HIV/AIDS with groceries, counselling, encouragement and moral support.',
        goal: 'To remind families that they are not alone.',
        target: 'projects',
      },
      {
        icon: '📖',
        color: 'bl',
        title: 'Project Hope',
        desc: 'Educational assistance and essential school materials for children from disadvantaged families.',
        goal: 'Helping children pursue education with confidence and hope.',
        target: 'projects',
      },
      {
        icon: '🧒',
        color: 'gr',
        title: 'Morning Star',
        desc: 'Early childhood education and care in a safe and nurturing environment.',
        goal: 'Building a strong foundation for the next generation.',
        target: 'projects',
      },
      {
        icon: '🍲',
        color: 'or',
        title: 'Project SMS',
        desc: 'Meals and practical care for people experiencing food insecurity and vulnerable families.',
        goal: 'Meeting a basic need while showing people they are valued and cared for.',
        target: 'projects',
      },
      {
        icon: '✂',
        color: 'rd',
        title: 'Project Sakhi',
        desc: 'Tailoring skills and livelihood opportunities for women.',
        goal: 'Empowering women with skills, confidence and opportunity.',
        target: 'projects',
      },
      {
        icon: '✚',
        color: 'tl',
        title: 'Compassion & Care',
        desc: 'Medical assistance, counselling and community care.',
        goal: 'Bringing compassionate care to people who need it.',
        target: 'projects',
      },
      {
        icon: '🎓',
        color: 'bl',
        title: 'Child Development',
        desc: 'Holistic development through learning, mentoring, fellowship, encouragement and practical support.',
        goal: 'Helping children grow into confident and responsible individuals.',
        target: 'projects',
      },
    ],
  },
  commitment: {
    title: 'Our Commitment',
    subtitle: 'Caring for the Whole Person',
    description:
      'We believe community development is more than meeting an immediate need. It is about walking with people through different seasons of life and helping them discover opportunities to grow.',
    buttonText: 'Our Focus Areas →',
    buttonTarget: 'projects',
    items: [
      {
        icon: '📖',
        color: 'bl',
        title: 'Education',
        desc: 'Creating opportunities for children and young people to learn and develop.',
      },
      {
        icon: '🧒',
        color: 'gr',
        title: 'Child Development',
        desc: 'Supporting children in their education, character, confidence and overall growth.',
      },
      {
        icon: '🎗',
        color: 'mg',
        title: "Women's Empowerment",
        desc: 'Equipping women with skills and opportunities for greater independence.',
      },
      {
        icon: '❤',
        color: 'rd',
        title: 'Healthcare & Compassionate Care',
        desc: 'Responding to health and emotional needs with dignity and compassion.',
      },
      {
        icon: '🍲',
        color: 'or',
        title: 'Food & Humanitarian Support',
        desc: 'Standing with individuals and families facing difficult circumstances.',
      },
      {
        icon: '👥',
        color: 'tl',
        title: 'Community Development',
        desc: 'Working alongside communities to encourage sustainable and meaningful change.',
      },
    ],
  },
  belief: {
    title: 'Our Belief',
    items: [
      'Every person has dignity.',
      'Every child deserves hope.',
      'Every family deserves compassion.',
      'Every community has the potential to grow.',
    ],
    summary:
      'We seek to serve with faith, integrity, compassion, and responsibility, working alongside communities and responding to the needs we encounter.',
  },
  trustees: {
    title: 'Board of Trustees',
    description:
      'The Board of Trustees provides leadership, governance, and oversight to help Bethesda Charitable Trust fulfill its mission with integrity, accountability and compassion.',
    members: [
      {
        avatar: '👩',
        name: 'Mrs. Rajani S. Naik',
        role: 'President – Social Activities',
      },
      {
        avatar: '👨',
        name: 'Mr. Anil Aranah',
        role: 'Trustee – Religious Leader',
      },
      {
        avatar: '👩',
        name: 'Mrs. Selina Aranah',
        role: "Trustee – Women's Empowerment & Community Transformation",
      },
      {
        avatar: '👩‍⚕️',
        name: 'Dr. Deepa Mathew',
        role: 'Trustee – Healthcare & AYUSH Services',
      },
      {
        avatar: '👨',
        name: 'Mr. Moses Sadanand Aghamkar',
        role: 'Chief Executive Officer (CEO)',
      },
    ],
  },
};
