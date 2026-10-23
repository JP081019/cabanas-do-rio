"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { Photo } from "../data/redesign-content";
export default function Lightbox({
  photos,
  initialIndex,
  onClose,
  title,
}: {
  photos: Photo[];
  initialIndex: number;
  onClose: () => void;
  title: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const [index, setIndex] = useState(initialIndex);
  const photo = photos[index],
    next = photos[(index + 1) % photos.length];
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const element = dialog.current;
    element?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);
  function move(direction: number) {
    setIndex((current) => (current + direction + photos.length) % photos.length);
  }
  return (
    <dialog
      ref={dialog}
      className="lightbox"
      aria-label={`Galeria: ${title}`}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          move(1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          move(-1);
        }
        if (event.key === "Tab") {
          const buttons = dialog.current?.querySelectorAll<HTMLButtonElement>("button");
          const first = buttons?.[0],
            last = buttons?.[buttons.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          }
          if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }
      }}
    >
      <div className="lightbox-top">
        <span>{title}</span>
        <button className="icon-button" aria-label="Fechar galeria" onClick={onClose}>
          <X />
        </button>
      </div>
      <div
        className="lightbox-stage"
        onTouchStart={(event) => {
          touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        }}
        onTouchEnd={(event) => {
          if (!touch.current) return;
          const dx = event.changedTouches[0].clientX - touch.current.x,
            dy = event.changedTouches[0].clientY - touch.current.y;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
          touch.current = null;
        }}
      >
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="100vw"
          className="lightbox-photo"
        />
        <button
          className="lightbox-prev icon-button"
          aria-label="Foto anterior"
          onClick={() => move(-1)}
        >
          <ArrowLeft />
        </button>
        <button
          className="lightbox-next icon-button"
          aria-label="Próxima foto"
          onClick={() => move(1)}
        >
          <ArrowRight />
        </button>
      </div>
      <div className="lightbox-caption" aria-live="polite">
        <p>{photo.caption}</p>
        <span>
          {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
        </span>
      </div>
      <div className="lightbox-preload" aria-hidden="true">
        <Image src={next.src} alt="" width={1200} height={900} sizes="100vw" loading="eager" />
      </div>
    </dialog>
  );
}
