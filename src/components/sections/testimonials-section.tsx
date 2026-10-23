import { Quote, ArrowUpRight } from "lucide-react";
import { testimonials, contactLinks } from "../data/site-content";
const selectedReviews = [
  testimonials[0],
  testimonials[2],
  testimonials[4],
  testimonials[11],
  testimonials[15],
  testimonials[17],
];
export function TestimonialsSection() {
  return (
    <section id="avaliacoes" className="reviews-section">
      <div className="section-shell">
        <div className="reviews-heading">
          <div>
            <p className="eyebrow">Na memória de quem esteve aqui</p>
            <h2>
              Quem vem,
              <br />
              leva histórias.
            </h2>
          </div>
          <p>
            Pequenos relatos de dias que ficaram.
            <br />
            Experiências compartilhadas por nossos hóspedes.
          </p>
        </div>
        <div className="reviews-wall">
          {selectedReviews.map((review) => (
            <article className="review-card" key={review.name + review.date} tabIndex={0}>
              <Quote size={27} strokeWidth={1} aria-hidden="true" />
              <blockquote>“{review.quote}”</blockquote>
              <footer>
                <span>{review.name}</span>
                <time>{review.date}</time>
              </footer>
            </article>
          ))}
        </div>
        <a
          className="text-link reviews-link"
          href={contactLinks.airbnb}
          target="_blank"
          rel="noreferrer"
        >
          Conheça os anúncios no Airbnb <ArrowUpRight size={17} />
        </a>
      </div>
    </section>
  );
}
