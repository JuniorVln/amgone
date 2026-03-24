"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

const gallerySrcs = [
  "/images/gallery/AMG - One 01.avif",
  "/images/gallery/AMG - One 02.avif",
  "/images/gallery/AMG One.jpeg",
  "/images/gallery/I_want_the_202603232139.png",
  "/images/gallery/I_want_the_202603232140.png",
  "/images/gallery/58a399091751658ca3682b5c40da60703b6d780f-1920x1079.jpg",
];

export default function GallerySection() {
  const { lang } = useLanguage();
  const t = translations[lang].gallery;

  const galleryImages = gallerySrcs.map((src, i) => ({
    src,
    alt: t.images[i] ?? src,
  }));

  return (
    <section className="relative py-24 px-8 md:px-16" style={{ background: "#0D0D0D" }}>
      <div className="h-[1px] w-full mb-16" style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)", opacity: 0.25 }} />

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
          {t.sectionTitle}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
        {galleryImages.map((img, i) => (
          <motion.div
            key={img.src}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-video overflow-hidden group cursor-pointer"
            style={{ background: "#111" }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Hover overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{ background: "rgba(0,0,0,0.35)" }}
            />
            {/* Bottom label */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
              <div className="h-[1px] w-8 mb-2" style={{ background: "#D4AF37" }} />
              <p
                className="text-white text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
              >
                {img.alt}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
