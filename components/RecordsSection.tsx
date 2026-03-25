"use client";

import { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CAR } from "@/data/carData";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

type RollingTimeDisplayProps = {
  value: string;
  sizeClassName: string;
  wrapperClassName?: string;
};

type TrackMeta = {
  code: string;
  viewBox: string;
  path: string;
};

const TRACK_META: Record<string, TrackMeta> = {
  "Nürburgring Nordschleife": {
    code: "NRD",
    viewBox: "0 0 690.66 638.50",
    path:
      "M 257.97 498.31 C 254.26 492.69 255.19 491.29 251.09 491.02 C 249.19 490.90 246.85 491.05 244.27 495.67 C 242.86 498.22 241.39 500.20 239.26 502.10 C 235.05 505.85 230.59 508.95 225.10 508.93 C 219.38 508.92 217.53 506.03 210.77 503.88 C 206.14 502.41 198.03 502.05 195.44 503.27 C 193.36 504.26 193.70 504.40 192.06 504.61 C 189.96 504.87 188.01 503.69 186.47 502.04 C 184.09 499.50 183.08 497.68 180.77 494.65 C 179.09 492.45 176.31 491.07 174.82 488.50 C 173.82 486.77 174.20 485.85 171.90 484.08 C 170.27 482.84 163.23 482.96 158.51 481.31 C 154.86 480.05 155.19 475.20 152.76 471.46 C 150.37 467.79 138.11 460.52 131.11 454.64 C 122.80 445.92 122.45 445.04 119.11 441.30 C 115.76 437.55 112.86 434.66 110.18 430.94 C 108.33 428.37 106.59 424.57 107.10 420.16 C 108.23 410.42 113.77 402.62 113.87 391.54 C 113.94 383.94 114.49 380.45 112.75 367.94 C 112.04 362.88 110.32 359.44 108.44 354.70 C 104.09 343.79 99.18 333.04 93.46 322.48 C 91.31 318.52 88.19 315.45 84.63 313.35 C 80.63 310.99 75.77 309.02 71.29 306.78 C 69.04 305.66 67.99 303.07 68.42 300.83 C 69.28 296.40 75.58 296.08 82.99 292.63 C 91.99 288.43 95.97 286.00 101.05 281.54 C 107.34 276.02 112.95 272.21 119.11 266.26 C 123.40 262.11 127.09 259.50 130.50 252.71 C 132.41 248.90 133.75 245.75 134.80 241.32 C 136.34 234.86 134.94 229.20 135.93 225.73 C 137.12 221.57 141.83 220.84 142.50 217.72 C 143.12 214.85 139.65 211.46 141.27 207.26 C 142.26 204.68 148.84 201.28 153.58 197.10 C 157.37 193.76 156.86 192.96 160.56 189.00 C 167.63 181.40 168.13 182.51 175.74 173.91 C 178.92 170.32 181.18 167.06 182.11 162.52 C 183.31 156.62 180.57 151.34 178.51 146.62 C 177.85 145.09 176.67 144.16 174.72 143.44 C 173.08 142.84 170.44 143.64 168.66 142.93 C 165.59 141.69 163.74 140.76 160.87 138.51 C 157.32 135.74 155.80 133.28 155.63 131.13 C 155.43 128.46 157.03 127.50 159.02 126.61 C 163.42 124.64 169.81 121.05 174.31 116.45 C 176.84 113.87 175.58 110.59 176.98 107.12 C 177.76 105.16 179.50 101.95 181.80 99.73 C 185.08 96.55 189.77 94.89 195.44 97.47 C 201.29 100.14 206.12 103.12 211.76 108.35 C 213.31 109.78 212.74 114.32 215.96 114.20 C 220.24 114.03 218.06 111.23 222.53 109.07 C 229.58 105.66 239.14 105.29 246.23 107.12 C 249.55 107.94 253.42 109.90 256.80 109.37 C 261.19 108.69 262.79 105.03 263.16 103.32 C 264.02 99.42 263.03 93.71 265.21 90.91 C 267.45 88.04 268.55 86.50 282.56 81.98 C 295.84 77.69 300.62 80.14 307.49 77.46 C 315.33 74.40 321.60 64.56 327.70 64.95 C 330.92 65.15 333.98 66.84 334.58 70.59 C 335.65 77.35 334.01 84.02 333.96 90.19 C 333.86 104.04 337.86 111.80 340.63 114.81 C 346.09 120.75 351.91 124.30 358.58 127.43 C 363.61 129.79 367.61 132.06 374.59 132.15 C 387.77 132.33 397.78 132.25 407.83 134.51 C 414.33 135.97 421.01 137.63 426.51 141.39 C 430.72 144.26 433.02 146.99 437.08 149.49 C 444.57 154.11 449.97 156.25 456.16 155.34 C 461.04 154.63 467.96 150.08 473.19 145.70 C 477.61 142.00 481.65 136.36 487.35 135.13 C 495.87 133.28 500.06 134.37 505.72 132.05 C 510.73 129.99 513.27 129.95 514.65 131.23 C 518.19 134.50 515.58 138.20 513.11 140.05 C 507.36 144.36 497.65 152.19 494.84 152.88 C 488.09 154.54 489.38 160.21 490.88 161.70 C 494.39 165.17 499.68 162.67 500.36 160.13 C 500.86 158.24 502.31 157.05 505.18 155.00 C 508.46 152.65 511.89 150.84 518.11 148.64 C 520.81 147.68 522.62 146.71 529.91 145.87 C 535.17 145.26 540.53 138.41 544.78 132.31 C 550.26 124.47 545.11 123.13 546.35 118.61 C 547.38 114.85 548.39 110.96 553.22 107.63 C 557.42 104.74 579.51 112.16 581.13 113.17 C 585.04 115.58 586.94 120.21 590.57 121.89 C 594.78 123.84 596.50 123.87 600.01 125.48 C 602.47 126.61 610.18 137.67 610.27 140.67 C 610.43 145.61 601.91 159.12 606.99 163.55 C 611.48 167.46 612.80 166.35 617.87 168.88 C 621.35 170.63 621.35 176.28 621.56 180.17 C 621.76 183.97 621.66 188.99 618.58 190.64 C 612.43 193.92 604.09 188.89 597.14 190.84 C 593.44 191.88 594.68 196.69 590.06 202.54 C 584.69 209.33 582.16 216.89 582.16 221.11 C 582.16 227.37 582.77 235.37 582.26 241.02 C 581.99 244.05 580.27 247.45 577.54 248.81 C 573.03 251.07 568.77 250.67 565.02 253.33 C 561.02 256.17 558.66 259.31 554.97 263.38 C 551.37 267.35 550.75 269.71 548.50 274.57 C 546.56 278.77 544.91 280.52 542.66 283.19 C 540.65 285.55 537.54 286.70 534.96 288.42 C 532.50 290.06 530.27 292.77 526.14 293.86 C 514.93 296.80 504.34 301.61 493.61 302.37 C 486.55 302.88 484.17 294.06 477.19 294.16 C 474.28 294.21 471.49 295.78 468.99 297.55 C 464.73 300.56 460.46 302.59 460.78 306.17 C 461.81 317.56 483.04 316.84 488.69 325.66 C 490.53 328.55 493.25 332.66 492.79 339.62 C 492.54 343.42 489.47 346.57 486.63 348.85 C 480.02 354.19 456.88 367.32 441.69 376.45 L 366.79 422.93 C 353.04 431.55 331.23 444.44 325.34 448.89 C 311.19 459.58 298.97 479.74 295.75 484.34 C 293.75 487.20 286.95 492.00 286.19 494.18 C 285.32 496.72 285.58 501.52 283.05 503.31 C 280.02 505.47 278.41 504.61 275.29 504.66 C 272.60 504.70 273.34 505.32 270.44 505.94 C 268.13 506.43 263.67 506.15 259.67 500.59 Z M 264.82 491.18 ",
  },
  "Monza Circuit": {
    code: "MNZ",
    viewBox: "0 0 800 600",
    path:
      "M 184.88119,421.2098 L 210.11257,372.60766 C 210.11257,372.60766 214.04248,362.17434 215.07668,344.06671 C 215.07668,344.06671 214.86951,330.20978 226.24459,311.80291 L 253.54456,257.53266 L 278.96043,204.54734 C 278.96043,204.54734 280.57085,196.81229 290.94521,196.3985 C 290.94521,196.3985 301.11689,197.01915 301.7333,176.95762 C 301.7333,176.95762 303.32496,149.57582 320.23907,122.5778 L 343.41672,91.687776 C 343.41672,91.687776 349.37499,84.769178 374.01592,79.256951 C 374.01592,79.256951 395.1734,74.448358 413.20812,81.821452 L 518.06468,114.97744 C 518.06468,114.97744 530.2878,118.28925 540.58717,110.79679 C 540.58717,110.79679 542.35538,106.85701 557.41198,110.50714 L 623.12835,119.25553 C 623.12835,119.25553 640.29412,118.01435 632.02146,144.07351 L 615.97067,193.71008 C 615.97067,193.71008 614.44179,203.01681 608.03065,203.63718 L 533.49825,208.56631 C 533.49825,208.56631 501.8674,215.21902 468.68817,227.42126 L 363.3649,259.68482 L 343.92419,265.47586 C 343.92419,265.47586 335.56038,266.89 332.3422,280.3412 C 332.3422,280.3412 332.16573,289.53858 317.95106,296.78005 L 312.08695,299.00618 C 312.08695,299.00618 302.06482,302.59525 294.08094,320.90302 L 262.43422,380.4667 L 225.41726,449.54383 L 192.94708,511.79613 L 182.80031,530.35518 C 182.80031,530.35518 175.56232,544.6068 160.68309,535.85386 C 160.68309,535.85386 147.34957,527.45268 146.41281,509.72778 C 146.41281,509.72778 143.31038,501.86886 154.68578,481.80735 L 184.88119,421.2098 z ",
  },
  Hockenheimring: {
    code: "HCK",
    viewBox: "0 0 453.54 340.16",
    path:
      "M 330.78 155.56 C 329.12 156.71 325.99 157.88 322.86 158.18 C 316.84 158.74 264.70 150.85 260.78 150.40 C 259.31 150.23 257.25 150.58 256.60 151.91 C 250.82 163.87 258.04 176.24 261.45 180.70 C 268.99 190.56 261.26 201.67 257.11 204.47 C 243.40 213.71 201.01 242.27 196.09 245.60 C 190.67 249.27 185.01 252.38 178.46 252.31 C 171.06 252.23 165.48 249.39 161.49 244.63 C 149.31 230.09 138.15 215.76 125.37 201.56 C 122.70 198.59 116.47 199.39 113.54 202.10 C 109.90 205.47 109.01 211.37 110.54 215.61 C 112.95 222.25 114.41 230.83 117.92 234.63 C 122.07 239.14 128.82 239.88 133.86 243.38 C 139.80 247.51 144.20 254.29 147.68 261.03 C 151.04 267.56 151.69 273.26 141.00 281.58 C 136.48 285.10 137.49 284.28 132.51 287.11 C 127.85 289.76 122.70 290.02 119.20 289.04 C 113.74 287.51 111.44 283.93 107.88 276.46 C 90.76 240.52 75.66 209.51 57.61 173.81 C 53.66 165.99 65.32 141.41 75.45 130.37 C 126.52 74.77 138.20 64.48 141.73 63.01 C 147.38 60.65 151.77 72.62 151.98 77.25 C 152.41 87.07 151.24 92.47 161.19 98.18 C 265.68 158.14 310.29 135.68 400.95 98.21 C 408.06 95.27 409.84 94.87 412.01 97.72 C 414.11 100.48 409.69 103.47 406.84 105.16 Z M 364.45 133.12 ",
  },
  "Red Bull Ring": {
    code: "RBR",
    viewBox: "0 0 680.31 510.24",
    path:
      "m 567.8,358.72 c -53.51,13.54 -107.02,27.08 -160.52,40.62 -35.64,8.84 -71.28,17.68 -106.91,26.52 -4.14,0.89 -8.94,2.64 -12.83,0.72 0,0 -5.38,-9.78 -8.59,-15.72 0,0 -8.42,-14.01 -28.68,-39.41 L 227.41,339.32 150.03,185.06 66.76,89.44 c 0,0 -12.1,-11.72 5.12,-15.45 l 71.9,-1.78 50.21,9.54 74.62,13.62 68.35,6.9 71,5.47 c 0,0 17.91,3.77 10.13,21.5 0,0 -20.97,41.77 -67.85,47.33 0,0 -11.52,4.11 -62.17,-5.78 0,0 -35.54,-11.84 -52.46,-3.75 0,0 -23.63,9.48 -22.24,35.47 0,0 0.55,6.14 4.24,13.73 l 34.09,63.28 c 0,0 20.22,23.16 47.47,5.5 l 33.29,-34.78 c 0,0 16.16,-11.77 37.62,-13.2 l 166.05,0.37 39.91,0.02 c 0,0 15.67,0.35 21.71,14.72 l 18.32,69.16 c 0,0 4.4,12.13 -8.65,18.49 z m 0,0",
  },
};

