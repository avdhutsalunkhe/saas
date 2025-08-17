import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { X, Menu } from 'lucide-react';
import { assets } from '../assets/assets';
import gsap from 'gsap';
import Sidebar from '../components/Sidebar';
import { SignIn, useUser } from '@clerk/clerk-react';

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const iconRef = useRef(null);
  const { user } = useUser()

  useEffect(() => {
    if (iconRef.current) {
      gsap.fromTo(
        iconRef.current,
        { rotation: -90, opacity: 0, scale: 0.5 },
        {
          rotation: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
        }
      );
    }
  }, [sidebar]);

  return user ?  (
    <div className="flex flex-col items-start justify-start h-screen">
      <nav className="w-full px-8 min-h-14 flex items-center justify-between p-4 shadow">
        <img
          src={assets.logo}
          alt="Logo"
          onClick={() => navigate('/')}
          className="h-10 cursor-pointer w-32 sm:w-44"
        />

        <div
          onClick={() => setSidebar(!sidebar)}
          className="sm:hidden cursor-pointer"
        >
          <div ref={iconRef}>
            {sidebar ? (
              <X
                onClick={() => setSidebar(false)}
                className="w-6 h-6 text-gray-600 sm:hidden"
              />
            ) : (
              <Menu
                onClick={() => setSidebar(true)}
                className="w-6 h-6 text-gray-600 sm:hidden"
              />
            )}
          </div>
        </div>
      </nav>

      <div className="flex-1 w-full flex h-[calc(100vh-64px)]">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className="flex-1 bg-[#F4F7FB]">
          <Outlet />
        </div>
      </div>
    </div>
  ) : ( 
    <div className='flex items-center justify-center h-screen'>
      <SignIn/> 
    </div>
  )
};

export default Layout;
