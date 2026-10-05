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
  statsBar: [
    {
      type: 'since',
      prefix: 'Since',
      value: '2009',
      accent: '',
      label: 'Serving Communities',
    },
    {
      type: 'teach',
      value: '2,500',
      accent: '+',
      label: 'Children Reached with moral and ethical teaching',
    },
    {
      type: 'grad',
      value: '200',
      accent: '+',
      label: 'Students Graduated from Preschool',
    },
    {
      type: 'support',
      value: '30',
      accent: '+',
      label: 'Children Supported from last 8 years on annual basis',
    },
    {
      type: 'women',
      value: '5',
      accent: '',
      label: 'Women’s Training Centers with 45 students graduated',
    },
    {
      type: 'fed',
      value: '100',
      accent: '+',
      label: 'Street children / People Fed Weekly',
    },
    {
      type: 'med',
      value: '1,500',
      accent: '+',
      label: 'People Benefited from Medical assistance',
    },
    {
      type: 'shelter',
      value: '5',
      accent: '',
      label: 'Homes & Shelters Supported',
    },
  ],
  focusAreas: {
    eyebrow: 'OUR FOCUS AREAS',
    title: 'Creating Lasting Change',
    items: [
      {
        icon: '📖',
        color: 'bl',
        title: 'Education',
        desc: 'Project Hope & Child Development',
        target: 'pj1',
      },
      {
        icon: '🍲',
        color: 'gr',
        title: 'Meals',
        desc: 'Project SMS',
        target: 'pj3',
      },
      {
        icon: '✂',
        color: 'or',
        title: 'Skills',
        desc: 'Project Sakhi',
        target: 'pj4',
      },
      {
        icon: '✚',
        color: 'bl',
        title: 'Healthcare',
        desc: 'Compassion & Care',
        target: 'pj5',
      },
      {
        icon: '🧒',
        color: 'or',
        title: 'Children',
        desc: 'Morning Star & Child Development',
        target: 'pj2',
      },
      {
        icon: '❤',
        color: 'rd',
        title: 'Family Support',
        desc: 'Family Care & Counselling',
        target: 'pj0',
      },
    ],
  },
  projectsSection: {
    eyebrow: 'OUR PROJECTS',
    title: 'Seven Areas of Service',
    description:
      'Since 2009, each project has grown from a desire to respond practically and compassionately to those who need support.',
    projects: [
      {
        id: 'pj0',
        icon: '👪',
        color: 'pu',
        title: 'Family Care & Counselling',
        desc: 'Support for families affected by HIV/AIDS with groceries, counselling, encouragement and moral support.',
      },
      {
        id: 'pj1',
        icon: '📖',
        color: 'bl',
        title: 'Project Hope',
        desc: 'Educational assistance and essential school materials for children from disadvantaged families.',
      },
      {
        id: 'pj2',
        icon: '🧒',
        color: 'gr',
        title: 'Morning Star',
        desc: 'Early childhood education and care in a safe and nurturing environment.',
      },
      {
        id: 'pj3',
        icon: '🍲',
        color: 'or',
        title: 'Project SMS',
        desc: 'Sharing Meals. Sharing Love. Sharing Hope. Food, friendship and practical care for vulnerable individuals and families.',
      },
      {
        id: 'pj4',
        icon: '✂',
        color: 'rd',
        title: 'Project Sakhi',
        desc: 'Tailoring skills and livelihood opportunities for women.',
      },
      {
        id: 'pj5',
        icon: '✚',
        color: 'tl',
        title: 'Compassion & Care',
        desc: 'Medical assistance, counselling and community care.',
      },
      {
        id: 'pj6',
        icon: '🎓',
        color: 'bl',
        title: 'Child Development',
        desc: 'Holistic development through learning, mentoring, fellowship, encouragement and practical support.',
      },
    ],
    exploreCard: {
      title: 'Explore every project',
      description: 'See how each initiative serves children, women, families and communities.',
      buttonText: 'View All Projects →',
      target: 'projects',
    },
  },
  getInvolvedSection: {
    eyebrow: 'GET INVOLVED',
    title: 'Be Part of the Change',
    description:
      "You don't have to do everything. You can simply do something. Whether you give your time, skills, resources, or encouragement, your involvement can help bring hope and practical support to children, women, families and communities.",
    cards: [
      { icon: '👥', title: 'Volunteer', desc: 'Give your time', target: 'involved' },
      { icon: '❤️', title: 'Support a Project', desc: 'Give towards a cause', target: 'involved' },
      { icon: '🤝', title: 'Partner With Us', desc: 'Work together', target: 'involved' },
      { icon: '📦', title: 'Give Essentials', desc: 'Donate supplies', target: 'involved' },
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
    { label: 'Education', target: 'pj1' },
    { label: 'Child Development', target: 'pj6' },
    { label: 'Project SMS', target: 'pj3' },
    { label: "Women's Empowerment", target: 'pj4' },
    { label: 'Healthcare', target: 'pj5' },
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
    title: 'How Our Journey Started',
    subtitle: 'From a Small Beginning to a Growing Mission of Compassion',
    lead: 'Bethesda Charitable Trust began with a simple but powerful conviction: every person deserves to be treated with dignity, compassion, and hope.',
    paragraphs: [
      'Our journey began when a few like-minded individuals came together with a desire to serve people who were struggling, neglected, and living on the margins of society. The Trust was established with a vision to serve sacrificially, uplift the vulnerable, and bring meaningful change to families and communities.',
      'In our early years, we reached out to families affected by HIV/AIDS, providing essential food support, encouragement, counselling, and a listening ear. We also began working among children in underprivileged communities, providing moral and value-based education and helping families facing difficult circumstances. Early records from 2011 also document adult literacy centres and support for families affected by unexpected crises.',
      'What began with small acts of kindness gradually grew into a broader mission.',
      'We learned that poverty is not only about the lack of financial resources. Many families also face a lack of education, healthcare, opportunity, emotional support, and hope. Therefore, our work began to expand beyond immediate assistance toward holistic community development.',
    ],
    initiativesTitle: 'Over the years, Bethesda Charitable Trust has continued to respond to the needs around us through initiatives in:',
    initiatives: [
      { icon: '📖', title: 'Education and Child Development' },
      { icon: '✚', title: 'Healthcare and Medical Camps' },
      { icon: '🍲', title: 'Food and Nutrition Support' },
      { icon: '✂', title: 'Women’s Empowerment' },
      { icon: '💬', title: 'Counselling and Family Support' },
      { icon: '🤝', title: 'Community Care' },
      { icon: '🕊', title: 'Humanitarian Assistance' },
    ],
    ethos: 'Our journey has never been about simply giving things away. It has been about walking alongside people, restoring dignity, creating opportunities, and helping individuals and families move toward a better future.',
    commitmentIntro: 'Today, Bethesda Charitable Trust continues this journey with the same foundational commitment:',
    commitmentQuote: '«To serve with compassion, empower with dignity, and transform lives through practical care and hope.»',
    continuation: 'What started as a small step of faith has become a growing journey of service. And we believe the journey is still continuing—with every child encouraged, every family supported, every woman empowered, every person cared for, and every community touched by compassion.',
    closingSmall: 'Our journey started small.',
    closingVision: 'Our vision has always been bigger: to see lives transformed and communities strengthened.',
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
        id: 'tr-1',
        avatar: '👩',
        photo: '',
        name: 'Mrs. Rajani S. Naik',
        role: 'President – Social Activities',
        desc: 'Serving as the President of Bethesda Charitable Trust, Mrs. Rajani S. Naik brings dedicated community leadership and decades of social activism. She guides key outreach, community welfare programs, and family support initiatives with steadfast compassion and integrity.',
      },
      {
        id: 'tr-2',
        avatar: '👨',
        photo: '',
        name: 'Mr. Anil Aranah',
        role: 'Trustee – Religious Leader',
        desc: 'Mr. Anil Aranah provides spiritual counsel, moral guidance, and pastoral oversight. He upholds the faith-based values and compassionate mission of Bethesda Charitable Trust, ensuring every initiative brings dignity, hope, and ethical dedication to the communities served.',
      },
      {
        id: 'tr-3',
        avatar: '👩',
        photo: '',
        name: 'Mrs. Selina Aranah',
        role: "Trustee – Women's Empowerment & Community Transformation",
        desc: "Championing women's dignity, financial self-reliance, and vocational training, Mrs. Selina Aranah spearheads Project Sakhi and community transformation programs. Her work empowers underprivileged women and families across Goa through practical skills and sustainable livelihoods.",
      },
      {
        id: 'tr-4',
        avatar: '👩‍⚕️',
        photo: '',
        name: 'Dr. Deepa Mathew',
        role: 'Trustee – Healthcare & AYUSH Services',
        desc: 'Dr. Deepa Mathew brings professional medical acumen and holistic wellness leadership to Bethesda. She directs community medical camps, preventive healthcare outreach, AYUSH holistic health services, and compassionate patient care for elderly and vulnerable community members.',
      },
      {
        id: 'tr-5',
        avatar: '👨',
        photo: '',
        name: 'Mr. Moses Sadanand Aghamkar',
        role: 'Chief Executive Officer (CEO)',
        desc: 'Leading day-to-day operations, project execution, and strategic partnerships, Mr. Moses Sadanand Aghamkar oversees all seven service areas of Bethesda Charitable Trust. Under his executive leadership, the trust continues to expand its reach and transformative impact.',
      },
    ],
  },
};

