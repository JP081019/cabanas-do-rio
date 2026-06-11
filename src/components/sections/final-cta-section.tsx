"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Leaf } from "lucide-react";

export function FinalCtaSection() {
  return (
    <section className="overflow-hidden bg-[#f4f0e8] px-4 py-4 sm:px-6 sm:py-6">
      <div className="relative mx-auto flex min-h-[72vh] max-w-[1500px] items-center justify-center overflow-hidden rounded-[2rem] bg-[#667763] px-6 py-24 text-center text-[#f4f0e8]">
        <div className="absolute -left-24 -top-24 size-96 rounded-full border border-white/10" />
        <div className="absolute -left-10 -top-10 size-64 rounded-full border border-white/10" />
        <div className="absolute -bottom-36 -right-20 size-[30rem] rounded-full border border-white/10" />
        <div className="absolute -bottom-20 -right-10 size-80 rounded-full border border-white/10" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex max-w-5xl flex-col items-center"
        >
          <span className="flex size-14 items-center justify-center rounded-full border border-white/20 bg-white/5">
            <Leaf size={22} strokeWidth={1.3} />
          </span>

          <p className="mt-8 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-white/60">
            Sua próxima memória começa aqui
          </p>

          <h2 className="font-title mt-7 text-[clamp(3.8rem,8vw,8.5rem)] font-medium leading-[0.84] tracking-[-0.055em]">
            Venha viver essa{" "}
            <span className="italic text-[#d7c7a6]">experiência.</span>
          </h2>

          <p className="mt-8 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
            Reserve agora sua hospedagem e descubra tudo o que a natureza tem
            para oferecer.
          </p>

          <a
            href="https://linktr.ee/cabanasdorio"
            target="_blank"
            rel="noreferrer"
            className="group mt-10 inline-flex min-h-14 items-center gap-4 rounded-full bg-[#f4f0e8] px-8 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#18352d] transition-transform duration-300 hover:-translate-y-1"
          >
            Reservar agora

            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}