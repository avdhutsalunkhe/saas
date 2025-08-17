import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { assets } from '../assets/assets'; // adjust path if needed

gsap.registerPlugin(ScrollTrigger);

const Testimonial = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  const dummyTestimonialData = [
    {
      image: assets.profile_img_1,
      name: 'John Doe',
      title: 'Marketing Director, TechCorp',
      content:
        'ContentAI has revolutionized our content workflow. The quality of the articles is outstanding, and it saves us hours of work every week.',
      rating: 4,
    },
    {
      image: assets.profile_img_1,
      name: 'Jane Smith',
      title: 'Content Creator, TechCorp',
      content:
        'ContentAI has made our content creation process effortless. The AI tools have helped us produce high-quality content faster than ever before.',
      rating: 5,
    },
    {
      image: assets.profile_img_1,
      name: 'David Lee',
      title: 'Content Writer, TechCorp',
      content:
        'ContentAI has transformed our content creation process. The AI tools have helped us produce high-quality content faster than ever before.',
      rating: 4,
    },
  ];

  useEffect(() => {
    cardRefs.current.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        }
      );
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const deltaX = (e.clientX - centerX) / 30;
      const deltaY = (e.clientY - centerY) / 30;

      cardRefs.current.forEach((card, i) => {
        gsap.to(card, {
          x: deltaX,
          y: deltaY,
          duration: 0.4,
          ease: 'power2.out',
        });
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleHover = (index, scale) => {
    gsap.to(cardRefs.current[index], {
      scale,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <div className="px-4 sm:px-20 xl:px-32 py-24">
      <div className="text-center">
        <h2 className="text-slate-700 text-[42px] font-semibold">Loved by Creators</h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Don't just take our word for it. Here's what our users are saying.
        </p>
      </div>

      <div ref={containerRef} className="flex flex-wrap mt-10 justify-center">
        {dummyTestimonialData.map((testimonial, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className="p-8 m-4 max-w-xs rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 cursor-pointer"
            onMouseEnter={() => handleHover(index, 1.05)}
            onMouseLeave={() => handleHover(index, 1)}
          >
            {/* Stars */}
            <div className="flex items-center gap-1 mb-3">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <img
                    key={i}
                    src={i < testimonial.rating ? assets.star_icon : assets.star_dull_icon}
                    className="w-4 h-4"
                    alt="star"
                  />
                ))}
            </div>

            <p className="text-gray-500 text-sm mb-5">"{testimonial.content}"</p>
            <hr className="mb-5 border-gray-300" />
            <div className="flex items-center gap-4">
              <img
                src={testimonial.image}
                className="w-12 object-contain rounded-full"
                alt={testimonial.name}
              />
              <div className="text-sm text-gray-600">
                <h3 className="font-medium">{testimonial.name}</h3>
                <p className="text-xs text-gray-500">{testimonial.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
