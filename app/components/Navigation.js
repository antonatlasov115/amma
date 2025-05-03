'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Закрывает мобильное меню при навигации
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Блокируем скролл при открытом меню
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const navigation = [
    { name: 'Главная', href: '/' },
    { name: 'О нас', href: '/about' },
    { name: 'Проекты', href: '/projects' },
    { name: 'Приглашения', href: '/contact' }
  ];

  // Анимация для пунктов меню
  const menuItemVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: (i) => ({ 
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.1,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }),
    exit: { 
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.3
      }
    }
  };

  // Анимация для фона меню
  const menuBgVariants = {
    hidden: { 
      opacity: 0,
      y: -10
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    },
    exit: { 
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.3
      }
    }
  };

  // Проверяем, является ли ссылка активной
  const isActive = (href) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 w-full bg-black/90 backdrop-blur-md z-50">
        <div className="te-container">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="logo-shimmer">
                <Image 
                  src="/logo.svg" 
                  alt="Логотип киностудии" 
                  width={40} 
                  height={20} 
                  className="h-6 w-auto shimmer-effect" 
                />
              </div>
            </div>
            <div className="hidden md:flex space-x-10"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={`fixed top-0 left-0 right-0 w-full ${scrollY > 50 ? 'bg-black/90 backdrop-blur-md shadow-md shadow-black/10' : 'bg-transparent'} z-50 transition-all duration-300`}>
      <div className="te-container">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* Логотип */}
            <Link href="/" className="flex items-center group">
              <div className="logo-shimmer">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image 
                    src="/logo.svg" 
                    alt="Логотип киностудии" 
                    width={60} 
                    height={25} 
                    className="h-6 w-auto shimmer-effect" 
                  />
                </motion.div>
              </div>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center">
            <ul className="flex items-center">
              {navigation.map((item, index) => (
                <motion.li 
                  key={item.name}
                  className="ml-8 first:ml-0 relative"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link 
                    href={item.href} 
                    className={`text-xs uppercase tracking-wider ${isActive(item.href) ? 'opacity-100' : 'opacity-70 hover:opacity-100'} transition-all py-1 px-2 relative`}
                  >
                    {item.name}
                    {isActive(item.href) && (
                      <motion.div 
                        className="absolute bottom-0 left-0 w-full h-[1px] bg-white/30"
                        layoutId="navIndicator"
                      />
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
          
          {/* Социальные иконки - десктоп */}
          <div className="hidden md:flex items-center space-x-3 mr-6">
            <motion.a
              href="#"
              className="circle-icon"
              whileHover={{ y: -2, borderColor: 'rgba(255, 82, 82, 0.6)' }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-xs">VK</span>
            </motion.a>
            <motion.a
              href="#"
              className="circle-icon"
              whileHover={{ y: -2, borderColor: 'rgba(255, 82, 82, 0.6)' }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-xs">TG</span>
            </motion.a>
          </div>
          
          {/* Кнопка контакта - десктоп */}
          <div className="hidden md:block">
            <Link href="/contact">
              <motion.span 
                className="text-xs px-4 py-2 border border-white/10 rounded-full uppercase tracking-wider hover:border-[#ff5252] transition-all inline-block"
                whileHover={{ 
                  borderColor: 'rgba(255, 82, 82, 0.6)',
                  backgroundColor: 'rgba(255, 82, 82, 0.1)'
                }}
                transition={{ duration: 0.3 }}
              >
                Связаться
              </motion.span>
            </Link>
          </div>
          
          {/* Кнопка мобильного меню */}
          <motion.button 
            onClick={toggleMenu} 
            className="md:hidden w-10 h-10 flex items-center justify-center relative z-50"
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div 
              className="w-5 h-[1px] bg-white absolute"
              animate={{ 
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 0 : -3
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.div 
              className="w-5 h-[1px] bg-white absolute"
              animate={{ 
                opacity: isMenuOpen ? 0 : 1
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.div 
              className="w-5 h-[1px] bg-white absolute"
              animate={{ 
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? 0 : 3
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </div>
      
      {/* Мобильное меню */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div 
            className="md:hidden fixed inset-0 bg-black/95 z-40 pt-20 flex flex-col"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuBgVariants}
          >
            <nav className="te-container py-6 flex-grow flex flex-col justify-center">
              <ul className="space-y-8">
                {navigation.map((item, i) => (
                  <motion.li 
                    key={item.name} 
                    custom={i}
                    variants={menuItemVariants}
                    className="text-center relative"
                  >
                    <Link 
                      href={item.href} 
                      className={`block py-2 text-base md:text-lg uppercase tracking-wider ${isActive(item.href) ? 'text-[#ff5252]' : 'opacity-70 hover:opacity-100'} transition-all`}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            
            {/* Нижняя часть мобильного меню */}
            <motion.div 
              className="py-8 border-t border-white/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {/* Социальные иконки мобильные */}
              <div className="flex justify-center space-x-6 mb-8">
                <Link href="#" className="circle-icon">
                  <span className="text-xs">VK</span>
                </Link>
                <Link href="#" className="circle-icon">
                  <span className="text-xs">TG</span>
                </Link>
                <Link href="#" className="circle-icon">
                  <span className="text-xs">YT</span>
                </Link>
              </div>
              
              {/* Кнопка контакта мобильная */}
              <div className="text-center">
                <Link 
                  href="/contact" 
                  className="inline-block text-xs px-6 py-3 border border-white/10 rounded-full uppercase tracking-wider hover:border-[#ff5252] hover:bg-[#ff5252]/10 transition-all"
                >
                  Связаться с нами
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 