import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { AiToolsData } from '../assets/assets.js';
import { useNavigate } from 'react-router-dom';

const AiTools = () => {
  const headingRef = useRef(null);
  const laserRef = useRef(null);
  const paraRef = useRef(null);
  const cardRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Header and paragraph animation
    gsap.fromTo(headingRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
    gsap.fromTo(laserRef.current, { x: '-120%', opacity: 0.4 }, { x: '120%', opacity: 1, duration: 2, repeat: -1, ease: 'power1.inOut' });
    gsap.fromTo(paraRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.5 });

    // Card entry animation
    gsap.fromTo(
      cardRefs.current,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
    );
  }, []);

  const handleMouseEnter = (index) => {
    gsap.to(cardRefs.current[index], {
      scale: 1.1,
      duration: 0.3,
      ease: 'power3.out',
    });
  };

  const handleMouseLeave = (index) => {
    gsap.to(cardRefs.current[index], {
      scale: 1,
      duration: 0.3,
      ease: 'power3.inOut',
    });
  };

  return (
    <div className="px-4 sm:px-20 xl:px-32 my-24">
      <div className="text-center relative">
        <h2 ref={headingRef} className="text-3xl font-semibold mb-6 inline-block relative z-10">
          Powerful AI Tools
        </h2>
        <div className="relative h-[3px] w-full max-w-[300px] mx-auto overflow-hidden mt-1">
          <div ref={laserRef} className="absolute top-0 left-0 w-24 h-full bg-red-600 rounded-full blur-[2px]" />
        </div>
        <p ref={paraRef} className="text-lg text-black/80 max-w-2xl mx-auto mt-4 text-center">
          Everything you need to create, enhance, and optimize your content with cutting-edge AI technology.
        </p>
      </div>

      <div className="flex flex-wrap mt-10 justify-center">
        {AiToolsData.map((tool, index) => {
          const IconComponent = tool.Icon;

          return (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="p-8 m-4 max-w-xs rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 cursor-pointer"
              onClick={() => {
                if (tool.path) {
                  navigate(tool.path);
                  setTimeout(() => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                  }, 100);
                }
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {IconComponent && (
                <IconComponent
                  className="w-12 h-12 p-3 text-white rounded-xl"
                  style={{
                    background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
                  }}
                />
              )}
              <h3 className="mt-6 mb-3 text-lg font-semibold">{tool.title}</h3>
              <p className="text-gray-400 text-sm max-w-[95%]">{tool.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AiTools;
