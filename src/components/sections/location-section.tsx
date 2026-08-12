import Image from "next/image";
import { MapPinned, Navigation, Route } from "lucide-react";
import { contactLinks } from "@/src/components/data/site-content";

export function LocationSection() {
  return (
    <section id="localizacao" className="bg-[#f8faf3]">
      <div className="section-shell grid gap-10 lg:grid-cols-[1fr_430px] lg:items-center">
        <div>
          <p className="section-kicker">Localização</p>
          <h2 className="section-title">Perto o suficiente para chegar, longe o bastante para respirar.</h2>
          <p className="section-copy mt-6 max-w-2xl">
            Estamos em Caeté, Alfredo Wagner, Santa Catarina. Abra a rota no Google Maps e venha pelo caminho mais tranquilo.
          </p>
        </div>

        <aside className="relative justify-self-end overflow-hidden rounded-lg bg-[#202a1f] text-white shadow-[0_28px_70px_rgba(29,42,36,0.24)]">
          <div className="relative h-48">
            <Image src="/images/img4.jpeg" alt="Paisagem da região das Cabanas do Rio" fill sizes="430px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#202a1f] to-transparent" />
          </div>

          <div className="p-6">
            <div className="flex items-start gap-4">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#eef4ea] text-[#202a1f]">
                <MapPinned size={32} strokeWidth={1.4} />
              </span>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-white/58">Como chegar</p>
                <h3 className="mt-2 font-serif text-3xl leading-none">Cabanas do Rio</h3>
                <p className="mt-4 leading-7 text-white/74">
                  R. Anitápolis, S/N, Caeté, Alfredo Wagner - SC
                </p>
              </div>
            </div>

            <a
              href={contactLinks.maps}
              target="_blank"
              rel="noreferrer"
              className="mt-7 flex min-h-16 items-center justify-between rounded-md bg-[#eef4ea] px-5 font-serif text-xl !text-[#202a1f] transition hover:!bg-white hover:!text-[#202a1f]"
            >
              <span className="inline-flex items-center gap-3">
                <Route size={25} strokeWidth={1.35} />
                Abrir rota
              </span>
              <Navigation size={22} strokeWidth={1.5} />
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
