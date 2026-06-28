import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata = {
  title: "STUCHEWRLD Inc. — Cinematic Storytelling",
  description:
    "Every brand has a story. We bring yours to life through cinematic storytelling that resonates long after the screen goes dark.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body
        style={{ fontFamily: "var(--font-body), Inter, sans-serif" }}
        className="min-h-screen bg-[#0A0A0A] text-[#E8E8E8] antialiased"
      >
        {children}
      </body>
    </html>
  );
}
