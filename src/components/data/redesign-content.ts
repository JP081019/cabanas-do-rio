import { cabins as existingCabins, contactLinks } from "./site-content";

export type Photo = { src: string; alt: string; caption: string; portrait?: boolean };
export type CabinId = "rio" | "mirante";
export type Cabin = {
  id: CabinId;
  name: string;
  concept: string;
  headline: string;
  description: string;
  amenities: string[];
  photos: Photo[];
  airbnbUrl: string;
  bookingUrl: string;
};
const rio = "/images/cabana-do-rio";
const mirante = "/images/cabana-mirante-do-caeté";
export const riverPhoto: Photo = {
  src: "/images/natureza/rio.avif",
  alt: "Água transparente do rio entre pedras e árvores em Alfredo Wagner",
  caption: "O rio, no seu próprio tempo.",
};
export const cabinCollection: Cabin[] = [
  {
    id: "rio",
    name: "Cabana do Rio",
    concept: "Estar dentro da natureza",
    headline: "Durma entre as árvores. Acorde ao som do rio.",
    description:
      "Madeira, janelas abertas para o verde e o rio logo ali. Um refúgio com a sensação de uma casa na árvore, para trocar a pressa por presença.",
    amenities: ["Acesso ao rio", "Vista para o jardim", "Cozinha", "Wi-Fi", "Roupa de cama"],
    airbnbUrl: existingCabins[0].airbnbUrl,
    bookingUrl: existingCabins[0].bookingUrl,
    photos: [
      {
        src: `${rio}/cabana-do-rio-exterior-01.avif`,
        alt: "Cabana do Rio elevada em madeira e cercada por árvores",
        caption: "Seu lugar entre as árvores.",
        portrait: true,
      },
      {
        src: `${rio}/interior-01.avif`,
        alt: "Sala com rede, sofá azul e janelas para a mata",
        caption: "A mata faz parte da sala.",
      },
      {
        src: `${rio}/cabana-do-rio-banheira-vista-01.avif`,
        alt: "Banho de imersão junto à janela com vista para a floresta",
        caption: "Um banho quente cercado pelo verde.",
        portrait: true,
      },
      {
        src: `${rio}/cabana-do-rio-exterior-natureza-02.avif`,
        alt: "Cabana de madeira integrada à vegetação do terreno",
        caption: "A natureza, por todos os lados.",
      },
      {
        src: `${rio}/interior-02.avif`,
        alt: "Sala envidraçada com lareira e vista para as árvores",
        caption: "Uma pausa junto à janela.",
      },
      {
        src: `${rio}/interior-03.avif`,
        alt: "Interior de madeira com mesa e sofá azul",
        caption: "Madeira e aconchego.",
      },
      {
        src: `${rio}/interior-04.avif`,
        alt: "Poltrona e janelas da cabana abertas para a mata",
        caption: "Um convite a ficar.",
        portrait: true,
      },
      {
        src: `${rio}/interior-05.avif`,
        alt: "Rede e lareira ao lado das janelas da cabana",
        caption: "Sem compromisso com o relógio.",
        portrait: true,
      },
      {
        src: `${rio}/interior-06.avif`,
        alt: "Quarto de madeira com cama preparada e janela",
        caption: "Descanso em cada detalhe.",
      },
      {
        src: `${rio}/interior-07.avif`,
        alt: "Mesa de jantar e cozinha no interior de madeira",
        caption: "O seu próprio ritmo.",
      },
      {
        src: `${rio}/interior-08.avif`,
        alt: "Mesa com taças em frente à lareira acesa",
        caption: "Fique mais um pouco.",
        portrait: true,
      },
      {
        src: `${rio}/churrasqueira.avif`,
        alt: "Área de churrasqueira com mesa de madeira e plantas",
        caption: "Momentos à mesa.",
      },
    ],
  },
  {
    id: "mirante",
    name: "Mirante do Caeté",
    concept: "Contemplar a paisagem",
    headline: "Um refúgio para olhar mais longe.",
    description:
      "A paisagem se abre, o olhar vai longe e o dia ganha outro ritmo. Uma cabana de madeira à beira da água, feita para contemplar o horizonte de Alfredo Wagner.",
    amenities: [
      "Vista para o horizonte",
      "À beira da água",
      "Cozinha",
      "Wi-Fi",
      "Vista para o pátio",
    ],
    airbnbUrl: existingCabins[1].airbnbUrl,
    bookingUrl: existingCabins[1].bookingUrl,
    photos: [
      {
        src: `${mirante}/exterior-02.avif`,
        alt: "Vale, rio e montanhas vistos da varanda do Mirante do Caeté",
        caption: "O horizonte é seu.",
        portrait: true,
      },
      {
        src: `${mirante}/cabana-mirante-do-caeté-exterior.avif`,
        alt: "Mirante do Caeté com varanda elevada e escada de madeira",
        caption: "Um refúgio acima da rotina.",
        portrait: true,
      },
      {
        src: `${mirante}/hidromassagem-interior-01.avif`,
        alt: "Banheira do Mirante junto à janela com vista verde",
        caption: "Contemple. Sem pressa.",
        portrait: true,
      },
      {
        src: `${mirante}/exterior-01.avif`,
        alt: "Pátio do Mirante com bancos de madeira e paisagem do vale",
        caption: "Lá fora, a vida acontece devagar.",
        portrait: true,
      },
      {
        src: `${mirante}/hidromassagem-interior-02.avif`,
        alt: "Banheira branca junto à madeira banhada pelo sol",
        caption: "A luz entra. A pressa sai.",
        portrait: true,
      },
      {
        src: `${mirante}/interior-02.avif`,
        alt: "Quarto do Mirante com cama e paredes de madeira",
        caption: "Aconchego para terminar o dia.",
        portrait: true,
      },
      {
        src: `${mirante}/interior-03.avif`,
        alt: "Cozinha do Mirante com bancada de madeira e geladeira",
        caption: "Prepare o dia do seu jeito.",
        portrait: true,
      },
      {
        src: `${mirante}/interior-04.avif`,
        alt: "Lareira acesa e poltronas no Mirante do Caeté",
        caption: "O calor de estar aqui.",
        portrait: true,
      },
      {
        src: `${mirante}/interior-05.avif`,
        alt: "Sofá azul e portas para a varanda do Mirante",
        caption: "A paisagem sempre por perto.",
        portrait: true,
      },
    ],
  },
];
export const experienceMoments = [
  {
    time: "Manhã",
    title: "O primeiro compromisso pode esperar.",
    text: "Abra a janela. Deixe o verde entrar.",
    photo: cabinCollection[0].photos[1],
  },
  {
    time: "Tarde",
    title: "Aqui, fazer nada também faz parte.",
    text: "Encontre o seu ritmo no caminho da água.",
    photo: riverPhoto,
  },
  {
    time: "Fim de tarde",
    title: "Deixe o tempo passar.",
    text: "Um banho quente. A natureza bem perto.",
    photo: {
      src: "/images/experiencia/cabana-do-rio-banheira-experiencia-01.avif",
      alt: "Pessoa relaxando em banho de imersão diante da mata",
      caption: "Só estar aqui.",
      portrait: true,
    },
  },
  {
    time: "Ao anoitecer",
    title: "Fique mais um pouco.",
    text: "Recolha o dia no aconchego da madeira.",
    photo: cabinCollection[0].photos[10],
  },
];
export const faqItems = [
  {
    question: "Qual cabana combina comigo?",
    answer:
      "A Cabana do Rio é para estar dentro da natureza, cercado pelas árvores e pelo som da água. O Mirante do Caeté convida a contemplar a paisagem e o horizonte. As duas têm cozinha e Wi-Fi.",
    link: "Compare as cabanas",
    href: "#comparar",
  },
  {
    question: "Como faço minha reserva?",
    answer:
      "Escolha a cabana e o período que você tem em mente. Consulte os valores e a disponibilidade no Airbnb ou no Booking, ou converse diretamente conosco pelo WhatsApp. A confirmação da reserva acontece no canal escolhido.",
    link: "Planeje sua estadia",
    href: "#disponibilidade",
  },
  {
    question: "Como chegar às cabanas?",
    answer:
      "Estamos na Rua Anitápolis, S/N, em Caeté, Alfredo Wagner, Santa Catarina. Abra o mapa para traçar a rota a partir do seu ponto de partida.",
    link: "Veja o caminho",
    href: "#localizacao",
  },
  {
    question: "Posso acessar o rio?",
    answer:
      "Os hóspedes da Cabana do Rio têm acesso ao rio. Há trechos rasos e outros mais profundos. Crianças devem estar sempre acompanhadas por um responsável.",
  },
  {
    question: "As cabanas têm cozinha e Wi-Fi?",
    answer:
      "Sim. As duas cabanas têm cozinha e Wi-Fi. Na Cabana do Rio também estão incluídos roupa de cama e utensílios básicos de cozinha.",
  },
  {
    question: "E os horários, pets e outras dúvidas?",
    answer:
      "Consulte as regras e os horários atualizados no anúncio da cabana escolhida ou fale conosco antes de reservar. Vamos ajudar a planejar a sua estadia.",
    link: "Converse pelo WhatsApp",
    href: contactLinks.whatsapp,
  },
];
export function whatsappMessage(message: string) {
  return `${contactLinks.whatsapp}?text=${encodeURIComponent(message)}`;
}
