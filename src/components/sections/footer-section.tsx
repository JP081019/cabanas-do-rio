import { Camera, Home, Mail, MapPinned, MessageCircle, Phone, Sparkles } from "lucide-react";
import { contactLinks, navigationItems } from "@/src/components/data/site-content";

const socialLinks = [
  { label: "Airbnb", href: contactLinks.airbnb, icon: Sparkles },
  { label: "WhatsApp", href: contactLinks.whatsapp, icon: MessageCircle },
  { label: "Instagram", href: contactLinks.instagram, icon: Camera },
  { label: "E-mail", href: contactLinks.email, icon: Mail },
  { label: "Mapa", href: contactLinks.maps, icon: MapPinned },
];

export function FooterSection() {
  return (
    <footer className="bg-[#151d16] text-[var(--paper)]">
      <div className="mx-auto grid max-w-[1180px] gap-8 px-6 py-12 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="flex items-center gap-3 font-serif text-3xl">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/35">
              <Home size={23} strokeWidth={1.25} />
            </span>
            Cabanas do Rio
          </p>
          <p className="mt-3 text-base text-white/58">Hospedagem de natureza e descanso.</p>
        </div>

        <div className="flex flex-col gap-6 md:items-end">
          <nav className="flex flex-wrap gap-5 text-sm font-semibold text-white/68">
            {navigationItems.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-wrap gap-3">
            {socialLinks.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={item.label}
                  title={item.label}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/7 text-white ring-1 ring-white/12 transition hover:-translate-y-1 hover:bg-[#ef7b2d] hover:shadow-[0_14px_30px_rgba(239,123,45,0.26)]"
                >
                  <Icon size={22} strokeWidth={1.45} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-base text-white/68">
              Site desenvolvido por <span className="font-serif text-xl text-white">João Pedro da Silva</span>.
            </p>
            <p className="text-base text-white/58">
              Gostou do site? Entre em contato.
            </p>
          </div>
          <a
            href="https://wa.me/5548996656319"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#eef4ea] px-5 font-serif text-lg !text-[#151d16] transition hover:-translate-y-1 hover:!bg-white hover:!text-[#151d16]"
          >
            <Phone size={20} strokeWidth={1.45} />
            48 99665-6319
          </a>
        </div>
      </div>
    </footer>
  );
}
