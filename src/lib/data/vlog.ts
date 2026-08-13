export interface VlogItem {
  id: string;
  youtubeId: string;
  category: string;
  title: string;
  thumbnail: string;
  duration?: string;
}

export const defaultVlogItems: VlogItem[] = [
  {
    id: "1",
    youtubeId: "7lB4UjBaTyQ",
    category: "Vlog Oficial · Episodio 01",
    title: "Styling Gime Accardi — Martín Fierro de Teatro 2025",
    thumbnail: "https://i.ytimg.com/vi/7lB4UjBaTyQ/hqdefault.jpg",
  },
  {
    id: "2",
    youtubeId: "kZi7vIXiWPM",
    category: "Paris Fashion Week",
    title: "CHANEL StreetStyle & Best Outfits — Paris Fashion Week",
    thumbnail: "https://i.ytimg.com/vi/kZi7vIXiWPM/hqdefault.jpg",
  },
  {
    id: "3",
    youtubeId: "rlonZK0tUVE",
    category: "Masterclass",
    title: "Masterclass de Tendencias en Marketing & Comunicación de Moda",
    thumbnail: "https://i.ytimg.com/vi/rlonZK0tUVE/hqdefault.jpg",
  },
  {
    id: "4",
    youtubeId: "Bq9Sk8tE5z0",
    category: "Keynote",
    title: "Masterclass Lujo & Legado: El impacto global de París",
    thumbnail: "https://i.ytimg.com/vi/Bq9Sk8tE5z0/hqdefault.jpg",
  },
];
