"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function ExperienceSection() {
  return (
    <section
      id="experiencia"
      className="overflow-hidden bg-[#f4f0e8] py-24 md:py-36"
    >
      <div className="mx-auto grid w-[min(100%-32px,1240px)] items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2px_2px_80px_2px] bg-[#d7c7a6] sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="/images/experience.jpg"
              alt="Experiência em meio à natureza nas Cabanas do Rio"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/10" />
          </div>

          <div className="absolute -bottom-6 right-5 max-w-52 rounded-[1.5rem] bg-[#18352d] px-6 py-5 text-[#f4f0e8] sm:right-8">
            <span className="font-title block text-4xl italic">Respire.</span>

            <span className="mt-1 block text-[0.58rem] uppercase leading-4 tracking-[0.18em] text-white/60">
              Você chegou ao seu refúgio
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.12 }}
          className="pt-8 lg:pt-0"
        >
          <p className="flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#667763]">
            <span className="h-px w-8 bg-[#667763]" />
            Uma experiência para desacelerar
          </p>

          <h2 className="font-title mt-7 max-w-xl text-[clamp(3rem,5.5vw,5.8rem)] font-medium leading-[0.92] tracking-[-0.045em]">
            Desconecte da rotina.{" "}
            <span className="italic text-[#667763]">
              Reconecte-se com o que importa.
            </span>
          </h2>

          <p className="mt-8 max-w-lg text-base leading-8 text-[#18352d]/60">
            Mais do que uma hospedagem, oferecemos um refúgio cercado pela
            natureza para criar memórias inesquecíveis.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-[#18352d]/15 pt-8">
            <div>
              <strong className="font-title block text-4xl font-medium">
                100%
              </strong>

              <span className="mt-2 block text-[0.6rem] uppercase tracking-[0.16em] text-[#18352d]/50">
                Conexão com a natureza
              </span>
            </div>

            <div>
              <strong className="font-title block text-4xl font-medium">
                Todo dia
              </strong>

              <span className="mt-2 block text-[0.6rem] uppercase tracking-[0.16em] text-[#18352d]/50">
                Um novo momento para viver
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}