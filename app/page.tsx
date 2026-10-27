"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
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

type Testimonial = { quote: string; author: string; event?: string };

const testimonials: Testimonial[] = [
  {
    quote: "Marlene, querida! Recebi as fotos oficiais do Chá da Clara. Você, como sempre, se superando. Sonhei com esse evento bem intimista, apenas para a família e, você conseguiu transformá-lo, com o seu capricho e dedicação, em um momento mágico e uma recordação inesquecível para a nossa família. Muito Obrigada!",
    author: "Carla",
    event: "Buffet 23/08",
  },
  {
    quote: "Ficou tudo lindo! A comida uma delícia! Todo mundo amou!!! Obrigada mais uma vez!",
    author: "Ana",
    event: "Buffet 10/10",
  },
  {
    quote: "Marlene, queria agradecer pelo carinho e cuidado que fez a festa da minha princesa. Deu para perceber em cada detalhe o quanto seu trabalho é maravilhoso. Tudo ficou exatamento como ela queria e como havíamos planejado. Na verdade, superou nossas expectativas! Todos os convidados elogiaram o buffet que estava delicioso. O atendimento foi nota 1000. Parabéns pelo seu trabalho, sua equipe e obrigada pelo carinho e dedicação que fez a festa da minha filha. E ano que vem estamos aí de novo!!!",
    author: "Rebeca Carneiro",
  },
  {
    quote: "Marlene, bom dia! Gostaria de agradecer pela festa impecável de ontem, a decoração se supera a cada ano! O buffet como sempre delicioso e muito bem servido, até brinquei com o s garçons pedindo pra pararem de passar com a bandeja porque a gente não aguentava mais comer. Equipe maravilhosa, com destaque especial para a Eliane que é fora da curva. Foi tudo incrível como sempre! Obrigada por mais um ano de parceria!",
    author: "Gabi",
    event: "Buffet 08/03",
  },
  {
    quote: "Queria te agradecer de coração por todo o cuidado com o buffet e a decoração da festa da Laura. Ficou tudo simplesmente lindo e delicioso! Recebi muitos elogios e faço questão de repassar para você e sua equipe. Muito obrigada pelo carinho, profissionalismo e dedicação!",
    author: "Miryam",
    event: "Buffet 07/03",
  },
];

function advanceRentalTrack(track: HTMLDivElement, direction: -1 | 1) {
  const card = track.querySelector<HTMLElement>(".rental-card");
  const maxScroll = track.scrollWidth - track.clientWidth;
  if (!card || maxScroll < 2) return;

  const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap || "0");
  const atEnd = direction === 1 ? track.scrollLeft >= maxScroll - 2 : track.scrollLeft <= 2;
  track.scrollTo({
    left: atEnd ? (direction === 1 ? 0 : maxScroll) : Math.max(0, Math.min(maxScroll, track.scrollLeft + direction * step)),
    behavior: atEnd ? "instant" : "smooth",
  });
}

