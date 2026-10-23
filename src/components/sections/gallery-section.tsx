"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "../use-reduced-motion";
import { ArrowUpRight } from "lucide-react";
import { cabinCollection, riverPhoto } from "../data/redesign-content";
const Lightbox = dynamic(() => import("../gallery/lightbox"));
const photos = [
  cabinCollection[0].photos[2],
  cabinCollection[1].photos[3],
  cabinCollection[0].photos[4],
  cabinCollection[1].photos[1],
  riverPhoto,
  cabinCollection[0].photos[10],
  cabinCollection[1].photos[7],
  cabinCollection[0].photos[6],
  cabinCollection[1].photos[2],
];
export function GallerySection() {
  const ref = useRef<HTMLElement>(null),
    reduced = useReducedMotion();
  const [selected, setSelected] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 100%", "end 0%"] });
  const transform = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    [
      "perspective(1400px) rotateX(19deg) scale(0.86)",
      "perspective(1400px) rotateX(0deg) scale(1)",
      "perspective(1400px) rotateX(-3deg) scale(1)",
    ],
  );
  const left = useTransform(scrollYProgress, [0, 1], ["translateY(50px)", "translateY(-75px)"]);
  const center = useTransform(scrollYProgress, [0, 1], ["translateY(-65px)", "translateY(60px)"]);
  const right = useTransform(scrollYProgress, [0, 1], ["translateY(80px)", "translateY(-95px)"]);
  return (
    <section id="galeria" ref={ref} className="perspective-section">
      <div className="perspective-sticky">
        <div className="gallery-title">
          <p className="eyebrow">Memórias que começam aqui</p>
          <h2>
            Um lugar para viver
            <br />
            sem pressa.
          </h2>
        </div>
        <motion.div className="perspective-gallery" style={reduced ? undefined : { transform }}>
          {[left, center, right].map((movement, col) => (
            <motion.div
              key={col}
              className={`perspective-column column-${col}`}
              style={reduced ? undefined : { transform: movement }}
            >
              {photos.slice(col * 3, col * 3 + 3).map((photo, row) => (
                <button
                  key={photo.src}
                  className={`perspective-photo ${photo.portrait ? "portrait" : "landscape"}`}
                  onClick={() => setSelected(col * 3 + row)}
                  aria-label={`Ampliar: ${photo.caption}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 700px) 45vw, 32vw"
                    className="object-cover"
                  />
                  <span>
                    {photo.caption}
                    <ArrowUpRight size={16} />
                  </span>
                </button>
              ))}
              {col !== 1 ? (
                <p className="gallery-interlude">
                  {col === 0 ? "Escute o rio." : "Fique mais um pouco."}
                </p>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      </div>
      {selected !== null ? (
        <Lightbox
          photos={photos}
          initialIndex={selected}
          title="Um lugar para viver sem pressa"
          onClose={() => setSelected(null)}
        />
      ) : null}
    </section>
  );
}
