import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PricingTable } from '@clerk/clerk-react';

gsap.registerPlugin(ScrollTrigger);

const Plan = () => {
  const paraRef = useRef(null);

  useEffect(() => {
    const wordSpans = paraRef.current?.querySelectorAll('.word');

    if (wordSpans.length > 0) {
      gsap.fromTo(
        wordSpans,
        {
          opacity: 0,
          y: 30,
          scale: 0.9,
          rotationX: 30,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
          stagger: 0.07,
          scrollTrigger: {
            trigger: paraRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  const text =
    'Kickstart for Free — Expand Limitlessly as You Grow. Pick the Plan that Powers Your Vision';

  return (
    <div className="relative z-20 py-16 px-4 sm:px-10 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-slate-700 text-[32px] sm:text-[42px] font-semibold leading-tight">
          Choose Your Plan
        </h2>

        <p
          ref={paraRef}
          className="text-slate-500 text-center max-w-2xl mx-auto mt-4 text-base leading-relaxed"
        >
          {text.split(' ').map((word, index) => (
            <span
              key={index}
              className={`word inline-block mr-1 transition-transform duration-300 ${
                word === 'Kickstart' ? 'text-red-600 font-semibold' : ''
              }`}
            >
              {word}
            </span>
          ))}
        </p>
      </div>

      <div className="mt-12 rounded-lg shadow-xl p-6 bg-white border border-gray-100">
        <PricingTable />
      </div>
    </div>
  );
};

export default Plan;
