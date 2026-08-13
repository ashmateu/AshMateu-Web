export interface HighlightItem {
  id: string;
  number: string;
  text: string;
  featured?: boolean;
}

export const highlightsData: HighlightItem[] = [
  {
    id: "1",
    number: "19 Años",
    text: "La edad en la que empecé a dirigir producciones editoriales en Editorial Perfil.",
  },
  {
    id: "2",
    number: "Sept 2010",
    text: "La primera vez que viajo a cubrir el New York Fashion Week.",
  },
  {
    id: "3",
    number: "+150k",
    text: "Comunidad de Insiders en Inside Studios. En 2025 vendí el 100% de la plataforma.",
  },
  {
    id: "4",
    number: "The Rolling Stones",
    text: "La colaboración que cambió la escala de los mails que me llegaban (vía Chandon).",
  },
  {
    id: "5",
    number: "4 Portadas",
    text: "Simultáneas en puestos de revistas (+150 portadas publicadas en más de 20 años de carrera).",
  },
  {
    id: "6",
    number: "Red Carpets",
    text: "Styling para Griselda Siciliani, Dolores Fonzi, Violeta Urtizberea, Delfi Chaves, Gimena Accardi o Valentina Zenere.",
  },
  {
    id: "7",
    number: "Global",
    text: "Nueva York · París · Londres · Dubái · Buenos Aires. Ciudades donde viví, trabajé o estudié.",
  },
  {
    id: "8",
    number: "Saint Martins + Marangoni",
    text: "Volví a estudiar después de años de profesión porque el mundo cambió tanto que sentí empezar de cero.",
  },
  {
    id: "9",
    number: "2 Martín Fierro",
    text: "Dos nominaciones a los Martín Fierro de la Moda en 2019 (Mejor Influencer & Mejor Tapa).",
  },
  {
    id: "10",
    number: "Talento & Orgullo UP",
    text: "Reconocimiento otorgado por la Universidad de Palermo en 2022 por trayectoria profesional.",
  },
  {
    id: "11",
    number: "20 Años de Carrera",
    text: "Moda, comunicación, estrategia, empresas, educación, tendencias, portadas, aviones, noches sin dormir pero bolsos nuevos, Excel y bastantes cambios de opinión.",
    featured: true,
  },
];
