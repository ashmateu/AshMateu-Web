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
    title: "Valentina Ferrer × Marie Claire Cover",
    client: "Marie Claire Argentina",
    category: "Editorial",
    location: "Nueva York",
    year: "2024",
    role: "Styling & Portada",
    coverImage: "/images/catalog_v2/36. Valentina Ferrer Marie Claire/MC_VALENTINA_RETOUCHED_0001 copy.jpg",
    images: [
      "/images/catalog_v2/36. Valentina Ferrer Marie Claire/MC_VALENTINA_RETOUCHED_0001 copy.jpg",
      "/images/catalog_v2/36. Valentina Ferrer Marie Claire/MC_VALENTINA_RETOUCHED_0002.jpg",
      "/images/catalog_v2/36. Valentina Ferrer Marie Claire/MC_VALENTINA_RETOUCHED_0003 copy.jpg",
      "/images/catalog_v2/36. Valentina Ferrer Marie Claire/MC_VALENTINA_RETOUCHED_0004 copy.jpg",
      "/images/catalog_v2/36. Valentina Ferrer Marie Claire/MC_VALENTINA_RETOUCHED_0005_1 copy.jpg",
      "/images/catalog_v2/36. Valentina Ferrer Marie Claire/MC_VALENTINA_RETOUCHED_0007_1 copy.jpg",
    ],
    description:
      "Portada editorial y nota central protagonizada por la supermodelo y empresaria Valentina Ferrer. Una narrativa de lujo moderno, sastrería oversize y siluetas esculturales en Manhattan.",
    summary:
      "Tapa y feature de moda capturado en Nueva York con estilismo de alta gama y elegancia cosmopolita.",
    credits: {
      Styling: "Ash Mateu",
      Talento: "Valentina Ferrer",
      Revista: "Marie Claire Argentina",
      Locación: "Nueva York",
    },
  },
  {
    id: "3",
    slug: "valentina-zenere",
    title: "Valentina Zenere × Celebrity Styling",
    client: "Valentina Zenere",
    category: "Celebrity",
    location: "Madrid & Buenos Aires",
    year: "2024",
    role: "Celebrity Styling & Imagen",
    coverImage: "/images/catalog_v2/VALENTINA ZENERE/Valentina Z 0016.jpg",
    images: [
      "/images/catalog_v2/VALENTINA ZENERE/Valentina Z 0016.jpg",
      "/images/catalog_v2/VALENTINA ZENERE/Valentina Z 0047.jpg",
      "/images/catalog_v2/VALENTINA ZENERE/Valentina Z 0074.jpg",
      "/images/catalog_v2/VALENTINA ZENERE/Valentina Z 0080.jpg",
      "/images/catalog_v2/VALENTINA ZENERE/Valentina Z 0246.jpg",
      "/images/catalog_v2/VALENTINA ZENERE/Valentina Z 0291.jpg",
      "/images/catalog_v2/VALENTINA ZENERE/Valentina Z 0716.jpg",
      "/images/catalog_v2/VALENTINA ZENERE/Valentina Z 0879.jpg",
    ],
    description:
      "Estilismo y diseño de imagen integral para la actriz internacional Valentina Zenere. Una estética audaz que fusiona el rock glam, cuero, sastrería afilada y vanguardia pop.",
    summary:
      "Dirección de estilismo para sesiones editoriales y lanzamientos globales de la estrella de Elite.",
    credits: {
      "Celebrity Styling": "Ash Mateu",
      Talento: "Valentina Zenere",
      Locación: "Estudio Internacional",
    },
  },
  {
    id: "4",
    slug: "emilia-attias",
    title: "Emilia Attias × High Fashion & Red Carpet",
    client: "Emilia Attias",
    category: "Celebrity",
    location: "Buenos Aires & París",
    year: "2024",
    role: "Dirección de Estilismo",
    coverImage: "/images/catalog_v2/EMILIA ATTIAS/IMG_4205-1.jpg",
    images: [
      "/images/catalog_v2/EMILIA ATTIAS/IMG_4205-1.jpg",
      "/images/catalog_v2/EMILIA ATTIAS/IMG_4206-1.jpg",
      "/images/catalog_v2/EMILIA ATTIAS/IMG_4207-1.jpg",
      "/images/catalog_v2/EMILIA ATTIAS/IMG_4262-1.jpg",
      "/images/catalog_v2/EMILIA ATTIAS/IMG_4330-1.jpg",
      "/images/catalog_v2/EMILIA ATTIAS/9A4ADF56-19A8-4511-89F3-7B0606E70E8C_1_105_c.jpg",
    ],
    description:
      "Estilismo y consultoría de imagen de gala para Emilia Attias en eventos de alta costura, alfombras rojas y producciones editoriales de alto perfil.",
    summary:
      "Siluetas etéreas, encajes de alta costura y magnetismo visual para una de las figuras más icónicas.",
    credits: {
      "Celebrity Styling": "Ash Mateu",
      Talento: "Emilia Attias",
      Producción: "Ash Mateu Studio",
    },
  },
  {
    id: "5",
    slug: "calu-rivero",
    title: "Calu Rivero × Marie Claire Argentina",
    client: "Marie Claire Argentina",
    category: "Editorial",
    location: "Buenos Aires & NYC",
    year: "2023",
    role: "Dirección Creativa & Styling",
    coverImage: "/images/catalog_v2/CALU RIVERO/Shot_01_0213.jpg",
    images: [
      "/images/catalog_v2/CALU RIVERO/Shot_01_0213.jpg",
      "/images/catalog_v2/CALU RIVERO/Shot_03_0111.jpg",
      "/images/catalog_v2/CALU RIVERO/Shot_01_0142.jpg",
      "/images/catalog_v2/CALU RIVERO/Shot_02_0094.jpg",
      "/images/catalog_v2/CALU RIVERO/Shot_04_0176.jpg",
      "/images/catalog_v2/CALU RIVERO/Shot_08_0016.jpg",
    ],
    description:
      "Producción de moda inmersiva y conceptual junto a Calu Rivero (Dignity) para Marie Claire Argentina. Estética orgánica, conexión con la tierra y piezas de diseñadores contemporáneos.",
    summary:
      "Un relato visual de libertad, estilo consciente y sensibilidad editorial.",
    credits: {
      "Dirección Creativa & Styling": "Ash Mateu",
      Talento: "Calu Rivero (Dignity)",
      Publicación: "Marie Claire Argentina",
    },
  },
  {
    id: "6",
    slug: "tuli-acosta",
    title: "Tuli Acosta × Urban Glamour",
    client: "Editorial Especial",
    category: "Celebrity",
    location: "Buenos Aires",
    year: "2024",
    role: "Styling & Concepto Visual",
    coverImage: "/images/catalog_v2/TULI ACOSTA/001.jpg",
    images: [
      "/images/catalog_v2/TULI ACOSTA/001.jpg",
      "/images/catalog_v2/TULI ACOSTA/003.jpg",
      "/images/catalog_v2/TULI ACOSTA/004b.jpg",
      "/images/catalog_v2/TULI ACOSTA/008b.jpg",
      "/images/catalog_v2/TULI ACOSTA/009.jpg",
    ],
    description:
      "Dirección de estilismo para Tuli Acosta combinando el streetwear de lujo, texturas metálicas, denim intervenido y una impronta urbana de alto impacto.",
    summary:
      "Fusión vibrante de moda urbana con acabados editoriales pulidos.",
    credits: {
      Styling: "Ash Mateu",
      Talento: "Tuli Acosta",
      Fotografía: "Producción Estudio",
    },
  },
  {
    id: "7",
    slug: "belu-negri",
    title: "Belu Negri × DMAG Magazine Cover",
    client: "DMAG Magazine",
    category: "Editorial",
    location: "Buenos Aires",
    year: "2024",
    role: "Portada & Dirección de Styling",
    coverImage: "/images/catalog_v2/BELU NEGRI/A.jpg",
    images: [
      "/images/catalog_v2/BELU NEGRI/A.jpg",
      "/images/catalog_v2/BELU NEGRI/B.jpg",
      "/images/catalog_v2/BELU NEGRI/C.jpg",
      "/images/catalog_v2/BELU NEGRI/D.jpg",
      "/images/catalog_v2/BELU NEGRI/E.jpg",
    ],
    description:
      "Portada y editorial principal para la revista DMAG con Belu Negri. Concepto visual disruptivo con iluminación de alto contraste y sastrería de vanguardia.",
    summary:
      "Tapa y feature de moda con una estética audaz y contemporánea.",
    credits: {
      "Dirección de Styling": "Ash Mateu",
      Talento: "Belu Negri",
      Medio: "DMAG Magazine",
    },
  },
  {
    id: "8",
    slug: "central-park-pandora",
    title: "Moda Central Park × Pandora Jewelry NYC",
    client: "Pandora / Marie Claire",
    category: "Campañas",
    location: "Central Park, Nueva York",
    year: "2024",
    role: "Dirección Creativa & Styling",
    coverImage: "/images/catalog_v2/MODA CENTRAL PARK/Moda-Purpura-3.jpg",
    images: [
      "/images/catalog_v2/MODA CENTRAL PARK/Moda-Purpura-3.jpg",
      "/images/catalog_v2/MODA CENTRAL PARK/Moda-Purpura-6.jpg",
      "/images/catalog_v2/MODA CENTRAL PARK/DSC_1921.jpg",
      "/images/catalog_v2/MODA CENTRAL PARK/DSC_1980.jpg",
      "/images/catalog_v2/MODA CENTRAL PARK/DSC_2059.jpg",
    ],
    description:
      "Producción de moda en el icónico Central Park de Manhattan integrando joyería fina de Pandora con vestidos de alta gama en tonos púrpuras y texturas fluidas.",
    summary:
      "Una atmósfera de ensueño en el corazón verde de Nueva York, fusionando joyería de lujo y alta costura.",
    credits: {
      "Dirección Creativa & Styling": "Ash Mateu",
      Marca: "Pandora Jewelry",
      Locación: "Central Park, Nueva York",
    },
  },
  {
    id: "9",
    slug: "moda-estudio-ny",
    title: "Moda Estudio Polka Dots × Marie Claire NYC",
    client: "Marie Claire Argentina",
    category: "Editorial",
    location: "Manhattan, Nueva York",
    year: "2024",
    role: "Dirección de Moda & Styling",
    coverImage: "/images/catalog_v2/MODA ESTUDIO NY/MarieClaire_Cover_2024_001.jpg",
    images: [
      "/images/catalog_v2/MODA ESTUDIO NY/MarieClaire_Cover_2024_001.jpg",
      "/images/catalog_v2/MODA ESTUDIO NY/MarieClaire_Cover_2024_013.jpg",
      "/images/catalog_v2/MODA ESTUDIO NY/MarieClaire_Cover_2024_010.jpg",
      "/images/catalog_v2/MODA ESTUDIO NY/MarieClaire_Cover_2024_014.jpg",
      "/images/catalog_v2/MODA ESTUDIO NY/MarieClaire_Cover_2024_009.jpg",
      "/images/catalog_v2/MODA ESTUDIO NY/MarieClaire_Cover_2024_019.jpg",
    ],
    description:
      "Editorial de moda en estudio neoyorquino explorando patrones geométricos, lunares de alta costura, sombreros escultóricos y siluetas retro-futuristas.",
    summary:
      "Sofisticación gráfica y dinamismo editorial publicado en portada e interiores de Marie Claire.",
    credits: {
      "Dirección de Moda": "Ash Mateu",
      Publicación: "Marie Claire Argentina",
      Locación: "Nueva York",
    },
  },
  {
    id: "10",
    slug: "red-carpets-couture",
    title: "Red Carpets & Haute Couture Brides",
    client: "Vestidos de Gala & Novias",
    category: "Haute Couture",
    location: "Buenos Aires, París & NYC",
    year: "2024",
    role: "Couture Styling & Atelier",
    coverImage: "/images/catalog_v2/RED CARPETS/IMG_4680.jpg",
    images: [
      "/images/catalog_v2/RED CARPETS/IMG_4680.jpg",
      "/images/catalog_v2/RED CARPETS/IMG_4681.jpg",
      "/images/catalog_v2/RED CARPETS/IMG_7306.jpg",
      "/images/catalog_v2/RED CARPETS/IMG_7327.jpg",
      "/images/catalog_v2/RED CARPETS/IMG_7340.jpg",
      "/images/catalog_v2/RED CARPETS/IMG_7396.jpg",
      "/images/catalog_v2/RED CARPETS/IMG_6100.jpg",
    ],
    description:
      "Curaduría y asesoría exclusiva de estilismo para novias de alta costura y celebridades en alfombras rojas de festivales internacionales y galas de gala.",
    summary:
      "Vestidos a medida, bordados artesanales y el más alto nivel de sofisticación para momentos inolvidables.",
    credits: {
      "Couture Styling": "Ash Mateu",
      Servicio: "Novias & Red Carpet VIP",
      Atelier: "Ash Mateu Studio",
    },
  },
  {
    id: "11",
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
    id: "12",
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
