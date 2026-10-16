"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { rentalCategories, rentalProducts, type RentalCategory } from "./rental-products";

const whatsappNumber = "5521988742550";
const whatsapp = `https://wa.me/${whatsappNumber}?text=Ol%C3%A1%2C%20quero%20solicitar%20um%20or%C3%A7amento%20para%20meu%20evento.`;
const instagramProfile = "https://www.instagram.com/ateliedelrio_/";

type PhotoProps = {
  crop: string;
  label: string;
  className?: string;
};

function Photo({ crop, label, className = "" }: PhotoProps) {
  return (
    <div
      className={`prototype-photo ${crop} ${className}`}
      role="img"
      aria-label={label}
    />
  );
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`logo-crop ${compact ? "logo-crop--compact" : ""}`}>
      <img src="/logo-original.jpeg" alt="Ateliê Del Rio — Locações, Decorações & Buffet" />
    </div>
  );
}

function SocialIcon({ name }: { name: "instagram" | "whatsapp" | "facebook" }) {
  if (name === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.7" cy="6.4" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.5-4.8a8.5 8.5 0 1 1 16-4.1Z" />
        <path d="M8.3 7.6c.3-.3.6-.2.8.1l1.3 1.8c.2.3.2.6-.1.8l-.8.7a8 8 0 0 0 3.5 3.5l.7-.8c.2-.3.5-.3.8-.1l1.8 1.2c.3.2.4.6.1.9-.5.8-1.2 1.2-2.1 1.2-3.1 0-6.9-3.8-6.9-6.9 0-.8.3-1.5.9-2Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.3-.1-1.3-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4Z" />
    </svg>
  );
}

const portfolio = [
  ["gallery-1", "Cerimônia ao ar livre com decoração floral", "Casamentos"],
  ["gallery-2", "Mesa de doces de casamento", "Festas"],
  ["gallery-3", "Evento corporativo noturno", "Corporativos"],
  ["gallery-4", "Mesa delicada em tons rosados", "Festas"],
  ["gallery-5", "Buffet completo para recepção", "Corporativos"],
  ["gallery-6", "Jantar ao ar livre à luz de velas", "Casamentos"],
];

const steps = [
  ["01", "▢", "Conte sua ideia", "Entendemos seu sonho, estilo e necessidades."],
  ["02", "≡", "Criamos a proposta", "Apresentamos um projeto personalizado para você."],
  ["03", "♡", "Cuidamos dos detalhes", "Organizamos tudo com cuidado e excelência."],
  ["04", "♧", "Celebramos com você", "No grande dia, é só aproveitar cada momento."],
];

type Testimonial = { quote: string; author: string; event: string };

const testimonials: Testimonial[] = [
  {
    quote: "O Ateliê Del Rio transformou nosso sonho em uma celebração ainda mais bonita do que imaginávamos.",
    author: "Mariana & Rafael",
    event: "Casamento",
  },
];

