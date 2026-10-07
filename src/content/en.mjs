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
    whatsapp: 'Message us on WhatsApp',
    whatsappText: 'Hello, I would like to talk to DALESA.',
    callMe: 'We call you',
  },

  nav: {
    services: 'Services',
    cases: 'Use cases',
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
        'Custom SAP Fiori applications, so you can work with SAP from a browser, tablet or phone',
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
    'SAP and SAP Fiori',
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
      group: 'moda',
      icon: 'shirt',
      featured: true,
      service: ['ia', 'modernizacion'],
      visual: 'sizes',
      image: 'textil',
      sector: 'Fashion & textiles',
      client: 'Large international fashion retailer',
      title: 'An app for store managers and the right size with AI',
      summary:
        'For four years we worked with a large fashion retailer on a mobile app for store managers and on AI models that help each customer get their size right.',
      challenge:
        'Store managers needed to see their store’s stock, available sizes and sales at a glance, and customers were returning garments because the size was wrong.',
      solution: [
        'Mobile app for store managers: stock, available sizes and sales in real time',
        'Clothing orders from the app itself',
        'Size recommendation based on the customer’s measurements and previous orders',
        'Returns analysis: if people who wear an S return a garment and keep the M, the system detects that it runs small',
        'Automatic reports with charts built from all their data',
      ],
      result:
        'Store managers with their store’s information always in their pocket and a significant improvement in size accuracy, knowing which garments run large or small.',
      tech: ['iOS and Android apps', 'Machine learning', 'Data science', 'Generative AI'],
      v: {
        alt: 'Example app screens: store sales, stock by size, restocking order and recommended size for the customer',
        inputs: ['Measurements', 'Your orders', 'Returns'],
        result: 'Recommended size',
        confidence: 'This item runs small',
        before: 'Customer data',
        after: 'Recommendation',
      },
    },
    {
      id: 'insurance-claims',
      group: 'seguros',
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
      group: 'seguros',
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
      group: 'alimentacion',
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
      group: 'banca',
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
    ctaSecondary: 'See use cases',
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
      'The DALESA team brings years of work on SAP projects and SAP Fiori applications, mobile and web applications and AI automation. That experience goes into every proposal.',
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
    title: `Use cases · ${d.name}`,
    description: 'Use cases for artificial intelligence, process improvement and web and mobile applications, by industry: real projects and step-by-step examples.',
    h1: 'Use cases, from start to finish',
    lead: 'Choose an industry. In each one you will find real projects the team has worked on and, where there is one, a step-by-step example of what such a project looks like.',
    note: 'For confidentiality we do not name our clients. In the step-by-step examples, names, companies and figures are fictitious.',
    chooseLabel: 'Choose an industry',
    realTitle: 'Real project',
    realTitlePlural: 'Real projects',
    exampleTitle: 'What it looks like, step by step',
    exampleNote: 'Illustrative example with a fictitious company:',
    groups: [
      { id: 'moda', tab: 'Fashion', icon: 'shirt' },
      { id: 'banca', tab: 'Banking', icon: 'landmark' },
      { id: 'alimentacion', tab: 'Food & distribution', icon: 'shopping-cart' },
      { id: 'seguros', tab: 'Insurance', icon: 'shield-check' },
    ],
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

  examplePage: {
    eyebrow: 'Use cases',
    stepLabel: 'Step',
    processes: [
      {
        id: 'montera',
        group: 'alimentacion',
        tab: 'Food distribution',
        company: 'Montera',
        icon: 'shopping-cart',
        intro: 'Montera is a distributor of Iberian ham, cheese and preserves for bars, restaurants and shops. This is how an order travels, from the bar to the management dashboard.',
        steps: [
        {
          id: 'pedido',
          image: 'movil',
          tag: 'Mobile app',
          title: 'The sales rep takes the order on the road',
          text: 'Javier visits bars and shops with an app on his phone: he sees his route for the day, each customer’s profile and what they usually order. The AI assistant tells him what the customer is about to run out of.',
          points: [
            'Daily route with a map and the status of each visit',
            'AI suggestions based on the customer’s history',
            'Customer signature and delivery-note photo, no paper',
            'The order reaches SAP without being typed twice',
          ],
          alt: 'Four screens of the mobile app: daily route, customer profile, new order and delivery confirmation',
        },
        {
          id: 'portal',
          image: 'portal',
          tag: 'Web portal',
          title: 'The customer tracks the order and reorders the usual',
          text: 'Rosa, who owns La Tasca, logs into the customer portal: she sees when the delivery will arrive, downloads her invoices and repeats her usual order in a couple of clicks, at her own prices.',
          points: [
            'Real-time delivery tracking',
            'Invoices and delivery notes always at hand',
            'Usual products suggested before they run out',
            'Catalogue and basket with her prices and promotions',
          ],
          alt: 'Customer web portal on a laptop: order tracking, usual products and invoices',
        },
        {
          id: 'compras',
          image: 'fiori',
          tag: 'SAP Fiori',
          title: 'Purchasing restocks and it is approved in SAP Fiori',
          text: 'To restock, purchasing raises an order with the supplier. The manager approves it in a custom SAP Fiori app, on a computer or on her phone, with the items and the budget in view.',
          points: [
            'Pending orders sorted by urgency',
            'Items, terms and budget on one screen',
            'Approve or reject with a note for the requester',
            'The same app on computer, tablet and phone',
          ],
          alt: 'SAP Fiori purchase order approval app on a laptop and a phone',
        },
        {
          id: 'factura',
          image: 'agente',
          tag: 'AI agent',
          title: 'The AI agent checks the supplier’s invoice',
          text: 'When the invoice arrives by email, the agent reads it, matches it against the order, the goods receipt and the price list in SAP, and spots that the ham has been charged above the agreed price. It suggests withholding the difference and claiming it back, with the email already drafted. A person makes the call.',
          points: [
            'Reads PDF invoices arriving by email',
            'Checks supplier, quantities and prices in SAP',
            'Posts the correct ones and explains the ones that do not match',
            'Answers questions about each invoice',
          ],
          alt: 'AI agent reviewing a supplier invoice: extracted data, checks and proposal',
        },
        {
          id: 'panel',
          image: 'panel',
          tag: 'Dashboard & AI',
          title: 'Management sees everything and gets ahead',
          text: 'All of the above ends up in a dashboard with sales, margins and routes, plus an AI demand forecast. The assistant flags stock that will run short over a bank holiday, products about to expire and customers who start ordering less.',
          points: [
            'Sales, margin and routes updated every morning',
            'Demand forecast that accounts for holidays and open orders',
            'Alerts on stock, expiry dates and at-risk customers',
            'Every alert comes with a suggested action',
          ],
          alt: 'Sales and demand forecasting dashboard on a laptop',
        },
      ],
      },
      {
        id: 'velarte',
        group: 'moda',
        tab: 'Fashion',
        company: 'Velarte',
        icon: 'shirt',
        intro: 'Velarte is a fashion chain with its own stores and online sales. This is how a garment travels, from the store to the return that never happens.',
        steps: [
          {
            id: 'tienda',
            image: 'velarte-tienda',
            tag: 'Store app',
            title: 'The store manager sees her store on her phone',
            text: 'Laura, who runs the Valladolid store, follows the day’s sales against target and sees each garment’s stock by size: in her store, in the warehouse and in nearby stores.',
            points: [
              'Daily sales, tickets and average ticket against target',
              'Stock by size in store, warehouse and nearby stores',
              'Alert when a size is about to sell out',
              'The day’s best sellers at a glance',
            ],
            alt: 'Two store app screens: daily sales and stock by size for a shirt',
          },
          {
            id: 'reposicion',
            image: 'velarte-reposicion',
            tag: 'AI in the app',
            title: 'She restocks with the AI’s suggestion',
            text: 'Based on this week’s sales and the coming weekend, the assistant suggests what to restock and how much. Laura reviews it, adjusts the quantities and sends it: it arrives the next day.',
            points: [
              'Restocking order suggested by AI',
              'Quantities editable before sending',
              'Transfers between stores when the warehouse cannot make it in time',
              'Expected delivery on the same screen',
            ],
            alt: 'App screen with the restocking order suggested by AI',
          },
          {
            id: 'talla',
            image: 'velarte-talla',
            tag: 'Customer app',
            title: 'The customer gets the size right',
            text: 'When buying online, the app recommends a size from the customer’s measurements, previous orders and what other buyers of the same garment did. If a garment runs small, it says so.',
            points: [
              'Recommended size for every garment and customer',
              'A clear explanation of why that size',
              'Alert when a garment runs small or large',
              'Fewer returns and fewer size exchanges',
            ],
            alt: 'Customer app screen with the recommended size for a shirt',
          },
          {
            id: 'devoluciones',
            image: 'velarte-devoluciones',
            tag: 'Dashboard & AI',
            title: 'Product sees which garments do not fit as labelled',
            text: 'The product team sees how many orders are returned because of size, which garments run small or large and how it has evolved since sizes started being recommended. The assistant suggests what to do with each garment.',
            points: [
              'Size-related returns, week by week',
              'Garments that run small or large, with the most common exchange',
              'Size notes published on the website and in the app',
              'Proposals to adjust the pattern with the supplier',
            ],
            alt: 'Sizes and returns dashboard on a laptop',
          },
        ],
      },
      {
        id: 'myonbank',
        group: 'banca',
        tab: 'Banking',
        company: 'MyOnBank',
        icon: 'landmark',
        intro:
          'MyOnBank is a bank with a hybrid mobile app from 2014 that is slow and hard to maintain. This is how we migrate it to a native app with AI agents, skills and spec-driven development (SDD), without losing a single business rule.',
        steps: [
          {
            id: 'descubrimiento',
            image: 'myonbank-descubrimiento',
            tag: 'AI agents',
            title: 'The agents read the old app and extract its rules',
            text:
              'Several agents go through the old app’s code and build an inventory of screens, use cases, business rules and integrations. Each rule carries its exact origin in the code, and a verifier agent checks it.',
            points: [
              '142 screens, 64 use cases and 213 business rules inventoried',
              'Every rule, with the file and line it comes from',
              'Unused code is detected and not migrated',
              'Anything unclear is flagged for the business to confirm',
            ],
            alt: 'Migration workspace on a laptop: business rules discovered with their origin in the code',
          },
          {
            id: 'especificacion',
            image: 'myonbank-especificacion',
            tag: 'SDD',
            title: 'Every use case becomes an approved specification',
            text:
              'Before a line of code is written, each use case becomes a specification: the rules it follows, the acceptance criteria, the API contract and the screens. Business, security and architecture approve it.',
            points: [
              'Versioned specifications that people and agents both understand',
              'Acceptance criteria in Given / When / Then form',
              'Approval from business, security and architecture',
              'The verifier flags any missing rule',
            ],
            alt: 'Instant transfer specification with rules, acceptance criteria, API contract and approvals',
          },
          {
            id: 'generacion',
            image: 'myonbank-generacion',
            tag: 'Agents & skills',
            title: 'The agents generate the native app using the bank’s skills',
            text:
              'For each approved specification, the iOS and Android agents generate SwiftUI and Jetpack Compose code following the bank’s skills: its design system and its security and accessibility standards. Each part of the code states which rule it implements, and a person reviews every change.',
            points: [
              'Native code in SwiftUI and Jetpack Compose',
              'Skills with the bank’s design system, security and accessibility',
              'Traceability: every rule, in the code that implements it',
              'Human review of every change before it is merged',
            ],
            alt: 'Generation board with iOS and Android agents and SwiftUI code annotated with rules',
          },
          {
            id: 'paridad',
            image: 'myonbank-paridad',
            tag: 'Testing',
            title: 'The new app does what the old one did',
            text:
              'The same scenarios run against the old app and the new one. When a result differs, it is explained: either it is an improvement the business approves, or it gets fixed.',
            points: [
              '418 scenarios run on both apps',
              'Every difference, with its decision',
              'Migration progress week by week',
              'Nothing ships with open differences',
            ],
            alt: 'Parity testing dashboard comparing the old and new apps',
          },
          {
            id: 'app',
            image: 'myonbank-app',
            tag: 'Native app',
            title: 'Customers get a native app',
            text:
              'The result is a modern, fast and easy native app: balance at a glance, transfers in seconds with Face ID and full control of the card, with the same rules as always, now better explained.',
            points: [
              'Native app for iOS and Android',
              'More secure: Face ID, code signing and a card you can freeze instantly',
              'More intuitive and modern',
              'Clear messages about limits, cut-off times and signing',
              'Easier to maintain and to grow',
            ],
            alt: 'Four native app screens: home, send money, card and confirmed transfer',
          },
        ],
      },
      {
        id: 'nordaria',
        group: 'seguros',
        tab: 'Insurance',
        company: 'Nordaria Seguros',
        icon: 'shield-check',
        intro:
          'Nordaria is a home insurer. We trained an AI model on its own data to predict which homes will have another claim, and to act before it happens.',
        steps: [
          {
            id: 'datos',
            image: 'nordaria-datos',
            tag: 'Data',
            title: 'Their data, joined up and ready for training',
            text:
              'Ten years of policies, claims and loss adjuster reports are joined into one table per home and combined with each building’s year of construction and local weather. Data are cleaned and personal details pseudonymised before training.',
            points: [
              '2.1 million policies and 1.2 million claims',
              'Land registry and weather by postcode',
              '184 variables per policy',
              'Personal data pseudonymised',
            ],
            alt: 'AI project data screen: sources, quality and preparation',
          },
          {
            id: 'modelo',
            image: 'nordaria-modelo',
            tag: 'AI model',
            title: 'A model that beats the usual rules',
            text:
              'The model learns from past claims to predict which homes will have another water claim in the next 12 months. It is trained on the past and tested on a full year it has not seen: in the riskiest 10% it catches 47% of repeat claims, against 19% with the current rules.',
            points: [
              'Discrimination (AUC) of 0.86',
              'Validated on a full year of unseen data',
              'We know which variables matter most',
              'Checked for fairness',
            ],
            alt: 'Model card with accuracy, risk groups and the most important variables',
          },
          {
            id: 'prediccion',
            image: 'nordaria-prediccion',
            tag: 'Prediction',
            title: 'Every policy, with an explained prediction',
            text:
              'For each home the model gives the probability of a repeat claim and explains why: previous claims, old plumbing, a temporary repair, frost. It also predicts the final cost, the fraud risk and the likelihood that the customer will cancel.',
            points: [
              'Probability of a repeat claim within 12 months',
              'The reasons behind each prediction, in points',
              'Final cost, fraud and customer churn',
              'A specific recommendation for each case',
            ],
            alt: 'Repeat-claim prediction for a policy, with its explanation and other predictions',
          },
          {
            id: 'resultados',
            image: 'nordaria-resultados',
            tag: 'Results',
            title: 'From prediction to action, and measured',
            text:
              'The riskiest homes get a preventive plumbing check and a leak detector, and customers about to leave get a call from their broker. Results are measured against a control group, and the models are monitored and retrained every month.',
            points: [
              '38% fewer repeat claims since July',
              '€1.9 million estimated net savings',
              '22% fewer cancellations in the at-risk group',
              'Every new version is approved by a person',
            ],
            alt: 'Results dashboard for the prevention programme and model monitoring',
          },
        ],
      },
    ],
    changesTitle: 'What changes',
    changes: [
      { icon: 'repeat', title: 'Every piece of data is entered once', text: 'The order starts on the phone and reaches SAP, the portal and the dashboard without being retyped.' },
      { icon: 'shield-check', title: 'Fewer mistakes', text: 'Checks that used to be done by eye are done by the system, which flags anything that does not add up.' },
      { icon: 'users', title: 'People make the decisions', text: 'AI prepares, compares and alerts; approving, claiming or ordering stays with the team.' },
      { icon: 'plug', title: 'Built on what you already have', text: 'Everything runs on SAP and your usual tools, with no change of systems.' },
    ],
    teaserTitle: 'Use cases, from start to finish',
    teaserText:
      'Real projects and step-by-step examples in fashion, banking, food and insurance: apps, SAP Fiori, AI agents and AI-driven migrations.',
    teaserCta: 'See the use cases',
    serviceLink: 'See it in a use case',
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
          'We process the data you send us through the forms, by email, by phone or on WhatsApp (name, company, email address, phone number, the time you would like us to call and the content of your message) solely to answer your enquiry and, where appropriate, prepare a proposal.',
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
        h: 'Cookies and statistics',
        p: [
          d.analytics
            ? `This site does not use cookies. To know how many people visit us and which pages they read we use ${d.analytics}, a statistics tool that uses no cookies and collects no personal data: it only counts visits and actions in aggregate, anonymously. That is why we do not show a cookie banner.`
            : 'This site does not use first- or third-party cookies for analytics or advertising, and does not load resources from external services while you browse. That is why we do not show a cookie banner.',
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
