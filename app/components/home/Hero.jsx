"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import Image from "next/image";

export default function UsarionHero() {
  const containerRef = useRef(null);

  const images = [
    "/assets/img-1.webp",
    "/assets/img-2.webp",
    "/assets/img-3.webp",
    "/assets/img-4.webp",
    "/assets/img-5.webp",
    "/assets/img-6.webp",
    "/assets/img-7.webp",
    "/assets/img-8.webp",
    "/assets/img-9.webp",
  ];

  /* ---------------- SCROLL ---------------- */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 28,
    mass: 0.6,
  });

  /* ---------------- LEFT CONTENT ---------------- */
  const leftOpacity = useTransform(progress, [0, 0.25], [1, 0]);
  const leftX = useTransform(progress, [0, 0.25], ["0%", "-12%"]);

  /* ---------------- RIGHT PANEL (SMALL → FULL) ---------------- */
  const panelX = useTransform(progress, [0, 0.35], ["42%", "0%"]);

  const clipPath = useTransform(
    progress,
    [0, 0.35],
    [
      "inset(0 0 0 58%)", // small visible panel
      "inset(0 0 0 0%)", // full screen
    ]
  );

  const panelRadius = useTransform(progress, [0, 0.35], ["28px", "0px"]);

  /* ---------------- IMAGE DRIFT (BOTTOM → TOP) ---------------- */
  const col1 = useTransform(progress, [0, 1], ["18%", "-22%"]);
  const col2 = useTransform(progress, [0, 1], ["26%", "-36%"]);
  const col3 = useTransform(progress, [0, 1], ["34%", "-50%"]);

  return (
    <section ref={containerRef} className="relative min-h-[400vh] bg-[#F8F9FA]">
      {/* STICKY VIEWPORT */}
      <div className="sticky top-0 h-screen overflow-hidden flex">
        {/* LEFT CONTENT */}
        <motion.div
          style={{ opacity: leftOpacity, x: leftX }}
          className="w-1/2 h-full flex flex-col justify-center px-16 z-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm font-semibold text-gray-500">
              ★★★★★ 5.0 on Clutch
            </span>
          </div>

          <h1 className="text-6xl font-bold leading-tight">
            Usability & ROI
            <span className="block mt-4 text-gray-500">
              Focused UI/UX Design Agency
            </span>
          </h1>

          <p className="mt-8 text-xl text-gray-600 max-w-md">
            Boost Business Growth with User-Centric UI/UX Design
          </p>

          <div className="mt-12 flex gap-4">
            <button className="h-14 px-8 bg-black text-white rounded-full flex items-center gap-2 font-medium">
              Request free audit <ArrowUpRight size={18} />
            </button>

            <button className="h-14 px-8 border border-black rounded-full flex items-center gap-2 font-medium">
              Schedule a call <Calendar size={18} />
            </button>
          </div>
        </motion.div>

        {/* RIGHT PANEL */}
        <motion.div
          style={{
            x: panelX,
            clipPath,
            borderTopLeftRadius: panelRadius,
            borderBottomLeftRadius: panelRadius,
          }}
          className="absolute inset-0 bg-black overflow-hidden">
          {/* IMAGE GRID */}
          <div className="absolute inset-0 grid grid-cols-3 gap-6 p-10">
            <motion.div style={{ y: col1 }} className="space-y-6">
              {images.slice(0, 3).map((src, i) => (
                <ImageCard key={i} src={src} />
              ))}
            </motion.div>

            <motion.div style={{ y: col2 }} className="space-y-6">
              {images.slice(3, 6).map((src, i) => (
                <ImageCard key={i} src={src} />
              ))}
            </motion.div>

            <motion.div style={{ y: col3 }} className="space-y-6">
              {images.slice(6, 9).map((src, i) => (
                <ImageCard key={i} src={src} />
              ))}
            </motion.div>
          </div>

          {/* FADE OVERLAYS */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        </motion.div>
      </div>

      {/* EXTRA SCROLL SPACE */}
      <div className="h-[200vh]" />
    </section>
  );
}

/* ---------------- IMAGE CARD ---------------- */
function ImageCard({ src }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative aspect-square rounded-2xl overflow-hidden">
      <Image src={src} alt="" fill className="object-cover" />
    </motion.div>
  );
}
