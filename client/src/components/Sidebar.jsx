import React, { useEffect, useRef } from 'react';
import { Protect, useClerk, useUser } from '@clerk/clerk-react';

import {
  Eraser,
  FileText,
  Hash,
  House,
  Image,
  LogOut,
  Scissors,
  SquarePen,
  Users,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';

const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: House },
  { to: '/ai/write-article', label: 'write-article', Icon: SquarePen },
  { to: '/ai/blog-titles', label: 'blog-titles', Icon: Hash },
  { to: '/ai/generate-image', label: 'generate-image', Icon: Image },
  { to: '/ai/remove-background', label: 'remove-background', Icon: Eraser },
  { to: '/ai/remove-object', label: 'remove-object', Icon: Scissors },
  { to: '/ai/review-resume', label: 'review-resume', Icon: FileText },
  { to: '/ai/community', label: 'community', Icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const navRef = useRef([]);

  useEffect(() => {
    if (sidebar && navRef.current.length > 0) {
      const tl = gsap.timeline();
      navRef.current.forEach((el, i) => {
        if (el) {
          tl.fromTo(
            el,
            { opacity: 0, x: -80, rotateY: 35, transformPerspective: 800 },
            {
              opacity: 1,
              x: 0,
              rotateY: 0,
              duration: 0.6,
              ease: 'power3.out',
            },
            i * 0.1 // stagger manually using timeline offset
          );
        }
      });
    }
  }, [sidebar]);

  return (
    <div
      className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 z-50 ${
        sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'
      } transition-all duration-300 ease-in-out`}
    >
      {/* Top: User and Nav Links */}
      <div className="my-7 w-full px-4">
        <img
          src={user?.imageUrl}
          alt="User"
          className="w-16 h-16 rounded-full mx-auto object-cover"
        />
        <h1 className="mt-2 text-center text-sm font-medium">{user?.fullName}</h1>

        <div className="mt-6 px-2 text-sm text-gray-600 font-medium flex flex-col gap-1">
          {navItems.map(({ to, label, Icon }, index) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/ai'}
              onClick={() => setSidebar(false)}
              ref={(el) => (navRef.current[index] = el)}
              className={({ isActive }) =>
                `px-3.5 py-2.5 flex items-center gap-3 rounded text-sm transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Bottom: Profile & Logout */}
      <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">
        <div
          onClick={openUserProfile}
          className="flex gap-2 items-center cursor-pointer"
        >
          <img src={user.imageUrl} className="w-8 rounded-full" alt="" />
          <div>
            <h1 className="text-sm font-medium">{user.fullName}</h1>
            {/* <p className="text-xs text-gray-500">
              <Protect plan="Premium" fallback="Free">Premium</Protect> Plan
            </p> */}
          </div>
        </div>

        <LogOut
          onClick={signOut}
          className="w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Sidebar;
