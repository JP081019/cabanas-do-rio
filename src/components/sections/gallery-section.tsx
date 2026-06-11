"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { galleryItems } from "../data/gallery";

const heightClasses = {
  short: "h-[300px] sm:h-[340px]",
  medium: "h-[380px] sm:h-[440px]",
  tall: "h-[470px] sm:h-[560px]",
};

export function GallerySection() {
  return (
    <section id="galeria" className="bg-[#18352d] py-24 text-[#f4f0e8] md:py-36">
      <div className="mx-auto w-[min(100%-32px,1400px)]">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#d7c7a6]">
              <span className="h-px w-8 bg-[#d7c7a6]" />
              Um olhar sobre o seu próximo refúgio
            </p>

            <h2 className="font-title mt-7 max-w-3xl text-[clamp(3.2rem,6vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.05em]">
              Pequenos momentos.{" "}
              <span className="italic text-[#d7c7a6]">
                Grandes memórias.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-white/55">
            Descubra os detalhes, as paisagens e os instantes que tornam cada
            estadia nas Cabanas do Rio uma experiência única.
          </p>
        </div>

        <div className="mt-16 columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
          {galleryItems.map((item, index) => (
            <motion.article
              key={item.image}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: (index % 4) * 0.08,
              }}
              className="group relative mb-5 break-inside-avoid overflow-hidden rounded-[1.5rem] bg-[#405148]"
            >
              <div className={`relative ${heightClasses[item.height]}`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="absolute inset-x-0 bottom-0 translate-y-3 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 className="font-title text-2xl font-medium">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-white/70">
                    {item.description}
                  </p>
                </div>

                <span className="absolute right-5 top-5 flex size-8 items-center justify-center rounded-full border border-white/25 bg-black/10 text-[0.58rem] tracking-[0.08em] text-white/75 backdrop-blur-md">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}