import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import MusicPlayer from "../components/MusicPlayer";

export const metadata: Metadata = {
  title: "Juan José 42 — La parranda",
  description: "Una celebración hecha con cariño para Juan José. ¡Que suenen los acordeones!",
  openGraph: {
    title: "Juan José 42 — La parranda",
    description: "Hoy se celebra una leyenda familiar. ¡Feliz cumpleaños, Juan José!",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body><MusicPlayer />{children}<Script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js" strategy="afterInteractive" /></body>
    </html>
  );
}
