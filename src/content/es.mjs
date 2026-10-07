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
    whatsapp: 'Escríbenos por WhatsApp',
    whatsappText: 'Hola, me gustaría hablar con DALESA.',
    callMe: 'Te llamamos',
  },

  nav: {
    services: 'Servicios',
    cases: 'Casos de uso',
    about: 'Nosotros',
    contact: 'Contacto',
    legal: 'Aviso legal',
    privacy: 'Privacidad y cookies',
  },

  services: [
    {
      id: 'ia',
      icon: 'bot',
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
      icon: 'workflow',
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
      icon: 'smartphone',
      title: 'Aplicaciones web y móviles a medida',
      short:
        'Creamos aplicaciones nuevas hechas a la medida de cómo trabajáis y modernizamos las que ya tenéis para que sean más rápidas, seguras y fáciles de usar, también desde el móvil.',
      intro:
        'Si la herramienta que necesitáis no existe, la construimos desde cero. Si ya la tenéis, aprovechamos lo que funciona y cambiamos lo que frena, sin rehacerlo todo.',
      bullets: [
        'Aplicaciones web y móviles a medida, creadas desde cero',
        'Apps móviles (iOS y Android) para vuestros clientes o para equipos en la calle, el almacén o la planta',
        'Portales web para clientes, empleados o colaboradores',
        'Aplicaciones SAP Fiori a medida, para trabajar con SAP desde el navegador, la tableta o el móvil',
        'Evolución y modernización de aplicaciones existentes sin rehacerlo todo',
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
    { value: '+8', label: 'sectores: banca, seguros, energía, automoción, gran consumo, textil…' },
  ],
  expertise: [
    'IA generativa y agentes',
    'Ciencia de datos',
    'Automatización de procesos',
    'SAP y SAP Fiori',
    'Apps iOS y Android',
    'Aplicaciones web',
    'Integración de sistemas',
  ],

  // Sectores en los que hemos trabajado (icono de src/icons.mjs).
  sectors: [
    { icon: 'landmark', name: 'Banca' },
    { icon: 'shield-check', name: 'Seguros' },
    { icon: 'ham', name: 'Alimentación' },
    { icon: 'shirt', name: 'Textil' },
    { icon: 'truck', name: 'Transporte' },
    { icon: 'fuel', name: 'Petróleo y gas' },
    { icon: 'car', name: 'Automoción' },
    { icon: 'shopping-cart', name: 'Gran consumo' },
  ],

  // Casos: uno por bloque. `service` es un id de `services`, o varios en una lista.
  // `visual`: modernize | extract | curve | sizes (ilustraciones de src/visuals.mjs).
  // Por confidencialidad, los clientes se describen por sector.
  cases: [
    {
      id: 'textil',
      group: 'moda',
      icon: 'shirt',
      featured: true,
      service: ['ia', 'modernizacion'],
      visual: 'sizes',
      image: 'textil',
      sector: 'Textil',
      client: 'Gran cadena internacional de moda',
      title: 'App para encargados de tienda y talla acertada con IA',
      summary:
        'Durante cuatro años trabajamos con una gran cadena de moda en una app móvil para los encargados de tienda y en modelos de IA que ayudan a cada cliente a acertar con su talla.',
      challenge:
        'Los encargados necesitaban ver al momento el stock, las tallas disponibles y las ventas de su tienda, y los clientes devolvían prendas por no acertar con la talla.',
      solution: [
        'App móvil para encargados de tienda: stock, tallas disponibles y ventas al momento',
        'Pedidos de ropa desde la propia app',
        'Recomendación de talla a partir de las medidas del cliente y de sus pedidos anteriores',
        'Análisis de devoluciones: si quienes usan una S devuelven una prenda y se quedan con la M, el sistema detecta que esa prenda talla pequeño',
        'Informes automáticos con gráficas a partir de todos sus datos',
      ],
      result:
        'Encargados con la información de su tienda siempre en el bolsillo y una mejora significativa en el acierto de talla, sabiendo qué prendas tallan grande o pequeño.',
      tech: ['Apps iOS y Android', 'Machine learning', 'Ciencia de datos', 'IA generativa'],
      v: {
        alt: 'Pantallas de ejemplo de la app: ventas de la tienda, stock por talla, pedido de reposición y talla recomendada al cliente',
        inputs: ['Tus medidas', 'Tus pedidos', 'Devoluciones'],
        result: 'Talla recomendada',
        confidence: 'Esta prenda talla pequeño',
        before: 'Datos del cliente',
        after: 'Recomendación',
      },
    },
    {
      id: 'seguros-siniestros',
      group: 'seguros',
      icon: 'shield-check',
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
      group: 'seguros',
      icon: 'shield-check',
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
      group: 'alimentacion',
      icon: 'ham',
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
      group: 'banca',
      icon: 'landmark',
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
      'Ayudamos a las empresas a trabajar mejor, no más: agentes de inteligencia artificial, mejora de procesos y aplicaciones web y móviles a medida.',
    eyebrow: 'Inteligencia artificial aplicada',
    h1: 'Ayudamos a las empresas a <em>trabajar mejor</em>, no más.',
    lead:
      'Implantamos agentes de inteligencia artificial, rediseñamos procesos y creamos o modernizamos aplicaciones web y móviles, para que tu equipo deje de perder horas en tareas repetitivas.',
    ctaPrimary: 'Cuéntanos tu caso',
    ctaSecondary: 'Ver casos de uso',
    note: 'La primera conversación corre de nuestra cuenta.',
    demo: {
      title: 'Agente de consultas',
      steps: [
        { label: 'Consulta recibida', detail: '«¿En qué estado está el pedido 4471?»' },
        { label: 'Busca en el ERP y en el correo', detail: '2 sistemas consultados' },
        { label: 'Respuesta preparada', detail: 'Enviada tras revisarla el equipo' },
      ],
    },
    clientsTitle: 'Nuestro equipo ha trabajado con',
    sectorsTitle: 'Experiencia en sectores como',
    chart: { title: 'Horas en tareas manuales', before: 'Antes', after: 'Con agentes de IA' },
    badge: 'Con revisión humana',
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
      'El equipo de DALESA suma años de trabajo en proyectos de SAP y aplicaciones SAP Fiori, aplicaciones móviles y web y automatización con IA. Esa experiencia es la que ponemos en cada propuesta.',
    casesTitle: 'Casos',
    casesLead: 'Algunos proyectos en los que hemos trabajado.',
    finalTitle: '¿Quieres saber cómo la IA puede ayudar a tu empresa?',
    finalText: 'Escríbenos o te llamamos. La primera conversación corre de nuestra cuenta.',

    // IA responsable: compromisos de cómo trabajamos con IA. Revisadlos antes de publicar.
    responsible: {
      title: 'IA segura y responsable',
      lead: 'Lo primero que nos preguntan es qué pasa con los datos. Esta es nuestra forma de trabajar.',
      items: [
        { icon: 'lock', title: 'Tus datos, bajo tu control', text: 'Decidimos contigo dónde se procesan, quién accede y qué información usa la IA. Solo la imprescindible para cada tarea.' },
        { icon: 'users', title: 'Las personas deciden', text: 'La IA prepara y propone; tu equipo revisa y aprueba lo importante antes de que salga.' },
        { icon: 'shield-check', title: 'RGPD y Reglamento europeo de IA', text: 'Tenemos en cuenta la normativa de protección de datos y el Reglamento europeo de IA desde el diseño, no al final.' },
        { icon: 'search', title: 'Sin cajas negras', text: 'Sabes qué hace cada agente, con qué datos y por qué. Todo queda registrado para poder revisarlo.' },
      ],
    },

    // Preguntas frecuentes. Revisad las respuestas antes de publicar.
    faq: {
      title: 'Preguntas frecuentes',
      lead: 'Lo que suelen preguntarnos antes de empezar.',
      items: [
        { q: '¿Cuánto cuesta?', a: 'Depende del alcance, por eso no damos precios cerrados sin conocer el caso. La primera conversación es gratis y, si encaja, te damos una propuesta con el coste de cada paso antes de empezar.' },
        { q: '¿Cuánto se tarda en ver resultados?', a: 'Preferimos empezar por algo acotado que se note pronto y crecer desde ahí, en lugar de grandes proyectos que tardan meses en dar fruto. En la propuesta verás los plazos de cada fase.' },
        { q: '¿Tenemos que cambiar nuestros sistemas?', a: 'No. Trabajamos sobre lo que ya usáis (ERP, SAP, correo, hojas de cálculo, aplicaciones propias) y lo conectamos. Modernizar no significa empezar de cero, y si necesitáis una herramienta nueva, la creamos a medida.' },
        { q: '¿La IA va a sustituir a mi equipo?', a: 'No es la idea. La IA se encarga de las tareas repetitivas para que tu equipo dedique su tiempo a lo que aporta valor, y las decisiones importantes siguen pasando por personas.' },
        { q: '¿Trabajáis con empresas pequeñas y medianas?', a: 'Sí. El equipo ha trabajado con grandes bancos, aseguradoras y energéticas, pero también con empresas medianas, como el secadero de jamones de nuestros casos. Lo que importa es que haya algo que mejorar.' },
        { q: '¿Cómo se mide si ha funcionado?', a: 'Antes de empezar acordamos qué medir: horas dedicadas, errores, tiempos de respuesta… y lo revisamos contigo una vez implantado, en el día a día.' },
      ],
    },
  },

  servicesPage: {
    title: `Servicios · ${d.name}`,
    description:
      'Agentes de inteligencia artificial, mejora de procesos y aplicaciones web y móviles a medida para empresas.',
    h1: 'Tecnología práctica, que se note en los resultados',
    lead: 'No solo en la presentación. Estas son las tres líneas en las que trabajamos.',
    listTitle: 'Qué incluye',
  },

  casesPage: {
    title: `Casos de uso · ${d.name}`,
    description: 'Casos de uso de inteligencia artificial, mejora de procesos y aplicaciones web y móviles, por sector: proyectos reales y ejemplos paso a paso.',
    h1: 'Casos de uso, de principio a fin',
    lead: 'Elige un sector. En cada uno verás proyectos reales en los que ha trabajado el equipo y, cuando lo hay, un ejemplo paso a paso de cómo se ve un proyecto así.',
    note: 'Por confidencialidad no citamos a nuestros clientes. En los ejemplos paso a paso, los nombres, las empresas y las cifras son ficticios.',
    chooseLabel: 'Elige un sector',
    realTitle: 'Proyecto real',
    realTitlePlural: 'Proyectos reales',
    exampleTitle: 'Así se ve, paso a paso',
    exampleNote: 'Ejemplo ilustrativo con una empresa ficticia:',
    groups: [
      { id: 'moda', tab: 'Moda', icon: 'shirt' },
      { id: 'banca', tab: 'Banca', icon: 'landmark' },
      { id: 'alimentacion', tab: 'Alimentación y distribución', icon: 'shopping-cart' },
      { id: 'seguros', tab: 'Seguros', icon: 'shield-check' },
    ],
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
    clientsTitle: 'Nuestro equipo ha trabajado con',
    sectorsTitle: 'Sectores en los que hemos trabajado',
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

  // Proceso completo de ejemplo con una empresa inventada (Montera). Imágenes en public/proceso-completo/.
  examplePage: {
    eyebrow: 'Casos de uso',
    stepLabel: 'Paso',
    processes: [
      {
        id: 'montera',
        group: 'alimentacion',
        tab: 'Distribución alimentaria',
        company: 'Montera',
        icon: 'shopping-cart',
        intro: 'Montera es una distribuidora de ibéricos, quesos y conservas para bares, restaurantes y tiendas. Así va un pedido, del bar al panel de dirección.',
        steps: [
        {
          id: 'pedido',
          image: 'movil',
          tag: 'App móvil',
          title: 'El comercial toma el pedido en la ruta',
          text: 'Javier visita bares y tiendas con una app en el móvil: ve su ruta del día, la ficha de cada cliente y lo que suele pedir. El asistente de IA le avisa de lo que el cliente está a punto de necesitar.',
          points: [
            'Ruta del día con mapa y estado de cada visita',
            'Sugerencias de la IA según el historial del cliente',
            'Firma del cliente y foto del albarán, sin papeles',
            'El pedido entra en SAP sin teclearlo dos veces',
          ],
          alt: 'Cuatro pantallas de la app móvil: ruta del día, ficha del cliente, nuevo pedido y confirmación de entrega',
        },
        {
          id: 'portal',
          image: 'portal',
          tag: 'Portal web',
          title: 'El cliente sigue su pedido y repite el habitual',
          text: 'Rosa, la dueña de La Tasca, entra en el portal de clientes: ve cuándo llega el reparto, descarga sus facturas y repite su pedido de siempre en un par de clics, con los precios de su tarifa.',
          points: [
            'Seguimiento del reparto en tiempo real',
            'Facturas y albaranes siempre a mano',
            'Productos habituales sugeridos antes de que se agoten',
            'Catálogo y carrito con su tarifa y sus promociones',
          ],
          alt: 'Portal web de clientes en un portátil: seguimiento del pedido, productos habituales y facturas',
        },
        {
          id: 'compras',
          image: 'fiori',
          tag: 'SAP Fiori',
          title: 'Compras repone stock y se aprueba en SAP Fiori',
          text: 'Para reponer, compras lanza un pedido al proveedor. La responsable lo aprueba en una app SAP Fiori hecha a medida, desde el ordenador o desde el móvil, con las posiciones y el presupuesto a la vista.',
          points: [
            'Pedidos pendientes ordenados por urgencia',
            'Posiciones, condiciones y presupuesto en una pantalla',
            'Aprobar o rechazar con una nota para el solicitante',
            'La misma app en el ordenador, la tableta y el móvil',
          ],
          alt: 'App SAP Fiori de aprobación de pedidos de compra en un portátil y en un móvil',
        },
        {
          id: 'factura',
          image: 'agente',
          tag: 'Agente de IA',
          title: 'El agente de IA revisa la factura del proveedor',
          text: 'Cuando llega la factura por correo, el agente la lee, la cruza con el pedido, el albarán y la tarifa en SAP y detecta que el jamón viene más caro de lo pactado. Propone retener la diferencia y reclamarla, con el correo ya redactado. La decisión es de una persona.',
          points: [
            'Lee facturas en PDF que llegan por correo',
            'Comprueba proveedor, cantidades y precios en SAP',
            'Registra sola las correctas y explica las que no cuadran',
            'Responde preguntas sobre cada factura',
          ],
          alt: 'Agente de IA revisando una factura de proveedor: datos extraídos, comprobaciones y propuesta',
        },
        {
          id: 'panel',
          image: 'panel',
          tag: 'Panel e IA',
          title: 'Dirección lo ve todo y se anticipa',
          text: 'Todo lo anterior acaba en un panel con las ventas, los márgenes y las rutas, y una previsión de demanda hecha con IA. El asistente avisa antes de que falte stock por un festivo, de lo que va a caducar y de los clientes que empiezan a pedir menos.',
          points: [
            'Ventas, margen y rutas actualizados cada mañana',
            'Previsión de demanda que tiene en cuenta festivos y pedidos abiertos',
            'Avisos de stock, caducidades y clientes en riesgo',
            'Cada aviso, con la acción propuesta',
          ],
          alt: 'Panel de ventas y previsión de demanda en un portátil',
        },
      ],
      },
      {
        id: 'velarte',
        group: 'moda',
        tab: 'Moda',
        company: 'Velarte',
        icon: 'shirt',
        intro: 'Velarte es una cadena de moda con tiendas propias y venta online. Así va una prenda, de la tienda a la devolución que ya no llega a producirse.',
        steps: [
          {
            id: 'tienda',
            image: 'velarte-tienda',
            tag: 'App de tienda',
            title: 'La encargada ve su tienda en el móvil',
            text: 'Laura, encargada de la tienda de Valladolid, sigue las ventas del día frente al objetivo y ve el stock de cada prenda por talla: en su tienda, en el almacén y en las tiendas cercanas.',
            points: [
              'Ventas del día, tickets y ticket medio frente al objetivo',
              'Stock por talla en tienda, almacén y tiendas cercanas',
              'Aviso cuando una talla está a punto de agotarse',
              'Lo más vendido del día, de un vistazo',
            ],
            alt: 'Dos pantallas de la app de tienda: ventas del día y stock por talla de una camisa',
          },
          {
            id: 'reposicion',
            image: 'velarte-reposicion',
            tag: 'IA en la app',
            title: 'Repone con la sugerencia de la IA',
            text: 'Con las ventas de la semana y el fin de semana que viene, el asistente propone qué reponer y cuánto. Laura lo revisa, ajusta las cantidades y lo envía: llega al día siguiente.',
            points: [
              'Pedido de reposición propuesto por la IA',
              'Cantidades editables antes de enviar',
              'Traspasos entre tiendas cuando el almacén no llega a tiempo',
              'Entrega prevista en la misma pantalla',
            ],
            alt: 'Pantalla de la app con el pedido de reposición sugerido por la IA',
          },
          {
            id: 'talla',
            image: 'velarte-talla',
            tag: 'App de cliente',
            title: 'El cliente acierta con su talla',
            text: 'Al comprar online, la app recomienda la talla con las medidas del cliente, sus pedidos anteriores y lo que hicieron quienes compraron la misma prenda. Si una prenda talla pequeño, lo dice.',
            points: [
              'Talla recomendada para cada prenda y cada cliente',
              'Explicación clara de por qué esa talla',
              'Aviso cuando una prenda talla pequeño o grande',
              'Menos devoluciones y menos cambios de talla',
            ],
            alt: 'Pantalla de la app de cliente con la talla recomendada para una camisa',
          },
          {
            id: 'devoluciones',
            image: 'velarte-devoluciones',
            tag: 'Panel e IA',
            title: 'Producto ve qué prendas no tallan bien',
            text: 'El equipo de producto ve cuántos pedidos se devuelven por la talla, qué prendas tallan pequeño o grande y cómo evoluciona desde que se recomienda la talla. El asistente propone qué hacer con cada prenda.',
            points: [
              'Devoluciones por la talla, semana a semana',
              'Prendas que tallan pequeño o grande, con el cambio más habitual',
              'Avisos de talla publicados en la web y en la app',
              'Propuestas para ajustar el patrón con el proveedor',
            ],
            alt: 'Panel de tallas y devoluciones en un portátil',
          },
        ],
      },
      {
        id: 'myonbank',
        group: 'banca',
        tab: 'Banca',
        company: 'MyOnBank',
        icon: 'landmark',
        intro:
          'MyOnBank es un banco con una app móvil híbrida de 2014, lenta y difícil de mantener. Así la migramos a una app nativa con agentes de IA, skills y desarrollo guiado por especificaciones (SDD), sin perder ni una regla de negocio.',
        steps: [
          {
            id: 'descubrimiento',
            image: 'myonbank-descubrimiento',
            tag: 'Agentes de IA',
            title: 'Los agentes leen la app antigua y sacan sus reglas',
            text:
              'Varios agentes recorren el código de la app antigua y sacan el inventario de pantallas, casos de uso, reglas de negocio e integraciones. Cada regla lleva su origen exacto en el código, y un agente verificador la comprueba.',
            points: [
              '142 pantallas, 64 casos de uso y 213 reglas de negocio inventariados',
              'Cada regla, con el fichero y la línea de donde sale',
              'El código que ya no se usa se detecta y no se migra',
              'Lo que no está claro se marca para que lo confirme negocio',
            ],
            alt: 'Espacio de trabajo de la migración en un portátil: descubrimiento de reglas de negocio con su origen en el código',
          },
          {
            id: 'especificacion',
            image: 'myonbank-especificacion',
            tag: 'SDD',
            title: 'Cada caso de uso, una especificación aprobada',
            text:
              'Antes de escribir una línea de código, cada caso de uso se convierte en una especificación: las reglas que cumple, los criterios de aceptación, el contrato de la API y las pantallas. Negocio, seguridad y arquitectura la aprueban.',
            points: [
              'Especificaciones versionadas, que entienden las personas y los agentes',
              'Criterios de aceptación en formato Dado / Cuando / Entonces',
              'Aprobación de negocio, seguridad y arquitectura',
              'El verificador avisa si falta alguna regla',
            ],
            alt: 'Especificación de la transferencia inmediata con reglas, criterios de aceptación, contrato de API y aprobaciones',
          },
          {
            id: 'generacion',
            image: 'myonbank-generacion',
            tag: 'Agentes y skills',
            title: 'Los agentes generan la app nativa con las skills del banco',
            text:
              'Con cada especificación aprobada, los agentes de iOS y Android generan el código en SwiftUI y Jetpack Compose siguiendo las skills del banco: su sistema de diseño y sus normas de seguridad y accesibilidad. Cada parte del código indica qué regla cumple, y una persona revisa cada cambio.',
            points: [
              'Código nativo en SwiftUI y Jetpack Compose',
              'Skills con el sistema de diseño, la seguridad y la accesibilidad del banco',
              'Trazabilidad: cada regla, en el código que la cumple',
              'Revisión humana de cada cambio antes de integrarlo',
            ],
            alt: 'Tablero de generación con agentes de iOS y Android y código SwiftUI con las reglas anotadas',
          },
          {
            id: 'paridad',
            image: 'myonbank-paridad',
            tag: 'Pruebas',
            title: 'La app nueva hace lo mismo que la antigua',
            text:
              'Los mismos escenarios se ejecutan contra la app antigua y la nueva. Si el resultado cambia, se explica: o es una mejora que aprueba negocio, o se corrige.',
            points: [
              '418 escenarios ejecutados en las dos apps',
              'Cada diferencia, con su decisión',
              'Avance de la migración semana a semana',
              'Nada se publica con diferencias abiertas',
            ],
            alt: 'Panel de pruebas de paridad entre la app antigua y la nueva',
          },
          {
            id: 'app',
            image: 'myonbank-app',
            tag: 'App nativa',
            title: 'El cliente estrena una app nativa',
            text:
              'El resultado es una app nativa moderna, rápida y fácil de usar: saldo de un vistazo, envíos en segundos con Face ID y control total de la tarjeta, con las mismas reglas de siempre, ahora mejor explicadas.',
            points: [
              'App nativa para iOS y Android',
              'Más segura: Face ID, firma con código y tarjeta que se congela al momento',
              'Más intuitiva y moderna',
              'Mensajes claros sobre límites, horarios y firma',
              'Más fácil de mantener y de hacer crecer',
            ],
            alt: 'Cuatro pantallas de la app nativa: inicio, enviar dinero, tarjeta y envío confirmado',
          },
        ],
      },
      {
        id: 'nordaria',
        group: 'seguros',
        tab: 'Seguros',
        company: 'Nordaria Seguros',
        icon: 'shield-check',
        intro:
          'Nordaria es una aseguradora de hogar. Entrenamos un modelo de IA con sus propios datos para predecir qué viviendas van a volver a tener un siniestro y actuar antes de que ocurra.',
        steps: [
          {
            id: 'datos',
            image: 'nordaria-datos',
            tag: 'Datos',
            title: 'Sus datos, unidos y listos para entrenar',
            text:
              'Diez años de pólizas, siniestros e informes de peritos se unen en una sola tabla por vivienda y se cruzan con el año de construcción y el clima de cada zona. Antes de entrenar se limpian y se seudonimizan los datos personales.',
            points: [
              '2,1 millones de pólizas y 1,2 millones de siniestros',
              'Catastro y meteorología por código postal',
              '184 variables por póliza',
              'Datos personales seudonimizados',
            ],
            alt: 'Pantalla de datos del proyecto de IA: fuentes, calidad y preparación',
          },
          {
            id: 'modelo',
            image: 'nordaria-modelo',
            tag: 'Modelo de IA',
            title: 'Un modelo que acierta más que las reglas de siempre',
            text:
              'El modelo aprende de los siniestros pasados a predecir qué viviendas tendrán otro siniestro de agua en los próximos 12 meses. Se entrena con el pasado y se prueba con un año completo que no ha visto: en el 10 % de más riesgo detecta el 47 % de las repeticiones, frente al 19 % de las reglas actuales.',
            points: [
              'Capacidad para distinguir (AUC) de 0,86',
              'Validado con un año completo de datos nuevos',
              'Sabemos qué variables pesan más',
              'Revisado para no discriminar',
            ],
            alt: 'Ficha del modelo con su precisión, los grupos de riesgo y las variables que más pesan',
          },
          {
            id: 'prediccion',
            image: 'nordaria-prediccion',
            tag: 'Predicción',
            title: 'Cada póliza, con su predicción explicada',
            text:
              'Para cada vivienda el modelo da la probabilidad de que el siniestro se repita y explica por qué: siniestros previos, fontanería antigua, una reparación provisional, heladas. También predice el coste final, el riesgo de fraude y la probabilidad de que el cliente se dé de baja.',
            points: [
              'Probabilidad de repetición en 12 meses',
              'El porqué de cada predicción, en puntos',
              'Coste final, fraude y baja del cliente',
              'Una recomendación concreta para cada caso',
            ],
            alt: 'Predicción de repetición del siniestro para una póliza, con la explicación y otras predicciones',
          },
          {
            id: 'resultados',
            image: 'nordaria-resultados',
            tag: 'Resultados',
            title: 'De la predicción a la acción, y medido',
            text:
              'Las viviendas de más riesgo reciben una revisión preventiva y un detector de fugas, y las que están a punto de irse, una llamada del mediador. El resultado se mide frente a un grupo de control y los modelos se vigilan y se reentrenan cada mes.',
            points: [
              '38 % menos siniestros repetidos desde julio',
              '1,9 millones de euros de ahorro neto estimado',
              '22 % menos bajas en el grupo de riesgo',
              'Cada nueva versión la aprueba una persona',
            ],
            alt: 'Panel de resultados del programa de prevención y vigilancia de los modelos',
          },
        ],
      },
    ],
    changesTitle: 'Lo que cambia',
    changes: [
      { icon: 'repeat', title: 'Cada dato se teclea una vez', text: 'El pedido nace en el móvil y llega a SAP, al portal y al panel sin volver a escribirlo.' },
      { icon: 'shield-check', title: 'Menos errores', text: 'Las comprobaciones que antes se hacían a ojo las hace el sistema, y avisa de lo que no cuadra.' },
      { icon: 'users', title: 'Las personas deciden', text: 'La IA prepara, compara y avisa; aprobar, reclamar o pedir sigue en manos del equipo.' },
      { icon: 'plug', title: 'Sobre lo que ya tienes', text: 'Todo se apoya en SAP y en las herramientas de siempre, sin cambiar de sistemas.' },
    ],
    teaserTitle: 'Casos de uso, de principio a fin',
    teaserText:
      'Proyectos reales y ejemplos paso a paso en moda, banca, alimentación y seguros: apps, SAP Fiori, agentes de IA y migraciones con IA.',
    teaserCta: 'Ver los casos de uso',
    serviceLink: 'Verlo en un caso de uso',
  },

  contactPage: {
    title: `Contacto · ${d.name}`,
    description: 'Cuéntanos qué te gustaría mejorar en tu empresa. La primera conversación corre de nuestra cuenta.',
    h1: 'Hablemos',
    lead: 'Cuéntanos qué te gustaría mejorar. La primera conversación corre de nuestra cuenta.',
    form: {
      title: 'Cuéntanos tu caso',
      note: 'Sin compromiso. La primera conversación corre de nuestra cuenta.',
      topicsLabel: '¿En qué te podemos ayudar?',
      topics: [
        { icon: 'bot', label: 'Agentes de IA' },
        { icon: 'workflow', label: 'Mejora de procesos' },
        { icon: 'smartphone', label: 'Aplicaciones web o móviles' },
        { icon: 'lightbulb', label: 'Otra cosa' },
      ],
      name: 'Nombre',
      company: 'Empresa',
      email: 'Correo electrónico',
      message: '¿Qué te gustaría mejorar?',
      messageHint: 'Por ejemplo: «Dedicamos muchas horas a revisar pedidos a mano».',
      consent: 'He leído y acepto la <a href="{privacy}">política de privacidad</a>.',
      submit: 'Enviar',
      sending: 'Enviando…',
      ok: 'Gracias. Te responderemos lo antes posible.',
      error: 'No se ha podido enviar. Escríbenos o llámanos directamente con los datos de esta página.',
      mailSubject: 'Contacto desde la web',
    },
    next: {
      title: '¿Qué pasa después?',
      items: [
        { icon: 'mail', title: 'Te respondemos', text: 'Leemos tu mensaje y te contestamos lo antes posible.' },
        { icon: 'message-circle', title: 'Primera conversación', text: 'Hablamos de tu caso, sin compromiso y sin coste.' },
        { icon: 'lightbulb', title: 'Propuesta concreta', text: 'Si encaja, te proponemos mejoras claras y priorizadas.' },
      ],
    },
    tabs: { write: 'Escríbenos', call: 'Te llamamos' },
    callback: {
      title: '¿Prefieres que te llamemos?',
      note: 'Déjanos tu teléfono y te llamamos nosotros.',
      name: 'Nombre',
      phone: 'Teléfono',
      when: '¿Cuándo te viene mejor?',
      slots: ['Por la mañana', 'Por la tarde', 'Cuando sea'],
      submit: 'Pedir llamada',
      sending: 'Enviando…',
      ok: 'Hecho. Te llamaremos lo antes posible.',
      error: 'No se ha podido enviar. Llámanos directamente a los teléfonos de la página.',
      mailSubject: 'Petición de llamada desde la web',
    },
    phonesTitle: 'O llámanos',
    asideTitle: 'También puedes escribirnos',
    emailLabel: 'Correo',
    linkedinLabel: 'LinkedIn',
    copy: 'Copiar',
    copied: 'Copiado',
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
          'Tratamos los datos que nos envías a través de los formularios, por correo, por teléfono o por WhatsApp (nombre, empresa, correo electrónico, teléfono, la franja en que prefieres que te llamemos y el contenido del mensaje) con la única finalidad de responder a tu consulta y, si procede, preparar una propuesta.',
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
        h: 'Cookies y estadísticas',
        p: [
          d.analytics
            ? `Este sitio no utiliza cookies. Para saber cuántas personas nos visitan y qué páginas consultan usamos ${d.analytics}, una herramienta de estadísticas que no usa cookies ni recoge datos personales: solo cuenta visitas y acciones de forma agregada y anónima. Por eso no mostramos un aviso de cookies.`
            : 'Este sitio no utiliza cookies propias ni de terceros con fines analíticos o publicitarios, ni carga recursos de servicios externos al navegar. Por eso no mostramos un aviso de cookies.',
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
