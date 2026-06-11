"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  House,
  Star,
  Trees,
} from "lucide-react";

import { Logo } from "../ui/logo";

const indicators = [
  {
    icon: House,
    label: "Hospedagem Premium",
  },
  {
    icon: Trees,
    label: "Em meio à natureza",
  },
  {
    icon: Star,
    label: "Avaliações excelentes",
  },
];

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="min-h-screen bg-[#f4f0e8] px-4 py-4 sm:px-6 sm:py-6"
    >
      <div className="mx-auto grid min-h-[calc(100vh-32px)] max-w-[1500px] overflow-hidden rounded-[2rem] border border-[#18352d]/10 bg-[#ebe5d9] lg:grid-cols-[0.92fr_1.08fr]">
        <div className="flex min-h-[720px] flex-col px-6 py-7 sm:px-10 lg:min-h-0 lg:px-14 xl:px-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Logo />
          </motion.div>

          <div className="my-auto py-20">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[#18352d]/60"
            >
              <span className="h-px w-8 bg-[#18352d]/40" />
              Alfredo Wagner, Santa Catarina
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="font-title mt-7 max-w-3xl text-[clamp(3.3rem,6vw,6.8rem)] font-medium leading-[0.88] tracking-[-0.055em]"
            >
              Viva momentos inesquecíveis em meio à{" "}
              <span className="italic text-[#667763]">natureza.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38 }}
              className="mt-8 max-w-xl text-sm leading-7 text-[#18352d]/65 sm:text-base"
            >
              Cabanas confortáveis e aconchegantes para quem busca
              tranquilidade, descanso e experiências únicas em Alfredo Wagner
              – SC.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.48 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="https://linktr.ee/cabanasdorio"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#18352d] px-7 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#f4f0e8] transition-transform duration-300 hover:-translate-y-1"
              >
                Reservar agora

                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              <a
                href="#cabanas"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#18352d]/25 px-7 text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 hover:bg-[#18352d] hover:text-[#f4f0e8]"
              >
                Conhecer as cabanas
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="grid gap-4 border-t border-[#18352d]/15 pt-6 sm:grid-cols-3"
          >
            {indicators.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon size={17} strokeWidth={1.5} />

                <span className="text-[0.64rem] font-semibold uppercase leading-4 tracking-[0.11em] text-[#18352d]/65">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative min-h-[72vh] overflow-hidden bg-[#405148] lg:min-h-full"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Paisagem das Cabanas do Rio"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/25 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

          <div className="absolute left-8 top-8 rounded-full border border-white/25 bg-black/15 px-4 py-2 text-[0.58rem] font-medium uppercase tracking-[0.18em] text-white/85 backdrop-blur-md sm:left-10 sm:top-10">
            Seu refúgio na serra
          </div>

          <div className="absolute inset-x-8 bottom-8 flex items-end justify-between gap-5 text-white sm:inset-x-10 sm:bottom-10">
            <p className="font-title max-w-xs text-2xl leading-tight sm:text-3xl">
              Onde o tempo encontra outro ritmo.
            </p>

            <a
              href="#experiencia"
              aria-label="Conhecer a experiência"
              className="flex size-14 shrink-0 items-center justify-center rounded-full border border-white/35 bg-white/10 backdrop-blur-md transition-colors hover:bg-white hover:text-[#18352d]"
            >
              <ArrowDown size={19} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}