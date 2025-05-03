'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { PulseButton } from './AnimateIn';

export default function ModernNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Закрываем мобильное меню при переходе на другую страницу
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Блокируем прокрутку страницы при открытом мобильном меню
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const menuItems = [
    { path: '/projects', label: 'Проекты' },
    { path: '/invite', label: 'приглашения' }
  ];

  // Проверяем, является ли ссылка активной
  const isActive = (path) => {
    if (path === '/') {
      return pathname === '/';
    }
    
    if (path === '/projects') {
      return pathname === '/projects' || pathname.startsWith('/projects/');
    }
    
    return pathname === path;
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black bg-opacity-80 backdrop-blur-md py-3' : 'bg-black bg-opacity-30 backdrop-blur-sm py-4'
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center group z-50 relative">
            <motion.div 
              className="logo-shimmer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image 
                src="/logo.svg" 
                alt="Логотип киностудии" 
                width={60} 
                height={25} 
                className={`h-6 w-auto shimmer-effect transition-all duration-300 ${scrolled ? 'scale-90' : 'scale-100'}`}
                priority
              />
            </motion.div>
          </Link>
          
          {/* Десктопное меню */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              {menuItems.map((item, index) => (
                <motion.li 
                  key={item.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative"
                >
                  <Link 
                    href={item.path} 
                    className={`text-sm uppercase tracking-wider hover:text-white transition-all px-1 py-2 relative ${
                      isActive(item.path) ? 'text-[#ff5252] font-medium' : 'text-gray-400'
                    }`}
                  >
                    {item.label}
                    {isActive(item.path) && (
                      <motion.div 
                        className="absolute -bottom-1 left-1/2 w-[60%] h-[2px] bg-[#ff5252]"
                        initial={{ width: 0, left: '50%', x: '-50%' }}
                        animate={{ width: '60%', left: '50%', x: '-50%' }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
               
              </motion.li>
            </ul>
          </nav>
          
          {/* Кнопка мобильного меню */}
          <motion.button 
            className="md:hidden z-50 relative w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span 
              className="block w-6 h-[2px] bg-white absolute"
              animate={{ 
                rotate: isMobileMenuOpen ? 45 : 0,
                y: isMobileMenuOpen ? 0 : -4
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span 
              className="block w-6 h-[2px] bg-white absolute"
              animate={{ 
                opacity: isMobileMenuOpen ? 0 : 1,
                x: isMobileMenuOpen ? 10 : 0
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span 
              className="block w-6 h-[2px] bg-white absolute"
              animate={{ 
                rotate: isMobileMenuOpen ? -45 : 0,
                y: isMobileMenuOpen ? 0 : 4
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </header>

      {/* Мобильное меню */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/95 z-40 flex flex-col justify-center items-center md:hidden"
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-col items-center justify-center h-full w-full">
              <ul className="flex flex-col items-center space-y-6 w-full px-8">
                {menuItems.map((item, index) => (
                  <motion.li 
                    key={item.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                    className="w-full text-center"
                  >
                    <Link 
                      href={item.path} 
                      className={`text-2xl font-light block py-2 w-full ${
                        isActive(item.path) ? 'text-white' : 'text-gray-400'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li 
                  className="mt-8 w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  
                </motion.li>
              </ul>
              
              {/* Социальные ссылки в мобильном меню */}
              <motion.div 
                className="flex space-x-6 mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <a href="https://vk.com" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
                  VK
                </a>
                <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
                  TG
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
                  YT
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 