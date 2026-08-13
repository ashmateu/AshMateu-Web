import { supabase } from "@/lib/supabase/client";

export interface PressArticle {
  id: string | number;
  title: string;
  publication: string;
  publication_date: string;
  url: string;
  cover_url?: string | null;
  excerpt?: string | null;
  featured?: boolean;
  active?: boolean;
  category?: string;
}

export const fallbackPressArticles: PressArticle[] = [
  {
    id: 1,
    title: "Fake news e inteligencia artificial: por qué ya no sabemos qué es real en redes",
    publication: "Marie Claire Argentina",
    publication_date: "2026-07-24",
    url: "https://marieclaire.perfil.com/noticias/sociedad/fake-news-e-inteligencia-artificial-por-que-ya-no-sabemos-que-es-real-en-redes.phtml",
    cover_url: "https://fotos.perfil.com/2024/07/24/trim/1140/641/ia-fake-news-1845110.jpg",
    excerpt: "Un análisis sobre la saturación de imágenes generadas artificialmente en Instagram y TikTok, y el valor del ojo humano y la curaduría estética auténtica.",
    featured: true,
    category: "Investigación & Tendencias",
  },
  {
    id: 2,
    title: "Los botines fucsia del Mundial 2026: qué revelan sobre la cultura de los algoritmos",
    publication: "Marie Claire Argentina",
    publication_date: "2026-06-21",
    url: "https://marieclaire.perfil.com/noticias/moda/los-botines-rosas-del-mundial-2026-que-revelan-sobre-la-cultura-de-los-algoritmos.phtml",
    cover_url: "https://fotos.perfil.com/2024/06/21/trim/1140/641/botines-rosas-1828825.jpg",
    excerpt: "Cómo el calzado deportivo se convirtió en el principal lienzo de experimentación cromática y declaración de identidad hiperdigital.",
    category: "Cultura & Moda",
  },
  {
    id: 3,
    title: "Bogotá Fashion Week 2026: diseño colombiano, identidad cultural y negocios de moda",
    publication: "Marie Claire Argentina",
    publication_date: "2026-05-16",
    url: "https://marieclaire.perfil.com/noticias/moda/bogota-fashion-week-2026-diseno-colombiano-identidad-cultural-y-negocios-de-moda.phtml",
    cover_url: "https://fotos.perfil.com/2024/05/23/trim/1140/641/bogota-fashion-week-1811651.jpg",
    excerpt: "Cobertura especial desde Colombia: técnicas ancestrales de tejido, pasarelas sostenibles y el auge del diseño latinoamericano en el mercado global.",
    category: "Fashion Week · Cobertura",
  },
  {
    id: 4,
    title: "Más allá de la moda: El Diablo Viste a la Moda 2 y la transformación de la comunicación",
    publication: "Marie Claire Argentina",
    publication_date: "2026-05-03",
    url: "https://marieclaire.perfil.com/noticias/cultura/mas-alla-de-la-moda-el-diablo-viste-a-la-moda-2-y-la-transformacion-de-la-comunicacion.phtml",
    cover_url: "https://fotos.perfil.com/2024/07/09/trim/1140/641/el-diablo-viste-a-la-moda-1837890.jpg",
    excerpt: "El regreso del clásico del cine editorial y el debate sobre la supervivencia de las revistas impresas frente al imperio del contenido efímero.",
    category: "Cultura & Cine",
  },
  {
    id: 5,
    title: "Chanel, versión Matthieu Blazy: el renacimiento que estábamos esperando",
    publication: "Marie Claire Argentina",
    publication_date: "2025-10-07",
    url: "https://marieclaire.perfil.com/noticias/moda/chanel-version-matthieu-blazy-el-renacimiento-que-estabamos-esperando.phtml",
    cover_url: "/images/extracted/chanel-hc/img-005.webp",
    excerpt: "La nueva era de la maison francesa: siluetas depuradas, artesanía en tweed y la redefinición del lujo clásico para una nueva generación.",
    category: "Haute Couture & Lujo",
  },
  {
    id: 6,
    title: "Jonathan Anderson impone un nuevo rumbo en Dior y arrasa en París",
    publication: "Marie Claire Argentina",
    publication_date: "2025-10-02",
    url: "https://marieclaire.perfil.com/noticias/moda/jonathan-anderson-impone-un-nuevo-rumbo-en-dior-y-arrasa-en-paris.phtml",
    cover_url: "/images/extracted/valentina-miumiu/img-000.webp",
    excerpt: "Crónica desde la Semana de la Moda de París: experimentación conceptual, drapeados innovadores y ovación unánime de la crítica especializada.",
    category: "Paris Fashion Week",
  },
  {
    id: 7,
    title: "Chanel en París: 7 tendencias que marcarán la próxima temporada",
    publication: "Marie Claire Argentina",
    publication_date: "2025-03-11",
    url: "https://marieclaire.perfil.com/noticias/moda/chanel-en-paris-7-tendencias-que-marcaran-la-proxima-temporada.phtml",
    cover_url: "/images/extracted/chanel-williamsburg/img-000.webp",
    excerpt: "Las claves que dejó el desfile en el Grand Palais: paletas minerales, capas transparentes y accesorios joya.",
    category: "Tendencias",
  },
  {
    id: 8,
    title: "Chloé redefine la feminidad en su colección Invierno: los detalles del desfile en París",
    publication: "Marie Claire Argentina",
    publication_date: "2025-03-10",
    url: "https://marieclaire.perfil.com/noticias/moda/chloe-redefine-la-feminidad-en-su-coleccion-invierno-2025-los-detalles-del-desfile.phtml",
    cover_url: "/images/extracted/leonie-dg/img-003.webp",
    excerpt: "Encajes bohemios, cueros livianos y botas mosqueteras en una colección aclamada que devolvió a Chloé al centro de la conversación.",
    category: "Paris Fashion Week",
  },
  {
    id: 9,
    title: "Con Pharrell Williams a la cabeza, Louis Vuitton dejó un mensaje de unión e igualdad en París",
    publication: "Marie Claire Argentina",
    publication_date: "2024-06-19",
    url: "https://marieclaire.perfil.com/noticias/moda/con-pharrell-williams-a-la-cabeza-louis-vuitton-deja-un-mensaje-de-diversidad-y-sustentabilidad-en-paris.phtml",
    cover_url: "https://fotos.perfil.com/2024/06/19/trim/1140/641/louis-vuitton-1827464.jpg",
    excerpt: "La sede de la UNESCO fue el escenario de una presentación monumental que fusionó música, diversidad y sastrería de alta gama.",
    category: "Menswear & Lujo",
  },
  {
    id: 10,
    title: "'Vestida de azul': la serie documental que toca el tabú de transexualidad en los años 80",
    publication: "Marie Claire Argentina",
    publication_date: "2024-06-16",
    url: "https://marieclaire.perfil.com/noticias/cultura/vestida-de-azul-un-la-serie-documental-que-toca-el-tabu-de-transexualidad-en-los-anos-80.phtml",
    cover_url: "https://fotos.perfil.com/2024/06/16/trim/1140/641/vestida-de-azul-1825835.jpg",
    excerpt: "Reseña crítica sobre el vestuario y la relevancia histórica del vestuario como herramienta de visibilidad y resistencia.",
    category: "Cultura & Documental",
  },
  {
    id: 11,
    title: "Dolores Fonzi: El poder de la autenticidad y el cine independiente",
    publication: "Marie Claire Argentina · Tapa",
    publication_date: "2024-04-10",
    url: "https://marieclaire.perfil.com",
    cover_url: "/images/extracted/dolores-fonzi/img-003.webp",
    excerpt: "Styling para la portada de Marie Claire Argentina tras el estreno de Blondi y su recorrido por festivales internacionales.",
    category: "Celebrity Styling",
  },
  {
    id: 12,
    title: "Valentina Ferrer viste Miu Miu en las calles de Nueva York",
    publication: "Marie Claire Argentina · Portada",
    publication_date: "2023-11-15",
    url: "https://marieclaire.perfil.com",
    cover_url: "/images/extracted/valentina-miumiu/img-000.webp",
    excerpt: "Producción de tapa en Manhattan: el choque entre la sastrería clásica y el streetwear contemporáneo.",
    category: "Editorial & Tapa",
  },
];

export async function getPressArticles(): Promise<PressArticle[]> {
  try {
    const { data, error } = await supabase
      .from("press")
      .select("*")
      .eq("active", true)
      .order("publication_date", { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackPressArticles;
    }

    return data.map((item) => ({
      ...item,
      title: cleanHtmlEntities(item.title),
      excerpt: cleanHtmlEntities(item.excerpt || ""),
    }));
  } catch {
    return fallbackPressArticles;
  }
}

function cleanHtmlEntities(text: string): string {
  if (!text) return "";
  return text
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s*[-|–]\s*Marie Claire.*/i, "")
    .trim();
}
