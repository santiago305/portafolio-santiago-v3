import type { T } from './i18n'

export const profile = {
  name: 'Santiago Yacila',
  fullName: 'Santiago Yacila Sandoval',
  email: 'minecratf633@gmail.com',
  whatsapp: '51962636946',
  whatsappLabel: '+51 962 636 946',
  linkedin: 'https://www.linkedin.com/in/santiago-yacila',
  github: 'https://github.com/santiago305',
  // Drop the updated CV at public/cv-santiago-yacila.pdf
  cv: 'cv-santiago-yacila.pdf',
  // Replace public/me.svg with your photo (e.g. public/me.webp) and update this path
  photo: 'me.webp',
}

export const ui = {
  nav: {
    work: { es: 'Proyectos', en: 'Work' },
    how: { es: 'Cómo trabajo', en: 'How I work' },
    experience: { es: 'Experiencia', en: 'Experience' },
    contact: { es: 'Contacto', en: 'Contact' },
    menu: { es: 'Abrir menú', en: 'Open menu' },
    close: { es: 'Cerrar menú', en: 'Close menu' },
  },
  hero: {
    role: { es: 'Desarrollador full-stack', en: 'Full-stack developer' },
    phrase: { es: 'Construyo sistemas que trabajan solos.', en: 'I build systems that run on their own.' },
    lead: {
      es: 'Tres años diseñando la arquitectura, escribiendo el código y automatizando lo que antes se hacía a mano en hojas de cálculo.',
      en: 'Three years designing the architecture, writing the code and automating what used to be done by hand in spreadsheets.',
    },
    ctaWork: { es: 'Ver proyectos', en: 'See my work' },
    ctaContact: { es: 'Escríbeme', en: 'Get in touch' },
    status: { es: 'Disponible para nuevos retos', en: 'Open to new roles' },
  },
  work: {
    title: { es: 'Proyectos', en: 'Selected work' },
    intro: {
      es: 'Sistemas privados en producción. Por eso no hay enlace al código, y los datos de clientes en las capturas están difuminados.',
      en: 'Private systems running in production. That is why there is no code link, and client data in the screenshots is blurred.',
    },
    duration: { es: 'Duración', en: 'Duration' },
    role: { es: 'Rol', en: 'Role' },
    stack: { es: 'Stack', en: 'Stack' },
    gallery: { es: 'Ver capturas', en: 'View screenshots' },
    close: { es: 'Cerrar', en: 'Close' },
    prev: { es: 'Anterior', en: 'Previous' },
    next: { es: 'Siguiente', en: 'Next' },
    zoomIn: { es: 'Acercar', en: 'Zoom in' },
    zoomOut: { es: 'Alejar', en: 'Zoom out' },
    zoomHint: { es: 'Haz clic en la imagen para acercar y mueve el cursor para recorrerla.', en: 'Click the image to zoom in, then move the pointer to look around.' },
    zoomHintTouch: { es: 'Toca la imagen para acercar y arrastra para recorrerla.', en: 'Tap the image to zoom in, then drag to look around.' },
    visit: { es: 'Visitar sitio web', en: 'Visit website' },
  },
  how: {
    title: { es: 'Cómo trabajo', en: 'How I work' },
  },
  experience: {
    title: { es: 'Experiencia', en: 'Experience' },
    education: { es: 'Formación', en: 'Education' },
  },
  about: {
    title: { es: 'Sobre mí', en: 'About me' },
    body: {
      es: 'Soy Santiago, desarrollador full-stack de Perú. Me gusta entender cómo funciona un negocio por dentro y convertir sus procesos en software ordenado: un panel claro, datos en un solo lugar y tareas que se ejecutan sin que nadie tenga que acordarse de ellas.',
      en: "I'm Santiago, a full-stack developer from Peru. I like understanding how a business works from the inside and turning its processes into well-ordered software: one clear dashboard, data in a single place and tasks that run without anyone having to remember them.",
    },
    years: { es: 'años programando', en: 'years coding' },
    systems: { es: 'sistemas en producción', en: 'systems in production' },
  },
  contact: {
    title: { es: '¿Construimos algo?', en: "Let's build something." },
    lead: {
      es: 'Respondo rápido por correo o WhatsApp.',
      en: 'I reply quickly by email or WhatsApp.',
    },
    cv: { es: 'Descargar CV', en: 'Download CV' },
    copy: { es: 'Copiar correo', en: 'Copy email' },
    copied: { es: 'Correo copiado', en: 'Email copied' },
  },
  footer: {
    made: { es: 'Diseñado y desarrollado por mí, con React y TypeScript.', en: 'Designed and built by me with React and TypeScript.' },
  },
}

export type Project = {
  id: string
  name: string
  tagline: T
  summary: T
  outcome: T
  duration: T
  role: T
  stack: string[]
  /** Public site, when the project can be visited. */
  url?: string
  shots: { src: string; alt: T }[]
}

