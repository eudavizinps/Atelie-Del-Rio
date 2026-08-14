import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:5173";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    title: "Ateliê Del Rio | Decorações, Locações & Buffet",
    description: "Eventos únicos com decoração autoral, locações selecionadas e buffet memorável em São Paulo.",
    icons: { icon: "/logo-original.jpeg", shortcut: "/logo-original.jpeg" },
    openGraph: {
      title: "Ateliê Del Rio | Decorações, Locações & Buffet",
      description: "Momentos inesquecíveis começam nos detalhes.",
      url: origin,
      siteName: "Ateliê Del Rio",
      locale: "pt_BR",
      type: "website",
      images: [{ url: `${origin}/og.png`, width: 1536, height: 864, alt: "Ateliê Del Rio — Decorações, Locações & Buffet" }],
    },
    twitter: { card: "summary_large_image", title: "Ateliê Del Rio", description: "Momentos inesquecíveis começam nos detalhes.", images: [`${origin}/og.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
