"use client";

import { useState, type CSSProperties } from "react";

const whatsapp = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20solicitar%20um%20or%C3%A7amento%20para%20meu%20evento.";

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

const services = [
  {
    title: "Decoração de eventos",
    text: "Cenários pensados para encantar",
    crop: "service-decoration",
    label: "Salão decorado para celebração",
  },
  {
    title: "Locação de peças",
    text: "Mobiliário, louças e itens decorativos",
    crop: "service-rental",
    label: "Mesa posta com peças selecionadas",
  },
  {
    title: "Buffet",
    text: "Sabores e apresentações memoráveis",
    crop: "service-buffet",
    label: "Buffet cuidadosamente apresentado",
  },
];

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

export default function Home() {
  const [portfolioFilter, setPortfolioFilter] = useState("Todos");
  const visiblePortfolio = portfolio.filter(([, , category]) => portfolioFilter === "Todos" || category === portfolioFilter);

  return (
    <main>
      <div className="topbar">
        <div className="site-shell topbar__inner">
          <span>Atendimento personalizado para o seu evento</span>
          <div className="socials" aria-label="Redes sociais">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">◎</a>
            <a href={whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp">◉</a>
          </div>
        </div>
      </div>

      <header className="header">
        <div className="site-shell header__inner">
          <a href="#inicio" aria-label="Página inicial"><Logo /></a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            <a href="#inicio">Início</a>
            <a href="#sobre">Sobre</a>
            <a href="#servicos">Serviços</a>
            <a href="#portfolio">Portfólio</a>
            <a href="#depoimentos">Depoimentos</a>
            <a href="#contato">Contato</a>
          </nav>
          <a className="button button--rose header__cta" href="#contato">Solicitar orçamento</a>
          <details className="mobile-menu">
            <summary aria-label="Abrir menu">☰</summary>
            <nav aria-label="Navegação móvel">
              <a href="#inicio">Início</a><a href="#sobre">Sobre</a><a href="#servicos">Serviços</a>
              <a href="#portfolio">Portfólio</a><a href="#depoimentos">Depoimentos</a><a href="#contato">Contato</a>
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
        <div className="hero__blush" />
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
          <div className="section-heading">
            <p className="eyebrow">Nossas soluções</p>
            <h2>Tudo para transformar seu evento</h2>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <Photo crop={service.crop} label={service.label} />
                <div className="service-card__body">
                  <div><h3>{service.title}</h3><p>{service.text}</p></div>
                  <a href="#contato" aria-label={`Solicitar ${service.title}`}>→</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section about" id="sobre">
        <div className="site-shell about__grid">
          <div className="about-collage" aria-label="Detalhes do trabalho do Ateliê Del Rio">
            <div className="about-collage__accent" />
            <Photo crop="about-main" label="Profissional montando arranjo floral" />
            <Photo crop="about-detail" label="Mesa posta em ambiente ao ar livre" />
          </div>
          <div className="about__content">
            <p className="eyebrow">Sobre o ateliê</p>
            <h2>Cada celebração merece uma identidade única.</h2>
            <p>Acreditamos que cada evento é único e merece ser vivido com emoção e beleza. Por isso, ouvimos, planejamos e criamos projetos personalizados, com curadoria de peças selecionadas, decoração autoral e um buffet que encanta todos os sentidos.</p>
            <div className="signature">Ateliê Del Rio</div>
            <a className="button button--wine" href="#contato">Conheça nossa história</a>
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
          <div className="portfolio__footer"><a className="button button--wine" href="#contato">Ver portfólio completo</a></div>
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
        <div className="site-shell testimonial">
          <span className="testimonial__quote">“</span>
          <blockquote>O Ateliê Del Rio transformou nosso sonho em uma celebração ainda mais bonita do que imaginávamos.</blockquote>
          <p className="testimonial__author">Mariana & Rafael</p>
          <span className="testimonial__event">Casamento</span>
          <div className="testimonial__dots" aria-hidden="true"><b /><i /><i /><i /><i /></div>
        </div>
      </section>

      <section className="cta-section" id="contato">
        <div className="site-shell cta">
          <Photo crop="cta-photo" label="Buquê de rosas em tons suaves" />
          <div className="cta__content"><h2>Vamos criar algo inesquecível juntos?</h2><p>Conte-nos sobre o seu evento e receba uma proposta personalizada.</p></div>
          <a className="button button--wine cta__button" href={whatsapp} target="_blank" rel="noreferrer">◉&nbsp; Falar pelo WhatsApp</a>
        </div>
      </section>

      <footer className="footer">
        <div className="site-shell footer__grid">
          <div className="footer__brand">
            <Logo compact />
            <p>Decorações autorais, locações selecionadas e buffet impecável para eventos que ficam na memória.</p>
            <div className="footer__socials"><a href="https://instagram.com" aria-label="Instagram">◎</a><a href={whatsapp} aria-label="WhatsApp">◉</a><a href="https://facebook.com" aria-label="Facebook">f</a></div>
          </div>
          <div><h3>Navegação</h3><a href="#inicio">Início</a><a href="#sobre">Sobre</a><a href="#servicos">Serviços</a><a href="#portfolio">Portfólio</a><a href="#depoimentos">Depoimentos</a><a href="#contato">Contato</a></div>
          <div><h3>Serviços</h3><span>Decoração de eventos</span><span>Locação de peças</span><span>Buffet</span><span>Assessoria completa</span><span>Eventos corporativos</span><span>Mini weddings</span></div>
          <div><h3>Contato</h3><a href="tel:+5511999999999">☎ &nbsp;(11) 99999-9999</a><a href="mailto:contato@ateliedelrio.com.br">✉ &nbsp;contato@ateliedelrio.com.br</a><span>⌖ &nbsp;São Paulo – SP</span><span>◷ &nbsp;Atendimento: Seg a Sex, 9h às 18h</span></div>
        </div>
        <div className="site-shell footer__bottom">© 2026 Ateliê Del Rio. Todos os direitos reservados.</div>
      </footer>
    </main>
  );
}
