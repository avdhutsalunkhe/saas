import React, { useEffect, useRef, useState } from 'react';
import { dummyCreationData } from '../assets/assets.js';
import { Gem, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import CreationItems from '../components/CreationItems.jsx';

const Dashboard = () => {
  const [creations, setCreations] = useState([]);

  const cardRef = useRef(null);
  const iconRef = useRef(null);
  const numberRef = useRef(null);
  const activeCardRef = useRef(null);
  const itemsRef = useRef([]);

  const getDashboardData = async () => {
    setCreations(dummyCreationData);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate main card
    tl.fromTo(
      cardRef.current,
      { y: 80, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'back.out(1.7)' }
    )
      .fromTo(
        iconRef.current,
        { rotate: -90, scale: 0.5, opacity: 0 },
        { rotate: 0, scale: 1, opacity: 1, duration: 0.8, ease: 'elastic.out(1, 0.75)' },
        '-=0.8'
      )
      .fromTo(
        numberRef.current,
        { textContent: 0 },
        {
          textContent: creations.length,
          duration: 1.5,
          ease: 'power1.out',
          snap: { textContent: 1 },
          onUpdate: () => {
            numberRef.current.innerText = Math.floor(numberRef.current.textContent);
          },
        },
        '-=1.0'
      );

    // Animate Active Plan Card
    tl.fromTo(
      activeCardRef.current,
      { y: 60, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
      '-=1.2'
    );

    // Animate recent items
    if (itemsRef.current.length) {
      gsap.fromTo(
        itemsRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.15,
        }
      );
    }
  }, [creations]);

  return (
    <div className="h-full overflow-y-scroll p-6">
      <div className="flex justify-start gap-4 flex-wrap">
        {/* Total Creations Card */}
        <div
          ref={cardRef}
          className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200 shadow"
        >
          <div className="text-slate-600">
            <p className="text-sm">Total Creations</p>
            <h2 ref={numberRef} className="text-xl font-semibold">
              {creations.length}
            </h2>
          </div>
          <div
            ref={iconRef}
            className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex items-center justify-center"
          >
            <Sparkles className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Active Plan Card */}
        <div
          ref={activeCardRef}
          className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200"
        >
          <div className="text-slate-600">
            <p className="text-sm">Active Plan</p>
            <h2 className="text-xl font-semibold"></h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center">
            <Gem className="w-5 text-white" />
          </div>
        </div>
      </div>

      {/* Recent Creations List */}
      <div className="space-y-3">
        <p className="mt-6 mb-4 text-base font-semibold">Recent Creations</p>
        {creations.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => (itemsRef.current[index] = el)}
          >
            <CreationItems item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
