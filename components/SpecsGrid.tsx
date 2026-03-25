"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { CAR } from "@/data/carData";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

type TelemetryMetricProps = {
  label: string;
  value: string;
  unit: string;
  index: number;
};

const TELEMETRY_STATES = ["INIT", "SYNC", "READ", "LOCK", "LIVE"];
const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function buildRollingGlyphs(value: string, baseCycles: number) {
  let digitOrder = 0;

  return value.split("").map((char) => {
    if (!/\d/.test(char)) {
      return {
        type: "separator" as const,
        char,
        key: `separator-${char}-${digitOrder}`,
      };
    }

    const targetDigit = Number(char);
    const cycles = baseCycles + digitOrder;
    const reel = Array.from({ length: cycles }, () => DIGITS)
      .flat()
      .concat(DIGITS.slice(0, targetDigit + 1));

    const item = {
      type: "digit" as const,
      char,
      reel,
      finalIndex: reel.length - 1,
      order: digitOrder,
      key: `digit-${digitOrder}-${char}`,
    };

    digitOrder += 1;
    return item;
  });
}

function TelemetryNumber({
  label,
  value,
  unit,
  index,
}: TelemetryMetricProps) {
  const telemetryRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(telemetryRef, { once: true, amount: 0.55 });
  const [unitVisible, setUnitVisible] = useState(false);
  const [telemetryState, setTelemetryState] = useState(TELEMETRY_STATES[0]);
  const reelData = useMemo(() => buildRollingGlyphs(value, 2), [value]);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const unitDelay = 340 + index * 60;
    setUnitVisible(false);
    setTelemetryState(TELEMETRY_STATES[0]);

    const phaseTimers = TELEMETRY_STATES.map((state, phaseIndex) =>
      window.setTimeout(() => {
        setTelemetryState(state);
      }, 70 + phaseIndex * 170 + index * 35)
    );

    const unitTimer = window.setTimeout(() => {
      setUnitVisible(true);
    }, unitDelay);

    return () => {
      phaseTimers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(unitTimer);
    };
  }, [index, isInView]);

  return (
    <div ref={telemetryRef} className="relative flex h-full flex-col justify-between overflow-hidden">
      <div className="flex items-start justify-between gap-4">
        <p
          className="text-amg-gold text-[0.6rem] tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
        >
          {label}
        </p>
        <motion.span
          initial={{ opacity: 0, x: 8 }}
          whileInView={{ opacity: 0.45, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.18 + index * 0.06 }}
          className="text-[0.55rem] tracking-[0.28em] text-white/30"
          style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
        >
          T-{String(index + 1).padStart(2, "0")}
        </motion.span>
      </div>

      <div className="relative mt-7 flex-1">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, delay: 0.12 + index * 0.05 }}
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.8) 36%, rgba(255,255,255,0.82) 50%, rgba(212,175,55,0.8) 64%, transparent 100%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: [0, 0.9, 0], y: [4, 76, 120] }}
          viewport={{ once: true }}
          transition={{ duration: 0.95, delay: 0.15 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.14) 12%, rgba(255,255,255,0.8) 50%, rgba(212,175,55,0.14) 88%, transparent 100%)",
            boxShadow: "0 0 12px rgba(212,175,55,0.35)",
          }}
        />

        <div className="relative z-10 flex items-end gap-2 pt-6">
          <span
            className="inline-flex items-end gap-[0.02em] text-3xl leading-none text-white md:gap-[0.028em] md:text-5xl"
            style={{
              fontFamily: "var(--font-orbitron), sans-serif",
              fontWeight: 900,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {reelData.map((item) =>
              item.type === "separator" ? (
                <motion.span
                  key={item.key}
                  initial={{ opacity: 0, y: 8 }}
                  animate={isInView ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.35, delay: 0.16 }}
                  className="inline-flex w-[0.28em] justify-center text-white/88"
                >
                  {item.char}
                </motion.span>
              ) : (
                <span
                  key={item.key}
                  className="relative inline-flex h-[1.02em] w-[0.64em] overflow-hidden align-baseline"
                >
                  <motion.span
                    initial={{ y: "0em", filter: "blur(1.8px)" }}
                    animate={
                      isInView
                        ? {
                            y: [
                              "0em",
                              `-${Math.max(item.finalIndex - 0.45, 0)}em`,
                              `-${item.finalIndex}em`,
                            ],
                            filter: ["blur(1.8px)", "blur(0.55px)", "blur(0px)"],
                          }
                        : undefined
                    }
                    transition={{
                      duration: 1.02 + index * 0.04 + item.order * 0.03,
                      delay: 0.06 + item.order * 0.06,
                      times: [0, 0.84, 1],
                      ease: [0.33, 0, 0.13, 1],
                    }}
                    className="absolute left-0 top-0 flex w-full flex-col items-center"
                    style={{
                      willChange: "transform, filter",
                      backfaceVisibility: "hidden",
                      transform: "translateZ(0)",
                    }}
                  >
                    {item.reel.map((digit, reelIndex) => (
                      <span
                        key={`${item.key}-${reelIndex}`}
                        className="flex h-[1em] w-full items-center justify-center"
                      >
                        {digit}
                      </span>
                    ))}
                  </motion.span>
                </span>
              )
            )}
          </span>

          <AnimatePresence initial={false}>
            {unitVisible ? (
              <motion.span
                key={`${label}-unit`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                className="mb-1 text-sm font-bold tracking-widest text-amg-gold"
                style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
              >
                {unit}
              </motion.span>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex items-center justify-between text-[0.55rem] uppercase tracking-[0.28em]">
          <span
            className="text-white/28"
            style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
          >
            Read Line
          </span>
          <span
            className="text-amg-gold"
            style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
          >
            {telemetryState}
          </span>
        </div>

        <div className="relative h-[1px] overflow-hidden bg-white/10">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.14 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 left-0 origin-left"
            style={{
              width: "100%",
              background: "linear-gradient(90deg, #D4AF37 0%, rgba(255,255,255,0.92) 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function SpecsGrid() {
  const { lang } = useLanguage();
  const t = translations[lang].specs;

  const specs = [
    { val: CAR.performance.power.value, unit: CAR.performance.power.unit, label: t.labels.power },
    { val: CAR.performance.topSpeed.value, unit: CAR.performance.topSpeed.unit, label: t.labels.topSpeed },
    { val: CAR.performance.acceleration.value, unit: CAR.performance.acceleration.unit, label: t.labels.acceleration100 },
    { val: CAR.performance.torque.value, unit: CAR.performance.torque.unit, label: t.labels.torque },
    { val: CAR.performance.acceleration200.value, unit: CAR.performance.acceleration200.unit, label: t.labels.acceleration200 },
    { val: CAR.performance.revLimit.value, unit: CAR.performance.revLimit.unit, label: t.labels.revLimit },
  ];

  const dimLabels: Record<string, string> = {
    length: t.dimensions.length,
    width: t.dimensions.width,
    height: t.dimensions.height,
    wheelbase: t.dimensions.wheelbase,
  };

  const [titleLine1, titleLine2] = t.sectionTitle.split("\n");

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
          {t.sectionLabel}
        </p>
        <h2
          className="text-3xl md:text-5xl font-black text-white"
          style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
        >
          {titleLine1}<br />{titleLine2}
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
            className="group relative flex min-h-[182px] flex-col justify-between overflow-hidden p-6 md:min-h-[196px] md:p-8"
            style={{
              background: "linear-gradient(180deg, rgba(10,10,10,0.98) 0%, rgba(13,13,13,0.98) 100%)",
              border: "1px solid rgba(42,42,42,0.6)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 32%), repeating-linear-gradient(0deg, transparent 0 18px, rgba(255,255,255,0.025) 18px 19px)",
              }}
            />

            {/* Gold corner accent on hover */}
            <div
              className="absolute top-0 left-0 w-8 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "#D4AF37" }}
            />
            <div
              className="absolute top-0 left-0 w-[1px] h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "#D4AF37" }}
            />

            <TelemetryNumber
              index={i}
              label={spec.label}
              value={spec.val}
              unit={spec.unit}
            />
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
              {dimLabels[key] ?? key.charAt(0).toUpperCase() + key.slice(1)}
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