function RollingTimeDisplay({
  value,
  sizeClassName,
  wrapperClassName = "",
}: RollingTimeDisplayProps) {
  const displayRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(displayRef, { once: true, amount: 0.6 });

  const reelData = useMemo(() => {
    let digitCount = 0;

    return value.split("").map((char) => {
      if (!/\d/.test(char)) {
        return {
          type: "separator" as const,
          char,
          key: `separator-${char}-${digitCount}`,
        };
      }

      const targetDigit = Number(char);
      const cycles = 3 + digitCount;
      const reel = Array.from({ length: cycles }, () => DIGITS)
        .flat()
        .concat(DIGITS.slice(0, targetDigit + 1));

      const item = {
        type: "digit" as const,
        reel,
        finalIndex: reel.length - 1,
        delay: 0.08 + digitCount * 0.07,
        key: `digit-${digitCount}-${char}`,
      };

      digitCount += 1;
      return item;
    });
  }, [value]);

  return (
    <div
      ref={displayRef}
      className={`flex items-end leading-none ${wrapperClassName}`}
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
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.32, delay: 0.18, ease: [0.33, 0, 0.13, 1] }}
            className={`${sizeClassName} inline-flex items-end text-white`}
          >
            {item.char}
          </motion.span>
        ) : (
          <span
            key={item.key}
            className={`${sizeClassName} relative inline-flex h-[1.02em] w-[0.68em] overflow-hidden text-white`}
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
                duration: 1 + item.delay * 0.6,
                delay: item.delay,
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
                  className={`${sizeClassName} flex h-[1em] w-full items-center justify-center`}
                >
                  {digit}
                </span>
              ))}
            </motion.span>
          </span>
        )
      )}
    </div>
  );
}