export default function Home() {
  const [portfolioFilter, setPortfolioFilter] = useState("Todos");
  const [rentalFilter, setRentalFilter] = useState<"Todos" | RentalCategory>("Todos");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [testimonialPaused, setTestimonialPaused] = useState(false);
  const rentalTrackRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);
  const visiblePortfolio = portfolio.filter(([, , category]) => portfolioFilter === "Todos" || category === portfolioFilter);
  const visibleRentals = rentalProducts.filter((product) => rentalFilter === "Todos" || product.category === rentalFilter);
  const activeTestimonial = testimonials[testimonialIndex];

  useEffect(() => {
    if (testimonials.length < 2 || testimonialPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      if (!document.hidden) setTestimonialIndex((index) => (index + 1) % testimonials.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [testimonialPaused]);

  function filterRentals(category: "Todos" | RentalCategory) {
    setRentalFilter(category);
    rentalTrackRef.current?.scrollTo({ left: 0, behavior: "auto" });
  }

  function scrollRentals(direction: -1 | 1) {
    const track = rentalTrackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * Math.min(track.clientWidth * 0.86, 980), behavior: "smooth" });
  }

  function closeMobileMenu() {
    if (mobileMenuRef.current) mobileMenuRef.current.open = false;
  }

  return (
    <main>
      <div className="topbar">
        <div className="site-shell topbar__inner">
          <span>Atendimento personalizado para o seu evento</span>
          <div className="socials" aria-label="Redes sociais">
            <a href={instagramProfile} target="_blank" rel="noreferrer" aria-label="Instagram"><SocialIcon name="instagram" /></a>
            <a href={whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><SocialIcon name="whatsapp" /></a>
          </div>
        </div>
      </div>

      <header className="header">
        <div className="site-shell header__inner">
          <a href="#inicio" aria-label="Voltar ao início" title="Voltar ao início" onClick={closeMobileMenu}><Logo /></a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            <a href="#inicio">Início</a>
            <a href="#sobre">Sobre</a>
            <a href="#servicos">Serviços</a>
            <a href="#portfolio">Portfólio</a>
            <a href="#depoimentos">Depoimentos</a>
            <a href="#contato">Contato</a>
          </nav>
          <a className="button button--rose header__cta" href="#contato">Solicitar orçamento</a>
          <details className="mobile-menu" ref={mobileMenuRef}>
            <summary aria-label="Abrir menu">☰</summary>
            <nav aria-label="Navegação móvel">
              <a href="#inicio" onClick={closeMobileMenu}>Início</a><a href="#sobre" onClick={closeMobileMenu}>Sobre</a><a href="#servicos" onClick={closeMobileMenu}>Serviços</a>
              <a href="#portfolio" onClick={closeMobileMenu}>Portfólio</a><a href="#depoimentos" onClick={closeMobileMenu}>Depoimentos</a><a href="#contato" onClick={closeMobileMenu}>Contato</a>
            </nav>
          </details>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="site-shell hero__grid">
          <div className="hero__content">
            <p className="eyebrow">Decoração, locações & buffet</p>
            <h1>Momentos inesquecíveis começam nos detalhes.</h1>
            <p className="hero__lead">Criamos experiências únicas para festas, casamentos e eventos corporativos, com cuidado em cada escolha.</p>
            <div className="hero__actions">
              <a className="button button--wine" href="#contato">Solicitar orçamento</a>
              <a className="text-link" href="#portfolio">Conheça nosso trabalho</a>
            </div>
          </div>
          <Photo crop="hero-photo" label="Mesa de celebração sofisticada com flores e velas" />
        </div>
      </section>

      <section className="features-wrap" aria-label="Diferenciais">
        <div className="site-shell features">
          <div className="feature"><span className="feature__icon">⚘</span><span>Projetos<br />personalizados</span></div>
          <div className="feature"><span className="feature__icon">▱</span><span>Acervo<br />selecionado</span></div>
          <div className="feature"><span className="feature__icon">♡</span><span>Cuidado em<br />cada detalhe</span></div>
        </div>
      </section>

      <section className="section services" id="servicos">
        <div className="site-shell">
          <div className="rentals__heading">
            <div>
              <p className="eyebrow">Acervo para locação</p>
              <h2>Peças que transformam cada cenário</h2>
              <p className="rentals__intro">Explore o acervo e consulte a disponibilidade de cada peça pelo WhatsApp.</p>
            </div>
            <div className="rental-nav" aria-label="Controles do carrossel">
              <button type="button" onClick={() => scrollRentals(-1)} aria-label="Ver produtos anteriores">←</button>
              <button type="button" onClick={() => scrollRentals(1)} aria-label="Ver próximos produtos">→</button>
            </div>
          </div>
          <div className="rental-filters" aria-label="Categorias dos produtos para locação">
            {(["Todos", ...rentalCategories] as const).map((category) => {
              const available = category === "Todos" || rentalProducts.some((product) => product.category === category);
              return (
                <button
                  className={rentalFilter === category ? "active" : ""}
                  type="button"
                  aria-pressed={rentalFilter === category}
                  disabled={!available}
                  title={available ? undefined : "Fotos desta categoria em preparação"}
                  onClick={() => filterRentals(category)}
                  key={category}
                >{category}</button>
              );
            })}
          </div>
          <p className="rental-count" aria-live="polite">{visibleRentals.length} {visibleRentals.length === 1 ? "item" : "itens"} para consulta</p>
          <div className="rental-carousel">
            <div className="rental-track" ref={rentalTrackRef} aria-label="Produtos disponíveis para locação">
              {visibleRentals.map((product) => {
                const quoteLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Olá! Gostaria de consultar a disponibilidade e solicitar um orçamento para: ${product.name}.`)}`;
                return (
                  <article className="rental-card" key={product.id}>
                    <img src={product.image} alt={product.name} loading="lazy" />
                    <div className="rental-card__body">
                      <span className="rental-card__category">{product.category}</span>
                      <h3>{product.name}</h3>
                      <p>Consulte a disponibilidade</p>
                      <a href={quoteLink} target="_blank" rel="noreferrer" aria-label={`Consultar ${product.name} pelo WhatsApp`}>
                        Consultar pelo WhatsApp <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
            <p className="rentals__hint">Deslize para conhecer mais peças <span aria-hidden="true">→</span></p>
          </div>
        </div>
      </section>

      <section className="section about" id="sobre">
        <div className="site-shell about__grid">
          <figure className="about__portrait">
            <img src="/marlene-del-rio.jpg" alt="Marlene Del Rio, dona do Ateliê Del Rio" width="1122" height="1402" loading="lazy" />
          </figure>
          <div className="about__content">
            <p className="eyebrow">Sobre o ateliê</p>
            <h2>Cada celebração merece uma identidade única.</h2>
            <p>Tudo começou na minha festa de 10 anos, quando eu mesma quis participar da decoração. Enquanto todos viam apenas uma comemoração, eu enxergava detalhes, cores e possibilidades. Minha mãe comprava bonequinhas e eu desmontava todas para montar do meu jeito. Foi ali que nasceu minha paixão por criar, transformar e dar vida às ideias.</p>
            <p>Com o tempo, comecei a decorar as festas da minha família e percebi que aquilo não era apenas diversão, era talento e amor pelo que eu fazia. Depois que me casei, decidi assumir de vez minha paixão pela decoração. Estudei, me especializei e investi em cursos e materiais. Com o apoio do meu esposo, transformei o sonho de infância em minha realidade profissional.</p>
            <div className="signature">Ateliê Del Rio</div>
          </div>
        </div>
      </section>

      <section className="section portfolio" id="portfolio">
        <div className="site-shell">
          <div className="section-heading">
            <p className="eyebrow">Portfólio</p>
            <h2>Eventos que contam histórias</h2>
            <div className="portfolio__filters" aria-label="Categorias do portfólio">
              {["Todos", "Casamentos", "Festas", "Corporativos"].map((category) => (
                <button
                  className={portfolioFilter === category ? "active" : ""}
                  type="button"
                  aria-pressed={portfolioFilter === category}
                  onClick={() => setPortfolioFilter(category)}
                  key={category}
                >{category}</button>
              ))}
            </div>
          </div>
          <div className="gallery">
            {visiblePortfolio.map(([crop, label]) => <Photo crop={crop} label={label} key={crop} />)}
          </div>
          <div className="portfolio__footer"><a className="button button--wine" href="#contato">Solicite seu orçamento</a></div>
        </div>
      </section>

      <section className="section process" id="processo">
        <div className="site-shell">
          <div className="section-heading"><h2>Do primeiro contato ao grande dia</h2></div>
          <div className="process__grid">
            {steps.map(([number, icon, title, text], index) => (
              <article className="process-step" key={number} style={{ "--delay": `${index * 80}ms` } as CSSProperties}>
                <div className="process-step__head"><span className="process-step__number">{number}</span><span className="process-step__icon">{icon}</span></div>
                <h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonial-section" id="depoimentos">
        <div
          className="site-shell testimonial"
          onMouseEnter={() => setTestimonialPaused(true)}
          onMouseLeave={() => setTestimonialPaused(false)}
          onFocusCapture={() => setTestimonialPaused(true)}
          onBlurCapture={() => setTestimonialPaused(false)}
        >
          <span className="testimonial__quote" aria-hidden="true">“</span>
          <blockquote>{activeTestimonial.quote}</blockquote>
          <p className="testimonial__author">{activeTestimonial.author}</p>
          <span className="testimonial__event">{activeTestimonial.event}</span>
          {testimonials.length > 1 && (
            <div className="testimonial__dots" role="group" aria-label="Navegar pelos depoimentos">
              {testimonials.map((testimonial, index) => (
                <button
                  type="button"
                  key={`${testimonial.author}-${index}`}
                  className={index === testimonialIndex ? "active" : ""}
                  aria-label={`Mostrar depoimento ${index + 1} de ${testimonial.author}`}
                  aria-pressed={index === testimonialIndex}
                  onClick={() => setTestimonialIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="cta-section" id="contato">
        <div className="site-shell cta">
          <Photo crop="cta-photo" label="Buquê de rosas em tons suaves" />
          <div className="cta__content"><h2>Vamos criar algo inesquecível juntos?</h2><p>Conte-nos sobre o seu evento e receba uma proposta personalizada.</p></div>
          <a className="button button--wine cta__button" href={whatsapp} target="_blank" rel="noreferrer"><SocialIcon name="whatsapp" /> Falar pelo WhatsApp</a>
        </div>
      </section>

      <footer className="footer">
        <div className="site-shell footer__grid">
          <div className="footer__brand">
            <Logo compact />
            <p>Decorações autorais, locações selecionadas e buffet impecável para eventos que ficam na memória.</p>
            <div className="footer__socials">
              <a href={instagramProfile} target="_blank" rel="noreferrer" aria-label="Instagram"><SocialIcon name="instagram" /></a>
              <a href={whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><SocialIcon name="whatsapp" /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><SocialIcon name="facebook" /></a>
            </div>
          </div>
          <div><h3>Navegação</h3><a href="#inicio">Início</a><a href="#sobre">Sobre</a><a href="#servicos">Serviços</a><a href="#portfolio">Portfólio</a><a href="#depoimentos">Depoimentos</a><a href="#contato">Contato</a></div>
          <div><h3>Serviços</h3><span>Decoração de eventos</span><span>Locação de peças</span><span>Buffet</span><span>Assessoria completa</span><span>Eventos corporativos</span><span>Mini weddings</span></div>
          <div><h3>Contato</h3><a href={`tel:+${whatsappNumber}`}>☎ &nbsp;(21) 98874-2550</a><a href="mailto:contato@ateliedelrio.com.br">✉ &nbsp;contato@ateliedelrio.com.br</a><span>⌖ &nbsp;Rua Franz Listz, 218 - Jardim América, RJ</span><span>◷ &nbsp;Atendimento: Seg a Sex, 9h às 18h</span></div>
        </div>
        <div className="site-shell footer__bottom">© 2026 Ateliê Del Rio. Todos os direitos reservados.</div>
      </footer>
    </main>
  );
}
