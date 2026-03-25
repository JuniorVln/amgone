"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

type EngineTranslations = (typeof translations)[keyof typeof translations]["engine"];
type FlowNodeId = keyof EngineTranslations["flowNodes"];
type EngineVisualId = keyof EngineTranslations["visualCards"];
type AeroVisualCopy = EngineTranslations["aeroVisuals"][number];
type SetIndex = (value: number | ((prev: number) => number)) => void;

type FlowPath = {
  id: string;
  path: string;
  points: { x: number; y: number }[];
  delay: number;
};

const FLOW_NODES: Record<
  FlowNodeId,
  {
    left: string;
    top: string;
    code: string;
    accent: "gold" | "silver";
  }
> = {
  battery: { left: "20%", top: "78%", code: "BAT", accent: "gold" },
  frontAxle: { left: "29%", top: "26%", code: "F-AX", accent: "silver" },
  mguk: { left: "54%", top: "58%", code: "K", accent: "gold" },
  mguh: { left: "54%", top: "18%", code: "H", accent: "silver" },
  v6: { left: "79%", top: "38%", code: "V6", accent: "gold" },
};

const FLOW_PATHS: FlowPath[] = [
  {
    id: "battery-front",
    path: "M 180 470 C 176 408 204 290 290 164",
    points: [
      { x: 180, y: 470 },
      { x: 184, y: 394 },
      { x: 214, y: 300 },
      { x: 252, y: 220 },
      { x: 290, y: 164 },
    ],
    delay: 0.08,
  },
  {
    id: "front-mguk",
    path: "M 290 164 C 360 190 430 255 520 340",
    points: [
      { x: 290, y: 164 },
      { x: 346, y: 190 },
      { x: 412, y: 242 },
      { x: 470, y: 294 },
      { x: 520, y: 340 },
    ],
    delay: 0.36,
  },
  {
    id: "front-mguh",
    path: "M 290 164 C 362 128 434 112 520 112",
    points: [
      { x: 290, y: 164 },
      { x: 348, y: 142 },
      { x: 410, y: 122 },
      { x: 466, y: 114 },
      { x: 520, y: 112 },
    ],
    delay: 0.52,
  },
  {
    id: "mguk-v6",
    path: "M 548 340 C 646 342 714 302 792 236",
    points: [
      { x: 548, y: 340 },
      { x: 612, y: 338 },
      { x: 680, y: 314 },
      { x: 736, y: 278 },
      { x: 792, y: 236 },
    ],
    delay: 0.86,
  },
  {
    id: "mguh-v6",
    path: "M 548 112 C 646 112 718 154 792 236",
    points: [
      { x: 548, y: 112 },
      { x: 612, y: 118 },
      { x: 676, y: 144 },
      { x: 736, y: 184 },
      { x: 792, y: 236 },
    ],
    delay: 1.04,
  },
];

const ENGINE_VISUALS: Record<
  EngineVisualId,
  {
    src: string;
    code: string;
    objectPosition: string;
    sizes: string;
    accent: "gold" | "silver";
    className: string;
  }
> = {
  hero: {
    src: "/images/engine/amg-one-goodwood.jpg",
    code: "VIS-01",
    objectPosition: "center 52%",
    sizes: "(max-width: 1024px) 100vw, 42vw",
    accent: "gold",
    className: "min-h-[20rem] md:min-h-[28rem]",
  },
  front: {
    src: "/images/engine/amg-one-front.jpg",
    code: "VIS-02",
    objectPosition: "center 48%",
    sizes: "(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 24vw",
    accent: "silver",
    className: "min-h-[12rem] md:min-h-[13rem]",
  },
  rear: {
    src: "/images/engine/amg-one-rear.jpg",
    code: "VIS-03",
    objectPosition: "center 50%",
    sizes: "(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 24vw",
    accent: "gold",
    className: "min-h-[12rem] md:min-h-[13rem]",
  },
};

