import React, { useEffect, useRef, useState } from 'react';
import { UploadCloud, ImageOff } from 'lucide-react';
import gsap from 'gsap';

const RemoveBackground = () => {
  const [image, setImage] = useState(null);

  const formRef = useRef(null);
  const previewRef = useRef(null);
  const iconRef = useRef(null);
  const buttonRef = useRef(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add background removal logic here
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      gsap.fromTo(
        previewRef.current,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, delay: 0.3, duration: 1, ease: 'power3.out' }
      );

      gsap.fromTo(
        iconRef.current,
        { rotate: -20, scale: 0.8, opacity: 0 },
        { rotate: 0, scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.7)' }
      );

      gsap.to(buttonRef.current, {
        repeat: -1,
        yoyo: true,
        duration: 1.6,
        keyframes: [
          { scale: 1.05, boxShadow: '0 0 8px rgba(255,94,58,0.5)' },
          { scale: 1, boxShadow: '0 0 0 rgba(0,0,0,0)' },
        ],
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* Left Column */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'
      >
        <div className='flex items-center gap-3'>
          <UploadCloud ref={iconRef} className='w-6 text-[#FF5E3A]' />
          <h1 className='text-xl font-semibold'>Background Removal</h1>
        </div>

        <p className='mt-6 text-sm font-medium'>Upload image</p>
        <input
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          className='mt-2 w-full border border-gray-300 text-sm rounded-md p-2 outline-none'
        />
        <p className='text-xs text-gray-400 mt-1'>
          Supports JPG, PNG, and other image formats
        </p>

        <button
          ref={buttonRef}
          type='submit'
          className='w-full mt-6 py-2 bg-gradient-to-r from-[#ff7a18] to-[#ff3c2f] text-white rounded-md text-sm font-medium flex justify-center items-center gap-2 shadow'
        >
          <UploadCloud className='w-4 h-4' />
          Remove background
        </button>
      </form>

      {/* Right Column */}
      <div
        ref={previewRef}
        className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'
      >
        <div className='flex items-center gap-3'>
          <ImageOff className='w-5 h-5 text-[#FF5E3A]' />
          <h1 className='text-xl font-semibold'>Processed Image</h1>
        </div>
        <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-4 text-gray-400 text-center'>
            <p className='text-4xl'>🖼️</p>
            <p>Upload an image and click "Remove Background" to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveBackground;