export const projectsContent = {
  hero: {
    eyebrow: 'Our Projects —',
    title: 'Seven Areas of Service',
    description:
      'Since 2009, each project has developed from a desire to respond practically and compassionately to those who need support.',
    avatar: '🌱',
    action: {
      label: 'Get Involved →',
      target: 'involved',
      variant: 'gold',
    },
  },
  projects: [
    {
      id: 'pj0',
      icon: '👪',
      color: 'pu',
      title: 'Family Care & Counselling',
      desc: 'Support for families affected by HIV/AIDS with groceries, counselling, encouragement and moral support.',
      goal: 'To remind families that they are not alone.',
      aboutText:
        'Established in 2009, this project was Bethesda Charitable Trust’s very first initiative. We walk alongside families facing difficult health and social circumstances, offering regular grocery distributions, emotional and spiritual counselling, and holistic care so no family ever feels abandoned.',
      photos: [],
    },
    {
      id: 'pj1',
      icon: '📖',
      color: 'bl',
      title: 'Project Hope',
      desc: 'Educational assistance and essential school materials for children from disadvantaged families.',
      goal: 'Helping children pursue education with confidence and hope.',
      aboutText:
        'Project Hope ensures that financial constraints do not stand between a child and their education. We provide school kits, uniforms, textbooks, tuition support, and mentorship to equip children for a brighter future.',
      photos: [],
    },
    {
      id: 'pj2',
      icon: '🧒',
      color: 'gr',
      title: 'Morning Star',
      desc: 'Early childhood education and care in a safe and nurturing environment.',
      goal: 'Building a strong foundation for the next generation.',
      aboutText:
        'Morning Star creates a loving, supportive, and stimulating environment for young children during their critical early developmental years, preparing them with fundamental learning, nutrition, and values.',
      photos: [],
    },
    {
      id: 'pj3',
      icon: '🍲',
      color: 'or',
      title: 'Project SMS',
      desc: 'Meals and practical care for people experiencing food insecurity and vulnerable families.',
      goal: 'Meeting a basic need while showing people they are valued and cared for.',
      aboutText:
        'Project SMS (Share My Sandwich / Share Meals Scheme) provides nutritious meals, rations, and emergency sustenance packages to underprivileged community members, migrant laborers, and homeless individuals.',
      photos: [],
    },
    {
      id: 'pj4',
      icon: '✂',
      color: 'rd',
      title: 'Project Sakhi',
      desc: 'Tailoring skills and livelihood opportunities for women.',
      goal: 'Empowering women with skills, confidence and opportunity.',
      aboutText:
        'Project Sakhi provides vocational training in tailoring, garment making, and craft creation, enabling women from vulnerable backgrounds to attain financial self-reliance, dignity, and sustainable livelihoods.',
      photos: [],
    },
    {
      id: 'pj5',
      icon: '✚',
      color: 'tl',
      title: 'Compassion & Care',
      desc: 'Medical assistance, counselling and community care.',
      goal: 'Bringing compassionate care to people who need it.',
      aboutText:
        'Compassion & Care responds to healthcare disparities through medical aid, doctor visits, health camps, essential medicines, and emotional counselling for seniors and vulnerable patients.',
      photos: [],
    },
    {
      id: 'pj6',
      icon: '🎓',
      color: 'bl',
      title: 'Child Development',
      desc: 'Holistic development through learning, mentoring, fellowship, encouragement and practical support.',
      goal: 'Helping children grow into confident and responsible individuals.',
      aboutText:
        'Our Child Development initiative nurtures physical, emotional, and social well-being through after-school study classes, life skills workshops, arts, sports, and moral guidance.',
      photos: [],
    },
  ],
};

