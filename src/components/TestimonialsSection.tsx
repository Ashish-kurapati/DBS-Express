const testimonialItems = [
  {
    quote: 'Setup took ten minutes and our first check was back in three days.',
    name: 'Michael Ossai',
    role: 'Operations Lead · Fenwick Logistics',
    image: '/assets/michael-ossai.png',
    initials: 'MO',
  },
  {
    quote: 'Finally a DBS provider that publishes its prices upfront.',
    name: 'Priya Anand',
    role: 'People Partner · Anand & Co Recruitment',
    image: '/assets/priya-anand.png',
    initials: 'PA',
  },
  {
    quote: 'Support actually replies, which is rare in this industry.',
    name: 'Tom Beckett',
    role: 'Founder · Beckett Property Management',
    image: null,
    initials: 'TB',
  },
]

export function TestimonialsSection() {
  return (
    <section className="testimonials-section section-pad reveal-on-scroll" aria-labelledby="testimonials-title">
      <div className="testimonials-section__header">
        <h2 id="testimonials-title" className="testimonials-section__title">
          Trusted by organisations and applicants alike
        </h2>
        <p className="testimonials-section__subtitle">
          Here is what hiring teams and individuals say about our screening service.
        </p>
      </div>

      <div className="testimonials-grid">
        {testimonialItems.map((item) => (
          <article className="testimonial-card" key={item.name}>
            <blockquote className="testimonial-card__quote">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <div className="testimonial-card__author">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="testimonial-card__avatar"
                  width="48"
                  height="48"
                  loading="lazy"
                />
              ) : (
                <span className="testimonial-card__initials" aria-hidden="true">
                  {item.initials}
                </span>
              )}
              <div className="testimonial-card__meta">
                <strong className="testimonial-card__name">{item.name}</strong>
                <span className="testimonial-card__role">{item.role}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
