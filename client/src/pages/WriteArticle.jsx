import { Code, Edit, PenLine, TextSelect } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: 'Short (500-800 words)' },
    { length: 1200, text: 'Medium (800-1200 words)' },
    { length: 1800, text: 'Long (1200+ words)' },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState('');

  const formRef = useRef(null);
  const previewRef = useRef(null);
  const iconRef = useRef(null);
  const pillsRef = useRef([]);
  const buttonRef = useRef(null);

  const onsubmitHandler = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 1.1, ease: 'power3.out' }
      );

      gsap.fromTo(
        previewRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 1.1, delay: 0.2, ease: 'power3.out' }
      );

      gsap.fromTo(
        iconRef.current,
        { scale: 0.8, rotate: -20, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 1, ease: 'back.out(1.7)' }
      );

      gsap.fromTo(
        buttonRef.current,
        { scale: 1 },
        {
          scale: 1.05,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          duration: 1.8,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* left col */}
      <form
        ref={formRef}
        onSubmit={onsubmitHandler}
        className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'
      >
        <div className='flex items-center gap-3'>
          <TextSelect ref={iconRef} className='w-6 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Article Configuration</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Article Topic</p>
        <input
          type='text'
          className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300'
          placeholder='The Future of AI is..'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <p className='mt-4 text-sm font-medium'>Article Length</p>
        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
          {articleLength.map((item, index) => (
            <span
              key={index}
              ref={(el) => (pillsRef.current[index] = el)}
              onClick={() => setSelectedLength(item)}
              onMouseEnter={() => {
                gsap.to(pillsRef.current[index], {
                  scale: 1.08,
                  backgroundColor: '#ebf4ff',
                  duration: 0.2,
                });
              }}
              onMouseLeave={() => {
                gsap.to(pillsRef.current[index], {
                  scale: 1,
                  backgroundColor: 'white',
                  duration: 0.2,
                });
              }}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition duration-200 ${
                selectedLength.length === item.length
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-500 border-gray-300'
              }`}
            >
              {item.text}
            </span>
          ))}
        </div>
        <br />
        <button
          ref={buttonRef}
          className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'
        >
          <Edit className='w-5' />
          Generate article
        </button>
      </form>

      {/* Right col */}
      <div
        ref={previewRef}
        className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'
      >
        <div className='flex items-center gap-3'>
          <Code className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Generated article</h1>
        </div>
        <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
            <p className='w-9 h-9 text-[#ffba4a]'>🫣</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteArticle;
