"use client";

import { motion } from "framer-motion";
import { CAR } from "@/data/carData";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export default function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang].footer;

  return (
    <footer
      className="relative py-16 px-8 md:px-16"
      style={{ background: "#0A0A0A" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, #D4AF37 30%, #D4AF37 70%, transparent)", opacity: 0.5 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
      >
        <div className="flex flex-col gap-3">
          <div
            className="text-white text-2xl font-black tracking-[0.4em] uppercase"
            style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
          >
            AMG
          </div>
          <p
            className="text-amg-gold text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
          >
            {CAR.units} {t.unitsSold}
          </p>
          <p
            className="text-amg-silver/40 text-xs"
            style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
          >
            {CAR.name} — {CAR.year}
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2">
          <a
            href="https://volna.today"
            target="_blank"
            rel="noreferrer"
            className="text-amg-gold text-xs tracking-[0.28em] uppercase transition-opacity duration-300 hover:opacity-100 opacity-90"
            style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
          >
            VOLNA Inteligencia Criativa
          </a>
          <p
            className="text-amg-silver/40 text-xs tracking-[0.15em]"
            style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
          >
            &copy; {new Date().getFullYear()} Mercedes-AMG GmbH. {t.rights}
          </p>
          <p
            className="text-amg-silver/30 text-xs"
            style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
          >
            Affalterbach, Germany.
          </p>
        </div>
      </motion.div>

      {/* Big background text */}
      <div
        className="absolute bottom-0 right-0 overflow-hidden pointer-events-none select-none"
        aria-hidden
      >
        <span
          className="text-[clamp(4rem,12vw,10rem)] font-black leading-none"
          style={{
            fontFamily: "var(--font-orbitron), sans-serif",
            color: "rgba(255,255,255,0.02)",
          }}
        >
          ONE
        </span>
      </div>
    </footer>
  );
}
