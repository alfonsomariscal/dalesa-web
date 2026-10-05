// Datos generales de la web. Lo que esté vacío aparece como [PENDIENTE] en la página.
export default {
  name: 'DALESA',

  // Dominio definitivo, sin barra final. Con él se generan canonical, sitemap.xml y robots.txt.
  url: 'https://dalesasolutions.com',

  // URL pública mientras no haya dominio (GitHub Pages), para la imagen al compartir en
  // WhatsApp/LinkedIn y la ficha de empresa. La pone el workflow de publicación; con `url` no hace falta.
  shareUrl: process.env.SHARE_URL ?? '',

  // Subruta donde se publica (GitHub Pages de proyecto: '/dalesa-web'). En dominio propio: ''.
  // Se puede sobrescribir con la variable de entorno BASE_PATH.
  base: process.env.BASE_PATH ?? '',

  // Versión de trabajo: pide a los buscadores que no indexen la web. Poner a false al lanzar.
  preview: true,

  email: 'info@dalesasolutions.com',
  linkedin: '', // URL de la página de empresa en LinkedIn

  // Teléfonos de atención (sin espacios; la web los muestra como 687 84 28 27).
  phones: ['687842827', '665514510'],
  // Número con WhatsApp (botón flotante y enlaces wa.me). Vacío para quitarlo.
  whatsapp: '687842827',

  // Correos de DALESA que reciben los mensajes de los formularios (contacto y «Te llamamos»).
  // Con al menos uno, los formularios envían por FormSubmit (formsubmit.co, gratis y sin cuenta):
  // el primero es el destinatario principal y el resto van en copia. La primera vez que alguien
  // envíe un formulario, FormSubmit manda al primer correo un email para activarlo.
  notify: [],

  // Analítica sin cookies (no necesita aviso de cookies). Vacío = sin analítica.
  //   provider 'plausible'   → id: el dominio dado de alta en Plausible (p. ej. 'dalesasolutions.com')
  //   provider 'umami'       → id: el «Website ID» de Umami Cloud
  //   provider 'goatcounter' → id: el código de la cuenta (el de https://<código>.goatcounter.com)
  // La política de privacidad se adapta sola al proveedor elegido.
  analytics: { provider: '', id: '' },

  // Endpoint propio de los formularios (p. ej. Formspree: 'https://formspree.io/f/xxxxxxx').
  // Si se rellena, tiene prioridad sobre `notify`. Sin ninguno de los dos, los formularios
  // abren el cliente de correo con el mensaje ya redactado.
  formEndpoint: '',

  // Datos para el aviso legal (LSSI) y la política de privacidad (RGPD).
  legal: {
    razonSocial: 'DALESA TECHNOLOGY SOLUTIONS, S.L.',
    nif: 'B72931991',
    domicilio: 'calle Ruiz de Alda, 4, 3.º B, 28342 Valdemoro (Madrid)',
    registro: 'Inscrita en el Registro Mercantil de Madrid, tomo 44428, folio 40, sección 8, hoja M-782892, inscripción 1ª.',
  },
};