function StatusChip({
  label,
  accent = false,
}: {
  label: string;
  accent?: boolean;
}) {
  return (
    <div
      className="inline-flex items-center gap-2 border px-3 py-1.5 text-[0.58rem] uppercase tracking-[0.28em]"
      style={{
        borderColor: accent ? "rgba(212,175,55,0.45)" : "rgba(255,255,255,0.14)",
        background: accent ? "rgba(212,175,55,0.08)" : "rgba(255,255,255,0.03)",
        fontFamily: "var(--font-rajdhani), sans-serif",
        color: accent ? "#D4AF37" : "rgba(255,255,255,0.7)",
      }}
    >
      <motion.span
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: accent ? "#D4AF37" : "rgba(255,255,255,0.72)" }}
      />
      {label}
    </div>
  );
}

function TrackTrace({
  track,
  compact = false,
  delay = 0,
}: {
  track: string;
  compact?: boolean;
  delay?: number;
}) {
  const traceRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(traceRef, { once: true, amount: 0.45 });
  const meta = TRACK_META[track];

  if (!meta) {
    return null;
  }

  return (
    <div
      ref={traceRef}
      className={`relative overflow-hidden border ${
        compact ? "h-32 px-3 py-3" : "h-[260px] px-4 py-4 md:h-[320px] md:px-6 md:py-5"
      }`}
      style={{
        borderColor: "rgba(212,175,55,0.16)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.01) 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 32%), repeating-linear-gradient(0deg, transparent 0 18px, rgba(255,255,255,0.022) 18px 19px), repeating-linear-gradient(90deg, transparent 0 22px, rgba(255,255,255,0.018) 22px 23px)",
        }}
      />

      <svg
        viewBox={meta.viewBox}
        className="relative z-10 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <path
          d={meta.path}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={compact ? 4 : 5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <motion.path
          d={meta.path}
          fill="none"
          stroke="#D4AF37"
          strokeWidth={compact ? 3.2 : 4}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0.3 }}
          animate={
            isInView
              ? {
                  pathLength: [0, 0.92, 1],
                  opacity: [0.25, 0.95, 1],
                }
              : undefined
          }
          transition={{
            duration: compact ? 1.5 : 2.2,
            delay,
            times: [0, 0.88, 1],
            ease: [0.33, 0, 0.13, 1],
          }}
          style={{
            filter: "drop-shadow(0 0 8px rgba(212,175,55,0.28))",
          }}
        />
      </svg>
    </div>
  );
}

