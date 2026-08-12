import Image from "next/image";
import { galleryImages } from "@/src/components/data/site-content";

export function GallerySection() {
  return (
    <section id="galeria" className="bg-[var(--foreground)] text-[var(--paper)]">
      <div className="section-shell overflow-hidden">
        <div className="mb-9 flex flex-col gap-5 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="section-kicker text-[#9fd0c9]">Galeria</p>
            <h2 className="section-title">Fragmentos do que o visitante encontra.</h2>
          </div>
          <p className="max-w-sm text-base leading-7 text-white/72">
            Uma área feita para crescer: novas fotos entram aqui sem alterar as demais seções.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:auto-rows-[220px] lg:grid-cols-4">
          {galleryImages.map((image, index) => (
            <div
              key={image.src}
              className={`image-frame aspect-[4/3] shadow-[0_18px_40px_rgba(0,0,0,0.22)] lg:aspect-auto ${
                index === 0 || index === 5 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
