import type { Metadata } from "next";
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
      <body><MusicPlayer />{children}</body>
    </html>
  );
}