export default function RecordsSection() {
  const { lang } = useLanguage();
  const t = translations[lang].records;
  const heroRecord = CAR.records[0];
  const heroMeta = TRACK_META[heroRecord.track];
  const otherRecords = CAR.records.slice(1).map((record, i) => ({
    ...record,
    note: t.notes[i] ?? record.note,
    meta: TRACK_META[record.track],
  }));

  return (
    <section
      className="relative overflow-hidden px-8 py-24 md:px-16 md:py-36"
      style={{ background: "#0D0D0D" }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none"
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
            className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-amg-gold"
            style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
          >
            {t.sectionLabel}
          </p>
          <h2
            className="text-3xl font-black text-white md:text-5xl"
            style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
          >
            {t.sectionTitle}
          </h2>
        </motion.div>

        <div className="mb-16 grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] xl:items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="mb-8 h-[1px]"
              style={{ background: "linear-gradient(90deg, #D4AF37, transparent)", opacity: 0.5 }}
            />
            <p
              className="mb-3 text-xs uppercase tracking-[0.3em] text-amg-silver/60"
              style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
            >
              {t.nurburgringLabel}
            </p>

            <div
              className="relative overflow-hidden border p-5 md:p-6"
              style={{
                borderColor: "rgba(212,175,55,0.16)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.015) 100%)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 28%), repeating-linear-gradient(0deg, transparent 0 20px, rgba(255,255,255,0.02) 20px 21px)",
                }}
              />
              <div className="relative z-10 flex items-center justify-between gap-4">
                <span
                  className="text-[0.58rem] uppercase tracking-[0.32em] text-amg-gold"
                  style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
                >
                  {t.pitChrono}
                </span>
                <span
                  className="text-[0.58rem] uppercase tracking-[0.32em] text-white/32"
                  style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
                >
                  {heroMeta?.code}
                </span>
              </div>

              <RollingTimeDisplay
                value={heroRecord.time}
                sizeClassName="text-[clamp(4rem,14vw,12rem)]"
                wrapperClassName="mt-4"
              />

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <StatusChip label={`Δ ${t.deltaNegative}`} />
                <StatusChip label={t.recordBroken} accent />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div className="h-[1px] w-12" style={{ background: "#D4AF37", opacity: 0.6 }} />
              <p
                className="text-xs font-semibold uppercase tracking-[0.25em] text-amg-gold"
                style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
              >
                {t.fastestCar}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <p
                className="text-[0.58rem] uppercase tracking-[0.32em] text-amg-gold"
                style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
              >
                {t.trackTrace}
              </p>
              <span
                className="text-[0.58rem] uppercase tracking-[0.28em] text-white/35"
                style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
              >
                {heroMeta?.code} // LIVE
              </span>
            </div>
            <TrackTrace track={heroRecord.track} delay={0.16} />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {otherRecords.map((record, i) => (
            <motion.div
              key={record.track}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.55,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden p-6"
              style={{
                border: "1px solid rgba(42,42,42,0.8)",
                background: "linear-gradient(180deg, rgba(17,17,17,0.72) 0%, rgba(14,14,14,0.88) 100%)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 28%), repeating-linear-gradient(0deg, transparent 0 19px, rgba(255,255,255,0.02) 19px 20px)",
                }}
              />
              <div className="absolute left-0 top-0 h-[1px] w-6" style={{ background: "#D4AF37" }} />
              <div className="absolute left-0 top-0 h-6 w-[1px]" style={{ background: "#D4AF37" }} />

              <div className="relative z-10">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p
                      className="text-xs uppercase tracking-[0.25em] text-amg-silver/55"
                      style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
                    >
                      {record.track}
                    </p>
                    <p
                      className="text-[0.58rem] uppercase tracking-[0.28em] text-amg-gold"
                      style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
                    >
                      {t.trackTrace}
                    </p>
                  </div>
                  <span
                    className="text-[0.62rem] uppercase tracking-[0.28em] text-white/32"
                    style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
                  >
                    {record.meta?.code}
                  </span>
                </div>

                <TrackTrace track={record.track} compact delay={0.14 + i * 0.08} />

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <StatusChip label={`Δ ${t.deltaNegative}`} />
                  <StatusChip label={t.recordBroken} accent />
                </div>

                <div className="mt-6 flex items-end justify-between gap-4">
                  <RollingTimeDisplay
                    value={record.time}
                    sizeClassName="text-3xl md:text-4xl"
                  />
                  <div className="flex shrink-0 flex-col items-end gap-1 text-right">
                    <p
                      className="text-[0.58rem] uppercase tracking-[0.3em] text-amg-gold"
                      style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
                    >
                      {t.pitChrono}
                    </p>
                    <div className="h-[1px] w-14" style={{ background: "rgba(212,175,55,0.5)" }} />
                  </div>
                </div>

                <p
                  className="mt-4 max-w-[22ch] text-xs uppercase tracking-[0.2em] text-amg-gold"
                  style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
                >
                  {record.note}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