const AERO_VISUALS: {
  src: string;
  code: string;
  accent: "gold" | "silver";
  objectPosition: string;
  sizes: string;
}[] = [
  {
    src: "/images/engine/amg-one-rear.jpg",
    code: "AERO-01",
    accent: "gold",
    objectPosition: "center 48%",
    sizes: "(max-width: 1279px) 100vw, 44vw",
  },
  {
    src: "/images/engine/amg-one-front.jpg",
    code: "AERO-02",
    accent: "silver",
    objectPosition: "center 50%",
    sizes: "(max-width: 1279px) 100vw, 44vw",
  },
  {
    src: "/images/aero/amg-one-side.jpg",
    code: "AERO-03",
    accent: "silver",
    objectPosition: "26% 58%",
    sizes: "(max-width: 1279px) 100vw, 44vw",
  },
  {
    src: "/images/aero/amg-one-fin.jpg",
    code: "AERO-04",
    accent: "gold",
    objectPosition: "54% 44%",
    sizes: "(max-width: 1279px) 100vw, 44vw",
  },
  {
    src: "/images/engine/amg-one-goodwood.jpg",
    code: "AERO-05",
    accent: "gold",
    objectPosition: "center 46%",
    sizes: "(max-width: 1279px) 100vw, 44vw",
  },
];

function evenTimes(length: number) {
  if (length <= 1) {
    return [0];
  }

  return Array.from({ length }, (_, index) => index / (length - 1));
}

function pulseOpacity(length: number) {
  return Array.from({ length }, (_, index) => {
    if (index === 0 || index === length - 1) {
      return 0;
    }

    return index === 1 ? 0.95 : 1;
  });
}