export default function Home() {
  const [portfolioFilter, setPortfolioFilter] = useState("Todos");
  const [rentalFilter, setRentalFilter] = useState<RentalCategory>("Decoração");
  const [rentalHasOverflow, setRentalHasOverflow] = useState(false);
  const [rentalInteraction, setRentalInteraction] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonialPointer = useRef<{ id: number; x: number; y: number } | null>(null);
  const rentalTrackRef = useRef<HTMLDivElement>(null);
  const rentalPointer = useRef<{ id: number; x: number; scrollLeft: number; moved: boolean } | null>(null);
  const rentalWasDragged = useRef(false);
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);
  const visiblePortfolio = portfolio.filter(([, , category]) => portfolioFilter === "Todos" || category === portfolioFilter);
  const visibleRentals = rentalProducts.filter((product) => product.category === rentalFilter);
  const activeTestimonial = testimonials[testimonialIndex];

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [rentalFilter, portfolioFilter]);

  useEffect(() => {
    if (testimonials.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      if (!document.hidden) setTestimonialIndex((index) => (index + 1) % testimonials.length);
    }, 9000);

    return () => window.clearInterval(interval);
  }, [testimonialIndex]);

  useEffect(() => {
    const track = rentalTrackRef.current;
    if (!track) {
      setRentalHasOverflow(false);
      return;
    }
    const updateOverflow = () => setRentalHasOverflow(track.scrollWidth > track.clientWidth + 2);
    updateOverflow();
    const observer = new ResizeObserver(updateOverflow);
    observer.observe(track);
    window.addEventListener("resize", updateOverflow);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateOverflow);
    };
  }, [rentalFilter]);

  useEffect(() => {
    if (!rentalHasOverflow || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => {
      if (!document.hidden && !rentalPointer.current && rentalTrackRef.current) {
        advanceRentalTrack(rentalTrackRef.current, 1);
      }
    }, 5000);
    return () => window.clearInterval(interval);
  }, [rentalFilter, rentalHasOverflow, rentalInteraction]);

  function moveTestimonial(direction: -1 | 1) {
    setTestimonialIndex((index) => (index + direction + testimonials.length) % testimonials.length);
  }

  function startTestimonialDrag(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || (event.target as HTMLElement).closest("button")) return;
    if (event.pointerType === "mouse") event.preventDefault();
    testimonialPointer.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function endTestimonialDrag(event: PointerEvent<HTMLDivElement>) {
    const start = testimonialPointer.current;
    testimonialPointer.current = null;
    if (!start || start.id !== event.pointerId) return;

    const distanceX = event.clientX - start.x;
    const distanceY = event.clientY - start.y;
    if (Math.abs(distanceX) > 48 && Math.abs(distanceX) > Math.abs(distanceY) * 1.2) {
      moveTestimonial(distanceX < 0 ? 1 : -1);
    }
  }

  function filterRentals(category: RentalCategory) {
    setRentalFilter(category);
    rentalTrackRef.current?.scrollTo({ left: 0, behavior: "auto" });
    setRentalInteraction((count) => count + 1);
  }

  function scrollRentals(direction: -1 | 1) {
    const track = rentalTrackRef.current;
    if (!track) return;
    advanceRentalTrack(track, direction);
    setRentalInteraction((count) => count + 1);
  }

  function startRentalDrag(event: PointerEvent<HTMLDivElement>) {
    rentalWasDragged.current = false;
    if (event.pointerType !== "mouse" || event.button !== 0 || (event.target as HTMLElement).closest("a, button")) return;
    rentalPointer.current = { id: event.pointerId, x: event.clientX, scrollLeft: event.currentTarget.scrollLeft, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveRentalDrag(event: PointerEvent<HTMLDivElement>) {
    const start = rentalPointer.current;
    if (!start || start.id !== event.pointerId) return;
    const distance = event.clientX - start.x;
    if (Math.abs(distance) > 8) start.moved = true;
    if (!start.moved) return;
    event.preventDefault();
    event.currentTarget.classList.add("is-dragging");
    event.currentTarget.scrollLeft = start.scrollLeft - distance;
  }

  function endRentalDrag(event: PointerEvent<HTMLDivElement>) {
    const start = rentalPointer.current;
    if (!start || start.id !== event.pointerId) return;
    rentalWasDragged.current = start.moved;
    rentalPointer.current = null;
    event.currentTarget.classList.remove("is-dragging");
    if (start.moved) setRentalInteraction((count) => count + 1);
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
        <div className="site-shell features" data-reveal>
          <div className="feature"><span className="feature__icon">⚘</span><span>Projetos<br />personalizados</span></div>
          <div className="feature"><span className="feature__icon">▱</span><span>Acervo<br />selecionado</span></div>
          <div className="feature"><span className="feature__icon">♡</span><span>Cuidado em<br />cada detalhe</span></div>
        </div>
      </section>

      <section className="section services" id="servicos">
        <div className="site-shell">
          <div className="rentals__heading" data-reveal>
            <div>
              <p className="eyebrow">Acervo para locação</p>
              <h2>Peças que transformam cada cenário</h2>
              <p className="rentals__intro">Explore o acervo e consulte a disponibilidade de cada peça pelo WhatsApp.</p>
            </div>
          </div>
          <div className="rental-filters" aria-label="Categorias dos produtos para locação" data-reveal>
            {rentalCategories.map((category) => (
              <button
                className={rentalFilter === category ? "active" : ""}
                type="button"
                aria-pressed={rentalFilter === category}
                onClick={() => filterRentals(category)}
                key={category}
              >{category}</button>
            ))}
          </div>
          {visibleRentals.length > 0 && <p className="rental-count" aria-live="polite">{visibleRentals.length} {visibleRentals.length === 1 ? "item" : "itens"} para consulta</p>}
          <div className="rental-carousel">
            {visibleRentals.length === 0 ? (
              <p className="rental-empty" role="status">Fotos desta categoria serão adicionadas em breve.</p>
            ) : (
              <div
              className="rental-track"
              ref={rentalTrackRef}
              aria-label="Produtos disponíveis para locação"
              onPointerDown={startRentalDrag}
              onPointerMove={moveRentalDrag}
              onPointerUp={endRentalDrag}
              onPointerCancel={endRentalDrag}
              onClickCapture={(event) => {
                if (rentalWasDragged.current) {
                  event.preventDefault();
                  event.stopPropagation();
                  rentalWasDragged.current = false;
                }
              }}
            >
              {visibleRentals.map((product, index) => {
                const quoteLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Olá! Gostaria de consultar a disponibilidade e solicitar um orçamento para: ${product.name}.`)}`;
                return (
                  <article className="rental-card" key={product.id} data-reveal style={{ "--reveal-delay": `${(index % 5) * 55}ms` } as CSSProperties}>
                    <img src={product.image} alt={product.name} loading="lazy" draggable={false} />
                    <div className="rental-card__body">
                      <span className="rental-card__category">{product.category}</span>
                      <p>Consulte a disponibilidade</p>
                      <a href={quoteLink} target="_blank" rel="noreferrer" aria-label={`Consultar ${product.name} pelo WhatsApp`}>
                        Consultar pelo WhatsApp <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                  </article>
                );
              })}
              </div>
            )}
            {rentalHasOverflow && visibleRentals.length > 0 && (
              <div className="rental-nav" role="group" aria-label="Controles do carrossel">
                <button type="button" onClick={() => scrollRentals(-1)} aria-label="Ver produtos anteriores">←</button>
                <button type="button" onClick={() => scrollRentals(1)} aria-label="Ver próximos produtos">→</button>
              </div>
            )}
            {visibleRentals.length > 0 && <p className="rentals__hint">Deslize para conhecer mais peças <span aria-hidden="true">→</span></p>}
          </div>
        </div>
      </section>

      <section className="section about" id="sobre">
        <div className="site-shell about__grid">
          <figure className="about__portrait" data-reveal>
            <img src="/marlene-del-rio.jpg" alt="Marlene Del Rio, dona do Ateliê Del Rio" width="1122" height="1402" loading="lazy" />
          </figure>
          <div className="about__content" data-reveal style={{ "--reveal-delay": "100ms" } as CSSProperties}>
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
          <div className="section-heading" data-reveal>
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
            {visiblePortfolio.map(([crop, label], index) => (
              <div className="gallery__item" key={crop} data-reveal style={{ "--reveal-delay": `${index * 65}ms` } as CSSProperties}>
                <Photo crop={crop} label={label} />
              </div>
            ))}
          </div>
          <div className="portfolio__footer" data-reveal><a className="button button--wine" href="#contato">Solicite seu orçamento</a></div>
        </div>
      </section>

      <section className="section process" id="processo">
        <div className="site-shell">
          <div className="section-heading" data-reveal><h2>Do primeiro contato ao grande dia</h2></div>
          <div className="process__grid">
            {steps.map(([number, icon, title, text], index) => (
              <article className="process-step" key={number} data-reveal style={{ "--reveal-delay": `${index * 85}ms` } as CSSProperties}>
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
          data-reveal
          onPointerDown={startTestimonialDrag}
          onPointerUp={endTestimonialDrag}
          onPointerCancel={() => { testimonialPointer.current = null; }}
        >
          <span className="testimonial__quote" aria-hidden="true">“</span>
          <div className="testimonial__body" key={testimonialIndex}>
            <blockquote>{activeTestimonial.quote}</blockquote>
            <p className="testimonial__author">{activeTestimonial.author}</p>
            {activeTestimonial.event && <span className="testimonial__event">{activeTestimonial.event}</span>}
          </div>
          {testimonials.length > 1 && (
            <div className="testimonial__controls">
              <button className="testimonial__arrow" type="button" aria-label="Depoimento anterior" onClick={() => moveTestimonial(-1)}>←</button>
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
              <button className="testimonial__arrow" type="button" aria-label="Próximo depoimento" onClick={() => moveTestimonial(1)}>→</button>
            </div>
          )}
        </div>
      </section>

      <section className="cta-section" id="contato">
        <div className="site-shell cta" data-reveal>
          <Photo crop="cta-photo" label="Buquê de rosas em tons suaves" />
          <div className="cta__content"><h2>Vamos criar algo inesquecível juntos?</h2><p>Conte-nos sobre o seu evento e receba uma proposta personalizada.</p></div>
          <a className="button button--wine cta__button" href={whatsapp} target="_blank" rel="noreferrer"><SocialIcon name="whatsapp" /> Falar pelo WhatsApp</a>
        </div>
      </section>

      <footer className="footer">
        <div className="site-shell footer__grid">
          <div className="footer__brand" data-reveal>
            <Logo compact />
            <p>Decorações autorais, locações selecionadas e buffet impecável para eventos que ficam na memória.</p>
            <div className="footer__socials">
              <a href={instagramProfile} target="_blank" rel="noreferrer" aria-label="Instagram"><SocialIcon name="instagram" /></a>
              <a href={whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><SocialIcon name="whatsapp" /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><SocialIcon name="facebook" /></a>
            </div>
          </div>
          <div data-reveal style={{ "--reveal-delay": "70ms" } as CSSProperties}><h3>Navegação</h3><a href="#inicio">Início</a><a href="#sobre">Sobre</a><a href="#servicos">Serviços</a><a href="#portfolio">Portfólio</a><a href="#depoimentos">Depoimentos</a><a href="#contato">Contato</a></div>
          <div data-reveal style={{ "--reveal-delay": "140ms" } as CSSProperties}><h3>Serviços</h3><span>Decoração de eventos</span><span>Locação de peças</span><span>Buffet</span><span>Assessoria completa</span><span>Eventos corporativos</span><span>Mini weddings</span></div>
          <div data-reveal style={{ "--reveal-delay": "210ms" } as CSSProperties}><h3>Contato</h3><a href={`tel:+${whatsappNumber}`}>☎ &nbsp;(21) 98874-2550</a><a href="mailto:contato@ateliedelrio.com.br">✉ &nbsp;contato@ateliedelrio.com.br</a><span>⌖ &nbsp;Rua Franz Listz, 218 - Jardim América, RJ</span><span>◷ &nbsp;Atendimento: Seg a Sex, 9h às 18h</span></div>
        </div>
        <div className="site-shell footer__bottom">© 2026 Ateliê Del Rio. Todos os direitos reservados.</div>
      </footer>
    </main>
  );
}
