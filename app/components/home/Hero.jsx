"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import Image from "next/image";

const UsarionHero = () => {
  const containerRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // আপনার যতগুলো image আছে সেটা দিতে পারেন
  const images = [
    "/assets/img-1.webp",
    "/assets/img-2.webp",
    "/assets/img-3.webp",
    "/assets/img-4.webp",
    "/assets/img-5.webp",
    "/assets/img-7.webp",
    "/assets/img-8.webp",
    "/assets/img-9.webp",
    "/assets/img-10.webp",
    "/assets/img-11.webp",
    "/assets/img-6.webp",
    "/assets/img-9.webp",
    "/assets/img-3.webp",
  ];

  // যদি মাত্র 4টি image থাকে
  // const images = [
  //   "/assets/img-1.webp",
  //   "/assets/img-2.webp",
  //   "/assets/img-3.webp",
  //   "/assets/img-4.webp",
  // ];

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth scroll physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 30,
    restDelta: 0.001,
  });

  // 1. Panel Expansion
  const panelWidth = useTransform(smoothProgress, [0, 0.8], ["45%", "100%"]);
  const panelRadius = useTransform(smoothProgress, [0, 0.8], ["60px", "0px"]);

  // 2. Left Content Fade Out
  const contentOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
  const contentX = useTransform(smoothProgress, [0, 0.4], ["0%", "-15%"]);

  // 3. Image Grid Scroll - Adjust based on image count
  const gridY = useTransform(
    smoothProgress,
    [0.2, 1],
    ["10%", `-${100 + images.length * 10}%`]
  );

  // 4. Individual Image Animations
  const imgOpacity = useTransform(
    smoothProgress,
    [0, 0.3, 0.7, 1],
    [1, 1, 1, 0.8]
  );
  const imgScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.05, 1.1]);

  // 5. Rotate Animation for Initial Images
  const initialRotate = useTransform(smoothProgress, [0, 0.2], [5, 0]);

  useEffect(() => {
    // Preload images
    const preloadImages = images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = () => {
          console.warn(`Failed to load image: ${src}`);
          resolve(); // Continue even if some images fail
        };
      });
    });

    Promise.all(preloadImages)
      .then(() => {
        setImagesLoaded(true);
      })
      .catch(() => {
        setImagesLoaded(true); // Still set loaded even if some fail
      });
  }, []);

  // Calculate grid columns based on image count
  const gridCols =
    images.length <= 4 ? "grid-cols-2" : "grid-cols-2 lg:grid-cols-3";

  return (
    <div ref={containerRef} className="relative min-h-[400vh] bg-[#F8F9FA]">
      {/* Sticky Main Viewport */}
      <div className="sticky top-0 h-screen w-full flex overflow-hidden">
        {/* LEFT TEXT SECTION */}
        <motion.div
          style={{
            opacity: contentOpacity,
            x: contentX,
          }}
          className="w-1/2 h-full flex flex-col justify-center px-8 lg:px-16 xl:px-24 relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 mb-8">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2.5 h-2.5 bg-green-500 rounded-full"
            />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
              UI/UX Design Agency
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.9] text-gray-900">
            <span className="block">Usability & ROI</span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="block mt-4">
              Focused
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="block mt-4 text-gray-600">
              UI/UX Design
            </motion.span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 text-2xl lg:text-3xl text-gray-600 max-w-xl leading-tight">
            Boost Business Growth with User-Centric UI/UX Design
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex flex-wrap gap-4">
            <button className="group h-14 px-8 bg-black text-white rounded-full font-bold flex items-center gap-3 hover:bg-gray-900 transition-all duration-300 hover:scale-105">
              Request free audit
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>

            <button className="group h-14 px-8 bg-transparent border border-gray-300 text-gray-700 rounded-full font-bold flex items-center gap-3 hover:border-black hover:text-black transition-all duration-300">
              Schedule a call
              <Calendar className="w-4 h-4" />
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT PANEL */}
        <motion.div
          style={{
            width: panelWidth,
            borderTopLeftRadius: panelRadius,
            borderBottomLeftRadius: panelRadius,
          }}
          className="absolute right-0 top-0 h-screen bg-black z-20 overflow-hidden">
          {/* Animated Image Grid */}
          <motion.div
            style={{
              y: gridY,
              opacity: imgOpacity,
            }}
            className={`absolute inset-0 p-6 lg:p-10 grid ${gridCols} gap-4 lg:gap-6`}>
            {images.map((src, index) => (
              <motion.div
                key={index}
                style={{
                  scale: imgScale,
                  rotate: initialRotate,
                }}
                initial={{
                  opacity: 0,
                  y: 100,
                  rotate: index % 2 === 0 ? 5 : -5,
                }}
                animate={{
                  opacity: imagesLoaded ? 1 : 0,
                  y: imagesLoaded ? 0 : 100,
                  rotate: imagesLoaded ? (index % 2 === 0 ? 5 : -5) : 0,
                }}
                transition={{
                  opacity: { duration: 0.5, delay: index * 0.1 },
                  y: {
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "easeOut",
                  },
                  rotate: {
                    duration: 0.5,
                    delay: index * 0.1,
                  },
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 0,
                  transition: { duration: 0.3 },
                }}
                className="relative aspect-square rounded-xl lg:rounded-2xl overflow-hidden group cursor-pointer">
                {/* Image Container */}
                <div className="relative w-full h-full bg-gray-800">
                  {imagesLoaded ? (
                    <Image
                      src={src}
                      alt={`UI/UX Design Project ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority={index < 3}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
                  )}
                </div>

                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 lg:p-6 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="text-xs font-medium tracking-widest text-cyan-300 uppercase">
                      UI/UX Design
                    </div>
                    <div className="text-lg font-bold text-white mt-1">
                      Project {index + 1}
                    </div>
                    <div className="text-sm text-gray-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View case study →
                    </div>
                  </div>
                </motion.div>

                {/* Project number */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                  <span className="text-xs font-bold text-white">
                    0{index + 1}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* If you have fewer images, you can duplicate them */}
            {images.length < 6 &&
              images.map((src, index) => (
                <motion.div
                  key={`dup-${index}`}
                  style={{
                    scale: imgScale,
                    rotate: initialRotate,
                  }}
                  initial={{
                    opacity: 0,
                    y: 100,
                    rotate: index % 2 === 0 ? -5 : 5,
                  }}
                  animate={{
                    opacity: imagesLoaded ? 0.7 : 0,
                    y: imagesLoaded ? 0 : 100,
                  }}
                  transition={{
                    opacity: {
                      duration: 0.5,
                      delay: (index + images.length) * 0.1,
                    },
                    y: {
                      duration: 0.8,
                      delay: (index + images.length) * 0.1,
                      ease: "easeOut",
                    },
                  }}
                  className="relative aspect-square rounded-xl lg:rounded-2xl overflow-hidden opacity-70">
                  <div className="relative w-full h-full bg-gray-800">
                    {imagesLoaded && (
                      <Image
                        src={src}
                        alt={`UI/UX Design Project ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                </motion.div>
              ))}
          </motion.div>

          {/* Gradient overlays */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />

          {/* Panel label */}
          <div className="absolute top-8 left-8 z-30">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-green-400 rounded-full"
              />
              <span className="text-xs font-medium text-white">
                Our Portfolio
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center">
          <span className="text-xs text-gray-500 mb-2 tracking-widest">
            SCROLL
          </span>
          <div className="w-5 h-8 border border-gray-300 rounded-full flex items-center justify-center">
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-black rounded-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Empty space for scrolling */}
      <div className="h-[300vh] bg-[#F8F9FA]" />
    </div>
  );
};

export default UsarionHero;
