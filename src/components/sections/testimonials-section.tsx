import { Star } from "lucide-react";
import { testimonials } from "@/src/components/data/site-content";

const topTestimonials = testimonials.slice(0, Math.ceil(testimonials.length / 2));
const bottomTestimonials = testimonials.slice(Math.ceil(testimonials.length / 2));

function TestimonialCard({
  name,
  date,
  quote,
}: {
  name: string;
  date: string;
  quote: string;
}) {
  return (
    <article className="testimonial-card">
      <div className="flex gap-1 text-[var(--clay)]" aria-label="Avaliação 5 de 5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} size={17} fill="currentColor" strokeWidth={1.8} />
        ))}
      </div>
      <blockquote className="mt-5 text-xl leading-8 text-[var(--foreground)]">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <footer className="mt-6">
        <p className="font-serif text-2xl leading-none text-[var(--foreground)]">{name}</p>
        <p className="mt-2 text-xs font-semibold uppercase text-[var(--muted)]">{date} · Cabanas do Rio</p>
      </footer>
    </article>
  );
}

function TestimonialTrack({
  items,
  direction,
}: {
  items: typeof testimonials;
  direction: "left" | "right";
}) {
  const repeatedItems = [...items, ...items];

  return (
    <div className="testimonial-marquee" data-direction={direction}>
      <div className="testimonial-track">
        {repeatedItems.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.name}-${index}`}
            name={testimonial.name}
            date={testimonial.date}
            quote={testimonial.quote}
          />
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section id="avaliacoes" className="bg-[#f5f4ec] text-[var(--foreground)]">
      <div className="section-shell testimonials-shell">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="section-kicker">Avaliações</p>
          <h2 className="testimonials-title">
            193 avaliações, <em>nota 4,97</em>
          </h2>
          <p className="section-copy mx-auto mt-5 max-w-xl">
            Marilene é Superhost há 4 anos, com 100% de taxa de resposta e normalmente responde em até 1 hora.
          </p>
        </div>

        <div className="space-y-5 overflow-hidden">
          <TestimonialTrack items={topTestimonials} direction="right" />
          <TestimonialTrack items={bottomTestimonials} direction="left" />
        </div>
      </div>
    </section>
  );
}
