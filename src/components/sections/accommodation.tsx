"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check, Users } from "lucide-react";
import Image from "next/image";

import { accommodations } from "../data/accommodations";

export function AccommodationsSection() {
  return (
    <section id="cabanas" className="bg-[#f4f0e8] py-24 md:py-36">
      <div className="mx-auto w-[min(100%-32px,1240px)]">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#667763]">
              <span className="h-px w-8 bg-[#667763]" />
              Escolha o seu refúgio
            </p>

            <h2 className="font-title mt-7 max-w-3xl text-[clamp(3.2rem,6vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.05em]">
              Acomodações para viver{" "}
              <span className="italic text-[#667763]">dias inesquecíveis.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-[#18352d]/55">
            Espaços pensados para oferecer privacidade, conforto e uma conexão
            genuína com a natureza.
          </p>
        </div>

        <div className="mt-16 grid gap-7 lg:grid-cols-2">
          {accommodations.map((accommodation, index) => (
            <motion.article
              key={accommodation.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: index * 0.12 }}
              className="group overflow-hidden rounded-[2rem] border border-[#18352d]/10 bg-[#ebe5d9]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={accommodation.image}
                  alt={accommodation.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                <span className="absolute left-6 top-6 rounded-full border border-white/30 bg-black/15 px-4 py-2 text-[0.58rem] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-md">
                  Acomodação 0{index + 1}
                </span>
              </div>

              <div className="p-7 sm:p-9">
                <div className="flex flex-col gap-5 border-b border-[#18352d]/15 pb-7 sm:flex-row sm:items-end sm:justify-between">
                  <h3 className="font-title text-4xl font-medium leading-none sm:text-5xl">
                    {accommodation.name}
                  </h3>

                  <div className="flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.13em] text-[#18352d]/55">
                    <Users size={15} strokeWidth={1.5} />
                    {accommodation.capacity}
                  </div>
                </div>

                <ul className="mt-7 space-y-4">
                  {accommodation.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-[#18352d]/65"
                    >
                      <span className="flex size-5 items-center justify-center rounded-full bg-[#18352d] text-[#f4f0e8]">
                        <Check size={11} strokeWidth={2} />
                      </span>

                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={accommodation.bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group/button mt-9 flex min-h-14 w-full items-center justify-between rounded-full bg-[#18352d] px-6 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#f4f0e8] transition-transform duration-300 hover:-translate-y-1"
                >
                  Reservar esta acomodação

                  <ArrowUpRight
                    size={17}
                    className="transition-transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
                  />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}