import React, { useEffect, useRef } from 'react';
import { assets } from '../assets/assets';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import gsap from 'gsap';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const btnRef = useRef(null);

  useEffect(() => {
    if (btnRef.current) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        btnRef.current,
        { opacity: 0, y: -20, scale: 0.95, rotateX: 15 },
        { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 1.1, delay: 1.2 }
      );

      // Add gentle floating animation
      gsap.to(btnRef.current, {
        y: -2,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
  }, []);

  const handleHover = () => {
    if (btnRef.current) {
      gsap.to(btnRef.current, {
        scale: 1.06,
        backgroundColor: '#ff3c00',
        filter: 'brightness(1.1)',
        boxShadow: '0px 0px 20px rgba(255, 100, 50, 0.3)',
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleHoverOut = () => {
    if (btnRef.current) {
      gsap.to(btnRef.current, {
        scale: 1,
        backgroundColor: '#d01110',
        filter: 'brightness(1)',
        boxShadow: '0px 0px 0px rgba(0,0,0,0)',
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  return (
    <div className=' h-18 fixed z-50 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32 cursor-pointer'>
      <img
        src={assets.logo}
        alt='logo'
        className='w-32 sm:w-44 cursor-pointer'
        onClick={() => navigate('/')}
      />

      {user ? (
        <UserButton />
      ) : (
        <button
          ref={btnRef}
          onMouseEnter={handleHover}
          onMouseLeave={handleHoverOut}
          onClick={() => openSignIn()}
          className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5 transition-all duration-300'
        >
          Get started <ArrowRight className='w-4 h-4' />
        </button>
      )}
    </div>
  );
};

export default Navbar;
