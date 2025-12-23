"use client";
import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { ArrowUpRight, ChevronRight, Sparkles } from "lucide-react";
import Image from "next/image";

const UsarionHeroPerfect = () => {
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);

  // Load images from assets
  useEffect(() => {
    const imagePaths = [];
    for (let i = 1; i <= 12; i++) {
      imagePaths.push(`/assets/project${i}.jpg`);
    }
    setImages(imagePaths);
  }, []);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Ultra smooth physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 40,
    restDelta: 0.001,
    mass: 0.8,
  });

  // 1. Panel expansion - Start smaller, expand to full
  const panelWidth = useTransform(smoothProgress, [0, 0.8], ["40%", "100%"]);
  const panelHeight = useTransform(smoothProgress, [0, 0.8], ["85%", "100%"]);
  const panelY = useTransform(smoothProgress, [0, 0.8], ["7.5%", "0%"]);
  const panelRadius = useTransform(smoothProgress, [0, 0.8], ["60px", "0px"]);

  // 2. Left content fade with delay
  const leftOpacity = useTransform(smoothProgress, [0, 0.3, 0.6], [1, 0.5, 0]);
  const leftScale = useTransform(smoothProgress, [0, 0.3, 0.6], [1, 0.95, 0.9]);

  // 3. Right panel content animations
  const contentOpacity = useTransform(
    smoothProgress,
    [0.2, 0.4, 0.8, 1],
    [0, 1, 1, 1]
  );
  const contentScale = useTransform(smoothProgress, [0.2, 0.4], [0.9, 1]);

  // 4. Image grid animations - BOTTOM TO TOP with fade
  const gridY = useTransform(smoothProgress, [0.3, 1], ["20%", "-120%"]);
  const gridOpacity = useTransform(
    smoothProgress,
    [0.3, 0.5, 0.9, 1],
    [0, 1, 1, 0.5]
  );

  // 5. Image item animations - Staggered entrance
  const imgScale = useTransform(
    smoothProgress,
    [0.3, 0.5, 0.8, 1],
    [0.8, 1, 1.05, 1.1]
  );
  const imgRotate = useTransform(smoothProgress, [0.3, 0.5], [-5, 0]);

  // 6. Panel glow effect
  const panelGlow = useTransform(smoothProgress, [0, 0.5, 1], [0, 0.3, 0.1]);

  return (
    <div ref={containerRef} className="relative min-h-[400vh] bg-white">
      {/* Sticky hero section */}
      <div className="sticky top-0 h-screen w-full flex overflow-hidden">
        {/* LEFT SECTION - White background */}
        <motion.div
          style={{
            opacity: leftOpacity,
            scale: leftScale,
          }}
          className="w-1/2 h-full flex flex-col justify-center px-8 lg:px-16 xl:px-24 relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-10">
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2.5 h-2.5 bg-blue-500 rounded-full"
              />
            </div>
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-gray-500">
              Digital Product Studio
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.85] text-black">
            <span className="block">Building</span>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="block mt-4 relative">
              Digital
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -right-6 -top-2">
                <Sparkles className="w-6 h-6 text-blue-400" />
              </motion.span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="block mt-4 text-gray-600">
              Excellence
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 text-xl text-gray-600 max-w-lg leading-relaxed">
            We craft immersive digital experiences that transform businesses and
            engage audiences with cutting-edge design.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-12 flex flex-wrap gap-4 items-center">
            <button className="group h-14 px-8 bg-black text-white rounded-full font-semibold flex items-center gap-3 hover:bg-gray-900 transition-all duration-300 hover:scale-105">
              Start Project
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>

            <button className="group h-14 px-8 bg-transparent border border-gray-300 text-gray-700 rounded-full font-semibold flex items-center gap-3 hover:border-black hover:text-black transition-all duration-300">
              View Case Studies
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 pt-8 border-t border-gray-200 grid grid-cols-3 gap-8">
            {[
              { number: "200+", label: "Projects" },
              { number: "99%", label: "Satisfaction" },
              { number: "5Y", label: "Experience" },
            ].map((stat, index) => (
              <div key={index} className="text-left">
                <div className="text-3xl font-bold text-black">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT SECTION - Black panel with animations */}
        <motion.div
          style={{
            width: panelWidth,
            height: panelHeight,
            y: panelY,
            borderTopLeftRadius: panelRadius,
            borderBottomLeftRadius: panelRadius,
          }}
          className="absolute right-0 top-0 bg-black z-20 overflow-hidden shadow-[-20px_0_60px_rgba(0,0,0,0.15)]">
          {/* Panel glow effect */}
          <motion.div
            style={{ opacity: panelGlow }}
            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-transparent pointer-events-none"
          />

          {/* Panel content */}
          <motion.div
            style={{
              opacity: contentOpacity,
              scale: contentScale,
            }}
            className="relative h-full w-full">
            {/* Image grid container - BOTTOM TO TOP animation */}
            <motion.div
              style={{
                y: gridY,
                opacity: gridOpacity,
              }}
              className="absolute inset-0 p-6 lg:p-10 grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {images.map((src, index) => (
                <motion.div
                  key={index}
                  style={{
                    scale: imgScale,
                    rotate: imgRotate,
                  }}
                  custom={index}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      delay: index * 0.05,
                      ease: "easeOut",
                    },
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    transition: { duration: 0.3 },
                  }}
                  className="relative aspect-square rounded-2xl lg:rounded-3xl overflow-hidden group cursor-pointer">
                  {/* Image with fade in */}
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.03 }}
                      className="absolute inset-0">
                      <div className="relative w-full h-full">
                        <Image
                          src={src}
                          alt={`Project ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 33vw"
                          className="object-cover transition-all duration-700 group-hover:scale-110"
                          priority={index < 3}
                          onError={(e) => {
                            // Fallback gradient
                            const colors = [
                              "from-blue-900 to-cyan-900",
                              "from-purple-900 to-pink-900",
                              "from-green-900 to-emerald-900",
                              "from-orange-900 to-red-900",
                            ];
                            e.target.parentElement.className = `absolute inset-0 bg-gradient-to-br ${
                              colors[index % colors.length]
                            }`;
                          }}
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Overlay with slide up */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 lg:p-6 flex flex-col justify-end">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="text-xs font-medium tracking-widest text-cyan-300 uppercase">
                        Case Study
                      </div>
                      <div className="text-lg font-bold text-white mt-1">
                        Project {index + 1}
                      </div>
                      <div className="text-sm text-gray-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View details →
                      </div>
                    </div>
                  </motion.div>

                  {/* Number indicator */}
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs font-bold text-white">
                      0{index + 1}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom fade gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />

            {/* Top fade gradient */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />

            {/* Panel label - Fades in */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute top-8 left-8 z-30">
              <div className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-cyan-400 rounded-full"
                />
                <span className="text-sm font-medium text-white">
                  Selected Works
                </span>
              </div>
            </motion.div>

            {/* Scroll indicator inside panel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-8 right-8 z-30">
              <div className="flex flex-col items-center">
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-xs text-gray-400 mb-2">
                  Scroll
                </motion.span>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-6 h-10 border border-white/30 rounded-full flex items-center justify-center">
                  <div className="w-1 h-3 bg-cyan-400 rounded-full" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll progress indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex flex-col items-center">
          <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden mb-3">
            <motion.div
              style={{ scaleX: smoothProgress }}
              className="w-full h-full bg-black origin-left"
            />
          </div>
          <span className="text-xs text-gray-500 tracking-widest">
            SCROLL TO REVEAL
          </span>
        </div>
      </div>

      {/* Spacer for scrolling */}
      <div className="h-[300vh] bg-white" />
    </div>
  );
};

export default UsarionHeroPerfect;