export const involvedContent = {
  hero: {
    eyebrow: 'Get Involved —',
    title: 'Be Part of the Change',
    subtitle: 'You don’t have to do everything. You can simply do something.',
    description:
      'At Bethesda Charitable Trust, we believe meaningful change happens when people come together. Whether you give your time, skills, resources, or encouragement, your involvement can help bring hope and practical support to children, women, families and communities.',
    avatar: '😊',
    actions: [
      {
        label: 'Become a Volunteer',
        href: siteConfig.contact.volunteerFormUrl,
        variant: 'gold',
      },
      {
        label: 'Support Our Work',
        target: 'donate',
        variant: 'white-outline',
      },
    ],
  },
  ways: [
    {
      icon: '👥',
      color: 'gr',
      category: 'Volunteer',
      title: 'Give Your Time',
      desc: "Share your time, skills and experience through BCT's community initiatives.",
      supportList: [
        "Children's activities",
        'Teaching and mentoring',
        'Community outreach',
        'Medical camps',
        'Events and special programs',
      ],
      buttonText: 'Become a Volunteer',
      buttonHref: siteConfig.contact.volunteerFormUrl,
      bgEmoji: '🧒',
    },
    {
      icon: '❤',
      color: 'or',
      category: 'Support a Project',
      title: 'Give Towards a Cause',
      desc: "Support one of BCT's areas of service and help us respond to practical needs in the community.",
      supportList: [
        'Education',
        'Meals',
        'Healthcare',
        "Women's empowerment",
        'Child development',
        'Family support',
      ],
      buttonText: 'Support a Cause',
      buttonTarget: 'projects',
      bgEmoji: '✏️',
    },
    {
      icon: '🤝',
      color: 'pu',
      category: 'Partner With Us',
      title: 'Work Together',
      desc: 'Organizations, churches, businesses, schools and individuals can partner with BCT to strengthen community initiatives. We welcome partnerships that bring together resources, skills, knowledge and opportunities.',
      supportList: [],
      buttonText: 'Partner With Us',
      buttonTarget: 'contact',
      bgEmoji: '🏫',
    },
    {
      icon: '📦',
      color: 'bl',
      category: 'Give Essentials',
      title: 'Donate Supplies',
      desc: 'Some needs can be met through practical items rather than financial contributions.',
      supportList: [
        'Educational materials',
        'School supplies',
        'Clothing',
        'Food items',
        "Children's essentials",
        'Other useful resources',
      ],
      buttonText: 'Ask About Current Needs',
      buttonTarget: 'contact',
      bgEmoji: '📚',
    },
    {
      icon: '📣',
      color: 'rd',
      category: 'Spread the Word',
      title: 'Share Our Story',
      desc: 'You can help even by simply telling others about the work of Bethesda Charitable Trust. Follow, share, invite others to learn about our projects.',
      supportList: [],
      buttonText: 'Share Our Mission',
      buttonTarget: 'contact',
      bgEmoji: '📱',
    },
    {
      icon: '💡',
      color: 'go',
      category: 'Start Something',
      title: 'Organize a Fundraiser',
      desc: 'Bring your church, school, community group, or organization together to support a BCT initiative. A fundraiser can raise awareness and build community.',
      supportList: [],
      buttonText: 'Talk to Us',
      buttonTarget: 'contact',
      bgEmoji: '🎪',
    },
  ],
  banners: {
    volunteer: {
      emoji: '👩‍👧',
      title: 'Become a Volunteer',
      desc: 'We would love to hear from you. If you would like to volunteer your time, skills, professional expertise or experience, contact Bethesda Charitable Trust.',
      buttonText: 'VOLUNTEER WITH US →',
      buttonHref: siteConfig.contact.volunteerFormUrl,
    },
    partner: {
      emoji: '🤝',
      title: 'Partner With Bethesda Charitable Trust',
      desc: 'Whether you represent a church, organization, business, school or community group, we welcome conversations about working together.',
      buttonText: 'PARTNER WITH US →',
      buttonTarget: 'contact',
    },
  },
  stayConnected: {
    title: 'Stay Connected',
    desc: 'Follow Bethesda Charitable Trust and share our work with your friends, family, church and community.',
    quote: 'Your involvement matters.',
    orgName: 'Bethesda Charitable Trust',
    tagline: 'Empowering Lives. Transforming Communities. Since 2009',
  },
};

