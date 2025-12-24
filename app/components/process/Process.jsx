"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { id: "01", title: "Understand", desc: "Business goals and pain points." },
  { id: "02", title: "Define", desc: "Strategy & structure." },
  { id: "03", title: "Ideate", desc: "Concepts & wireframes." },
  { id: "04", title: "Design", desc: "UI & visual system." },
  { id: "05", title: "Test", desc: "Feedback & iteration." },
  { id: "06", title: "Deliver", desc: "Final assets." },
];

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        gsap.set(card, {
          x: i === 0 ? 0 : window.innerWidth,
          scale: 1,
          opacity: i === 0 ? 1 : 0,
        });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: () => `top+=${i * window.innerHeight} top`,
          end: () => `top+=${(i + 1) * window.innerHeight} top`,
          scrub: true,

          onUpdate: (self) => {
            // Incoming card
            gsap.to(card, {
              x: gsap.utils.interpolate(window.innerWidth, 0, self.progress),
              opacity: self.progress,
              ease: "none",
            });

            // Previous stacked cards
            cardsRef.current.slice(0, i).forEach((prev, index) => {
              gsap.to(prev, {
                x: -80 * (i - index),
                scale: 1 - (i - index) * 0.06,
                opacity: 0.6,
                ease: "none",
              });
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[700vh] bg-[#0B0214] text-white">
      <div className="sticky top-0 h-screen px-24 flex flex-col justify-center">
        <h2 className="text-[52px] max-w-3xl leading-tight mb-24">
          We follow a streamlined design process from understanding your goals
          to delivering polished assets.
        </h2>

        <div className="relative h-[420px]">
          {steps.map((step, i) => (
            <div
              key={step.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="absolute top-0 left-0 w-[420px] h-[400px] bg-white text-black rounded-[44px] p-10 flex flex-col justify-between shadow-[-35px_0_80px_rgba(0,0,0,0.85)]"
              style={{ zIndex: steps.length - i }}>
              <span className="absolute top-8 right-10 text-7xl font-bold text-gray-200">
                {step.id}
              </span>

              <div>
                <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-500 text-lg">{step.desc}</p>
              </div>

              <span className="uppercase tracking-widest text-xs text-gray-400">
                Step {step.id}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
