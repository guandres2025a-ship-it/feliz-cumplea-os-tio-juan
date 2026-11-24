"use client";

import { useState } from "react";
import { Music2, PartyPopper, Sparkles, Volume2, VolumeX, Cake, Heart, Guitar, Star, ChevronDown } from "lucide-react";

const stats = [
  { label: "Nivel de recocha", value: "Legendario", score: 100 },
  { label: "Años de experiencia", value: "42 temporadas", score: 100 },
  { label: "Seriedad", value: "En actualización", score: 12 },
  { label: "Cariño de la familia", value: "No tiene medida", score: 100 },
];

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [message, setMessage] = useState(false);
  const [musicOn, setMusicOn] = useState(false);

  return (
    <main>
      <div className="grain" aria-hidden="true" />
      <nav className="topbar">
        <a className="brand" href="#inicio"><span className="brand-mark">JJ</span><span>LA PARRANDA <b>42</b></span></a>
        <button className="sound-toggle" onClick={() => setMusicOn(!musicOn)} aria-label={musicOn ? "Desactivar ambiente" : "Activar ambiente"}>
          {musicOn ? <Volume2 size={16}/> : <VolumeX size={16}/>}<span>{musicOn ? "AMBIENTE ACTIVADO" : "ACTIVAR AMBIENTE"}</span>
        </button>
      </nav>

      <section className="hero" id="inicio">
        <div className="hero-glow glow-one" /><div className="hero-glow glow-two" />
        <div className="hero-content">
          <div className="eyebrow"><span className="live-dot"/> HOY LA FAMILIA ESTÁ DE FIESTA</div>
          <div className="number-wrap"><span className="since">EDICIÓN ESPECIAL</span><span className="number">42</span><span className="years">AÑOS DE HISTORIAS</span></div>
          <p className="hero-kicker">SE DESBLOQUEÓ UN NUEVO NIVEL</p>
          <h1>JUAN <em>JOSÉ</em></h1>
          <p className="hero-copy">El menor de los tíos, pero grande en recocha.<br/>Hoy el acordeón suena por cuenta tuya.</p>
          <button className="primary-button" onClick={() => { setEntered(true); document.getElementById("celebracion")?.scrollIntoView({ behavior: "smooth" }); }}>
            <PartyPopper size={17}/> {entered ? "¡QUE SIGA LA PARRANDA!" : "ENTRAR A LA PARRANDA"} <span>↗</span>
          </button>
          <div className="scroll-cue"><span>DESLIZA Y DESCUBRE</span><ChevronDown size={15}/></div>
        </div>
        <div className="floating-note note-a">♪</div><div className="floating-note note-b">♫</div><div className="floating-note note-c">♬</div>
        <div className="hero-bottom"><span>HECHO EN FAMILIA</span><span className="bottom-star">✳</span><span>CON MUCHO CARIÑO · COLOMBIA</span></div>
      </section>

      <section className="intro section-pad" id="celebracion">
        <div className="section-label"><span>01</span> EL HOMENAJE</div>
        <div className="intro-grid">
          <div><p className="overline">ATENCIÓN, FAMILIA...</p><h2>Hay cumpleaños.<br/>Y luego están <em>los de Juan.</em></h2></div>
          <div className="intro-text"><p>Hoy cumple años ese tío que siempre tiene una ocurrencia lista, una sonrisa contagiosa y el talento especial de convertir cualquier reunión en una buena historia.</p><p>Juan José, que la vida te siga regalando motivos para reír, salud para disfrutar y familia para compartir.</p><div className="signature">Con cariño, tu familia <Heart size={15} fill="currentColor"/></div></div>
        </div>
      </section>

      <section className="stats-section section-pad">
        <div className="section-label"><span>02</span> EXPEDIENTE DEL CUMPLEAÑERO</div>
        <div className="stats-heading"><h2>42 años de<br/><em>pura categoría.</em></h2><p>Datos recopilados por la familia.<br/>Rigurosidad científica: discutible.</p></div>
        <div className="stats-list">{stats.map((item, i) => <div className="stat-row" key={item.label}><span className="stat-index">0{i+1}</span><div className="stat-main"><div className="stat-top"><span>{item.label}</span><b>{item.value}</b></div><div className="meter"><span style={{width: item.score + "%"}}/></div></div><Sparkles className="stat-spark" size={17}/></div>)}</div>
        <p className="small-joke">* La familia se reserva el derecho de agregar anécdotas después de la segunda canción.</p>
      </section>

      <section className="parranda section-pad">
        <div className="parranda-orb"><Guitar size={48} strokeWidth={1}/><span>♫</span></div>
        <p className="overline">QUE SE ESCUCHE HASTA LA ESQUINA</p>
        <h2>¡Que suenen<br/><em>los acordeones!</em></h2>
        <p className="parranda-copy">Que no falte el vallenato, que sobren las sonrisas y que cada canción traiga un recuerdo bonito.</p>
        <div className="music-bars" aria-label="Decoración musical"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
        <div className="music-caption"><Music2 size={14}/> MODO PARRANDA: ACTIVADO EN EL CORAZÓN</div>
      </section>

      <section className="message-section section-pad">
        <div className="section-label"><span>03</span> UN MENSAJE PARA TI</div>
        <div className="message-card">
          <div className="card-stars"><Star/><Star/><Star/></div>
          <Cake size={34} strokeWidth={1.2} className="cake-icon"/>
          <p className="overline">JUAN JOSÉ · 42 VUELTAS AL SOL</p>
          <h2>La mejor parte<br/>de la fiesta es <em>tenerte.</em></h2>
          <p className="message-copy">Gracias por las risas, por la buena energía y por ser ese tío que le pone sabor a las reuniones familiares. Que este nuevo año venga cargado de salud, bendiciones, alegrías y muchas razones para celebrar.</p>
          <button className="reveal-button" onClick={() => setMessage(!message)}>{message ? "CERRAR MENSAJE" : "ABRIR UN ÚLTIMO MENSAJE"} <span>✳</span></button>
          {message && <div className="revealed">¡Feliz cumpleaños, Juan José! Que nunca se te acaben las ganas de vivir, la alegría de compartir y esa recocha que te hace único. ¡Te queremos mucho! <b>— Tu familia ❤️</b></div>}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-symbol">42<span>✳</span></div>
        <h2>¡FELIZ CUMPLEAÑOS,<br/><em>JUAN JOSÉ!</em></h2>
        <p>Que sean muchos más, llenos de salud, alegría y parranda.</p>
        <div className="footer-rule"/><div className="footer-meta"><span>UN REGALO HECHO EN FAMILIA</span><span>CON TODO EL CARIÑO ✳</span></div>
      </footer>
    </main>
  );
}