function EnergyNode({
  active,
  title,
  meta,
  code,
  left,
  top,
  accent,
  delay,
}: {
  active: boolean;
  title: string;
  meta: string;
  code: string;
  left: string;
  top: string;
  accent: "gold" | "silver";
  delay: number;
}) {
  const accentColor = accent === "gold" ? "#D4AF37" : "rgba(255,255,255,0.72)";
  const textColor = accent === "gold" ? "rgba(212,175,55,0.92)" : "rgba(255,255,255,0.78)";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 12 }}
      animate={active ? { opacity: 1, scale: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="absolute z-20 w-28 -translate-x-1/2 -translate-y-1/2 border px-3 py-2 md:w-36 md:px-4 md:py-3"
      style={{
        left,
        top,
        borderColor: accent === "gold" ? "rgba(212,175,55,0.28)" : "rgba(255,255,255,0.18)",
        background:
          accent === "gold"
            ? "linear-gradient(180deg, rgba(212,175,55,0.08) 0%, rgba(17,17,17,0.9) 100%)"
            : "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(17,17,17,0.88) 100%)",
        boxShadow:
          accent === "gold"
            ? "0 0 22px rgba(212,175,55,0.08)"
            : "0 0 18px rgba(255,255,255,0.05)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="text-[0.58rem] uppercase tracking-[0.28em]"
          style={{ fontFamily: "var(--font-orbitron), sans-serif", color: accentColor }}
        >
          {code}
        </div>
        <motion.span
          animate={active ? { opacity: [0.45, 1, 0.45] } : undefined}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="mt-0.5 h-1.5 w-1.5 rounded-full"
          style={{ background: accentColor }}
        />
      </div>
      <p
        className="mt-2 text-[0.66rem] uppercase tracking-[0.22em] text-white md:text-[0.72rem]"
        style={{ fontFamily: "var(--font-rajdhani), sans-serif", fontWeight: 700 }}
      >
        {title}
      </p>
      <p
        className="mt-1 text-[0.54rem] uppercase tracking-[0.2em] md:text-[0.58rem]"
        style={{ fontFamily: "var(--font-rajdhani), sans-serif", color: textColor }}
      >
        {meta}
      </p>
    </motion.div>
  );
}

function FlowPulse({
  active,
  points,
  delay,
  duration = 2.3,
}: {
  active: boolean;
  points: { x: number; y: number }[];
  delay: number;
  duration?: number;
}) {
  const times = evenTimes(points.length);
  const opacityFrames = pulseOpacity(points.length);
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);

  return (
    <>
      <motion.circle
        r="11"
        fill="rgba(212,175,55,0.18)"
        filter="url(#energy-glow)"
        initial={{ opacity: 0 }}
        animate={
          active
            ? {
                cx: xs,
                cy: ys,
                opacity: opacityFrames,
              }
            : { opacity: 0 }
        }
        transition={{
          duration,
          delay,
          times,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 0.28,
          ease: "easeInOut",
        }}
      />
      <motion.circle
        r="4.5"
        fill="#FFD700"
        initial={{ opacity: 0 }}
        animate={
          active
            ? {
                cx: xs,
                cy: ys,
                opacity: opacityFrames,
              }
            : { opacity: 0 }
        }
        transition={{
          duration,
          delay,
          times,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 0.28,
          ease: "easeInOut",
        }}
      />
    </>
  );
}

function EnginePhotoCard({
  src,
  code,
  accent,
  objectPosition,
  sizes,
  className,
  copy,
  delay,
}: {
  src: string;
  code: string;
  accent: "gold" | "silver";
  objectPosition: string;
  sizes: string;
  className: string;
  copy: EngineTranslations["visualCards"][EngineVisualId];
  delay: number;
}) {
  const accentColor = accent === "gold" ? "#D4AF37" : "rgba(255,255,255,0.72)";

  return (
    <motion.article
      initial={{ opacity: 0, y: 18, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden border ${className}`}
      style={{
        borderColor: accent === "gold" ? "rgba(212,175,55,0.18)" : "rgba(255,255,255,0.14)",
        background: "#0C0C0C",
      }}
    >
      <Image
        src={src}
        alt={copy.title}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        style={{ objectPosition }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,6,6,0.1) 0%, rgba(6,6,6,0.28) 22%, rgba(6,6,6,0.84) 100%), linear-gradient(90deg, rgba(6,6,6,0.7) 0%, rgba(6,6,6,0.18) 46%, rgba(6,6,6,0.74) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-35"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent 0 18px, rgba(255,255,255,0.022) 18px 19px), repeating-linear-gradient(90deg, transparent 0 24px, rgba(255,255,255,0.018) 24px 25px)",
        }}
      />

      <div
        className="absolute left-0 top-0 h-10 w-10 border-l border-t"
        style={{ borderColor: accent === "gold" ? "rgba(212,175,55,0.72)" : "rgba(255,255,255,0.42)" }}
      />

      <div className="absolute right-4 top-4 flex items-center gap-2">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: accentColor, boxShadow: `0 0 10px ${accentColor}` }}
        />
        <span
          className="text-[0.52rem] uppercase tracking-[0.34em]"
          style={{ fontFamily: "var(--font-orbitron), sans-serif", color: accentColor }}
        >
          {code}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <p
          className="text-[0.58rem] uppercase tracking-[0.34em]"
          style={{ fontFamily: "var(--font-orbitron), sans-serif", color: accentColor }}
        >
          {copy.label}
        </p>
        <p
          className="mt-3 max-w-[28rem] text-base leading-tight text-white md:text-[1.15rem]"
          style={{ fontFamily: "var(--font-orbitron), sans-serif", fontWeight: 800 }}
        >
          {copy.title}
        </p>
        <p
          className="mt-3 max-w-[30rem] text-[0.68rem] uppercase tracking-[0.24em] text-amg-silver/70 md:text-[0.72rem]"
          style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
        >
          {copy.meta}
        </p>
      </div>
    </motion.article>
  );
}

function EngineVisualAtlas({ t }: { t: EngineTranslations }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden border p-5 md:p-6"
      style={{
        borderColor: "rgba(212,175,55,0.16)",
        background:
          "linear-gradient(180deg, rgba(17,17,17,0.96) 0%, rgba(10,10,10,0.98) 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-34"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 28%), repeating-linear-gradient(0deg, transparent 0 18px, rgba(255,255,255,0.02) 18px 19px), repeating-linear-gradient(90deg, transparent 0 24px, rgba(255,255,255,0.018) 24px 25px)",
        }}
      />

      <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-md">
          <p
            className="text-[0.6rem] uppercase tracking-[0.34em] text-amg-gold"
            style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
          >
            {t.visualLabel}
          </p>
          <h3
            className="mt-3 text-xl font-black text-white md:text-2xl"
            style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
          >
            {t.visualTitle}
          </h3>
        </div>
        <p
          className="max-w-md text-[0.72rem] uppercase tracking-[0.2em] text-amg-silver/64 md:text-[0.76rem]"
          style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
        >
          {t.visualDescription}
        </p>
      </div>

      <div className="relative z-10 mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]">
        <EnginePhotoCard
          {...ENGINE_VISUALS.hero}
          copy={t.visualCards.hero}
          delay={0.08}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <EnginePhotoCard
            {...ENGINE_VISUALS.front}
            copy={t.visualCards.front}
            delay={0.16}
          />
          <EnginePhotoCard
            {...ENGINE_VISUALS.rear}
            copy={t.visualCards.rear}
            delay={0.24}
          />
        </div>
      </div>

      <div className="relative z-10 mt-4 flex flex-wrap gap-2">
        {t.visualChips.map((chip, index) => (
          <motion.span
            key={chip}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 + index * 0.06 }}
            className="border px-3 py-2 text-[0.58rem] uppercase tracking-[0.32em] text-amg-silver/72"
            style={{
              fontFamily: "var(--font-orbitron), sans-serif",
              borderColor: "rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            {chip}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

function EnergyFlowPanel({ t }: { t: EngineTranslations }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(panelRef, { once: true, amount: 0.35 });

  return (
    <motion.div
      ref={panelRef}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden border p-5 md:p-6"
      style={{
        borderColor: "rgba(212,175,55,0.18)",
        background:
          "linear-gradient(180deg, rgba(18,18,18,0.96) 0%, rgba(10,10,10,0.98) 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 32%), repeating-linear-gradient(0deg, transparent 0 18px, rgba(255,255,255,0.022) 18px 19px), repeating-linear-gradient(90deg, transparent 0 24px, rgba(255,255,255,0.02) 24px 25px)",
        }}
      />

      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[44%] overflow-hidden md:block">
        <Image
          src="/images/engine/amg-one-detail.jpg"
          alt=""
          fill
          sizes="(max-width: 1279px) 0vw, 30vw"
          className="object-cover opacity-[0.28] saturate-0 contrast-125"
          style={{ objectPosition: "62% center" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,10,10,1) 0%, rgba(10,10,10,0.86) 18%, rgba(10,10,10,0.34) 58%, rgba(10,10,10,0.9) 100%), linear-gradient(180deg, rgba(10,10,10,0.86) 0%, rgba(10,10,10,0.18) 46%, rgba(10,10,10,0.94) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 flex items-center justify-between gap-4">
        <div>
          <p
            className="text-[0.6rem] uppercase tracking-[0.34em] text-amg-gold"
            style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
          >
            {t.flowLabel}
          </p>
          <div className="mt-3 h-[1px] w-16" style={{ background: "#D4AF37", opacity: 0.55 }} />
        </div>
        <div className="text-right">
          <p
            className="text-[0.58rem] uppercase tracking-[0.3em] text-white/40"
            style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
          >
            LIVE // 800V
          </p>
          <p
            className="mt-2 text-[0.56rem] uppercase tracking-[0.26em] text-amg-silver/55"
            style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
          >
            {t.flowStatus}
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-6 aspect-[16/10]">
        <svg
          viewBox="0 0 1000 620"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <defs>
            <filter id="energy-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
          </defs>

          <rect x="0" y="0" width="1000" height="620" fill="transparent" />

          {FLOW_PATHS.map((flowPath) => (
            <path
              key={`${flowPath.id}-base`}
              d={flowPath.path}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {FLOW_PATHS.map((flowPath) => (
            <path
              key={`${flowPath.id}-glow`}
              d={flowPath.path}
              fill="none"
              stroke="rgba(212,175,55,0.12)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {FLOW_PATHS.map((flowPath) => (
            <motion.path
              key={flowPath.id}
              d={flowPath.path}
              fill="none"
              stroke="#D4AF37"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0.25 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : undefined}
              transition={{
                duration: 1.1,
                delay: flowPath.delay,
                ease: [0.33, 0, 0.13, 1],
              }}
              style={{ filter: "drop-shadow(0 0 8px rgba(212,175,55,0.28))" }}
            />
          ))}

          {FLOW_PATHS.map((flowPath) => (
            <FlowPulse
              key={`${flowPath.id}-pulse`}
              active={isInView}
              points={flowPath.points}
              delay={flowPath.delay + 0.08}
            />
          ))}
        </svg>

        {(Object.entries(FLOW_NODES) as [FlowNodeId, (typeof FLOW_NODES)[FlowNodeId]][]).map(
          ([key, node], index) => (
            <EnergyNode
              key={key}
              active={isInView}
              title={t.flowNodes[key]}
              meta={t.flowMeta[key]}
              code={node.code}
              left={node.left}
              top={node.top}
              accent={node.accent}
              delay={0.14 + index * 0.08}
            />
          )
        )}
      </div>

      <div
        className="relative z-10 mt-5 flex items-center justify-between gap-4 border-t pt-4"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <p
          className="max-w-[34rem] text-[0.62rem] uppercase tracking-[0.26em] text-amg-silver/58 md:text-[0.68rem]"
          style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
        >
          {t.flowDirection}
        </p>
        <div className="hidden items-center gap-2 md:flex">
          <motion.span
            animate={isInView ? { opacity: [0.45, 1, 0.45] } : undefined}
            transition={{ duration: 1.9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-amg-gold"
          />
          <span
            className="text-[0.55rem] uppercase tracking-[0.32em] text-amg-gold"
            style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
          >
            {t.flowMode}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function AeroCarousel({
  t,
  activeIndex,
  setActiveIndex,
}: {
  t: EngineTranslations;
  activeIndex: number;
  setActiveIndex: SetIndex;
}) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(carouselRef, { once: false, amount: 0.4 });

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % AERO_VISUALS.length);
    }, 4800);

    return () => window.clearInterval(interval);
  }, [isInView, setActiveIndex]);

  const visual = AERO_VISUALS[activeIndex];
  const copy = t.aeroVisuals[activeIndex];
  const accentColor = visual.accent === "gold" ? "#D4AF37" : "rgba(255,255,255,0.72)";

  return (
    <div
      ref={carouselRef}
      className="relative h-full min-h-[26rem] overflow-hidden border md:min-h-[34rem]"
      style={{
        borderColor: "rgba(212,175,55,0.16)",
        background:
          "linear-gradient(180deg, rgba(17,17,17,0.96) 0%, rgba(10,10,10,0.98) 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-30"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 28%), repeating-linear-gradient(0deg, transparent 0 18px, rgba(255,255,255,0.02) 18px 19px), repeating-linear-gradient(90deg, transparent 0 24px, rgba(255,255,255,0.018) 24px 25px)",
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={visual.src}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={visual.src}
            alt={copy.title}
            fill
            sizes={visual.sizes}
            className="object-cover"
            style={{ objectPosition: visual.objectPosition }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(6,6,6,0.18) 0%, rgba(6,6,6,0.38) 24%, rgba(6,6,6,0.92) 100%), linear-gradient(90deg, rgba(6,6,6,0.86) 0%, rgba(6,6,6,0.24) 42%, rgba(6,6,6,0.82) 100%)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 flex min-h-[26rem] flex-col justify-between p-5 md:min-h-[34rem] md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p
              className="text-[0.58rem] uppercase tracking-[0.34em] text-amg-gold"
              style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
            >
              {t.aeroPanelLabel}
            </p>
            <p
              className="mt-2 text-[0.54rem] uppercase tracking-[0.28em] text-amg-silver/50"
              style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
            >
              {t.aeroPanelHint}
            </p>
          </div>
          <div className="text-right">
            <p
              className="text-[0.58rem] uppercase tracking-[0.3em]"
              style={{ fontFamily: "var(--font-orbitron), sans-serif", color: accentColor }}
            >
              {visual.code}
            </p>
            <p
              className="mt-2 text-[0.6rem] uppercase tracking-[0.32em] text-white/42"
              style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
            >
              {String(activeIndex + 1).padStart(2, "0")} / {String(AERO_VISUALS.length).padStart(2, "0")}
            </p>
          </div>
        </div>

        <div>
          <motion.p
            key={copy.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-[0.58rem] uppercase tracking-[0.34em]"
            style={{ fontFamily: "var(--font-orbitron), sans-serif", color: accentColor }}
          >
            {copy.label}
          </motion.p>
          <motion.p
            key={copy.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-[42rem] text-2xl leading-none text-white md:text-[2.4rem]"
            style={{ fontFamily: "var(--font-orbitron), sans-serif", fontWeight: 900 }}
          >
            {copy.title}
          </motion.p>
          <motion.p
            key={copy.meta}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-[36rem] text-[0.7rem] uppercase tracking-[0.22em] text-amg-silver/74 md:text-[0.76rem]"
            style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
          >
            {copy.meta}
          </motion.p>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          {t.aeroVisuals.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group flex flex-col items-start gap-2"
              aria-label={item.title}
            >
              <span
                className="h-[3px] w-10 overflow-hidden md:w-14"
                style={{ background: "rgba(255,255,255,0.12)" }}
              >
                <motion.span
                  animate={{
                    width: activeIndex === index ? "100%" : "38%",
                    opacity: activeIndex === index ? 1 : 0.44,
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="block h-full"
                  style={{ background: activeIndex === index ? "#D4AF37" : "rgba(255,255,255,0.48)" }}
                />
              </span>
              <span
                className="text-[0.5rem] uppercase tracking-[0.28em] text-white/38 transition-colors duration-300 group-hover:text-white/68"
                style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MercedesStarBadge({ className = "h-20 w-20 md:h-24 md:w-24" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      aria-hidden
      className={className}
      style={{ filter: "drop-shadow(0 10px 24px rgba(255,255,255,0.08))" }}
    >
      <defs>
        <linearGradient id="mercedes-ring" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.96)" />
          <stop offset="52%" stopColor="rgba(185,185,185,0.9)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.82)" />
        </linearGradient>
        <linearGradient id="mercedes-spoke" x1="0%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.98)" />
          <stop offset="100%" stopColor="rgba(180,180,180,0.88)" />
        </linearGradient>
      </defs>

      <circle cx="80" cy="80" r="57" fill="none" stroke="url(#mercedes-ring)" strokeWidth="5.5" />
      <circle cx="80" cy="80" r="50.5" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />

      <path d="M80 80 L80 27 L71 79 Z" fill="url(#mercedes-spoke)" />
      <path d="M80 80 L38 104 L73 84 Z" fill="url(#mercedes-spoke)" />
      <path d="M80 80 L122 104 L87 84 Z" fill="url(#mercedes-spoke)" />
    </svg>
  );
}

export default function EngineSection() {
  const { lang } = useLanguage();
  const t = translations[lang].engine;
  const [activeAeroIndex, setActiveAeroIndex] = useState(0);

  return (
    <section
      className="relative px-8 py-24 md:px-16 md:py-36"
      style={{ background: "#0A0A0A" }}
    >
      <div
        className="mb-16 h-[1px] w-full"
        style={{
          background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
          opacity: 0.25,
        }}
      />

      <div className="grid grid-cols-1 items-start gap-12 md:gap-16 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-amg-gold"
              style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
            >
              {t.sectionLabel}
            </p>
            <h2
              className="text-3xl font-black leading-tight text-white md:text-5xl"
              style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
            >
              {t.title.replace(" Híbrido F1", "")}
              <br />
              Híbrido F1
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="mb-6 h-[1px] w-16" style={{ background: "#D4AF37", opacity: 0.6 }} />
            <p
              className="text-base leading-relaxed text-amg-silver/80"
              style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
            >
              {t.description}
            </p>
          </motion.div>

          <div className="mt-8 flex flex-col gap-4">
            {t.specs.map((spec, i) => (
              <motion.div
                key={spec}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.12 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-4 p-4"
                style={{
                  border: "1px solid rgba(42,42,42,0.8)",
                  background:
                    "linear-gradient(180deg, rgba(19,19,19,0.76) 0%, rgba(11,11,11,0.92) 100%)",
                }}
              >
                <div className="mt-1 flex shrink-0 flex-col items-center gap-1">
                  <div className="h-1 w-1 bg-amg-gold" />
                  <div className="h-6 w-[1px] bg-amg-gold/30" />
                </div>
                <p
                  className="text-sm leading-relaxed text-amg-silver/80"
                  style={{ fontFamily: "var(--font-rajdhani), sans-serif", fontWeight: 500 }}
                >
                  {spec}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

        <div className="xl:self-end">
          <EngineVisualAtlas t={t} />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-24"
      >
        <div
          className="mb-12 h-[1px] w-full"
          style={{ background: "linear-gradient(90deg, #D4AF37, transparent)", opacity: 0.3 }}
        />
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-amg-gold"
          style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
        >
          {t.aeroLabel}
        </p>
        <h3
          className="mb-8 text-2xl font-black text-white md:text-4xl"
          style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
        >
          {t.aeroTitle}
        </h3>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)]">
          <div className="flex flex-col gap-3 xl:h-full">
            {t.aeroFeatures.map((feat, i) => {
              const isActive = i === activeAeroIndex;

              return (
                <motion.button
                  key={feat}
                  type="button"
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setActiveAeroIndex(i)}
                  className="group relative overflow-hidden border p-4 text-left md:p-5 xl:flex-1 xl:min-h-0"
                  style={{
                    borderColor: isActive ? "rgba(212,175,55,0.28)" : "rgba(42,42,42,0.6)",
                    background: isActive
                      ? "linear-gradient(180deg, rgba(212,175,55,0.07) 0%, rgba(15,15,15,0.96) 100%)"
                      : "linear-gradient(180deg, rgba(19,19,19,0.76) 0%, rgba(11,11,11,0.92) 100%)",
                  }}
                >
                  <div
                    className="absolute inset-y-0 left-0 w-[2px]"
                    style={{ background: isActive ? "#D4AF37" : "rgba(255,255,255,0.1)" }}
                  />
                  <div className="flex items-start gap-4 pl-3">
                    <p
                      className="mt-0.5 text-[0.58rem] uppercase tracking-[0.32em]"
                      style={{
                        fontFamily: "var(--font-orbitron), sans-serif",
                        color: isActive ? "#D4AF37" : "rgba(255,255,255,0.4)",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <div>
                      <p
                        className="text-sm leading-relaxed md:text-[1rem]"
                        style={{
                          fontFamily: "var(--font-rajdhani), sans-serif",
                          fontWeight: 600,
                          color: isActive ? "rgba(255,255,255,0.96)" : "rgba(192,200,214,0.8)",
                        }}
                      >
                        {feat}
                      </p>
                      <p
                        className="mt-2 text-[0.54rem] uppercase tracking-[0.28em]"
                        style={{
                          fontFamily: "var(--font-orbitron), sans-serif",
                          color: isActive ? "rgba(212,175,55,0.8)" : "rgba(255,255,255,0.28)",
                        }}
                      >
                        {t.aeroVisuals[i].label}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="xl:h-full"
          >
            <AeroCarousel
              t={t}
              activeIndex={activeAeroIndex}
              setActiveIndex={setActiveAeroIndex}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
