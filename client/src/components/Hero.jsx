import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import bgImage from '../assets/gradientBackground.png';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

gsap.registerPlugin(TextPlugin);

const Hero = () => {
	const navigate =useNavigate();
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const aiRef = useRef(null);
  const startBtnRef = useRef(null);
  const demoBtnRef = useRef(null);
  const counterRef = useRef(null);


  useEffect(() => {
    // 1️⃣ Initial Load Animations (Staggered with smooth flow)
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

    tl.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 2 }
    )
      .fromTo(
        headingRef.current,
        { y: 80, opacity: 0, filter: 'blur(4px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)' },
        '-=1.2'
      )
      .fromTo(
        paragraphRef.current,
        { y: 40, opacity: 0, filter: 'blur(4px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)' },
        '-=0.8'
      )
      .fromTo(
        [startBtnRef.current, demoBtnRef.current],
        { y: 40, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.2 },
        '-=0.6'
      );
    gsap.to(startBtnRef.current, {
      scale: 1.04,
      duration: 1.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    // 2️⃣ Advanced Word-Replacement for "AI"
    const words = ['AI', 'ML', 'DL','CV', 'NLP', 'GEN'];
    const wordTL = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

    words.forEach((word) => {
      wordTL.to(aiRef.current, {
        y: -10,
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        ease: 'power1.in',
        onComplete: () => {
          if (aiRef.current) aiRef.current.textContent = word;
        },
      });
      wordTL.to(aiRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'back.out(1.7)',
        delay: 0.1,
      });
    });
  }, []);
  useEffect(() => {
    gsap.fromTo(
      counterRef.current,
      { textContent: 600 },
      {
        textContent: 999,
        duration: 60,
        ease: 'power3.out',
        snap: { textContent: 1 },
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.innerText = `${Math.floor(counterRef.current.textContent)}+`;
          }
        }
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-cover bg-no-repeat min-h-screen text-black"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="max-w-2xl text-center mb-6 mx-auto lg:mt-32 lg:mb-12 flex flex-col items-center justify-center">
        <h1
          ref={headingRef}
          className="text-3xl sm:text-5xl md:text-5xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]"
        >
          Empower Your Content with {' '}
          <span ref={aiRef} className="inline-block text-red-500">
            <br />
            AI
          </span>{' '}
          <br />
          Technology.
        </h1>
        <p ref={paragraphRef} className="text-lg text-black/80">
          Transform your content creation with our suite of premium tools. Write articles, generate images, and enhance your workflow.
        </p>
      </div>
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        <button 
          onClick={() => navigate('/ai')}
          ref={startBtnRef}
          className="bg-primary text-white font-medium px-6 py-3 rounded-full shadow-md hover:scale-105 transition duration-300 ease-in-out"
        >
          Start creating now
        </button>
        <button
          ref={demoBtnRef}
          className="bg-white border border-black/20 text-black px-6 py-3 rounded-full hover:scale-105 transition duration-300 ease-in-out"
        >
          Watch Demo
        </button>
      </div>
<div className='flex items-center gap-4 mt-8 mx-auto text-gray-600'>
<img src={assets.user_group} alt=""  className='h-8'/><p className="text-lg font-semibold text-center">
      Used by <span ref={counterRef} className="text-red-600">10M+</span> people worldwide.
    </p>


</div>
    </div>
  );
};

export default Hero;
