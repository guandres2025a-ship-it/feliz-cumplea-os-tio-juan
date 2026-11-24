"use client";

import { useEffect, useRef, useState } from "react";
import { Music2, Volume2, VolumeX } from "lucide-react";

const VIDEO_ID = "40AJMQob25o";

type YouTubePlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  setVolume: (volume: number) => void;
  destroy: () => void;
};

type YouTubeApi = {
  Player: new (
    element: HTMLElement,
    options: {
      videoId: string;
      playerVars?: Record<string, number>;
      events?: {
        onReady?: (event: { target: YouTubePlayer }) => void;
        onStateChange?: (event: { data: number; target: YouTubePlayer }) => void;
        onError?: (event: { data: number }) => void;
      };
    }
  ) => YouTubePlayer;
};

declare global {
  interface Window {
    YT?: YouTubeApi;
  }
}

export default function MusicPlayer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let pollId: number | undefined;

    const createPlayer = () => {
      if (cancelled || !mountRef.current || !window.YT?.Player || playerRef.current) return;

      playerRef.current = new window.YT.Player(mountRef.current, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
          playlist: VIDEO_ID,
          mute: 1,
          playsinline: 1,
          rel: 0,
          enablejsapi: 1
        },
        events: {
          onReady: (event) => {
            event.target.mute();
            event.target.setVolume(75);
            event.target.playVideo();
            setReady(true);
            setMuted(true);
          },
          onStateChange: (event) => {
            setPlaying(event.data === 1);
          },
          onError: () => {
            setError(true);
            setReady(false);
          }
        }
      });
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);
    }

    pollId = window.setInterval(() => {
      if (window.YT?.Player) {
        if (pollId) window.clearInterval(pollId);
        createPlayer();
      }
    }, 100);

    return () => {
      cancelled = true;
      if (pollId) window.clearInterval(pollId);
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  const toggleSound = () => {
    const player = playerRef.current;
    if (!player || !ready) return;

    if (muted) {
      // Estas órdenes se ejecutan directamente desde el clic del usuario,
      // que es el gesto requerido por los navegadores para permitir sonido.
      player.unMute();
      player.setVolume(75);
      player.playVideo();
      setMuted(false);
    } else {
      player.mute();
      setMuted(true);
    }
  };

  return (
    <>
      <div className="music-player-host" aria-hidden="true">
        <div ref={mountRef} />
      </div>
      <button
        className={`music-player-toggle ${playing && !muted ? "is-playing" : ""}`}
        onClick={toggleSound}
        type="button"
        disabled={!ready || error}
        aria-label={error ? "No se pudo cargar la canción" : muted ? "Activar el sonido del vallenato" : "Silenciar el vallenato"}
        aria-pressed={!muted}
        title={error ? "YouTube no permitió cargar esta canción" : !ready ? "Preparando la música…" : muted ? "Activar la parranda" : "Silenciar la música"}
      >
        {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        <span>{error ? "MÚSICA NO DISPONIBLE" : !ready ? "PREPARANDO PARRANDA" : muted ? "ACTIVAR LA PARRANDA" : "PARRANDA ACTIVADA"}</span>
        <Music2 size={15} />
      </button>
    </>
  );
}
