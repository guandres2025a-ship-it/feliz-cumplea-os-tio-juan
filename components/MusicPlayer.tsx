"use client";

import { useEffect, useRef, useState } from "react";
import { Music2, Volume2, VolumeX } from "lucide-react";

const VIDEO_ID = "40AJMQob25o";

export default function MusicPlayer() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // YouTube intenta iniciar la canción en silencio: los navegadores suelen
    // permitir autoplay silenciado, pero pueden bloquear el audio con sonido.
    const timer = window.setTimeout(() => {
      frameRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: "playVideo", args: [] }),
        "https://www.youtube.com"
      );
    }, 1200);

    return () => window.clearTimeout(timer);
  }, []);

  const toggleSound = () => {
    const player = frameRef.current?.contentWindow;
    if (!player) return;

    const command = enabled ? "mute" : "unMute";
    player.postMessage(
      JSON.stringify({ event: "command", func: command, args: [] }),
      "https://www.youtube.com"
    );
    player.postMessage(
      JSON.stringify({ event: "command", func: "playVideo", args: [] }),
      "https://www.youtube.com"
    );
    setEnabled(!enabled);
  };

  return (
    <>
      <iframe
        ref={frameRef}
        className="music-player-frame"
        title="Vallenato para el cumpleaños de Juan José"
        src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${VIDEO_ID}&playsinline=1&enablejsapi=1&rel=0`}
        allow="autoplay; encrypted-media; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <button
        className={`music-player-toggle ${enabled ? "is-playing" : ""}`}
        onClick={toggleSound}
        type="button"
        aria-label={enabled ? "Silenciar vallenato" : "Activar vallenato"}
      >
        {enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        <span>{enabled ? "PARRANDA ACTIVADA" : "ACTIVAR LA PARRANDA"}</span>
        <Music2 size={15} />
      </button>
    </>
  );
}
