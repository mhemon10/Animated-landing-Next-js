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
    "/assets/img-10.webp",
    "/assets/img-11.webp",
    "/assets/img-9.webp",
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 38,
    damping: 26,
    mass: 0.9,
  });

  const leftOpacity = useTransform(progress, [0, 0.35], [1, 0]);
  const leftX = useTransform(progress, [0, 0.35], ["0%", "-15%"]);

  const panelWidth = useTransform(
    progress,
    [0, 0.15, 0.6],
    ["40vw", "85vw", "100vw"]
  );
  const panelRadius = useTransform(progress, [0, 0.5], ["28px", "0px"]);

  const imageRotate = useTransform(progress, [0, 0.6], [8, 0]);
  const col1 = useTransform(progress, [0, 1], ["25%", "-75%"]);
  const col2 = useTransform(progress, [0, 1], ["35%", "-85%"]);
  const col3 = useTransform(progress, [0, 1], ["45%", "-95%"]);

  const cols = [[], [], []];
  images.forEach((img, idx) => {
    cols[idx % 3].push(img);
  });

  return (
    <section ref={containerRef} className="relative min-h-[450vh] bg-[#F8F9FA]">
      <div className="sticky top-0 h-screen relative overflow-hidden">
        {/* LEFT PANEL */}
        <motion.div
          style={{ opacity: leftOpacity, x: leftX }}
          className="absolute left-0 top-0 w-1/2 h-full flex flex-col justify-center px-16 z-10 bg-[#F8F9FA]">
          <span className="text-sm text-gray-500 mb-4">
            ★★★★★ 5.0 Rating on Clutch
          </span>

          <h1 className="text-6xl font-bold leading-tight">
            Usability & ROI Focused
            <span className="block mt-4 text-gray-500">
              UI/UX Design Agency
            </span>
          </h1>

          <p className="mt-8 text-xl text-gray-600 max-w-md">
            Boost Business Growth with User-Centric UI/UX Design
          </p>

          <div className="mt-12 flex gap-4">
            <button className="h-14 px-8 bg-black text-white rounded-full flex items-center gap-2 hover:bg-gray-900 transition-colors duration-300">
              Request free audit <ArrowUpRight size={18} />
            </button>
            <button className="h-14 px-8 border border-black rounded-full flex items-center gap-2 hover:bg-black hover:text-white transition-colors duration-300">
              Schedule a call <Calendar size={18} />
            </button>
          </div>
        </motion.div>

        {/* RIGHT PANEL */}
        <motion.div
          style={{
            width: panelWidth,
            borderTopLeftRadius: panelRadius,
            borderBottomLeftRadius: panelRadius,
          }}
          className="absolute right-0 top-0 h-full bg-black overflow-hidden z-20">
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gray-600 to-transparent z-30" />

          <div className="absolute inset-0 p-10">
            <div className="relative h-[150%] -top-[25%]">
              <motion.div
                style={{ y: col1, rotate: imageRotate }}
                className="absolute left-0 w-1/3 px-3 space-y-6">
                {cols[0].map((src, i) => (
                  <ImageCard key={i} src={src} />
                ))}
              </motion.div>

              <motion.div
                style={{ y: col2, rotate: imageRotate }}
                className="absolute left-1/3 w-1/3 px-3 space-y-6">
                {cols[1].map((src, i) => (
                  <ImageCard key={i} src={src} />
                ))}
              </motion.div>

              <motion.div
                style={{ y: col3, rotate: imageRotate }}
                className="absolute left-2/3 w-1/3 px-3 space-y-6">
                {cols[2].map((src, i) => (
                  <ImageCard key={i} src={src} />
                ))}
              </motion.div>
            </div>
          </div>

          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent" />
        </motion.div>
      </div>

      <div className="h-[250vh]" />
    </section>
  );
}

function ImageCard({ src }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.35, ease: "easeOut" },
      }}
      className="relative aspect-square rounded-2xl overflow-hidden bg-gray-800 group cursor-pointer">
      <Image
        src={src}
        alt=""
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 33vw, 33vw"
      />

      {/* HOVER OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
        <div className="text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <div className="text-xs font-medium">Project</div>
          <div className="text-sm font-bold">Case Study</div>
        </div>
      </div>
    </motion.div>
  );
}
