import { ImagePlus, Image } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const GenerateImage = () => {
  const [input, setInput] = useState('');
  const [style, setStyle] = useState('Realistic');

  const formRef = useRef(null);
  const previewRef = useRef(null);
  const iconRef = useRef(null);
  const buttonRef = useRef(null);

  const styles = ['Realistic', 'Ghibli Style'];

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    // Add your image generation logic here
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { scale: 0.95, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' }
      );

      gsap.fromTo(
        previewRef.current,
        { scale: 0.95, opacity: 0, y: -40 },
        { scale: 1, opacity: 1, y: 0, duration: 1.2, delay: 0.2, ease: 'power4.out' }
      );

      gsap.fromTo(
        iconRef.current,
        { opacity: 0, rotate: 10, scale: 0.8 },
        { opacity: 1, rotate: 0, scale: 1, duration: 1, ease: 'back.out(1.7)' }
      );

      gsap.to(buttonRef.current, {
        boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
        repeat: -1,
        yoyo: true,
        duration: 1.8,
        keyframes: [
          { scale: 1.02, boxShadow: '0 0 12px rgba(34,197,94,0.6)' },
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
          <ImagePlus ref={iconRef} className="w-6 text-[#22C55E]" />
          <h1 className="text-lg font-semibold">AI Image Generator</h1>
        </div>

        <p className="text-sm font-medium">Describe Your Image</p>
        <textarea
          rows="3"
          className="w-full p-2 px-3 mt-2 text-sm rounded-md border border-gray-300 outline-none resize-none"
          placeholder="Describe what you want to see in the image..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>

        <p className="mt-4 text-sm font-medium">Style</p>
        <div className="mt-2 flex gap-2 flex-wrap">
          {styles.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setStyle(item)}
              className={`text-sm px-4 py-1 border rounded-full transition duration-150 cursor-pointer font-medium ${
                style === item ? 'bg-green-100 text-green-600 border-green-400' : 'border-gray-300 text-gray-600'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          ref={buttonRef}
          className="w-full mt-6 py-2 bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white rounded-md text-sm font-medium flex justify-center items-center gap-2 shadow"
        >
          <Image className="w-4 h-4" />
          Generate image
        </button>
      </form>

      {/* Right Col */}
      <div
        ref={previewRef}
        className="w-full max-w-md p-6 bg-white rounded-xl border border-gray-200 shadow flex flex-col min-h-[440px]"
      >
        <div className="flex items-center gap-2 mb-3">
          <Image className="w-5 h-5 text-[#22C55E]" />
          <h1 className="text-lg font-semibold">Generated image</h1>
        </div>
        <div className="flex-1 flex justify-center items-center text-gray-500 text-sm text-center px-4">
          <div className="flex flex-col items-center gap-4">
            <p className="text-4xl">🖼️</p>
            <p>Describe an image and click "Generate Image" to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateImage;
