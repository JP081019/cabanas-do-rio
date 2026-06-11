"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

const mapUrl =
  "https://www.google.com/maps?q=Alfredo%20Wagner%20SC&output=embed";

export function LocationSection() {
  return (
    <section id="localizacao" className="bg-[#e5ded0] py-24 md:py-36">
      <div className="mx-auto w-[min(100%-32px,1400px)]">
        <div className="grid overflow-hidden rounded-[2rem] bg-[#18352d] text-[#f4f0e8] lg:grid-cols-[0.72fr_1.28fr]">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75 }}
            className="flex flex-col justify-between p-8 sm:p-12 lg:p-16"
          >
            <div>
              <p className="flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#d7c7a6]">
                <span className="h-px w-8 bg-[#d7c7a6]" />
                Onde estamos
              </p>

              <h2 className="font-title mt-8 text-[clamp(3.4rem,6vw,6rem)] font-medium leading-[0.88] tracking-[-0.05em]">
                Perto da natureza.{" "}
                <span className="italic text-[#d7c7a6]">
                  Longe da pressa.
                </span>
              </h2>

              <p className="mt-8 max-w-md text-sm leading-7 text-white/60">
                Localização privilegiada em meio às montanhas e à natureza da
                Serra Catarinense.
              </p>
            </div>

            <div className="mt-16 border-t border-white/15 pt-8">
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/20">
                  <MapPin size={18} strokeWidth={1.5} />
                </span>

                <div>
                  <span className="block text-[0.58rem] uppercase tracking-[0.18em] text-white/40">
                    Destino
                  </span>

                  <strong className="font-title mt-2 block text-2xl font-medium">
                    Alfredo Wagner – SC
                  </strong>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Alfredo+Wagner+SC"
                target="_blank"
                rel="noreferrer"
                className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-full border border-white/25 px-6 text-[0.62rem] font-semibold uppercase tracking-[0.15em] transition-colors hover:bg-[#f4f0e8] hover:text-[#18352d]"
              >
                Abrir no Google Maps

                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="relative min-h-[480px] overflow-hidden bg-[#d7c7a6] lg:min-h-[720px]"
          >
            <iframe
              src={mapUrl}
              title="Mapa de Alfredo Wagner, Santa Catarina"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 grayscale-[35%] contrast-[0.9] saturate-[0.7]"
              allowFullScreen
            />

            <div className="pointer-events-none absolute inset-0 bg-[#18352d]/5 mix-blend-multiply" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}