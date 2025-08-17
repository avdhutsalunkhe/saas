import React, { useEffect, useRef, useState } from 'react';
import { TextSelect, Edit, Code } from 'lucide-react';
import gsap from 'gsap';

const BlogTitles = () => {
  const categories = [
    'General',
    'Technology',
    'Business',
    'Health',
    'Lifestyle',
    'Education',
    'Travel',
    'Food',
  ];

  const [selectedCategory, setSelectedCategory] = useState('General');
  const [input, setInput] = useState('');

  const formRef = useRef(null);
  const previewRef = useRef(null);
  const iconRef = useRef(null);
  const buttonRef = useRef(null);
  const categoryRefs = useRef([]);

  const onsubmitHandler = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance with scale + fade + slight rotation
      gsap.fromTo(
        formRef.current,
        { scale: 0.95, opacity: 0, rotateY: -10 },
        { scale: 1, opacity: 1, rotateY: 0, duration: 1.1, ease: 'power4.out' }
      );

      gsap.fromTo(
        previewRef.current,
        { scale: 0.95, opacity: 0, rotateY: 10 },
        { scale: 1, opacity: 1, rotateY: 0, duration: 1.1, delay: 0.2, ease: 'power4.out' }
      );

      // Icon animation with skew and clip reveal
      gsap.fromTo(
        iconRef.current,
        {
          opacity: 0,
          clipPath: 'inset(50% 50% 50% 50%)',
          skewX: 10,
          scale: 0.8,
        },
        {
          opacity: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          skewX: 0,
          scale: 1,
          duration: 1,
          ease: 'expo.out',
        }
      );

      // New pulsing-glow animation for button
      gsap.to(buttonRef.current, {
        boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
        repeat: -1,
        yoyo: true,
        duration: 1.8,
        keyframes: [
          { scale: 1.02, boxShadow: '0 0 12px rgba(102, 126, 234, 0.6)' },
          { scale: 1, boxShadow: '0 0 0 rgba(0, 0, 0, 0)' },
        ],
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="h-full overflow-y-scroll p-6 flex flex-wrap gap-4 items-start text-slate-700">
      {/* Left Col */}
      <form
        ref={formRef}
        onSubmit={onsubmitHandler}
        className="w-full max-w-md p-6 bg-white rounded-lg border border-gray-200 shadow"
      >
        <div className="flex items-center gap-2 mb-3">
          <TextSelect ref={iconRef} className="w-6 text-[#8E37EB]" />
          <h1 className="text-xl font-semibold">AI Title Generator</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Keyword</p>
        <input
          type="text"
          className="w-full p-2 px-3 mt-2 text-sm rounded-md border border-gray-300 outline-none "
          placeholder="The future of AI is ..."
          value={input}
          onChange={(e) => setInput(e.target.value)} required
        />

        <p className="mt-5 text-sm font-medium">Category</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {categories.map((cat, index) => (
            <button
              key={cat}
              ref={(el) => (categoryRefs.current[index] = el)}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              onMouseEnter={() =>
                gsap.to(categoryRefs.current[index], {
                  scale: 1.08,
                  backgroundColor: '#ebf4ff',
                  duration: 0.2,
                })
              }
              onMouseLeave={() =>
                gsap.to(categoryRefs.current[index], {
                  scale: 1,
                  backgroundColor: 'white',
                  duration: 0.2,
                })
              }
              className={`text-sm px-4 py-1 border rounded-full transition ${
                selectedCategory === cat
                  ? 'bg-[#e0e7ff] text-[#3b82f6] border-[#3b82f6]'
                  : 'border-gray-300 text-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          ref={buttonRef}
          className="w-full mt-6 py-2 bg-gradient-to-r from-[#8e2de2] to-[#4a00e0] text-white rounded-md text-sm font-medium flex justify-center items-center gap-2 shadow"
        >
          <Edit className="w-4 h-4" />
          Generate title
        </button>
      </form>

      {/* Right Col */}
      <div
        ref={previewRef}
        className="w-full max-w-md p-6 bg-white rounded-xl border border-gray-200 shadow flex flex-col min-h-[440px]"
      >
        <div className="flex items-center gap-2 mb-3">
          <Code className="w-5 h-5 text-[#4A7AFF]" />
          <h1 className="text-lg font-semibold">Generated titles</h1>
        </div>
        <div className="flex-1 flex justify-center items-center text-gray-500 text-sm text-center px-4">
          <div className="flex flex-col items-center gap-4">
            <p className="text-4xl">#</p>
            <p>Enter keywords and click "Generate Titles" to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogTitles;
