import { ArrowUpRight, MapPin, MessageCircle } from "lucide-react";

import { Logo } from "../ui/logo";

export function FooterSection() {
  return (
    <footer className="bg-[#18352d] text-[#f4f0e8]">
      <div className="mx-auto w-[min(100%-32px,1400px)] py-16 md:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <Logo light />

            <p className="mt-7 max-w-sm text-sm leading-7 text-white/55">
              Tranquilidade, aconchego e experiências inesquecíveis em meio à
              natureza da Serra Catarinense.
            </p>
          </div>

          <div>
            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-[#d7c7a6]">
              Localização
            </p>

            <div className="mt-6 flex items-start gap-3 text-sm text-white/65">
              <MapPin size={17} strokeWidth={1.5} />

              <span>Alfredo Wagner – SC</span>
            </div>
          </div>

          <div>
            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-[#d7c7a6]">
              Reservas
            </p>

            <div className="mt-6 flex flex-col gap-4">
              <a
                href="https://wa.me/5548996480494"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 text-sm text-white/65 transition-colors hover:text-white"
              >
                <span>+55 48 9 9648-0494</span>
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>

              <a
                href="https://linktr.ee/cabanasdorio"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 text-sm text-white/65 transition-colors hover:text-white"
              >
                <span>linktr.ee/cabanasdorio</span>
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <p className="text-[0.58rem] uppercase tracking-[0.16em] text-white/35">
              © 2026 Cabanas do Rio. Todos os direitos reservados.
            </p>

            <div className="flex flex-col gap-4 border-l border-[#d7c7a6]/30 pl-5">
              <p className="text-xs leading-5 text-white/50">
                Site desenvolvido por{" "}
                <strong className="font-medium text-white/85">
                  João Pedro da Silva
                </strong>
              </p>

              <a
                href="https://wa.me/5548996656319?text=Olá%20João%2C%20vi%20o%20site%20das%20Cabanas%20do%20Rio%20e%20gostaria%20de%20conversar%20sobre%20um%20site."
                target="_blank"
                rel="noreferrer"
                className="group inline-flex w-fit items-center gap-3 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-[#d7c7a6] transition-colors hover:text-white"
              >
                <MessageCircle size={15} strokeWidth={1.5} />
                Precisa de um site? Vamos conversar
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}