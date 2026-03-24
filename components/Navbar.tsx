"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage, type Lang } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang } = useLanguage();
  const t = translations[lang].nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 h-16"
      style={{
        background: scrolled
          ? "rgba(10, 10, 10, 0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(212, 175, 55, 0.15)" : "none",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease, border-bottom 0.4s ease",
      }}
    >
      {/* Logo */}
      <div
        className="text-white tracking-[0.4em] text-sm font-black uppercase"
        style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
      >
        AMG
      </div>

      {/* Right side: Language selector + CTA */}
      <div className="flex items-center gap-4">
        {/* Language selector */}
        <div
          className="flex items-center gap-1"
          style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
        >
          {(["pt", "en"] as Lang[]).map((l, i) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className="text-xs tracking-[0.2em] uppercase font-semibold transition-colors duration-200 px-1"
              style={{
                color: lang === l ? "#D4AF37" : "rgba(192,192,192,0.4)",
                cursor: lang === l ? "default" : "pointer",
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div
          className="w-[1px] h-4"
          style={{ background: "rgba(212,175,55,0.3)" }}
        />

        {/* CTA */}
        <a
          href="#inquire"
          className="relative group px-6 py-2 text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-300"
          style={{
            fontFamily: "var(--font-rajdhani), sans-serif",
            border: "1px solid #D4AF37",
            color: "#D4AF37",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#D4AF37";
            (e.currentTarget as HTMLElement).style.color = "#0A0A0A";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "#D4AF37";
          }}
        >
          {t.inquire}
        </a>
      </div>
    </motion.nav>
  );
}
