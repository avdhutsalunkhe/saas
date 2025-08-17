import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Markdown from 'react-markdown';

const CreationItems = ({ item, index }) => {
  const itemRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemRef.current,
        {
          x: -40,
          opacity: 0,
          scale: 0.95,
          rotateX: 15,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: index * 0.1,
        }
      );
    }, itemRef);

    return () => ctx.revert();
  }, [index]);

  const handleMouseEnter = () => {
    gsap.to(itemRef.current, {
      scale: 1.035,
      rotateZ: 0.4,
      backgroundColor: '#FFF2E1', // light peachy-orange
      boxShadow: '0 10px 30px rgba(255, 173, 96, 0.3)',
      zIndex: 10,
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(itemRef.current, {
      scale: 1,
      rotateZ: 0,
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      zIndex: 1,
      duration: 0.35,
      ease: 'power2.inOut',
    });
  };

  return (
    <div
      ref={itemRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setExpanded(!expanded)}
      className="p-4 max-w-5xl text-sm border border-gray-200 rounded-lg cursor-pointer transition-all"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-semibold">{item.prompt}</h2>
          <p className="text-gray-500">
            {item.type} — {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>
        <button className="bg-[#EFDBFE] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full">
          {item.type}
        </button>
      </div>

      {expanded && (
        <div className="mt-3">
          {item.type === 'image' ? (
            <img
              src={item.content}
              alt="Generated"
              className="mt-3 w-full max-w-md rounded-lg border"
            />
          ) : (
            <div className="mt-3 h-full overflow-y-auto text-sm text-slate-700 max-h-60">
              <div className="reset-tw">
                <Markdown>{item.content}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItems;
