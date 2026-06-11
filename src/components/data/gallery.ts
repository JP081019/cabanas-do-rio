export type GalleryItem = {
  image: string;
  title: string;
  description: string;
  height: "short" | "medium" | "tall";
};

export const galleryItems: GalleryItem[] = [
  {
    image: "/images/gallery-01.jpg",
    title: "Cabana Principal",
    description: "Vista privilegiada para as montanhas.",
    height: "tall",
  },
  {
    image: "/images/gallery-02.jpg",
    title: "Horizonte da Serra",
    description: "Paisagens que convidam a respirar com calma.",
    height: "medium",
  },
  {
    image: "/images/gallery-03.jpg",
    title: "Aconchego em cada detalhe",
    description: "Interiores pensados para acolher.",
    height: "short",
  },
  {
    image: "/images/gallery-04.jpg",
    title: "Um tempo só seu",
    description: "Hidromassagem, silêncio e natureza.",
    height: "tall",
  },
  {
    image: "/images/gallery-05.jpg",
    title: "Manhãs sem pressa",
    description: "Sabores preparados para começar bem o dia.",
    height: "medium",
  },
  {
    image: "/images/gallery-06.jpg",
    title: "Pôr do sol",
    description: "O céu da serra em sua melhor versão.",
    height: "short",
  },
  {
    image: "/images/gallery-07.jpg",
    title: "Detalhes que acolhem",
    description: "Charme e conforto em todos os espaços.",
    height: "tall",
  },
  {
    image: "/images/gallery-08.jpg",
    title: "Natureza ao redor",
    description: "Um refúgio cercado pelo verde.",
    height: "medium",
  },
];