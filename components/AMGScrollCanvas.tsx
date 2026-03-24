"use client";

import { useEffect, useRef, useState } from "react";
import { MotionValue, useTransform } from "framer-motion";

interface Props {
  scrollYProgress: MotionValue<number>;
  totalFrames: number;
  imageFolderPath: string;
}

export default function AMGScrollCanvas({
  scrollYProgress,
  totalFrames,
  imageFolderPath,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, totalFrames - 1]
  );

  // Preload all images
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;
    const total = totalFrames;

    for (let i = 1; i <= total; i++) {
      const img = new Image();
      const num = String(i).padStart(4, "0");
      img.src = `${imageFolderPath}/${num}.jpg`;
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === total) {
          setIsReady(true);
        }
      };
      img.onerror = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === total) {
          setIsReady(true);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [totalFrames, imageFolderPath]);

  // Draw frame with object-fit cover logic
  function drawFrame(index: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[Math.round(index)];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.clientWidth * dpr;
    const ch = canvas.clientHeight * dpr;

    if (canvas.width !== cw || canvas.height !== ch) {
      canvas.width = cw;
      canvas.height = ch;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // object-fit: cover
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = canvas.width / canvas.height;

    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;

    if (imgAspect > canvasAspect) {
      sw = img.naturalHeight * canvasAspect;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = img.naturalWidth / canvasAspect;
      sy = (img.naturalHeight - sh) / 2;
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  }

  // Subscribe to frameIndex changes
  useEffect(() => {
    const unsubscribe = frameIndex.on("change", (latest) => {
      const index = Math.max(0, Math.min(totalFrames - 1, Math.round(latest)));
      if (index !== currentFrameRef.current) {
        currentFrameRef.current = index;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(index));
      }
    });
    return () => {
      unsubscribe();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [frameIndex, totalFrames, isReady]);

  // Draw first frame when ready
  useEffect(() => {
    if (isReady) drawFrame(0);
  }, [isReady]);

  // Handle resize
  useEffect(() => {
    const onResize = () => drawFrame(currentFrameRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isReady]);

  const loadPercent = Math.round((loadedCount / totalFrames) * 100);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: isReady ? "block" : "none" }}
      />

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* Bottom fade to black */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-[1]"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(10,10,10,0.7))",
        }}
      />

      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-[1]"
        style={{
          background: "linear-gradient(to top, transparent, rgba(10,10,10,0.4))",
        }}
      />

      {/* Loading screen */}
      {!isReady && (
        <div className="absolute inset-0 bg-amg-black flex flex-col items-center justify-center z-10">
          <div
            className="text-amg-gold text-xs tracking-[0.4em] uppercase mb-6"
            style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
          >
            Initializing
          </div>
          <div className="w-64 h-[1px] bg-carbon-mid relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full transition-all duration-100"
              style={{
                width: `${loadPercent}%`,
                background: "linear-gradient(90deg, #D4AF37, #FFD700)",
              }}
            />
          </div>
          <div
            className="text-amg-gold text-xs tracking-[0.2em] mt-4"
            style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
          >
            {loadPercent}%
          </div>
        </div>
      )}
    </div>
  );
}
