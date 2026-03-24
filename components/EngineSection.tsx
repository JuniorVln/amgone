"use client";

import { motion } from "framer-motion";
import { CAR } from "@/data/carData";

export default function EngineSection() {
  return (
    <section
      className="relative py-24 md:py-36 px-8 md:px-16"
      style={{ background: "#0A0A0A" }}
    >
      <div className="h-[1px] w-full mb-16" style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)", opacity: 0.25 }} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <p
              className="text-amg-gold tracking-[0.4em] text-xs uppercase font-semibold mb-3"
              style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
            >
              Power Unit
            </p>
            <h2
              className="text-3xl md:text-5xl font-black text-white leading-tight"
              style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
            >
              {CAR.engine.title}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="h-[1px] w-16 mb-6" style={{ background: "#D4AF37", opacity: 0.6 }} />
            <p
              className="text-amg-silver/80 text-base leading-relaxed"
              style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
            >
              {CAR.engine.description}
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col gap-4">
          {CAR.engine.specs.map((spec, i) => (
            <motion.div
              key={spec}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-start gap-4 p-4"
              style={{ border: "1px solid rgba(42,42,42,0.8)", background: "rgba(17,17,17,0.4)" }}
            >
              <div className="flex flex-col items-center gap-1 shrink-0 mt-1">
                <div className="w-1 h-1 bg-amg-gold" />
                <div className="w-[1px] h-6 bg-amg-gold/30" />
              </div>
              <p
                className="text-amg-silver/80 text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-rajdhani), sans-serif", fontWeight: 500 }}
              >
                {spec}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Aero section */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-24"
      >
        <div className="h-[1px] w-full mb-12" style={{ background: "linear-gradient(90deg, #D4AF37, transparent)", opacity: 0.3 }} />
        <p
          className="text-amg-gold tracking-[0.4em] text-xs uppercase font-semibold mb-3"
          style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
        >
          Aerodynamics
        </p>
        <h3
          className="text-2xl md:text-4xl font-black text-white mb-8"
          style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
        >
          {CAR.aero.title}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CAR.aero.features.map((feat, i) => (
            <motion.div
              key={feat}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex items-start gap-3 p-4 group"
              style={{ border: "1px solid rgba(42,42,42,0.6)" }}
            >
              <div className="w-4 h-[1px] bg-amg-gold mt-2 shrink-0 group-hover:w-6 transition-all duration-300" />
              <p
                className="text-amg-silver/80 text-sm"
                style={{ fontFamily: "var(--font-rajdhani), sans-serif", fontWeight: 500 }}
              >
                {feat}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
