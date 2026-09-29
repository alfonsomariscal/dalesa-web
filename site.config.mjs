// Datos generales de la web. Lo que esté vacío aparece como [PENDIENTE] en la página.
export default {
  name: 'DALESA',

  // Dominio definitivo, sin barra final. Con él se generan canonical, sitemap.xml y robots.txt.
  url: '', // p. ej. 'https://www.dalesa.es'

  // Subruta donde se publica (GitHub Pages de proyecto: '/dalesa-web'). En dominio propio: ''.
  // Se puede sobrescribir con la variable de entorno BASE_PATH.
  base: process.env.BASE_PATH ?? '',

  // Versión de trabajo: pide a los buscadores que no indexen la web. Poner a false al lanzar.
  preview: true,

  email: '', // correo de contacto público, p. ej. 'hola@dalesa.es'
  linkedin: '', // URL de la página de empresa en LinkedIn

  // Endpoint del formulario de contacto (p. ej. Formspree: 'https://formspree.io/f/xxxxxxx').
  // Mientras esté vacío, el formulario abre el cliente de correo con el mensaje ya redactado.
  formEndpoint: '',

  // Datos para el aviso legal (LSSI) y la política de privacidad (RGPD).
  legal: {
    razonSocial: '',
    nif: '',
    domicilio: '',
    registro: '', // p. ej. 'Registro Mercantil de Madrid, tomo X, folio Y, hoja M-Z'
  },
};
