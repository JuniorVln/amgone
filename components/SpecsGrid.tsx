"use client";

import { motion } from "framer-motion";
import { CAR } from "@/data/carData";

const specs = [
  { val: CAR.performance.power.value, unit: CAR.performance.power.unit, label: CAR.performance.power.label },
  { val: CAR.performance.topSpeed.value, unit: CAR.performance.topSpeed.unit, label: CAR.performance.topSpeed.label },
  { val: CAR.performance.acceleration.value, unit: CAR.performance.acceleration.unit, label: CAR.performance.acceleration.label },
  { val: CAR.performance.torque.value, unit: CAR.performance.torque.unit, label: CAR.performance.torque.label },
  { val: CAR.performance.acceleration200.value, unit: CAR.performance.acceleration200.unit, label: CAR.performance.acceleration200.label },
  { val: CAR.performance.revLimit.value, unit: CAR.performance.revLimit.unit, label: CAR.performance.revLimit.label },
];

export default function SpecsGrid() {
  return (
    <section className="relative py-24 md:py-32 px-8 md:px-16" style={{ background: "#0A0A0A" }}>
      {/* Top border */}
      <div className="h-[1px] w-full mb-16" style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)", opacity: 0.4 }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p
          className="text-amg-gold tracking-[0.4em] text-xs uppercase font-semibold mb-3"
          style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
        >
          Technical Specification
        </p>
        <h2
          className="text-3xl md:text-5xl font-black text-white"
          style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
        >
          Numbers That<br />Define Legend
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ border: "1px solid rgba(42,42,42,0.8)" }}>
        {specs.map((spec, i) => (
          <motion.div
            key={spec.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between p-6 md:p-8 relative group"
            style={{ background: "#0A0A0A", border: "1px solid rgba(42,42,42,0.6)" }}
          >
            {/* Gold corner accent on hover */}
            <div
              className="absolute top-0 left-0 w-8 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "#D4AF37" }}
            />
            <div
              className="absolute top-0 left-0 w-[1px] h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "#D4AF37" }}
            />

            <p
              className="text-amg-gold text-[0.6rem] tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
            >
              {spec.label}
            </p>

            <div className="flex items-end gap-2">
              <span
                className="text-3xl md:text-5xl font-black text-white leading-none"
                style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
              >
                {spec.val}
              </span>
              <span
                className="text-amg-gold text-sm font-bold tracking-widest mb-1"
                style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
              >
                {spec.unit}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Dimensions row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {Object.entries(CAR.dimensions).map(([key, val]) => (
          <div key={key} className="flex flex-col gap-1 border-t pt-4" style={{ borderColor: "rgba(42,42,42,1)" }}>
            <p
              className="text-amg-gold text-[0.6rem] tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </p>
            <p
              className="text-white text-base font-semibold"
              style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
            >
              {val}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
