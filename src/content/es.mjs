// Textos en español. Cualquier "[PENDIENTE: ...]" se resalta en amarillo en la web
// y el build avisa de cuántos quedan. `d` trae los datos de site.config.mjs.
export default (d) => ({
  lang: 'es',
  locale: 'es_ES',
  pending: (what) => `[PENDIENTE: ${what}]`,

  ui: {
    skip: 'Saltar al contenido',
    menu: 'Menú',
    switchTo: 'English',
    switchShort: 'EN',
    cta: 'Hablemos',
    learnMore: 'Ver detalle',
    allCases: 'Ver todos los casos',
    all: 'Todos',
    rights: 'Todos los derechos reservados.',
    illustrative: 'Ejemplo ilustrativo',
  },

  nav: {
    services: 'Servicios',
    cases: 'Casos',
    about: 'Nosotros',
    contact: 'Contacto',
    legal: 'Aviso legal',
    privacy: 'Privacidad y cookies',
  },

  services: [
    {
      id: 'ia',
      icon: 'sparkle',
      title: 'Agentes de inteligencia artificial',
      short:
        'Asistentes de IA que responden consultas, gestionan documentos o preparan informes, para que tu equipo se centre en lo que de verdad aporta valor.',
      intro:
        'Un agente de IA no es un chat genérico: trabaja con vuestra información y vuestras herramientas, y se encarga de tareas concretas de principio a fin.',
      bullets: [
        'Respuesta a consultas de clientes o empleados a partir de vuestra propia documentación',
        'Lectura, clasificación y extracción de datos de documentos: facturas, pedidos, contratos',
        'Informes y resúmenes preparados automáticamente',
        'Conexión con las herramientas que ya usáis: correo, ERP (incluido SAP), CRM o bases de datos',
        'Revisión humana en los pasos que importan y control sobre dónde están vuestros datos',
      ],
    },
    {
      id: 'procesos',
      icon: 'flow',
      title: 'Mejora de procesos',
      short:
        'Analizamos cómo trabaja tu equipo, detectamos cuellos de botella y rediseñamos los procesos para que sean más ágiles y eficientes.',
      intro:
        'Antes de automatizar nada, entendemos el proceso. A veces la mejor mejora no es tecnológica.',
      bullets: [
        'Análisis del proceso actual junto a quienes lo hacen cada día',
        'Detección de cuellos de botella, pasos duplicados y esperas',
        'Rediseño del proceso con mejoras priorizadas por impacto',
        'Automatización de los pasos repetitivos',
        'Indicadores para medir el antes y el después',
      ],
    },
    {
      id: 'modernizacion',
      icon: 'phone',
      title: 'Modernización de aplicaciones y movilidad',
      short:
        'Actualizamos tus sistemas y herramientas para que sean más rápidos, seguros y fáciles de usar, también desde el móvil, sin empezar de cero.',
      intro:
        'Aprovechamos lo que ya funciona y cambiamos lo que frena. Llevamos vuestras herramientas al móvil cuando el trabajo ocurre fuera de la oficina.',
      bullets: [
        'Evolución de aplicaciones existentes sin rehacerlo todo',
        'Apps móviles (iOS y Android) para equipos en la calle, el almacén o la planta',
        'Aplicaciones y portales web',
        'Integración con los sistemas que ya tenéis, como SAP',
        'Mejoras de rendimiento, seguridad y facilidad de uso',
      ],
    },
  ],

  steps: [
    { title: 'Escuchamos', text: 'Hablamos con tu equipo y entendemos cómo se trabaja hoy, sin ideas preconcebidas.' },
    { title: 'Estudiamos tu caso', text: 'Analizamos procesos, sistemas y datos para ver dónde se pierde el tiempo.' },
    { title: 'Proponemos mejoras concretas', text: 'Una propuesta clara, priorizada y con el resultado esperado de cada paso.' },
    { title: 'Te acompañamos', text: 'Implantamos contigo y seguimos hasta que las mejoras funcionan en el día a día.' },
  ],

  // Experiencia colectiva del equipo: sin nombres ni fotos.
  stats: [
    { value: '+14', label: 'años de experiencia del equipo' },
    { value: '+40', label: 'proyectos en los que hemos participado' },
    { value: '+6', label: 'sectores: banca, seguros, alimentación, textil, transporte, petróleo y gas…' },
  ],
  expertise: [
    'IA generativa y agentes',
    'Ciencia de datos',
    'Automatización de procesos',
    'SAP',
    'Apps iOS y Android',
    'Aplicaciones web',
    'Integración de sistemas',
  ],

  // Casos: uno por bloque. `service` debe coincidir con un id de `services`.
  // `visual`: modernize | extract | curve | sizes (ilustraciones de src/visuals.mjs).
  // Por confidencialidad, los clientes se describen por sector.
  cases: [
    {
      id: 'textil',
      featured: true,
      service: 'ia',
      visual: 'sizes',
      sector: 'Textil',
      client: 'Empresa del sector textil',
      title: 'Informes automáticos y recomendación de tallas con IA',
      summary:
        'Convertimos todos sus datos en documentación e informes con gráficas, y creamos un modelo que infiere la talla adecuada para cada cliente.',
      challenge:
        'Mucha información repartida entre datos e informes, y la necesidad de acertar con la talla de cada cliente a partir de sus características.',
      solution: [
        'Generación automática de documentación a partir de todos sus datos',
        'Informes con gráficas, listos para compartir',
        'Análisis e inferencia de la talla según las características del usuario',
      ],
      result:
        'Informes que antes se preparaban a mano se generan ahora solos y siempre actualizados, y una mejora significativa en el acierto de talla para cada cliente.',
      tech: ['Ciencia de datos', 'Machine learning', 'IA generativa', 'Python'],
      v: {
        alt: 'Ilustración: recomendación de talla a partir de las características del usuario',
        inputs: ['Altura', 'Peso', 'Complexión'],
        result: 'Talla recomendada',
        confidence: 'Ajuste estimado',
        before: 'Características',
        after: 'Recomendación',
      },
    },
    {
      id: 'seguros-siniestros',
      featured: true,
      service: 'ia',
      visual: 'extract',
      sector: 'Seguros',
      client: 'Aseguradora',
      title: 'IA para la gestión de siniestros y la red de mediadores',
      summary:
        'Un sistema que lee la documentación de cada siniestro y lo clasifica, y un asistente que resuelve las dudas de agentes y mediadores sobre pólizas y coberturas.',
      challenge:
        'Cada siniestro llegaba con partes, fotos e informes de peritos que había que revisar a mano antes de tramitarlo, y agentes y mediadores consultaban a menudo dudas sobre condicionados y coberturas.',
      solution: [
        'Lectura automática de partes, fotos e informes de peritos',
        'Extracción de los datos clave de cada siniestro',
        'Clasificación y priorización de los siniestros',
        'Asistente de IA que responde a agentes y mediadores sobre condicionados y coberturas',
      ],
      result:
        'Tramitación de siniestros más ágil, con los casos urgentes identificados desde el primer momento, y mediadores que resuelven sus dudas al instante sin esperar a la central.',
      tech: ['IA generativa', 'Visión artificial', 'Extracción de documentos', 'RAG'],
      v: {
        alt: 'Ilustración: extracción y clasificación de datos de un siniestro',
        fields: ['Póliza', 'Tipo de siniestro', 'Prioridad alta'],
        before: 'Parte, fotos e informes',
        after: 'Siniestro clasificado',
      },
    },
    {
      id: 'seguros-movilidad',
      service: 'modernizacion',
      visual: 'claim',
      sector: 'Seguros',
      client: 'Aseguradora',
      title: 'Apps para clientes y peritos, y un portal de agentes renovado',
      summary:
        'Llevamos al móvil y a la web la relación con clientes, peritos y agentes: declarar un siniestro con fotos, peritar en campo y tarificar desde un portal actual.',
      challenge:
        'Clientes, peritos y agentes trabajaban con herramientas que no estaban pensadas para el móvil, y el portal de agentes y el tarificador web se habían quedado anticuados.',
      solution: [
        'App de clientes para declarar un siniestro con fotos y consultar sus pólizas',
        'App para los peritos que trabajan en campo',
        'Modernización del portal de agentes y del tarificador web',
      ],
      result:
        'Clientes que declaran un siniestro desde el móvil en pocos minutos, peritos con toda la información a mano en campo y un portal de agentes más rápido y fácil de usar.',
      tech: ['iOS', 'Android', 'Web', 'APIs'],
      v: {
        alt: 'Ilustración: un cliente declara un siniestro con fotos y el perito lo gestiona en campo',
        button: 'Enviar parte',
        visit: 'Visita del perito',
        items: ['Fotos revisadas', 'Daños valorados', 'Informe enviado'],
        before: 'App de clientes',
        after: 'App de peritos',
      },
    },
    {
      id: 'alimentacion',
      featured: true,
      service: 'procesos',
      visual: 'curve',
      sector: 'Alimentación',
      client: 'Secadero de jamones',
      title: 'Automatización de procesos y cálculos en un secadero de jamones',
      summary:
        'Pasamos cálculos manuales y hojas de cálculo sueltas a procesos automáticos y fiables en toda la producción.',
      challenge:
        'Buena parte de los cálculos de producción se hacían a mano o en hojas de cálculo, con el tiempo que eso supone y el riesgo de errores.',
      solution: [
        'Revisión de los procesos de producción junto al equipo',
        'Automatización de los cálculos de producción y del control del proceso de curación',
        'Cuadros de mando con los datos de producción, siempre al día',
        'Menos trabajo manual y datos disponibles al momento',
      ],
      result: 'Mejora significativa del tiempo dedicado a cálculos, menos errores y datos fiables en tiempo real para tomar decisiones.',
      tech: ['Automatización', 'Ciencia de datos', 'Cuadros de mando'],
      v: {
        alt: 'Ilustración: seguimiento de la curación por lotes',
        y: 'Peso',
        x: 'Días de curación',
        target: 'Objetivo',
        chipTitle: 'Lote en curso',
      },
    },
    {
      id: 'banca',
      featured: true,
      service: 'modernizacion',
      visual: 'modernize',
      sector: 'Banca',
      client: 'Entidad bancaria',
      title: 'Migración y modernización de apps móviles y web',
      summary:
        'Llevamos aplicaciones móviles y web con años a tecnología actual, más fácil de mantener y preparada para seguir evolucionando.',
      challenge:
        'Aplicaciones móviles y web construidas hace años, con tecnología que se estaba quedando atrás, difíciles de mantener y lentas de evolucionar.',
      solution: [
        'Análisis de las aplicaciones existentes y plan de migración',
        'Migración a tecnologías actuales en móvil y web',
        'Renovación de la experiencia de uso',
      ],
      result:
        'Aplicaciones modernas, más fáciles de mantener y de evolucionar, y una experiencia de uso claramente mejor para los clientes del banco.',
      tech: ['iOS', 'Android', 'Web', 'APIs'],
      v: { alt: 'Ilustración: aplicación antigua frente a aplicación modernizada', before: 'Antes', after: 'Después' },
    },
  ],
  caseLabels: { challenge: 'Reto', solution: 'Qué hicimos', result: 'Resultado' },

  home: {
    title: `${d.name} · Agentes de IA y tecnología práctica para empresas`,
    description:
      'Ayudamos a las empresas a trabajar mejor, no más: agentes de inteligencia artificial, mejora de procesos y modernización de aplicaciones web y móviles.',
    eyebrow: 'Inteligencia artificial aplicada',
    h1: 'Ayudamos a las empresas a <em>trabajar mejor</em>, no más.',
    lead:
      'Implantamos agentes de inteligencia artificial, rediseñamos procesos y modernizamos aplicaciones, también en el móvil, para que tu equipo deje de perder horas en tareas repetitivas.',
    ctaPrimary: 'Cuéntanos tu caso',
    ctaSecondary: 'Qué hacemos',
    note: 'La primera conversación corre de nuestra cuenta.',
    demo: {
      title: 'Agente de consultas',
      steps: [
        { label: 'Consulta recibida', detail: '«¿En qué estado está el pedido 4471?»' },
        { label: 'Busca en el ERP y en el correo', detail: '2 sistemas consultados' },
        { label: 'Respuesta preparada', detail: 'Enviada tras revisarla el equipo' },
      ],
    },
    problemTitle: 'Cada día se pierden horas que nadie ve',
    problems: [
      { title: 'Tareas repetitivas', text: 'Copiar datos de un sitio a otro, responder siempre las mismas preguntas, buscar documentos.' },
      { title: 'Procesos sin revisar', text: 'Formas de trabajar que nadie ha cuestionado en años y que ya no encajan.' },
      { title: 'Aplicaciones que se han quedado atrás', text: 'Herramientas lentas, difíciles de usar o que no funcionan desde el móvil.' },
    ],
    servicesTitle: 'Qué hacemos',
    servicesLead: 'Tres formas de recuperar ese tiempo, que funcionan por separado y mejor juntas.',
    howTitle: 'Cómo lo hacemos: escuchando primero',
    howLead: 'Cada empresa es distinta, así que no vendemos soluciones enlatadas.',
    teamTitle: 'Experiencia de proyectos reales',
    teamLead:
      'El equipo de DALESA suma años de trabajo en proyectos de SAP, aplicaciones móviles y web y automatización con IA. Esa experiencia es la que ponemos en cada propuesta.',
    casesTitle: 'Casos',
    casesLead: 'Algunos proyectos en los que hemos trabajado.',
    finalTitle: '¿Quieres saber cómo la IA puede ayudar a tu empresa?',
    finalText: 'Escríbenos. La primera conversación corre de nuestra cuenta.',
  },

  servicesPage: {
    title: `Servicios · ${d.name}`,
    description:
      'Agentes de inteligencia artificial, mejora de procesos y modernización de aplicaciones web y móviles para empresas.',
    h1: 'Tecnología práctica, que se note en los resultados',
    lead: 'No solo en la presentación. Estas son las tres líneas en las que trabajamos.',
    listTitle: 'Qué incluye',
  },

  casesPage: {
    title: `Casos · ${d.name}`,
    description: 'Proyectos de inteligencia artificial, mejora de procesos y modernización de aplicaciones.',
    h1: 'Casos',
    lead: 'Algunos proyectos en los que hemos trabajado. Por confidencialidad, no siempre citamos el nombre del cliente.',
  },

  aboutPage: {
    title: `Nosotros · ${d.name}`,
    description: 'Quiénes somos y cómo trabajamos en DALESA.',
    h1: 'Ayudamos a trabajar mejor, no más',
    lead:
      'DALESA nace para que la tecnología resuelva problemas concretos del día a día de las empresas: menos tareas repetitivas, procesos más ágiles y herramientas que da gusto usar.',
    storyTitle: 'Nuestra historia',
    story: [
      'Detrás de DALESA hay un equipo con más de 14 años de experiencia en proyectos de tecnología para sectores como la banca, los seguros, la alimentación, el textil, el transporte o la energía: aplicaciones móviles y web, SAP, ciencia de datos e inteligencia artificial.',
      'En todos esos proyectos vimos repetirse los mismos problemas: horas perdidas en tareas repetitivas, procesos que nadie revisaba y herramientas que se habían quedado atrás. Creamos DALESA para resolverlos con tecnología práctica, empezando por la inteligencia artificial.',
    ],
    valuesTitle: 'Cómo trabajamos',
    values: [
      { title: 'Escuchar primero', text: 'Entendemos cómo trabajáis antes de proponer nada.' },
      { title: 'Sin soluciones enlatadas', text: 'Cada propuesta se hace a partir de vuestro caso.' },
      { title: 'Resultados, no presentaciones', text: 'Medimos las mejoras en el día a día, no en la diapositiva.' },
      { title: 'Hasta que funciona', text: 'Os acompañamos durante la implantación, no solo en el diseño.' },
    ],
    teamTitle: 'El equipo',
    teamText: [
      'Somos un grupo de personas a las que nos apasiona la tecnología y el trabajo bien hecho.',
      'Huimos del modelo de «cuantas más horas, mejor» y de las soluciones de catálogo que no encajan con nadie. Preferimos construir a medida, junto a cada cliente, soluciones de las que sentirnos orgullosos.',
      'Para nosotros, ayudar es darte las herramientas, acompañarte durante todo el proceso y enseñarte a sacarles partido, para que tu equipo gane autonomía.',
    ],
    teamAreas: 'Estas son las áreas que mejor conocemos:',
    certsTitle: 'Certificaciones',
    certs: [], // Añadir certificaciones aquí; si está vacío, el bloque no se muestra.
  },

  contactPage: {
    title: `Contacto · ${d.name}`,
    description: 'Cuéntanos qué te gustaría mejorar en tu empresa. La primera conversación corre de nuestra cuenta.',
    h1: 'Hablemos',
    lead: 'Cuéntanos qué te gustaría mejorar. La primera conversación corre de nuestra cuenta.',
    form: {
      name: 'Nombre',
      company: 'Empresa',
      email: 'Correo electrónico',
      message: '¿Qué te gustaría mejorar?',
      messageHint: 'Por ejemplo: «Dedicamos muchas horas a revisar pedidos a mano».',
      consent: 'He leído y acepto la <a href="{privacy}">política de privacidad</a>.',
      submit: 'Enviar',
      sending: 'Enviando…',
      ok: 'Gracias. Te responderemos lo antes posible.',
      error: 'No se ha podido enviar. Escríbenos directamente al correo de la derecha.',
      mailSubject: 'Contacto desde la web',
    },
    asideTitle: 'También puedes escribirnos',
    emailLabel: 'Correo',
    linkedinLabel: 'LinkedIn',
  },

  legalPage: {
    title: `Aviso legal · ${d.name}`,
    description: `Aviso legal de ${d.name}.`,
    h1: 'Aviso legal',
    sections: [
      {
        h: 'Titular del sitio web',
        p: [
          `En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de que este sitio web es titularidad de ${d.ident}`,
          `Correo de contacto: ${d.email}.`,
        ],
      },
      {
        h: 'Condiciones de uso',
        p: [
          'El acceso a este sitio web es gratuito y atribuye la condición de usuario, que acepta estas condiciones. El usuario se compromete a hacer un uso adecuado de los contenidos y a no emplearlos para actividades ilícitas.',
        ],
      },
      {
        h: 'Propiedad intelectual',
        p: [
          `Los contenidos de este sitio (textos, diseño, logotipos e imágenes) son propiedad de ${d.titular} o se usan con autorización. No se permite su reproducción sin autorización expresa.`,
        ],
      },
      {
        h: 'Responsabilidad',
        p: [
          'El titular no se hace responsable de los daños derivados del uso de este sitio ni de los contenidos de sitios externos enlazados, sobre los que no tiene control.',
        ],
      },
      {
        h: 'Legislación aplicable',
        p: ['Estas condiciones se rigen por la legislación española.'],
      },
    ],
  },

  privacyPage: {
    title: `Privacidad y cookies · ${d.name}`,
    description: `Política de privacidad y cookies de ${d.name}.`,
    h1: 'Política de privacidad y cookies',
    sections: [
      {
        h: 'Responsable del tratamiento',
        p: [`${d.ident} Contacto: ${d.email}.`],
      },
      {
        h: 'Qué datos tratamos y para qué',
        p: [
          'Tratamos los datos que nos envías a través del formulario de contacto o por correo (nombre, empresa, correo electrónico y el contenido del mensaje) con la única finalidad de responder a tu consulta y, si procede, preparar una propuesta.',
        ],
      },
      {
        h: 'Base legal',
        p: ['Tu consentimiento, que das al enviar el formulario, y la aplicación de medidas precontractuales a petición tuya.'],
      },
      {
        h: 'Cuánto tiempo los conservamos',
        p: ['Mientras dure la relación o la consulta y, después, durante los plazos legales aplicables. Si no llegamos a colaborar, los eliminamos en un plazo máximo de un año.'],
      },
      {
        h: 'Destinatarios',
        p: [
          'No cedemos tus datos a terceros salvo obligación legal. El formulario puede gestionarse a través de un proveedor de servicios que actúa como encargado del tratamiento con las garantías previstas en el RGPD.',
        ],
      },
      {
        h: 'Tus derechos',
        p: [
          `Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a ${d.email}. Si consideras que no hemos atendido tu solicitud, puedes reclamar ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" rel="noopener">www.aepd.es</a>).`,
        ],
      },
      {
        h: 'Cookies',
        p: [
          'Este sitio no utiliza cookies propias ni de terceros con fines analíticos o publicitarios, ni carga recursos de servicios externos al navegar. Por eso no mostramos un aviso de cookies.',
        ],
      },
    ],
  },

  notFound: {
    title: `Página no encontrada · ${d.name}`,
    h1: 'Esta página no existe',
    text: 'Puede que el enlace esté mal o que la página se haya movido.',
    back: 'Volver al inicio',
  },
});
