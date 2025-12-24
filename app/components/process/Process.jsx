"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const processes = [
  { id: "01", title: "Understand", desc: "Business goals and pain points." },
  { id: "02", title: "Define", desc: "Strategy, architecture, direction." },
  { id: "03", title: "Ideate", desc: "Brainstorming and wireframes." },
  { id: "04", title: "Design", desc: "UI design and prototyping." },
  { id: "05", title: "Test", desc: "User testing and feedback." },
  { id: "06", title: "Deliver", desc: "Final asset delivery." },
];

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${processes.length * 120}%`,
          scrub: true,
          pin: true,
        },
      });

      cardsRef.current.forEach((card, i) => {
        tl.fromTo(
          card,
          { xPercent: 120, scale: 1 },
          {
            xPercent: 0,
            duration: 1,
            ease: "power4.out",
          },
          i
        ).to(
          card,
          {
            scale: 0.92,
            x: -40,
            opacity: 0.7,
            duration: 0.6,
            ease: "power2.out",
          },
          i + 0.6
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[600vh] bg-[#0B0214] text-white">
      <div className="sticky top-0 h-screen px-10 lg:px-28 flex flex-col justify-center">
        <h2 className="text-4xl lg:text-[54px] max-w-3xl mb-20 leading-tight">
          We follow a streamlined design process from understanding your goals
          to delivering polished assets.
        </h2>

        <div className="relative h-[420px]">
          {processes.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="absolute top-0 left-0 w-[420px] h-[400px] bg-white text-black rounded-[42px] p-10 flex flex-col justify-between shadow-[-25px_0_60px_rgba(0,0,0,0.8)]"
              style={{ zIndex: processes.length - i }}>
              <div>
                <span className="text-gray-300 text-7xl font-bold absolute top-8 right-10">
                  {item.id}
                </span>

                <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-500 text-lg">{item.desc}</p>
              </div>

              <span className="uppercase tracking-widest text-xs text-gray-400">
                Step {item.id}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
