"use client";

import { motion } from "framer-motion";
import {
  Car,
  Coffee,
  Flame,
  Flower2,
  Waves,
  Wifi,
} from "lucide-react";

const amenities = [
  {
    icon: Flower2,
    title: "Natureza",
    description: "Um refúgio cercado pelas paisagens da Serra Catarinense.",
  },
  {
    icon: Flame,
    title: "Área de convivência",
    description: "Espaços acolhedores para compartilhar bons momentos.",
  },
  {
    icon: Waves,
    title: "Hidromassagem",
    description: "Relaxamento e privacidade para desacelerar por completo.",
  },
  {
    icon: Wifi,
    title: "Wi-Fi",
    description: "Conectividade disponível durante toda a hospedagem.",
  },
  {
    icon: Coffee,
    title: "Café da manhã",
    description: "Sabores especiais para começar o dia sem pressa.",
  },
  {
    icon: Car,
    title: "Estacionamento",
    description: "Comodidade e segurança para você aproveitar cada instante.",
  },
];

export function AmenitiesSection() {
  return (
    <section className="overflow-hidden bg-[#e5ded0] py-24 md:py-36">
      <div className="mx-auto w-[min(100%-32px,1240px)]">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75 }}
          >
            <p className="flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#667763]">
              <span className="h-px w-8 bg-[#667763]" />
              O que você encontra aqui
            </p>

            <h2 className="font-title mt-7 max-w-lg text-[clamp(3.2rem,5.5vw,5.8rem)] font-medium leading-[0.9] tracking-[-0.05em]">
              Tudo para uma estadia{" "}
              <span className="italic text-[#667763]">
                leve e inesquecível.
              </span>
            </h2>

            <p className="mt-8 max-w-sm text-sm leading-7 text-[#18352d]/55">
              Cada detalhe foi pensado para que você precise se preocupar
              apenas em aproveitar.
            </p>
          </motion.div>

          <div className="grid gap-px overflow-hidden rounded-[2rem] bg-[#18352d]/15 sm:grid-cols-2">
            {amenities.map(({ icon: Icon, title, description }, index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.65,
                  delay: (index % 2) * 0.1,
                }}
                className="group bg-[#f4f0e8] p-7 transition-colors duration-300 hover:bg-[#18352d] sm:p-9"
              >
                <div className="flex items-start justify-between gap-5">
                  <span className="flex size-12 items-center justify-center rounded-full border border-[#18352d]/15 transition-colors group-hover:border-white/25 group-hover:text-[#f4f0e8]">
                    <Icon size={21} strokeWidth={1.4} />
                  </span>

                  <span className="text-[0.58rem] tracking-[0.16em] text-[#18352d]/35 group-hover:text-white/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="font-title mt-12 text-3xl font-medium transition-colors group-hover:text-[#f4f0e8]">
                  {title}
                </h3>

                <p className="mt-3 max-w-xs text-xs leading-6 text-[#18352d]/55 transition-colors group-hover:text-white/55">
                  {description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}