export const donateContent = {
  hero: {
    eyebrow: 'Donate —',
    title: 'Support Our Work',
    subtitle: 'Every gift brings hope.',
    description:
      'Your contribution helps provide education, meals, healthcare, skills and care to children, women and families. Give by bank transfer or UPI, then request your receipt in one tap.',
    avatar: '❤',
    actions: [
      { label: 'Donate Now ↓', target: 'give', variant: 'gold' },
      { label: 'Request a Receipt →', target: 'rcpt', variant: 'white-outline' },
    ],
  },
  bank: {
    title: 'Bank Transfer',
    accountName: 'Bethesda Charitable Trust',
    bank: 'Punjab National Bank',
    accountNo: '1572050000329',
    branch: 'Valsao Pale, South Goa',
    ifsc: 'PUNB0157220',
  },
  upi: {
    upiId: '7507359065m@pnb',
    payUrl: 'upi://pay?pa=7507359065m@pnb&pn=BETHESDA%20CHARITABLE%20TRUST&mc=5942&cu=INR',
    orgName: 'Bethesda Charitable Trust',
  },
  taxCertificates: [
    { label: '80G Certificate', value: 'U.R.N. – AABTB7768HE20215' },
    { label: 'Darpan ID', value: 'GA/2025/0886535' },
    { label: 'Registration', value: 'Reg. No. 09/2009 | 12A Exempted' },
  ],
  receipt: {
    title: 'Need a Receipt?',
    desc: 'We hold an 80G certificate. After you donate, tap the button and WhatsApp opens with a ready-made message. Just fill in the blanks and send.',
    steps: [
      'Donate by bank transfer or UPI',
      'Tap “Request Receipt on WhatsApp”',
      'Add your amount and transaction ID, then send',
    ],
    whatsappNumber: '918087772008',
    whatsappMessage:
      'Hello Bethesda Charitable Trust,\nI have made a donation and would like to request a receipt.\n\nName: \nAmount: ₹\nDate of donation: \nPayment mode (Bank transfer / UPI): \nTransaction / UTR ID: \nPAN (for 80G receipt): \nEmail: \n\nThank you.',
  },
};

