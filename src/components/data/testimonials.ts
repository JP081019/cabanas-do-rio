export type Testimonial = {
  name: string;
  location: string;
  image: string;
  quote: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "Mariana Silva",
    location: "Florianópolis, SC",
    image: "/images/guest-01.png",
    quote:
      "Um lugar maravilhoso para descansar e esquecer da rotina. A cabana é extremamente aconchegante e a vista é ainda mais bonita pessoalmente.",
    rating: 5,
  },
  {
    name: "Lucas e Ana",
    location: "Curitiba, PR",
    image: "/images/guest-02.png",
    quote:
      "Foram dias inesquecíveis em meio à natureza. Tudo estava impecável e cada detalhe tornou nossa experiência ainda mais especial.",
    rating: 5,
  },
  {
    name: "Camila Rocha",
    location: "Joinville, SC",
    image: "/images/guest-03.png",
    quote:
      "A tranquilidade que encontramos aqui era exatamente o que precisávamos. Já saímos pensando em quando vamos voltar.",
    rating: 5,
  },
];