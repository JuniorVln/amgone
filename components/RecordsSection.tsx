"use client";

import { motion } from "framer-motion";
import { CAR } from "@/data/carData";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export default function RecordsSection() {
  const { lang } = useLanguage();
  const t = translations[lang].records;

  const otherRecords = CAR.records.slice(1).map((record, i) => ({
    ...record,
    note: t.notes[i] ?? record.note,
  }));

  return (
    <section
      className="relative py-24 md:py-36 px-8 md:px-16 overflow-hidden"
      style={{ background: "#0D0D0D" }}
    >
      {/* Background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="text-[clamp(8rem,25vw,22rem)] font-black leading-none"
          style={{
            fontFamily: "var(--font-orbitron), sans-serif",
            color: "rgba(212,175,55,0.03)",
            whiteSpace: "nowrap",
          }}
        >
          RECORD
        </span>
      </div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p
            className="text-amg-gold tracking-[0.4em] text-xs uppercase font-semibold mb-3"
            style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
          >
            {t.sectionLabel}
          </p>
          <h2
            className="text-3xl md:text-5xl font-black text-white"
            style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
          >
            {t.sectionTitle}
          </h2>
        </motion.div>

        {/* Nürburgring hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 relative"
        >
          <div className="h-[1px] mb-8" style={{ background: "linear-gradient(90deg, #D4AF37, transparent)", opacity: 0.5 }} />
          <p
            className="text-amg-silver/60 tracking-[0.3em] text-xs uppercase mb-2"
            style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
          >
            Nürburgring Nordschleife
          </p>
          <div
            className="text-[clamp(4rem,14vw,12rem)] font-black text-white leading-none"
            style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
          >
            6:29.09
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="h-[1px] w-12" style={{ background: "#D4AF37", opacity: 0.6 }} />
            <p
              className="text-amg-gold text-xs tracking-[0.25em] uppercase font-semibold"
              style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
            >
              {t.fastestCar}
            </p>
          </div>
        </motion.div>

        {/* Other records */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherRecords.map((record, i) => (
            <motion.div
              key={record.track}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-6"
              style={{ border: "1px solid rgba(42,42,42,0.8)", background: "rgba(17,17,17,0.6)" }}
            >
              <div className="absolute top-0 left-0 w-6 h-[1px]" style={{ background: "#D4AF37" }} />
              <div className="absolute top-0 left-0 w-[1px] h-6" style={{ background: "#D4AF37" }} />

              <p
                className="text-amg-silver/50 text-xs tracking-[0.25em] uppercase mb-2"
                style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
              >
                {record.track}
              </p>
              <div
                className="text-3xl md:text-4xl font-black text-white mb-2"
                style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
              >
                {record.time}
              </div>
              <p
                className="text-amg-gold text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
              >
                {record.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
