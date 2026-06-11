export type Accommodation = {
  name: string;
  image: string;
  capacity: string;
  features: string[];
  bookingUrl: string;
};

export const accommodations: Accommodation[] = [
  {
    name: "Cabana do Rio",
    image: "/images/accommodation-01.jpg",
    capacity: "Até 2 hóspedes",
    features: [
      "Vista para as montanhas",
      "Hidromassagem privativa",
      "Cozinha equipada",
    ],
    bookingUrl: "https://linktr.ee/cabanasdorio",
  },
  {
    name: "Pousada da Serra",
    image: "/images/accommodation-02.jpg",
    capacity: "Até 4 hóspedes",
    features: [
      "Ambiente amplo e aconchegante",
      "Contato direto com a natureza",
      "Café da manhã incluso",
    ],
    bookingUrl: "https://linktr.ee/cabanasdorio",
  },
];