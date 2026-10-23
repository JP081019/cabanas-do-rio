"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "../use-reduced-motion";
import { ArrowUpRight, Expand } from "lucide-react";
import type { Cabin } from "../data/redesign-content";
const Lightbox = dynamic(() => import("./lightbox"));
export function CabinGallery({ cabin }: { cabin: Cabin }) {
  const [selected, setSelected] = useState(0),
    [fullscreen, setFullscreen] = useState(false);
  const mobileTrack = useRef<HTMLDivElement>(null),
    reduced = useReducedMotion();
  const photo = cabin.photos[selected];
  function selectPhoto(index: number) {
    setSelected(index);
    const track = mobileTrack.current;
    if (track && track.offsetWidth)
      track.scrollTo({
        left: index * ((track.firstElementChild?.getBoundingClientRect().width ?? 0) + 12),
        behavior: reduced ? "instant" : "smooth",
      });
  }
  return (
    <div className={`cabin-gallery cabin-gallery-${cabin.id}`}>
      <div className="editorial-gallery">
        <div className="gallery-dominant">
          <AnimatePresence initial={false}>
            <motion.div
              key={photo.src}
              className="gallery-photo-layer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.4 }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 700px) 1px, 55vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <button
            className="gallery-expand"
            aria-label={`Agrandar foto de ${cabin.name}`}
            onClick={() => setFullscreen(true)}
          >
            <Expand size={18} /> Explorar
          </button>
          <p className="photo-caption" aria-live="polite">
            {photo.caption}
          </p>
        </div>
        <div className="gallery-previews" aria-label={`Escolha uma foto de ${cabin.name}`}>
          {cabin.photos.slice(0, 4).map((item, index) => (
            <button
              key={item.src}
              className={`gallery-preview preview-${index}${selected === index ? " is-selected" : ""}`}
              aria-label={item.caption}
              aria-pressed={selected === index}
              onClick={() => selectPhoto(index)}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 700px) 1px, 25vw"
                className="object-cover"
              />
              <span>
                Explorar <ArrowUpRight size={16} />
              </span>
            </button>
          ))}
        </div>
      </div>
      <div
        className="mobile-photo-track"
        ref={mobileTrack}
        onScroll={() => {
          const track = mobileTrack.current;
          if (!track) return;
          const step = track.firstElementChild?.getBoundingClientRect().width ?? 1;
          setSelected(
            Math.min(
              cabin.photos.length - 1,
              Math.max(0, Math.round(track.scrollLeft / (step + 12))),
            ),
          );
        }}
      >
        {cabin.photos.map((item, index) => (
          <button
            key={item.src}
            onClick={() => {
              setSelected(index);
              setFullscreen(true);
            }}
            aria-label={`Ampliar: ${item.caption}`}
          >
            <Image src={item.src} alt={item.alt} fill sizes="85vw" className="object-cover" />
          </button>
        ))}
      </div>
      <div className="gallery-bottom">
        <span>
          {String(selected + 1).padStart(2, "0")}{" "}
          <span className="muted">
            / {String(cabin.photos.length).padStart(2, "0")} fotografias
          </span>
        </span>
        <button className="text-link" onClick={() => setFullscreen(true)}>
          Ver todas as fotos <ArrowUpRight size={17} />
        </button>
      </div>
      <div className="amenities" aria-label="Comodidades">
        {cabin.amenities.map((amenity, index) => (
          <button
            key={amenity}
            onClick={() =>
              selectPhoto(index === 2 ? (cabin.id === "rio" ? 9 : 6) : index === 0 ? 0 : 1)
            }
          >
            {amenity}
          </button>
        ))}
      </div>
      {fullscreen ? (
        <Lightbox
          photos={cabin.photos}
          initialIndex={selected}
          onClose={() => setFullscreen(false)}
          title={cabin.name}
        />
      ) : null}
    </div>
  );
}
