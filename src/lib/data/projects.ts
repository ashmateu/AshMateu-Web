export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: "Editorial" | "Campañas" | "Celebrity" | "Haute Couture";
  location: string;
  year: string;
  role: string;
  coverImage: string;
  images: string[];
  description: string;
  summary: string;
  credits: { [key: string]: string };
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "chanel-hc",
    title: "Chanel Haute Couture × Marie Claire Argentina",
    client: "Chanel / Marie Claire Argentina",
    category: "Haute Couture",
    location: "Nueva York",
    year: "2024",
    role: "Dirección Creativa & Styling",
    coverImage: "/images/extracted/chanel-hc/img-005.webp",
    images: [
      "/images/extracted/chanel-hc/img-000.webp",
      "/images/extracted/chanel-hc/img-001.webp",
      "/images/extracted/chanel-hc/img-002.webp",
      "/images/extracted/chanel-hc/img-003.webp",
      "/images/extracted/chanel-hc/img-004.webp",
      "/images/extracted/chanel-hc/img-005.webp",
    ],
    description:
      "Dirección creativa y estilismo para la producción exclusiva de Chanel Haute Couture en Nueva York para Marie Claire Argentina. Una exploración visual de la artesanía sublime, texturas bordadas y elegancia atemporal.",
    summary:
      "Producción de alta costura capturada en las calles y estudios de Manhattan, fusionando la herencia parisina de Chanel con la contemporaneidad neoyorquina.",
    credits: {
      "Dirección Creativa & Styling": "Ash Mateu",
      Publicación: "Marie Claire Argentina",
      Fotografía: "Estudio NYC",
      Locación: "Nueva York",
    },
  },
  {
    id: "2",
    slug: "valentina-ferrer",
    title: "Valentina Ferrer × Miu Miu",
    client: "Miu Miu",
    category: "Editorial",
    location: "Nueva York",
    year: "2023",
    role: "Styling & Portada",
    coverImage: "/images/extracted/valentina-miumiu/img-000.webp",
    images: [
      "/images/extracted/valentina-miumiu/img-000.webp",
      "/images/extracted/valentina-miumiu/img-001.webp",
      "/images/extracted/valentina-miumiu/img-002.webp",
      "/images/extracted/valentina-miumiu/img-003.webp",
      "/images/extracted/valentina-miumiu/img-004.webp",
    ],
    description:
      "Portada editorial y feature central protagonizado por la modelo y empresaria Valentina Ferrer luciendo la colección de Miu Miu. Estética vanguardista, minimalista y audaz.",
    summary:
      "Tapa y nota central de moda capturada en Manhattan con siluetas icónicas de Miu Miu.",
    credits: {
      Styling: "Ash Mateu",
      Talento: "Valentina Ferrer",
      Marca: "Miu Miu",
      Locación: "Nueva York",
    },
  },
  {
    id: "3",
    slug: "leonie-hanne",
    title: "Leonie Hanne × Dolce & Gabbana",
    client: "Dolce & Gabbana",
    category: "Haute Couture",
    location: "Nueva York",
    year: "2024",
    role: "Dirección Creativa",
    coverImage: "/images/extracted/leonie-dg/img-003.webp",
    images: [
      "/images/extracted/leonie-dg/img-000.webp",
      "/images/extracted/leonie-dg/img-001.webp",
      "/images/extracted/leonie-dg/img-002.webp",
      "/images/extracted/leonie-dg/img-003.webp",
      "/images/extracted/leonie-dg/img-004.webp",
    ],
    description:
      "Colaboración editorial y dirección creativa junto a la influencer global de alta costura Leonie Hanne luciendo piezas de Dolce & Gabbana.",
    summary:
      "Una narrativa visual de opulencia, drama mediterráneo y sofisticación en Nueva York.",
    credits: {
      "Dirección Creativa": "Ash Mateu",
      Talento: "Leonie Hanne",
      Marca: "Dolce & Gabbana",
      Locación: "Nueva York",
    },
  },
  {
    id: "4",
    slug: "calu-chinatown",
    title: "Calu Rivero — Chinese New Year",
    client: "Editorial",
    category: "Editorial",
    location: "Chinatown, Manhattan",
    year: "2023",
    role: "Styling",
    coverImage: "/images/extracted/calu-chinatown/img-004.webp",
    images: [
      "/images/extracted/calu-chinatown/img-000.webp",
      "/images/extracted/calu-chinatown/img-001.webp",
      "/images/extracted/calu-chinatown/img-002.webp",
      "/images/extracted/calu-chinatown/img-003.webp",
      "/images/extracted/calu-chinatown/img-004.webp",
    ],
    description:
      "Producción de moda inmersiva en el corazón de Chinatown durante el Año Nuevo Chino, protagonizada por Calu Rivero (Dignity). Contrastes urbanos, color y energía cinética.",
    summary:
      "Estilismo urbano de vanguardia en locación exterior viva en Manhattan.",
    credits: {
      Styling: "Ash Mateu",
      Talento: "Calu Rivero",
      Locación: "Chinatown, Nueva York",
    },
  },
  {
    id: "5",
    slug: "dolores-fonzi",
    title: "Dolores Fonzi",
    client: "Dolores Fonzi / Marie Claire",
    category: "Celebrity",
    location: "Buenos Aires",
    year: "2023",
    role: "Celebrity Styling",
    coverImage: "/images/extracted/dolores-fonzi/img-003.webp",
    images: [
      "/images/extracted/dolores-fonzi/img-000.webp",
      "/images/extracted/dolores-fonzi/img-001.webp",
      "/images/extracted/dolores-fonzi/img-002.webp",
      "/images/extracted/dolores-fonzi/img-003.webp",
    ],
    description:
      "Estilismo y dirección de imagen para la consagrada actriz y directora Dolores Fonzi en marco del estreno de su película Blondi y galas internacionales.",
    summary:
      "Elegancia descontracturada, carácter y empoderamiento visual femenino.",
    credits: {
      "Celebrity Styling": "Ash Mateu",
      Talento: "Dolores Fonzi",
      Locación: "Buenos Aires",
    },
  },
  {
    id: "6",
    slug: "chanel-williamsburg",
    title: "Chanel Prêt-à-porter Williamsburg",
    client: "Chanel",
    category: "Campañas",
    location: "Brooklyn, Nueva York",
    year: "2023",
    role: "Styling & Dirección de Arte",
    coverImage: "/images/extracted/chanel-pap/img-000.webp",
    images: [
      "/images/extracted/chanel-pap/img-000.webp",
      "/images/extracted/chanel-pap/img-001.webp",
      "/images/extracted/chanel-pap/img-002.webp",
      "/images/extracted/chanel-pap/img-003.webp",
    ],
    description:
      "Campaña y editorial de prêt-à-porter Chanel en la atmósfera industrial y bohemia de Williamsburg, Brooklyn.",
    summary:
      "El encuentro del lujo clásico francés con el streetstyle contemporáneo neoyorquino.",
    credits: {
      Styling: "Ash Mateu",
      Marca: "Chanel",
      Locación: "Brooklyn, Nueva York",
    },
  },
  {
    id: "7",
    slug: "netflix-mf",
    title: "Netflix × Martín Fierro",
    client: "Netflix Argentina",
    category: "Celebrity",
    location: "Buenos Aires",
    year: "2023",
    role: "Red Carpet Styling",
    coverImage: "/images/extracted/netflix-mf/img-000.webp",
    images: [
      "/images/extracted/netflix-mf/img-000.webp",
      "/images/extracted/netflix-mf/img-001.webp",
      "/images/extracted/netflix-mf/img-002.webp",
    ],
    description:
      "Dirección de estilismo integral para las principales figuras del elenco de Netflix en la alfombra roja y gala de los Premios Martín Fierro.",
    summary:
      "Looks de alto impacto mediático y máxima sofisticación para la gala televisiva más vista.",
    credits: {
      "Red Carpet Styling": "Ash Mateu",
      Cliente: "Netflix",
      Evento: "Premios Martín Fierro",
    },
  },
  {
    id: "8",
    slug: "gucci-rural",
    title: "Editorial Rural × Gucci",
    client: "Gucci",
    category: "Campañas",
    location: "Upstate New York",
    year: "2024",
    role: "Styling & Producción",
    coverImage: "/images/extracted/gucci-rural/img-001.webp",
    images: [
      "/images/extracted/gucci-rural/img-000.webp",
      "/images/extracted/gucci-rural/img-001.webp",
      "/images/extracted/gucci-rural/img-002.webp",
      "/images/extracted/gucci-rural/img-003.webp",
    ],
    description:
      "Producción de moda en los paisajes rurales de Upstate New York combinando la sastrería y accesorios icónicos de Gucci con elementos naturales y rústicos.",
    summary:
      "Contraste orgánico entre la naturaleza virgen y el maximalismo refinado de Gucci.",
    credits: {
      Styling: "Ash Mateu",
      Marca: "Gucci",
      Locación: "Upstate New York",
    },
  },
];
