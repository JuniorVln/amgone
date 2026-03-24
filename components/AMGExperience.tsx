"use client";

import { useEffect, useState } from "react";
import { MotionValue, useTransform, motion, AnimatePresence } from "framer-motion";
import { CAR } from "@/data/carData";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

interface Props {
  scrollYProgress: MotionValue<number>;
}

function itemAnim(delay = 0) {
  return {
    initial: { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: "easeOut" as const } },
    exit: { opacity: 0, y: -14, transition: { duration: 0.32 } },
  };
}

function fadeAnim(delay = 0) {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, delay } },
    exit: { opacity: 0, transition: { duration: 0.28 } },
  };
}

function GoldRule({ className = "", reverse = false }: { className?: string; reverse?: boolean }) {
  return (
    <div
      className={`h-[1px] ${className}`}
      style={{
        background: reverse
          ? "linear-gradient(270deg, #D4AF37 0%, transparent 100%)"
          : "linear-gradient(90deg, #D4AF37 0%, transparent 100%)",
        opacity: 0.6,
      }}
    />
  );
}

function AMGMark({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${reverse ? "flex-row-reverse" : ""}`}>
      <span
        className="text-white text-xs tracking-[0.45em] font-black uppercase"
        style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
      >
        AMG
      </span>
      <GoldRule className="w-12" reverse={reverse} />
    </div>
  );
}

function HeroPhase() {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <motion.div
      key="hero"
      className="absolute inset-0 flex flex-col justify-end pb-16 px-8 md:px-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-3 max-w-2xl">
          <motion.div {...fadeAnim(0)}>
            <AMGMark />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.65, delay: 0.1, ease: "easeOut" } }}
            exit={{ opacity: 0, y: -16, transition: { duration: 0.32 } }}
          >
            <div
              className="text-[clamp(5rem,18vw,16rem)] font-black text-white leading-none"
              style={{ fontFamily: "var(--font-orbitron), sans-serif", letterSpacing: "-0.02em" }}
            >
              ONE
            </div>
          </motion.div>

          <motion.p
            {...itemAnim(0.2)}
            className="text-amg-gold tracking-[0.35em] text-xs uppercase font-semibold"
            style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
          >
            {t.hero.tagline}
          </motion.p>

          <motion.div {...itemAnim(0.3)} className="mt-1">
            <GoldRule className="w-24 mb-3" />
            <p
              className="text-amg-silver text-sm md:text-base leading-relaxed tracking-wide max-w-lg"
              style={{ fontFamily: "var(--font-rajdhani), sans-serif", fontWeight: 400 }}
            >
              {t.hero.description}
            </p>
          </motion.div>
        </div>

        <motion.div {...fadeAnim(0.4)} className="hidden md:block">
          <span
            className="text-[9rem] font-black leading-none select-none"
            style={{ fontFamily: "var(--font-orbitron), sans-serif", color: "rgba(255,255,255,0.04)" }}
          >
            01
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

function PerformancePhase() {
  const { lang } = useLanguage();
  const t = translations[lang].performance;

  return (
    <motion.div
      key="performance"
      className="absolute inset-0 flex flex-col justify-center px-8 md:px-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col max-w-3xl">
          <motion.div {...fadeAnim(0)}>
            <AMGMark />
          </motion.div>

          <motion.p
            {...itemAnim(0.08)}
            className="text-amg-gold tracking-[0.35em] text-xs uppercase font-semibold mt-4"
            style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
          >
            {t.sectionLabel}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.65, ease: "easeOut" } }}
            exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.35 } }}
            className="flex items-end gap-4 mt-1"
          >
            <span
              className="text-[clamp(4.5rem,19vw,17rem)] font-black text-white leading-none"
              style={{ fontFamily: "var(--font-orbitron), sans-serif", letterSpacing: "-0.02em" }}
            >
              352
            </span>
            <div className="flex flex-col gap-1 mb-3">
              <span
                className="text-amg-gold text-xl md:text-3xl font-black tracking-widest"
                style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
              >
                KM/H
              </span>
              <span
                className="text-amg-silver text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
              >
                {t.electronicallyLimited}
              </span>
            </div>
          </motion.div>

          <GoldRule className="w-full mb-5 mt-2" />

          <div className="grid grid-cols-3 gap-6">
            {[
              { val: "1,063", unit: "HP", label: t.systemPower },
              { val: "2.9", unit: "SEC", label: t.acceleration100 },
              { val: "7.0", unit: "SEC", label: t.acceleration200 },
            ].map((item, i) => (
              <motion.div key={item.label} {...itemAnim(0.15 + i * 0.08)} className="flex flex-col gap-1">
                <div className="flex items-end gap-1">
                  <span
                    className="text-2xl md:text-4xl font-black text-white leading-none"
                    style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
                  >
                    {item.val}
                  </span>
                  <span
                    className="text-amg-gold text-xs font-bold tracking-widest mb-1"
                    style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
                  >
                    {item.unit}
                  </span>
                </div>
                <p
                  className="text-amg-silver/70 text-xs tracking-[0.2em] uppercase"
                  style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
                >
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div {...fadeAnim(0.4)} className="hidden md:flex flex-col items-end">
          <span
            className="text-[9rem] font-black leading-none select-none"
            style={{ fontFamily: "var(--font-orbitron), sans-serif", color: "rgba(255,255,255,0.04)" }}
          >
            02
          </span>
          <div
            className="w-[1px] h-24 mt-2"
            style={{ background: "linear-gradient(to bottom, #D4AF37, transparent)" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

function EngineeringPhase() {
  const { lang } = useLanguage();
  const t = translations[lang].engineering;

  const chassisSpecs = [
    { label: t.specs.curbWeight, val: CAR.chassis.weight },
    { label: t.specs.weightDist, val: CAR.chassis.distribution },
    { label: t.specs.gearbox, val: CAR.chassis.gearbox },
    { label: t.specs.clutch, val: CAR.chassis.clutch },
  ];

  const [titleLine1, titleLine2] = t.monocoque.split("\n");

  return (
    <motion.div
      key="engineering"
      className="absolute inset-0 flex flex-col justify-center px-8 md:px-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
        <div className="flex-1 flex flex-col gap-4 max-w-xl">
          <motion.div {...fadeAnim(0)}>
            <AMGMark />
          </motion.div>

          <motion.p
            {...itemAnim(0.07)}
            className="text-amg-gold tracking-[0.35em] text-xs uppercase font-semibold"
            style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
          >
            {t.sectionLabel}
          </motion.p>

          <motion.h2
            {...itemAnim(0.14)}
            className="text-3xl md:text-5xl font-black text-white leading-tight"
            style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
          >
            {titleLine1}<br />{titleLine2}
          </motion.h2>

          <motion.div {...itemAnim(0.2)}>
            <GoldRule className="w-24 mb-3" />
            <p
              className="text-amg-silver/80 text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
            >
              {t.chassisDescription}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-1">
            {chassisSpecs.map((spec, i) => (
              <motion.div
                key={spec.label}
                {...itemAnim(0.27 + i * 0.07)}
                className="border-t pt-2"
                style={{ borderColor: "rgba(42,42,42,1)" }}
              >
                <p
                  className="text-amg-gold text-[0.6rem] tracking-[0.3em] uppercase"
                  style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
                >
                  {spec.label}
                </p>
                <p
                  className="text-white text-sm font-semibold mt-0.5"
                  style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
                >
                  {spec.val}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-3 max-w-sm">
          <motion.p
            {...itemAnim(0.1)}
            className="text-amg-gold tracking-[0.35em] text-xs uppercase font-semibold"
            style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
          >
            {t.powertrain}
          </motion.p>

          {t.engineSpecs.map((spec, i) => (
            <motion.div key={spec} {...itemAnim(0.17 + i * 0.07)} className="flex items-start gap-3">
              <div className="w-[1px] h-4 bg-amg-gold mt-1 shrink-0" />
              <p
                className="text-amg-silver/80 text-sm"
                style={{ fontFamily: "var(--font-rajdhani), sans-serif", fontWeight: 500 }}
              >
                {spec}
              </p>
            </motion.div>
          ))}

          <motion.div {...itemAnim(0.5)} className="mt-3">
            <div className="p-4" style={{ border: "1px solid rgba(212,175,55,0.3)" }}>
              <p
                className="text-amg-gold text-[0.6rem] tracking-[0.3em] uppercase mb-2"
                style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
              >
                {t.v6Redline}
              </p>
              <div className="flex items-end gap-2">
                <span
                  className="text-4xl font-black text-white"
                  style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
                >
                  11,000
                </span>
                <span
                  className="text-amg-gold font-bold tracking-widest mb-1"
                  style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
                >
                  RPM
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            {...fadeAnim(0.55)}
            className="hidden md:block text-[7rem] font-black leading-none select-none text-right mt-2"
            style={{ fontFamily: "var(--font-orbitron), sans-serif", color: "rgba(255,255,255,0.04)" }}
          >
            03
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function ExteriorPhase() {
  const { lang } = useLanguage();
  const t = translations[lang].exterior;

  return (
    <motion.div
      key="exterior"
      className="absolute inset-0 flex flex-col justify-center items-end pr-8 md:pr-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col items-end max-w-lg text-right gap-4">
        <motion.div {...fadeAnim(0)}>
          <AMGMark reverse />
        </motion.div>

        <motion.p
          {...itemAnim(0.08)}
          className="text-amg-gold tracking-[0.35em] text-xs uppercase font-semibold"
          style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
        >
          {t.sectionLabel}
        </motion.p>

        <motion.div {...itemAnim(0.16)}>
          <div
            className="text-4xl md:text-6xl font-black text-white leading-tight"
            style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
          >
            {t.titleLine1}<br />{t.titleLine2}
          </div>
        </motion.div>

        <motion.div {...itemAnim(0.24)}>
          <GoldRule className="w-full mb-3" reverse />
          <p
            className="text-amg-silver/80 text-sm leading-relaxed"
            style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
          >
            {t.descLine1}<br />
            {t.descLine2}
          </p>
        </motion.div>

        <div className="flex flex-col gap-2 mt-1 items-end">
          {t.aeroFeatures.map((feat, i) => (
            <motion.div
              key={feat}
              {...itemAnim(0.32 + i * 0.07)}
              className="flex items-center gap-3 flex-row-reverse"
            >
              <div className="w-[1px] h-4 bg-amg-gold shrink-0" />
              <p
                className="text-amg-silver/70 text-xs"
                style={{ fontFamily: "var(--font-rajdhani), sans-serif", fontWeight: 500 }}
              >
                {feat}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...fadeAnim(0.6)}
          className="hidden md:block text-[8rem] font-black leading-none select-none"
          style={{ fontFamily: "var(--font-orbitron), sans-serif", color: "rgba(255,255,255,0.04)" }}
        >
          04
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function AMGExperience({ scrollYProgress }: Props) {
  const phase = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 2, 3, 4]);
  const [currentPhase, setCurrentPhase] = useState(0);

  useEffect(() => {
    const unsubscribe = phase.on("change", (v) => {
      setCurrentPhase(Math.min(Math.floor(v), 3));
    });
    return unsubscribe;
  }, [phase]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none scan-lines">
      <AnimatePresence mode="wait">
        {currentPhase === 0 && <HeroPhase key="hero" />}
        {currentPhase === 1 && <PerformancePhase key="perf" />}
        {currentPhase === 2 && <EngineeringPhase key="eng" />}
        {currentPhase === 3 && <ExteriorPhase key="ext" />}
      </AnimatePresence>
    </div>
  );
}
