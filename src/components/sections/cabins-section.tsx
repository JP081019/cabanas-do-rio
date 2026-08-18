import Image from "next/image";
import { Bath, CalendarCheck, Home, Leaf, MapPin, Sparkles, Star, Users } from "lucide-react";
import { cabins } from "@/src/components/data/site-content";

const cabinDetails = [
  {
    eyebrow: "Vista acolhedora do Rio Caeté",
    description:
      "Um refúgio íntimo em meio à natureza, com varanda privativa, clima acolhedor e o som do rio acompanhando os dias de descanso.",
    stay: "2 hóspedes · 1 quarto · 1 cama · 1 banheiro",
    location: "Alfredo Wagner, Santa Catarina",
    rating: "4,91 · 90 avaliações",
    tags: ["Rio ao lado", "Lareira", "Cozinha equipada", "Vista do vale"],
    image: "/images/cabana-do-rio.jpeg",
  },
  {
    eyebrow: "Vista deslumbrante do Rio Caeté",
    description:
      "Uma cabana elevada para contemplar a mata, relaxar na hidromassagem privativa e viver uma estadia reservada em plena natureza.",
    stay: "2 hóspedes · 1 quarto · 1 cama · 1 banheiro",
    location: "Alfredo Wagner, Santa Catarina",
    rating: "5,0 · 103 avaliações",
    tags: ["Hidromassagem", "Banho relaxante", "Vista da mata", "Privacidade"],
    image: "/images/cabana-mirante-do-caete.jpeg",
  },
];

export function CabinsSection() {
  return (
    <section id="cabanas" className="bg-[#eef4ea] text-[#20251d]">
      <div className="mx-auto grid max-w-[1500px] gap-8 px-7 pb-20 pt-14 sm:px-10 lg:grid-cols-[500px_1fr] lg:px-20 lg:pt-0">
        <div className="flex flex-col items-center justify-center py-10 text-center lg:min-h-[260px] lg:items-start lg:pt-28 lg:text-left">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.38em] text-[#6d7565]">
            Escolha sua experiência
          </p>
          <h2 className="font-serif text-[clamp(3rem,4vw,4.2rem)] font-normal leading-none">
            Nossas cabanas
          </h2>
          <p className="mt-6 max-w-sm text-base leading-7 text-[#6d7565]">
            Duas estadias reservadas em Alfredo Wagner, com conforto, natureza e tempo de verdade.
          </p>
          <div className="mt-7 flex items-center gap-4 text-[#87907d]">
            <span className="h-px w-12 bg-[#87907d]" />
            <Leaf size={22} strokeWidth={1.2} />
            <span className="h-px w-12 bg-[#87907d]" />
          </div>
        </div>

        <div className="grid gap-6 lg:-mt-10 lg:grid-cols-2">
          {cabins.map((cabana, index) => (
            <article
              key={cabana.name}
              className="overflow-hidden rounded-md bg-[#f8faf3] shadow-[0_18px_45px_rgba(25,32,23,0.18)]"
            >
              <div className="relative h-[265px] sm:h-[320px] lg:h-[300px]">
                <Image
                  src={cabinDetails[index].image}
                  alt={cabana.name}
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-[#fffaf0]/94 px-3 py-2 text-xs font-bold text-[#20251d] shadow-[0_10px_24px_rgba(0,0,0,0.16)]">
                  <Star size={15} fill="currentColor" strokeWidth={1.8} />
                  {cabinDetails[index].rating}
                </div>
              </div>

              <div className="flex min-h-[360px] flex-col px-5 py-6 sm:px-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-serif text-sm italic text-[#8a6c43]">
                      {cabinDetails[index].eyebrow}
                    </p>
                    <h3 className="mt-2 font-serif text-[1.75rem] leading-none">
                      {cabana.name}
                    </h3>
                  </div>
                  <Leaf size={22} strokeWidth={1.1} className="mt-2 shrink-0 text-[#7d8775]" />
                </div>

                <p className="mt-4 text-sm leading-6 text-[#596254]">
                  {cabinDetails[index].description}
                </p>

                <div className="mt-5 space-y-2 border-y border-[#20251d]/10 py-4 text-xs text-[#596254]">
                  <p className="flex items-center gap-2">
                    <Users size={15} strokeWidth={1.5} className="text-[#315f4d]" />
                    {cabinDetails[index].stay}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={15} strokeWidth={1.5} className="text-[#315f4d]" />
                    {cabinDetails[index].location}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {cabinDetails[index].tags.map((tag, tagIndex) => {
                    const Icon = tagIndex === 1 ? Bath : Sparkles;
                    return (
                      <span key={tag} className="cabin-tag">
                        <Icon size={13} strokeWidth={1.6} />
                        {tag}
                      </span>
                    );
                  })}
                </div>

                <div className="mt-auto grid gap-2 pt-5 sm:grid-cols-2">
                  <a
                    href={cabana.bookingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#263023] px-4 text-xs font-semibold uppercase !text-white transition hover:-translate-y-0.5 hover:bg-[#3a4834]"
                  >
                    <CalendarCheck size={16} strokeWidth={1.5} />
                    Ver no Booking
                  </a>
                  <a
                    href={cabana.airbnbUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#9b703d] px-4 text-xs font-semibold uppercase !text-white transition hover:-translate-y-0.5 hover:bg-[#ae7e47]"
                  >
                    <Home size={16} strokeWidth={1.5} />
                    Airbnb
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
