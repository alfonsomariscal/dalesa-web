// English copy. Keep it in sync with es.mjs (same structure and order).
export default (d) => ({
  lang: 'en',
  locale: 'en_GB',
  pending: (what) => `[PENDING: ${what}]`,

  ui: {
    skip: 'Skip to content',
    menu: 'Menu',
    switchTo: 'Español',
    switchShort: 'ES',
    cta: "Let's talk",
    learnMore: 'See details',
    allCases: 'See all case studies',
    all: 'All',
    rights: 'All rights reserved.',
    illustrative: 'Illustrative example',
    theme: 'Design',
    themes: ['Design 1 · Violet', 'Design 2 · Gold', 'Design 3 · Black and white'],
    whatsapp: 'Message us on WhatsApp',
    whatsappText: 'Hello, I would like to talk to DALESA.',
    callMe: 'We call you',
  },

  nav: {
    services: 'Services',
    cases: 'Case studies',
    about: 'About',
    contact: 'Contact',
    legal: 'Legal notice',
    privacy: 'Privacy & cookies',
  },

  services: [
    {
      id: 'ia',
      icon: 'bot',
      title: 'AI agents',
      short:
        'AI assistants that answer questions, handle documents or prepare reports, so your team can focus on the work that really adds value.',
      intro:
        'An AI agent is not a generic chatbot: it works with your information and your tools, and takes care of specific tasks from start to finish.',
      bullets: [
        'Answering customer or employee questions from your own documentation',
        'Reading, classifying and extracting data from documents: invoices, orders, contracts',
        'Reports and summaries prepared automatically',
        'Connected to the tools you already use: email, ERP (including SAP), CRM or databases',
        'Human review on the steps that matter, and control over where your data lives',
      ],
    },
    {
      id: 'procesos',
      icon: 'workflow',
      title: 'Process improvement',
      short:
        'We look at how your team works, find the bottlenecks and redesign processes so they are faster and more efficient.',
      intro: 'Before automating anything, we understand the process. Sometimes the best improvement is not a technical one.',
      bullets: [
        'Review of the current process with the people who run it every day',
        'Finding bottlenecks, duplicated steps and waiting times',
        'Process redesign with improvements ranked by impact',
        'Automation of repetitive steps',
        'Metrics to compare before and after',
      ],
    },
    {
      id: 'modernizacion',
      icon: 'smartphone',
      title: 'Custom web & mobile applications',
      short:
        'We build new applications tailored to the way you work and modernise the ones you already have so they are faster, more secure and easier to use, on mobile too.',
      intro:
        'If the tool you need does not exist, we build it from scratch. If you already have it, we keep what works and change what holds you back, without rebuilding everything.',
      bullets: [
        'Custom web and mobile applications, built from scratch',
        'Mobile apps (iOS and Android) for your customers or for field, warehouse or shop-floor teams',
        'Web portals for customers, employees or partners',
        'Evolving and modernising existing applications without rebuilding everything',
        'Integration with the systems you already have, such as SAP',
        'Better performance, security and usability',
      ],
    },
  ],

  steps: [
    { title: 'We listen', text: 'We talk to your team and understand how work gets done today, with no preconceptions.' },
    { title: 'We study your case', text: 'We look at processes, systems and data to see where time is being lost.' },
    { title: 'We propose concrete improvements', text: 'A clear, prioritised proposal with the expected outcome of each step.' },
    { title: 'We stay with you', text: 'We roll it out together and stay until the improvements work day to day.' },
  ],

  stats: [
    { value: '14+', label: 'years of team experience' },
    { value: '40+', label: 'projects we have worked on' },
    { value: '8+', label: 'industries: banking, insurance, energy, automotive, consumer goods, textiles…' },
  ],
  expertise: [
    'Generative AI & agents',
    'Data science',
    'Process automation',
    'SAP',
    'iOS & Android apps',
    'Web applications',
    'Systems integration',
  ],

  sectors: [
    { icon: 'landmark', name: 'Banking' },
    { icon: 'shield-check', name: 'Insurance' },
    { icon: 'ham', name: 'Food production' },
    { icon: 'shirt', name: 'Textiles' },
    { icon: 'truck', name: 'Transport' },
    { icon: 'fuel', name: 'Oil & gas' },
    { icon: 'car', name: 'Automotive' },
    { icon: 'shopping-cart', name: 'Consumer goods' },
  ],

  // Case studies: same order and structure as es.mjs.
  cases: [
    {
      id: 'textiles',
      icon: 'shirt',
      featured: true,
      service: 'ia',
      visual: 'sizes',
      sector: 'Fashion & textiles',
      client: 'Textile company',
      title: 'Automated reporting and AI size recommendation',
      summary:
        'We turned all their data into documentation and reports with charts, and built a model that infers the right size for each customer.',
      challenge:
        'Information scattered across data and reports, and the need to get each customer’s size right based on their characteristics.',
      solution: [
        'Automatic generation of documentation from all their data',
        'Reports with charts, ready to share',
        'Analysis and inference of size based on the user’s characteristics',
      ],
      result:
        'Reports that used to be prepared by hand are now generated automatically and always up to date, with a significant improvement in size accuracy for each customer.',
      tech: ['Data science', 'Machine learning', 'Generative AI', 'Python'],
      v: {
        alt: 'Illustration: size recommendation based on user characteristics',
        inputs: ['Height', 'Weight', 'Build'],
        result: 'Recommended size',
        confidence: 'Estimated fit',
        before: 'Characteristics',
        after: 'Recommendation',
      },
    },
    {
      id: 'insurance-claims',
      icon: 'shield-check',
      featured: true,
      service: 'ia',
      visual: 'extract',
      sector: 'Insurance',
      client: 'Insurance company',
      title: 'AI for claims handling and the broker network',
      summary:
        'A system that reads the documents for each claim and classifies it, and an assistant that answers agents’ and brokers’ questions about policies and coverage.',
      challenge:
        'Every claim arrived with forms, photos and loss adjuster reports that had to be reviewed by hand before processing, and agents and brokers frequently asked about policy terms and coverage.',
      solution: [
        'Automatic reading of claim forms, photos and adjuster reports',
        'Extraction of the key data for each claim',
        'Claim classification and prioritisation',
        'AI assistant that answers agents and brokers about policy terms and coverage',
      ],
      result:
        'Faster claims handling, with urgent cases flagged from the start, and brokers who get answers instantly instead of waiting for head office.',
      tech: ['Generative AI', 'Computer vision', 'Document extraction', 'RAG'],
      v: {
        alt: 'Illustration: extracting and classifying claim data',
        fields: ['Policy', 'Claim type', 'High priority'],
        before: 'Forms, photos, reports',
        after: 'Claim classified',
      },
    },
    {
      id: 'insurance-mobile',
      icon: 'shield-check',
      service: 'modernizacion',
      visual: 'claim',
      sector: 'Insurance',
      client: 'Insurance company',
      title: 'Apps for customers and adjusters, and a renewed agent portal',
      summary:
        'We brought customers, loss adjusters and agents onto mobile and web: filing a claim with photos, assessing in the field and quoting from a modern portal.',
      challenge:
        'Customers, adjusters and agents relied on tools that were not designed for mobile, and the agent portal and web quoting tool had become outdated.',
      solution: [
        'Customer app to file a claim with photos and check policies',
        'App for loss adjusters working in the field',
        'Modernisation of the agent portal and the web quoting tool',
      ],
      result:
        'Customers who file a claim from their phone in minutes, adjusters with all the information at hand in the field, and an agent portal that is faster and easier to use.',
      tech: ['iOS', 'Android', 'Web', 'APIs'],
      v: {
        alt: 'Illustration: a customer files a claim with photos and the adjuster handles it in the field',
        button: 'File claim',
        visit: 'Adjuster visit',
        items: ['Photos reviewed', 'Damage assessed', 'Report sent'],
        before: 'Customer app',
        after: 'Adjuster app',
      },
    },
    {
      id: 'food-production',
      icon: 'ham',
      featured: true,
      service: 'procesos',
      visual: 'curve',
      sector: 'Food production',
      client: 'Ham curing facility',
      title: 'Process and calculation automation at a ham curing facility',
      summary: 'We moved manual calculations and scattered spreadsheets to automated, reliable processes across production.',
      challenge:
        'Many production calculations were done by hand or in spreadsheets, which took time and risked errors.',
      solution: [
        'Review of production processes with the team',
        'Automation of production calculations and curing process control',
        'Dashboards with production data, always up to date',
        'Less manual work and data available instantly',
      ],
      result: 'A significant reduction in time spent on calculations, fewer errors and reliable real-time data for decision-making.',
      tech: ['Automation', 'Data science', 'Dashboards'],
      v: {
        alt: 'Illustration: tracking curing by batch',
        y: 'Weight',
        x: 'Curing days',
        target: 'Target',
        chipTitle: 'Current batch',
      },
    },
    {
      id: 'banking',
      icon: 'landmark',
      featured: true,
      service: 'modernizacion',
      visual: 'modernize',
      sector: 'Banking',
      client: 'Bank',
      title: 'Migration and modernisation of mobile and web apps',
      summary:
        'We moved years-old mobile and web applications to current technology that is easier to maintain and ready to keep evolving.',
      challenge:
        'Mobile and web applications built years ago on ageing technology, hard to maintain and slow to evolve.',
      solution: [
        'Review of existing applications and migration plan',
        'Migration to current mobile and web technologies',
        'A refreshed user experience',
      ],
      result:
        'Modern applications that are easier to maintain and evolve, and a clearly better experience for the bank’s customers.',
      tech: ['iOS', 'Android', 'Web', 'APIs'],
      v: { alt: 'Illustration: legacy application versus modernised application', before: 'Before', after: 'After' },
    },
  ],
  caseLabels: { challenge: 'Challenge', solution: 'What we did', result: 'Outcome' },

  home: {
    title: `${d.name} · AI agents and practical technology for businesses`,
    description:
      'We help companies work better, not harder: AI agents, process improvement and custom web and mobile applications.',
    eyebrow: 'Applied artificial intelligence',
    h1: 'We help companies <em>work better</em>, not harder.',
    lead:
      'We deploy AI agents, redesign processes and build or modernise web and mobile applications, so your team stops losing hours to repetitive tasks.',
    ctaPrimary: 'Tell us about your case',
    ctaSecondary: 'What we do',
    note: 'The first conversation is on us.',
    demo: {
      title: 'Customer query agent',
      steps: [
        { label: 'Query received', detail: '“What is the status of order 4471?”' },
        { label: 'Checks the ERP and email', detail: '2 systems queried' },
        { label: 'Answer drafted', detail: 'Sent after team review' },
      ],
    },
    clientsTitle: 'Our team has worked with',
    sectorsTitle: 'Experience in industries such as',
    chart: { title: 'Hours on manual tasks', before: 'Before', after: 'With AI agents' },
    badge: 'Human review built in',
    problemTitle: 'Every day, hours are lost that nobody sees',
    problems: [
      { title: 'Repetitive tasks', text: 'Copying data from one place to another, answering the same questions, hunting for documents.' },
      { title: 'Processes nobody has reviewed', text: 'Ways of working that nobody has questioned in years and no longer fit.' },
      { title: 'Applications that fell behind', text: 'Tools that are slow, hard to use or do not work on mobile.' },
    ],
    servicesTitle: 'What we do',
    servicesLead: 'Three ways to win that time back. They work on their own, and better together.',
    howTitle: 'How we work: we listen first',
    howLead: 'Every company is different, so we do not sell off-the-shelf solutions.',
    teamTitle: 'Experience from real projects',
    teamLead:
      'The DALESA team brings years of work on SAP projects, mobile and web applications and AI automation. That experience goes into every proposal.',
    casesTitle: 'Case studies',
    casesLead: 'Some of the projects we have worked on.',
    finalTitle: 'Want to know how AI can help your business?',
    finalText: 'Write to us or we will call you. The first conversation is on us.',

    responsible: {
      title: 'Safe, responsible AI',
      lead: 'The first thing people ask us is what happens to their data. This is how we work.',
      items: [
        { icon: 'lock', title: 'Your data, under your control', text: 'We decide with you where it is processed, who can access it and what information the AI uses. Only what each task needs.' },
        { icon: 'users', title: 'People make the decisions', text: 'The AI prepares and suggests; your team reviews and approves anything important before it goes out.' },
        { icon: 'shield-check', title: 'GDPR and the EU AI Act', text: 'We take data protection law and the EU AI Act into account from the design stage, not as an afterthought.' },
        { icon: 'search', title: 'No black boxes', text: 'You know what each agent does, with which data and why. Everything is logged so it can be reviewed.' },
      ],
    },

    faq: {
      title: 'Frequently asked questions',
      lead: 'What people usually ask us before getting started.',
      items: [
        { q: 'How much does it cost?', a: 'It depends on the scope, so we do not quote fixed prices without understanding the case. The first conversation is free and, if it is a fit, we give you a proposal with the cost of each step before we start.' },
        { q: 'How long until we see results?', a: 'We prefer to start with something focused that pays off early and grow from there, rather than large projects that take months to deliver. The proposal sets out the timing of each phase.' },
        { q: 'Do we need to change our systems?', a: 'No. We work with what you already use (ERP, SAP, email, spreadsheets, in-house applications) and connect it. Modernising does not mean starting from scratch, and if you need a new tool, we build it for you.' },
        { q: 'Will AI replace my team?', a: 'That is not the idea. AI takes care of repetitive tasks so your team can spend its time on what adds value, and important decisions still go through people.' },
        { q: 'Do you work with small and medium-sized companies?', a: 'Yes. The team has worked with large banks, insurers and energy companies, but also with mid-sized businesses such as the ham curing plant in our case studies. What matters is that there is something to improve.' },
        { q: 'How do we know it has worked?', a: 'Before we start, we agree on what to measure: hours spent, errors, response times… and we review it with you once it is up and running, day to day.' },
      ],
    },
  },

  servicesPage: {
    title: `Services · ${d.name}`,
    description: 'AI agents, process improvement and custom web and mobile applications for businesses.',
    h1: 'Practical technology that shows in the results',
    lead: 'Not just in the slide deck. These are the three areas we work in.',
    listTitle: 'What it includes',
  },

  casesPage: {
    title: `Case studies · ${d.name}`,
    description: 'AI, process improvement and web and mobile application projects.',
    h1: 'Real projects, results you can see',
    lead: 'Some of the projects we have worked on. For confidentiality reasons we do not always name the client.',
  },

  aboutPage: {
    title: `About · ${d.name}`,
    description: 'Who we are and how we work at DALESA.',
    h1: 'Helping teams work better, not harder',
    lead:
      'DALESA was founded so that technology solves concrete, everyday problems for businesses: fewer repetitive tasks, leaner processes and tools people enjoy using.',
    storyTitle: 'Our story',
    story: [
      'Behind DALESA is a team with more than 14 years of experience in technology projects across industries such as banking, insurance, food, textiles, transport and energy: mobile and web applications, SAP, data science and artificial intelligence.',
      'Across all those projects we saw the same problems again and again: hours lost to repetitive tasks, processes nobody reviewed and tools that had fallen behind. We founded DALESA to solve them with practical technology, starting with artificial intelligence.',
    ],
    valuesTitle: 'How we work',
    values: [
      { title: 'Listen first', text: 'We understand how you work before proposing anything.' },
      { title: 'No off-the-shelf solutions', text: 'Every proposal starts from your case.' },
      { title: 'Results, not slides', text: 'We measure improvements in day-to-day work, not in a presentation.' },
      { title: 'Until it works', text: 'We stay with you through the rollout, not just the design.' },
    ],
    clientsTitle: 'Our team has worked with',
    sectorsTitle: 'Industries we have worked in',
    teamTitle: 'The team',
    teamText: [
      'We are a group of people who love technology and work done properly.',
      'We steer clear of the “more hours, more billing” model and of off-the-shelf solutions that fit no one. We would rather build tailored solutions, together with each client, that we can be proud of.',
      'To us, helping means giving you the tools, staying with you throughout the process and teaching you to make the most of them, so your team gains independence.',
    ],
    teamAreas: 'These are the areas we know best:',
    certsTitle: 'Certifications',
    certs: [], // Add certifications here; when empty, the block is hidden.
  },

  contactPage: {
    title: `Contact · ${d.name}`,
    description: 'Tell us what you would like to improve in your business. The first conversation is on us.',
    h1: "Let's talk",
    lead: 'Tell us what you would like to improve. The first conversation is on us.',
    form: {
      title: 'Tell us about your case',
      note: 'No commitment. The first conversation is on us.',
      topicsLabel: 'How can we help?',
      topics: [
        { icon: 'bot', label: 'AI agents' },
        { icon: 'workflow', label: 'Process improvement' },
        { icon: 'smartphone', label: 'Web or mobile apps' },
        { icon: 'lightbulb', label: 'Something else' },
      ],
      name: 'Name',
      company: 'Company',
      email: 'Email',
      message: 'What would you like to improve?',
      messageHint: 'For example: “We spend hours checking orders by hand”.',
      consent: 'I have read and accept the <a href="{privacy}">privacy policy</a>.',
      submit: 'Send',
      sending: 'Sending…',
      ok: 'Thank you. We will get back to you as soon as possible.',
      error: 'The message could not be sent. Please email or call us directly using the details on this page.',
      mailSubject: 'Contact from the website',
    },
    next: {
      title: 'What happens next?',
      items: [
        { icon: 'mail', title: 'We reply', text: 'We read your message and get back to you as soon as possible.' },
        { icon: 'message-circle', title: 'First conversation', text: 'We talk about your case, free and with no commitment.' },
        { icon: 'lightbulb', title: 'A concrete proposal', text: 'If it is a fit, we propose clear, prioritised improvements.' },
      ],
    },
    tabs: { write: 'Write to us', call: 'We call you' },
    callback: {
      title: 'Would you rather we call you?',
      note: 'Leave us your phone number and we will call you.',
      name: 'Name',
      phone: 'Phone',
      when: 'When suits you best?',
      slots: ['Morning', 'Afternoon', 'Any time'],
      submit: 'Request a call',
      sending: 'Sending…',
      ok: 'Done. We will call you as soon as possible.',
      error: 'The request could not be sent. Please call us directly on the numbers on this page.',
      mailSubject: 'Call request from the website',
    },
    phonesTitle: 'Or call us',
    asideTitle: 'You can also reach us at',
    emailLabel: 'Email',
    linkedinLabel: 'LinkedIn',
    copy: 'Copy',
    copied: 'Copied',
  },

  legalPage: {
    title: `Legal notice · ${d.name}`,
    description: `Legal notice of ${d.name}.`,
    h1: 'Legal notice',
    intro: 'This is a courtesy translation. In case of discrepancy, the Spanish version prevails.',
    sections: [
      {
        h: 'Website owner',
        p: [
          `In accordance with Spanish Law 34/2002 on Information Society Services and Electronic Commerce (LSSI-CE), this website is owned by ${d.ident}`,
          `Contact email: ${d.email}.`,
        ],
      },
      {
        h: 'Terms of use',
        p: [
          'Access to this website is free of charge and makes you a user who accepts these terms. Users agree to make appropriate use of the content and not to use it for unlawful purposes.',
        ],
      },
      {
        h: 'Intellectual property',
        p: [
          `The content of this site (text, design, logos and images) belongs to ${d.titular} or is used with permission. It may not be reproduced without express authorisation.`,
        ],
      },
      {
        h: 'Liability',
        p: [
          'The owner is not liable for damages arising from the use of this site or for the content of linked external sites, over which it has no control.',
        ],
      },
      {
        h: 'Governing law',
        p: ['These terms are governed by Spanish law.'],
      },
    ],
  },

  privacyPage: {
    title: `Privacy & cookies · ${d.name}`,
    description: `Privacy and cookie policy of ${d.name}.`,
    h1: 'Privacy and cookie policy',
    intro: 'This is a courtesy translation. In case of discrepancy, the Spanish version prevails.',
    sections: [
      {
        h: 'Data controller',
        p: [`${d.ident} Contact: ${d.email}.`],
      },
      {
        h: 'What data we process and why',
        p: [
          'We process the data you send us through the contact form or by email (name, company, email address and the content of your message) solely to answer your enquiry and, where appropriate, prepare a proposal.',
        ],
      },
      {
        h: 'Legal basis',
        p: ['Your consent, given when you submit the form, and taking pre-contractual steps at your request.'],
      },
      {
        h: 'How long we keep it',
        p: ['For as long as the enquiry or relationship lasts and, afterwards, for the applicable legal periods. If we do not end up working together, we delete it within one year at most.'],
      },
      {
        h: 'Recipients',
        p: [
          'We do not share your data with third parties unless legally required. The form may be handled by a service provider acting as a data processor with the safeguards required by the GDPR.',
        ],
      },
      {
        h: 'Your rights',
        p: [
          `You can exercise your rights of access, rectification, erasure, objection, restriction and portability by writing to ${d.email}. If you believe we have not handled your request properly, you can complain to the Spanish Data Protection Agency (<a href="https://www.aepd.es" rel="noopener">www.aepd.es</a>).`,
        ],
      },
      {
        h: 'Cookies',
        p: [
          'This site does not use first- or third-party cookies for analytics or advertising, and does not load resources from external services while you browse. That is why we do not show a cookie banner.',
        ],
      },
    ],
  },

  notFound: {
    title: `Page not found · ${d.name}`,
    h1: 'This page does not exist',
    text: 'The link may be wrong or the page may have moved.',
    back: 'Back to home',
  },
});