export const projects: Project[] = [
  {
    id: 'eunoia',
    name: 'Eunoia',
    tagline: { es: 'Panel de operaciones para un e‑commerce', en: 'Operations platform for an e‑commerce brand' },
    summary: {
      es: 'Antes todo se llevaba en hojas de Google Sheets. Ahora pedidos, compras, couriers, finanzas y asistencias viven en un solo panel.',
      en: 'Everything used to live in Google Sheets. Now orders, purchasing, couriers, finances and attendance run from a single dashboard.',
    },
    outcome: {
      es: 'Con las automatizaciones el equipo trabaja más rápido, más ordenado y con toda la información centralizada.',
      en: 'With the automations the team works faster, stays organised and has every number in one place.',
    },
    duration: { es: '11 meses', en: '11 months' },
    role: { es: 'Arquitecto y desarrollador, liderando a 2 programadores', en: 'Architect and developer, leading 2 engineers' },
    stack: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'Redis', 'Arquitectura hexagonal'],
    shots: [
      { src: 'projects/eunoia-couriers.webp', alt: { es: 'Finanzas de couriers con saldos y gráficos', en: 'Courier finances with balances and charts' } },
      { src: 'projects/eunoia-enganches.webp', alt: { es: 'Origen de los pedidos por canal', en: 'Order sources by channel' } },
      { src: 'projects/eunoia-pedidos.webp', alt: { es: 'Listado de pedidos', en: 'Orders list' } },
      { src: 'projects/eunoia-compras.webp', alt: { es: 'Compras a proveedores', en: 'Supplier purchases' } },
      { src: 'projects/eunoia-agencias.webp', alt: { es: 'Agencias de envío', en: 'Shipping agencies' } },
    ],
  },
  {
    id: 'fuvx',
    name: 'FUXV',
    tagline: { es: 'Sistema automatizado de evaluación de clientes', en: 'Automated client evaluation system' },
    summary: {
      es: 'Procesa cientos de miles de registros y busca la información de cada cliente de forma automática, con un equipo de workers en paralelo.',
      en: 'Processes hundreds of thousands of records and looks up each client automatically, with a fleet of workers running in parallel.',
    },
    outcome: {
      es: 'El sistema trabaja prácticamente solo. Solo hace falta entrar a ver estadísticas y resultados.',
      en: 'The system practically runs itself. People only log in to check statistics and results.',
    },
    duration: { es: '1 año', en: '1 year' },
    role: { es: 'Desarrollador único, de la arquitectura al despliegue', en: 'Sole developer, from architecture to deployment' },
    stack: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'Redis', 'Snapshots'],
    shots: [
      { src: 'projects/fuvx-bancaria.webp', alt: { es: 'Panel de búsqueda automatizada', en: 'Automated lookup dashboard' } },
      { src: 'projects/fuvx-filtrar.webp', alt: { es: 'Resultados del filtrado', en: 'Filtering results' } },
      { src: 'projects/fuvx-asistencia.webp', alt: { es: 'Estadísticas de asistencia', en: 'Attendance statistics' } },
      { src: 'projects/fuvx-clientes.webp', alt: { es: 'Base de clientes', en: 'Client base' } },
    ],
  },
  {
    id: 'visualblack',
    name: 'Visual Black',
    tagline: { es: 'Sitio web para una agencia de marketing 360°', en: 'Website for a 360° marketing agency' },
    summary: {
      es: 'Sitio con tres departamentos (consultoría, contenido y desarrollo), cada uno con su propia identidad y animaciones de scroll.',
      en: 'A site for three departments (consulting, content and development), each with its own identity and scroll animations.',
    },
    outcome: {
      es: 'Diseñado y construido de principio a fin en tres meses.',
      en: 'Designed and built end to end in three months.',
    },
    duration: { es: '3 meses', en: '3 months' },
    role: { es: 'Desarrollador único', en: 'Sole developer' },
    stack: ['React', 'GSAP', 'Lenis', 'Vite'],
    url: 'https://www.visualblack.es/',
    shots: [
      { src: 'projects/visualblack-home.webp', alt: { es: 'Portada de Visual Black', en: 'Visual Black home page' } },
      { src: 'projects/visualblack-dev.webp', alt: { es: 'Página del departamento Developer', en: 'Developer department page' } },
      { src: 'projects/visualblack-mid.webp', alt: { es: 'Manifiesto con texto animado', en: 'Manifesto with animated text' } },
    ],
  },
]

export const principles: { title: T; body: T }[] = [
  {
    title: { es: 'Arquitectura hexagonal', en: 'Hexagonal architecture' },
    body: {
      es: 'La lógica del negocio no depende del framework ni de la base de datos. Puedo cambiar una pieza sin romper las demás.',
      en: 'Business logic does not depend on the framework or the database. One piece can change without breaking the rest.',
    },
  },
  {
    title: { es: 'Snapshots para datos masivos', en: 'Snapshots for large datasets' },
    body: {
      es: 'Con cientos de miles de registros, precalculo el estado en snapshots para que los paneles respondan al instante.',
      en: 'With hundreds of thousands of records, I precompute state into snapshots so dashboards respond instantly.',
    },
  },
  {
    title: { es: 'Automatizar primero', en: 'Automate first' },
    body: {
      es: 'Si una tarea se repite, la convierto en un proceso que corre solo y avisa cuando algo necesita atención.',
      en: 'If a task repeats, I turn it into a process that runs by itself and flags what needs attention.',
    },
  },
]

export const stack = ['React', 'TypeScript', 'NestJS', 'Node.js', 'PostgreSQL', 'Redis', 'GSAP', 'Git']

// Add dates in `period` (e.g. '2024 — 2025') once confirmed.
export const experience: { company: string; role: T; period?: string; note?: T }[] = [
  {
    company: 'Eunoia Ecommerce',
    role: { es: 'Arquitecto de software y desarrollador full-stack', en: 'Software architect and full-stack developer' },
    note: { es: 'Lideré a 2 programadores', en: 'Led 2 engineers' },
  },
  {
    company: 'Visual Black',
    role: { es: 'Desarrollador frontend', en: 'Frontend developer' },
  },
  {
    company: 'Gesem Telecomunicaciones',
    role: { es: 'Desarrollador de software', en: 'Software developer' },
  },
  {
    company: 'Freelance',
    role: { es: 'Desarrollador full-stack', en: 'Full-stack developer' },
  },
]

export const education = {
  school: 'SENATI',
  degree: { es: 'Estudios técnicos completos', en: 'Completed technical studies' },
}
