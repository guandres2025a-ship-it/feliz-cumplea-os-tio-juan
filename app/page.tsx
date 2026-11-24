"use client";

import { useEffect, useState } from "react";
import {
  PartyPopper, Sparkles, Cake, Heart, Guitar, Star, ChevronDown,
  Laugh, CalendarDays, ShieldCheck, Infinity as InfinityIcon
} from "lucide-react";

const stats = [
  { number: "01", category: "ESPECIALIDAD", label: "Nivel de recocha", value: "Legendario", footer: "RANGO FAMILIAR", icon: PartyPopper, accent: "gold" },
  { number: "02", category: "TRAYECTORIA", label: "Años de experiencia", value: "42 temporadas", footer: "EDICIÓN ESPECIAL · 42/42", icon: CalendarDays, accent: "orange" },
  { number: "03", category: "COMPORTAMIENTO", label: "Seriedad", value: "En actualización", footer: "ESTADO DEL SISTEMA · 12%", icon: Laugh, accent: "red" },
  { number: "04", category: "PATRIMONIO FAMILIAR", label: "Cariño de la familia", value: "Sin medida", footer: "VALOR INCALCULABLE", icon: Heart, accent: "gold" },
];

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = document.querySelectorAll<HTMLElement>(".reveal");

    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    } else {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });

      revealItems.forEach((item) => revealObserver.observe(item));
    }

    const progress = document.getElementById("scrollProgress");
    let ticking = false;

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      if (progress) progress.style.width = `${percentage}%`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();

    const finalSection = document.getElementById("mensaje");
    let confettiObserver: IntersectionObserver | undefined;
    let confettiTriggered = false;

    if (finalSection && !reducedMotion && "IntersectionObserver" in window) {
      confettiObserver = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting) && !confettiTriggered) {
          confettiTriggered = true;
          const launch = () => {
            const confetti = (window as Window & { confetti?: (options: Record<string, unknown>) => void }).confetti;
            if (!confetti) return;
            confetti({
              particleCount: 105, spread: 82, startVelocity: 38,
              origin: { y: 0.65 },
              colors: ["#d9ad64", "#f4d79f", "#f08b42", "#c94b39", "#fff2d6"]
            });
            window.setTimeout(() => {
              confetti({ particleCount: 48, angle: 60, spread: 65, origin: { x: 0, y: 0.68 }, colors: ["#d9ad64", "#f08b42", "#f4d79f"] });
              confetti({ particleCount: 48, angle: 120, spread: 65, origin: { x: 1, y: 0.68 }, colors: ["#d9ad64", "#c94b39", "#f4d79f"] });
            }, 220);
          };

          if ((window as Window & { confetti?: unknown }).confetti) {
            launch();
          } else {
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js";
            script.onload = launch;
            document.head.appendChild(script);
          }
          confettiObserver?.disconnect();
        }
      }, { threshold: 0.28 });
      confettiObserver.observe(finalSection);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateProgress);
      confettiObserver?.disconnect();
    };
  }, []);

  return (
    <main>
      <div className="scroll-progress" aria-hidden="true"><div id="scrollProgress" className="scroll-progress__bar" /></div>
      <div className="grain" aria-hidden="true" />

      <nav className="topbar">
        <a className="brand" href="#inicio">
          <span className="brand-mark">JJ</span>
          <span>LA PARRANDA <b>42</b></span>
        </a>
      </nav>

      <section className="hero" id="inicio">
        <div className="hero-glow glow-one" /><div className="hero-glow glow-two" />
        <div className="hero-content">
          <div className="eyebrow"><span className="live-dot" /> HOY LA FAMILIA ESTÁ DE FIESTA</div>
          <div className="number-wrap"><span className="since">EDICIÓN ESPECIAL</span><span className="number">42</span><span className="years">AÑOS DE HISTORIAS</span></div>
          <p className="hero-kicker">SE DESBLOQUEÓ UN NUEVO NIVEL</p>
          <h1>JUAN <em>JOSÉ</em></h1>
          <p className="hero-copy">El menor de los tíos, pero grande en recocha.<br />Hoy el acordeón suena por cuenta tuya.</p>
          <button className="primary-button" onClick={() => { setEntered(true); document.getElementById("celebracion")?.scrollIntoView({ behavior: "smooth" }); }}>
            <PartyPopper size={17} /> {entered ? "¡QUE SIGA LA PARRANDA!" : "ENTRAR A LA PARRANDA"} <span>↗</span>
          </button>
          <div className="scroll-cue"><span>DESLIZA Y DESCUBRE</span><ChevronDown size={15} /></div>
        </div>
        <div className="floating-note note-a" aria-hidden="true">♪</div><div className="floating-note note-b" aria-hidden="true">♫</div><div className="floating-note note-c" aria-hidden="true">♬</div>
        <div className="hero-bottom"><span>HECHO EN FAMILIA</span><span className="bottom-star">✳</span><span>CON MUCHO CARIÑO · COLOMBIA</span></div>
      </section>

      <section className="intro section-pad" id="celebracion">
        <div className="section-label reveal"><span>01</span> EL HOMENAJE</div>
        <div className="intro-grid">
          <div className="reveal"><p className="overline">ATENCIÓN, FAMILIA...</p><h2>Hay cumpleaños.<br />Y luego están <em>los de Juan.</em></h2></div>
          <div className="intro-text reveal"><p>Hoy cumple años ese tío que siempre tiene una ocurrencia lista, una sonrisa contagiosa y el talento especial de convertir cualquier reunión en una buena historia.</p><p>Juan José, que la vida te siga regalando motivos para reír, salud para disfrutar y familia para compartir.</p><div className="signature">Con cariño, tu familia <Heart size={15} fill="currentColor" /></div></div>
        </div>
      </section>

      <section className="stats-section section-pad" id="expediente">
        <div className="section-label reveal"><span>02</span> EXPEDIENTE DEL CUMPLEAÑERO</div>
        <div className="stats-heading reveal">
          <div><p className="overline">DOCUMENTO CONFIDENCIAL · FAMILIA</p><h2>42 años de<br /><em>pura categoría.</em></h2></div>
          <p>Datos recopilados por la familia.<br />Rigurosidad científica: discutible.</p>
        </div>
        <div className="stats-grid">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <article className={`stat-card reveal stat-card--${item.accent}`} key={item.number} style={{ transitionDelay: `${index * 90}ms` }}>
                <span className="stat-number" aria-hidden="true">{item.number}</span>
                <div className="stat-icon"><Icon size={23} strokeWidth={1.6} /></div>
                <p className="stat-category">{item.category}</p>
                <h3>{item.label}</h3>
                <p className="stat-value">{item.value}</p>
                <div className="stat-footer"><span>{item.footer}</span><span className="stat-spark" aria-hidden="true">{index === 2 ? "↗" : index === 3 ? <InfinityIcon size={17} /> : "✦"}</span></div>
              </article>
            );
          })}
        </div>
        <p className="small-joke reveal">* La familia se reserva el derecho de agregar anécdotas después de la segunda canción.</p>
      </section>

      <section className="parranda section-pad">
        <div className="parranda-orb reveal"><Guitar size={48} strokeWidth={1} /><span>♫</span></div>
        <p className="overline reveal">QUE SE ESCUCHE HASTA LA ESQUINA</p>
        <h2 className="reveal">¡Que suenen<br /><em>los acordeones!</em></h2>
        <p className="parranda-copy reveal">Que no falte el vallenato, que sobren las sonrisas y que cada canción traiga un recuerdo bonito.</p>
        <div className="music-bars" aria-label="Decoración musical"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
        <div className="music-caption"><Sparkles size={14} /> MODO PARRANDA: ACTIVADO EN EL CORAZÓN</div>
      </section>

      <section className="message-section section-pad" id="mensaje">
        <div className="section-label reveal"><span>03</span> UN MENSAJE PARA TI</div>
        <div className="message-card reveal">
          <div className="card-stars"><Star /><Star /><Star /></div>
          <Cake size={34} strokeWidth={1.2} className="cake-icon" />
          <p className="overline">JUAN JOSÉ · 42 VUELTAS AL SOL</p>
          <h2>La mejor parte<br />de la fiesta es <em>tenerte.</em></h2>
          <p className="message-copy">Gracias por las risas, por la buena energía y por ser ese tío que le pone sabor a las reuniones familiares. Que este nuevo año venga cargado de salud, bendiciones, alegrías y muchas razones para celebrar.</p>
          <button className="reveal-button" onClick={() => setMessage(!message)} aria-expanded={message} aria-controls="revealedMessage">{message ? "CERRAR MENSAJE" : "ABRIR UN ÚLTIMO MENSAJE"} <span>✳</span></button>
          {message && <div className="revealed" id="revealedMessage">¡Feliz cumpleaños, Juan José! Que nunca se te acaben las ganas de vivir, la alegría de compartir y esa recocha que te hace único. ¡Te queremos mucho! <b>— Tu familia ❤️</b></div>}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-symbol">42<span>✳</span></div>
        <h2>¡FELIZ CUMPLEAÑOS,<br /><em>JUAN JOSÉ!</em></h2>
        <p>Que sean muchos más, llenos de salud, alegría y parranda.</p>
        <div className="footer-rule" /><div className="footer-meta"><span>UN REGALO HECHO EN FAMILIA</span><span>CON TODO EL CARIÑO ✳</span></div>
      </footer>
    </main>
  );
}
