import Image from "next/image";
import { ArrowUpRight, CalendarCheck, Home, Star } from "lucide-react";
import { cabins } from "@/src/components/data/site-content";

const bookingCards = [
  {
    rating: "4,91",
    reviews: "90 avaliações",
    host: "Marilene",
  },
  {
    rating: "5,0",
    reviews: "103 avaliações",
    host: "Marilene",
  },
];

export function BookingHighlightSection() {
  return (
    <section className="relative min-h-[720px] overflow-hidden bg-[#14140f] text-[#f7f3ea]">
      <Image
        src="/images/img4.jpeg"
        alt="Experiência nas Cabanas do Rio"
        fill
        sizes="100vw"
        className="object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,20,15,0.92)_0%,rgba(20,20,15,0.54)_44%,rgba(20,20,15,0.86)_100%)]" />

      <div className="relative z-10 mx-auto grid min-h-[720px] max-w-[1280px] gap-12 px-6 py-24 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:px-12">
        <div className="max-w-xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.38em] text-white/52">
            Última parada
          </p>
          <h2 className="font-serif text-[clamp(3.2rem,7vw,6.8rem)] font-normal leading-[0.9]">
            Agora só falta escolher a cabana ideal
            <span className="block italic text-white/82">e viver essa experiência.</span>
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {cabins.map((cabana, index) => (
            <article
              key={cabana.name}
              className="group overflow-hidden rounded-xl bg-[#f4efe4] text-[#20251d] shadow-[0_28px_80px_rgba(0,0,0,0.34)] ring-1 ring-white/35 transition hover:-translate-y-1"
            >
              <div className="relative h-36 overflow-hidden">
                <Image
                  src={cabana.image}
                  alt={cabana.name}
                  fill
                  sizes="(min-width: 1024px) 260px, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#20251d]/70 to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-2 rounded-full bg-[#fffaf0]/92 px-3 py-1.5 text-xs font-bold text-[#20251d]">
                  <Star size={14} fill="currentColor" strokeWidth={1.6} className="text-[#315f4d]" />
                  {bookingCards[index].rating}
                </div>
              </div>

              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-[#777064]">
                  {bookingCards[index].reviews} · Alfredo Wagner
                </p>
                <h3 className="mt-4 font-serif text-[1.75rem] leading-tight">{cabana.name}</h3>
                <p className="mt-2 text-sm text-[#6b6f64]">Anfitriã: {bookingCards[index].host}</p>

                <div className="my-6 h-px bg-[#20251d]/12" />

                <div className="grid gap-3">
                  <a
                    href={cabana.bookingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-12 items-center justify-between gap-3 rounded-full bg-[#315f4d] px-5 text-xs font-bold uppercase tracking-[0.08em] !text-white transition hover:bg-[#254a3c]"
                  >
                    <span className="inline-flex items-center gap-2">
                      <CalendarCheck size={16} strokeWidth={1.5} />
                      Ver no Booking
                    </span>
                    <ArrowUpRight size={16} strokeWidth={1.5} />
                  </a>
                  <a
                    href={cabana.airbnbUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-12 items-center justify-between gap-3 rounded-full bg-[#a77740] px-5 text-xs font-bold uppercase tracking-[0.08em] !text-white transition hover:bg-[#8f6436]"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Home size={16} strokeWidth={1.5} />
                      Ver no Airbnb
                    </span>
                    <ArrowUpRight size={16} strokeWidth={1.5} />
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
