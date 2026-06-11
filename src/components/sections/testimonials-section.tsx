"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Image from "next/image";

import { testimonials } from "../data/testimonials";

export function TestimonialsSection() {
  return (
    <section className="bg-[#f4f0e8] py-24 md:py-36">
      <div className="mx-auto w-[min(100%-32px,1240px)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75 }}
          className="text-center"
        >
          <p className="flex items-center justify-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#667763]">
            <span className="h-px w-8 bg-[#667763]" />
            Experiências de quem já viveu
            <span className="h-px w-8 bg-[#667763]" />
          </p>

          <h2 className="font-title mx-auto mt-7 max-w-4xl text-[clamp(3.2rem,6vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.05em]">
            Histórias que ficam na{" "}
            <span className="italic text-[#667763]">memória.</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.figure
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
              }}
              className="flex min-h-[390px] flex-col rounded-[2rem] border border-[#18352d]/10 bg-white/50 p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-9"
            >
              <div className="flex items-start justify-between">
                <div
                  className="flex gap-1"
                  aria-label={`${testimonial.rating} de 5 estrelas`}
                >
                  {Array.from({ length: testimonial.rating }).map(
                    (_, starIndex) => (
                      <Star
                        key={starIndex}
                        size={14}
                        fill="#18352d"
                        strokeWidth={1.4}
                      />
                    ),
                  )}
                </div>

                <Quote
                  size={30}
                  strokeWidth={1}
                  className="text-[#18352d]/20"
                />
              </div>

              <blockquote className="font-title mt-10 flex-1 text-2xl leading-[1.35] text-[#18352d]/85">
                “{testimonial.quote}”
              </blockquote>

              <figcaption className="mt-10 flex items-center gap-4 border-t border-[#18352d]/10 pt-6">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-[#d7c7a6]">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>

                <div>
                  <strong className="block text-xs font-semibold uppercase tracking-[0.1em]">
                    {testimonial.name}
                  </strong>

                  <span className="mt-1 block text-[0.6rem] uppercase tracking-[0.12em] text-[#18352d]/45">
                    {testimonial.location}
                  </span>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}