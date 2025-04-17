'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const pathname = usePathname();
  const { translations, currentLanguage, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(currentLanguage === 'ru' ? 'en' : 'ru');
  };

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navItems = [
    { path: '/', label: translations.home },
    { path: '/projects', label: translations.projects },
    { path: '/about', label: translations.about },
    { path: '/contact', label: translations.contact },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-3 bg-[#101010]/90 backdrop-blur-sm' : 'py-4'
        }`}
      >
        <div className="container-md flex justify-between items-center">
          <Link href="/" className="group">
            <div className="w-36 md:w-40 h-8 md:h-9 relative ml-0">
              <Image 
                src="/logo.svg" 
                alt="Film Studio" 
                fill 
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>
          
          {/* Десктопная навигация */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <div key={item.path}>
                <Link 
                  href={item.path} 
                  className={`text-xs tracking-wide uppercase transition-colors ${
                    isActive(item.path) 
                      ? 'text-white border-b border-white/30 pb-0.5' 
                      : 'text-white/70 hover:text-white hover:border-b hover:border-white/20 hover:pb-0.5'
                  }`}
                >
                  {item.label}
                </Link>
              </div>
            ))}
            
            <button 
              onClick={toggleLanguage}
              className="text-xs text-white/70 hover:text-white transition-colors ml-2 pl-2 border-l border-white/10"
              aria-label={currentLanguage === 'ru' ? 'Переключить на английский язык' : 'Переключить на русский язык'}
            >
              {currentLanguage === 'ru' ? 'EN' : 'RU'}
            </button>
          </nav>
          
          {/* Мобильная кнопка меню */}
          <button 
            onClick={() => setMobileMenuOpen(true)} 
            className="block md:hidden text-white/70"
            aria-label="Открыть меню"
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">Меню</span>
            <div className="flex flex-col gap-1">
              <span className="w-5 h-[1px] bg-white"></span>
              <span className="w-5 h-[1px] bg-white"></span>
            </div>
          </button>
        </div>
      </header>
      
      {/* Мобильное меню */}
      <div 
        id="mobile-menu"
        className={`fixed inset-0 bg-[#101010]/95 z-[100] flex flex-col md:hidden transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="container-md flex justify-between items-center py-4">
          <div className="w-36 h-8 relative">
            <Image 
              src="/logo.svg" 
              alt="Film Studio" 
              fill 
              priority
              className="object-contain object-left"
            />
          </div>
          
          <button 
            onClick={closeMobileMenu}
            className="text-white/70"
            aria-label="Закрыть меню"
          >
            <span className="sr-only">Закрыть</span>
            <div className="flex items-center justify-center h-6 w-6 rotate-45">
              <span className="absolute w-5 h-[1px] bg-white"></span>
              <span className="absolute w-5 h-[1px] bg-white rotate-90"></span>
            </div>
          </button>
        </div>
        
        <nav className="container-md flex flex-col gap-6 pt-10">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              href={item.path} 
              onClick={closeMobileMenu}
              className={`text-sm transition-colors ${
                isActive(item.path) ? 'text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="container-md mt-auto mb-10 pt-6 border-t border-white/10">
          <button 
            onClick={toggleLanguage} 
            className="text-xs text-white/70 hover:text-white transition-colors"
            aria-label={currentLanguage === 'ru' ? 'Переключить на английский язык' : 'Переключить на русский язык'}
          >
            {currentLanguage === 'ru' ? 'EN' : 'RU'}
          </button>
        </div>
      </div>
    </>
  );
} 