export const contactContent = {
  hero: {
    eyebrow: 'Contact Bethesda —',
    title: "We're Here to Listen.",
    subtitle: '',
    description:
      "Let's Connect. Let's Serve. Let's Make a Difference. Whether you want to ask a question, volunteer, partner with us, support a project, or learn more about Bethesda Charitable Trust, we would love to hear from you.",
    avatar: '👩‍👧',
    actions: [
      { label: 'GET IN TOUCH →', target: 'enquiry', variant: 'gold' },
      { label: 'SUPPORT OUR WORK', target: 'donate', variant: 'white-outline' },
    ],
  },
  channels: [
    {
      icon: '📍',
      color: 'bl',
      title: 'Visit Us',
      detail: 'Valsao Pale, South Goa, India',
      actionText: 'Get Directions',
      actionType: 'external',
      href: 'https://share.google/Y9UmIrC5cQf7vxMhg',
    },
    {
      icon: '📞',
      color: 'gr',
      title: 'Call Us',
      detail: '+91 8087772008',
      actionText: 'Call Now',
      actionType: 'external',
      href: 'tel:+918087772008',
    },
    {
      icon: '✉',
      color: 'bl',
      title: 'Email Us',
      detail: 'bethesdatrust2009@gmail.com',
      actionText: 'Send Email',
      actionType: 'external',
      href: 'mailto:bethesdatrust2009@gmail.com',
    },
    {
      icon: '💬',
      color: 'gr',
      title: 'WhatsApp',
      detail: '+91 8087772008',
      actionText: 'Chat With Us',
      actionType: 'external',
      href: 'https://wa.me/918087772008?text=Hello%20Bethesda%20Charitable%20Trust',
    },
  ],
  enquiry: {
    cardLeft: {
      title: "We'd Love to Hear From You",
      points: [
        'Have a question about our projects?',
        'Want to volunteer?',
        'Interested in partnering with Bethesda?',
        'Need more information about our work?',
      ],
      emoji: '🧑‍🤝‍🧑',
    },
    cardRight: {
      title: 'Fill Our Enquiry Form',
      description:
        'Volunteering, partnerships, support or any question — share your details with us using our Google Form.',
      buttonText: 'OPEN THE FORM →',
      googleFormUrl:
        'https://docs.google.com/forms/d/e/1FAIpQLSewhEf_xUlaq0HcB6YEZnrDLnW2lSJpSyr7Rxcl2Lh2I6KQRg/viewform?usp=header',
    },
  },
  helpServices: [
    {
      icon: '❤',
      color: 'rd',
      title: 'Support Our Mission',
      desc: 'Learn how your contribution can help.',
      target: 'donate',
    },
    {
      icon: '👥',
      color: 'bl',
      title: 'Volunteer With Us',
      desc: 'Give your time and skills to serve others.',
      target: 'involved',
    },
    {
      icon: '🎁',
      color: 'or',
      title: 'Project SMS',
      desc: 'Learn about our food-sharing outreach.',
      target: 'pj3',
    },
    {
      icon: '📖',
      color: 'pu',
      title: 'Education & Children',
      desc: "Support children's education and development.",
      target: 'pj1',
    },
    {
      icon: '🎗',
      color: 'mg',
      title: "Women's Empowerment",
      desc: 'Explore opportunities to support women.',
      target: 'pj4',
    },
    {
      icon: '✚',
      color: 'tl',
      title: 'Healthcare & Care',
      desc: 'Learn about our community healthcare initiatives.',
      target: 'pj5',
    },
  ],
  whatsappBanner: {
    icon: '💬',
    title: 'Prefer WhatsApp?',
    subtitle: "Let's talk directly.",
    description:
      'Have a quick question? Send us a WhatsApp message and our team can respond to your enquiry.',
    buttonText: 'CHAT ON WHATSAPP →',
    whatsappUrl:
      'https://wa.me/918623965098?text=Hello%20Bethesda%20Charitable%20Trust,%20I%20would%20like%20to%20know%20more.',
  },
  location: {
    mapEmbedUrl:
      'https://www.google.com/maps?q=Bethesda+Charitable+Trust,+Valsao+Pale,+Goa&output=embed',
    title: '📍 Find Us',
    orgName: 'Bethesda Charitable Trust',
    address: 'Valsao Pale, South Goa, India',
    directionsUrl: 'https://share.google/Y9UmIrC5cQf7vxMhg',
    inspirationalQuote: '✝ Together we can make a difference ♡',
  },
  statsStrip: {
    title: 'Serving With Compassion Since 2009',
    stats: [
      { value: '15+', label: 'Years of Service' },
      { value: '7', label: 'Areas of Service' },
      { value: '👨‍👩‍👧', label: 'Children & Families Reached' },
      { value: '🤝', label: 'Community Outreach' },
    ],
  },
  faq: [
    {
      question: 'How can I volunteer with Bethesda?',
      answer:
        'You can contact us through the form, phone or WhatsApp and tell us how you would like to help.',
    },
    {
      question: 'Can I visit Bethesda?',
      answer:
        'Yes. Contact us before visiting so we can provide the appropriate information.',
    },
    {
      question: 'Can I support a specific project?',
      answer:
        'Yes. Mention the project in your enquiry and our team can guide you.',
    },
    {
      question: 'How can I partner with Bethesda?',
      answer:
        'Send us a message describing your organization, group or partnership idea.',
    },
  ],
};


