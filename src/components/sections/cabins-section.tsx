import Image from "next/image";
import { Leaf } from "lucide-react";
import { cabins } from "@/src/components/data/site-content";

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
              <div className="relative h-[245px] sm:h-[285px] lg:h-[225px]">
                <Image
                  src={index === 0 ? "/images/cabana-mirante-do-caete.jpeg" : "/images/img6.jpeg"}
                  alt={cabana.name}
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex min-h-[70px] items-center justify-center gap-3 px-5 py-4">
                <h3 className="font-serif text-[1.45rem] leading-none">{cabana.name}</h3>
                <Leaf size={19} strokeWidth={1.1} className="text-[#7d8775]" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
