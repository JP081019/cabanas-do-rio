import Image from "next/image";
import { House, Waves } from "lucide-react";
import { navigationItems } from "@/src/components/data/site-content";

export function HeroSection() {
  const menuItems = navigationItems.filter((item) => item.label !== "Sobre");

  return (
    <section id="inicio" className="relative min-h-[78vh] overflow-hidden bg-[#07100c] text-[#f4f1e8]">
      <Image
        src="/images/hero-cabanas-rio.png"
        alt="Cabana de madeira em meio à mata, com rio e área verde"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,8,5,0.84)_0%,rgba(3,8,5,0.58)_31%,rgba(3,8,5,0.2)_62%,rgba(3,8,5,0.42)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-black/55 to-transparent" />

      <header className="relative z-10 mx-auto flex max-w-[1500px] items-center gap-8 px-7 py-8 lg:px-9">
        <a className="flex shrink-0 items-center gap-5" href="#inicio" aria-label="Cabanas do Rio">
          <span className="flex h-[76px] w-[76px] items-center justify-center rounded-full border border-white/90 text-white">
            <span className="flex flex-col items-center">
              <House size={30} strokeWidth={1.35} />
              <Waves size={37} strokeWidth={1.25} className="-mt-1" />
            </span>
          </span>
          <span className="font-serif text-[2rem] leading-none tracking-normal text-white">
            Cabanas do Rio
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-12 font-serif text-xl text-white lg:flex">
          {menuItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-white/70">
              {item.label}
            </a>
          ))}
        </nav>

        <a
          className="ml-2 hidden min-h-[54px] items-center justify-center bg-[#263023] px-9 font-serif text-xl text-white transition hover:bg-[#34402f] lg:inline-flex"
          href="#contato"
        >
          Reservar agora
        </a>
      </header>

      <div className="relative z-10 mx-auto flex max-w-[1500px] px-7 pb-28 pt-28 sm:pt-36 lg:px-24 lg:pb-36 lg:pt-40">
        <div className="max-w-[520px]">
          <h1 className="font-serif text-[clamp(4.6rem,7.8vw,8.2rem)] font-normal leading-[0.86] tracking-normal text-[#f3f0e8]">
            Refúgio na natureza
          </h1>
          <p className="mt-9 max-w-[470px] font-serif text-[1.55rem] leading-[1.28] text-white">
            Cabanas aconchegantes entre o rio, a mata e o silêncio.
          </p>
          <a
            className="mt-9 inline-flex min-h-[64px] items-center justify-center bg-[#7b856f] px-10 font-serif text-[1.45rem] text-white shadow-[0_18px_36px_rgba(0,0,0,0.2)] transition hover:bg-[#8b967f]"
            href="#contato"
          >
            Reservar agora
          </a>
        </div>
      </div>
    </section>
  );
}
