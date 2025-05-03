'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Имитация запроса на подписку
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
      
      // Сброс сообщения через 5 секунд
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }, 1000);
  };

  const navigation = [

  ];

  const socialLinks = [
    { name: 'VK', url: '#', icon: 'VK' },
    { name: 'TG', url: '#', icon: 'TG' },
    { name: 'YT', url: '#', icon: 'YT' }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="z-11 bg-black border-t border-zinc-900/10">
      {/* Верхняя секция футера */}
      <div className="mb-8 md:mb-0">
                <div className="logo-shimmer">
                </div>
                </div>
      <div className="te-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Колонка о студии */}
          <motion.div className="space-y-6" {...fadeInUp}>
            <h3 className="text-sm uppercase tracking-wider">Киностудия Amma</h3>
            <p className="text-xs opacity-70 max-w-xs">
              Профессиональная киностудия, специализирующаяся на создании художественных, 
              документальных и рекламных фильмов.
            </p>
            
            <div className="flex space-x-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="circle-icon"
                  whileHover={{ y: -2, borderColor: 'var(--color-primary)' }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-xs">{link.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Колонка навигации */}
          <motion.div className="space-y-6" {...fadeInUp} transition={{ delay: 0.1 }}>
            <h3 className="text-sm uppercase tracking-wider"></h3>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <motion.li 
                  key={item.name}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    href={item.href} 
                    className="text-xs opacity-70 hover:opacity-100 transition-all flex items-center group"
                  >
                    <motion.span
                      className="inline-block mr-2 opacity-0 group-hover:opacity-100"
                      initial={{ width: 0 }}
                      whileHover={{ width: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 1L7 5L3 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.span>
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Колонка контактов */}
          <motion.div className="space-y-6" {...fadeInUp} transition={{ delay: 0.2 }}>
            <h3 className="text-sm uppercase tracking-wider">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="min-w-5 mt-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <address className="not-italic text-xs opacity-70">
                  Амгинский улус 
                </address>
              </li>
              <li className="flex items-center gap-3">
                <div className="min-w-5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92V19.92C22 20.4704 21.7893 20.9996 21.4142 21.3747C21.0391 21.7498 20.5099 21.9605 19.96 21.96C16.5474 21.7344 13.2687 20.6219 10.4038 18.72C7.7545 17.0151 5.5308 14.7914 3.82595 12.142C1.91897 9.26515 0.806324 5.97208 0.589954 2.55C0.5892 2.00068 0.79868 1.47224 1.17291 1.09742C1.54713 0.722591 2.07547 0.511211 2.625 0.5H5.625C6.09288 0.49605 6.54791 0.666389 6.90484 0.976788C7.26177 1.28719 7.49843 1.72359 7.57 2.19C7.70964 3.12342 7.95029 4.0359 8.29 4.92C8.42308 5.25518 8.45245 5.62127 8.37491 5.9737C8.29736 6.32613 8.11648 6.64867 7.85501 6.90L6.625 8.13C8.20061 10.9154 10.5846 13.2994 13.37 14.875L14.6 13.64C14.8513 13.3785 15.1739 13.1976 15.5263 13.1201C15.8787 13.0425 16.2448 13.0719 16.58 13.205C17.4641 13.5447 18.3766 13.7854 19.31 13.925C19.7823 13.9973 20.2236 14.2408 20.5328 14.606C20.842 14.9713 21.0057 15.4361 21 15.915L22 16.92Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <a href="tel:+79991234567" className="text-xs opacity-70 hover:opacity-100 transition-all">
                  +7 (999) 123-45-67
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="min-w-5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <a href="mailto:amgacine@gmail.com" className="text-xs opacity-70 hover:opacity-100 transition-all">
                  amgacine@gmail.com
                </a>
              </li>
            </ul>
          </motion.div>
          
          {/* Колонка подписки */}
          <motion.div className="space-y-6" {...fadeInUp} transition={{ delay: 0.3 }}>
            <h3 className="text-sm uppercase tracking-wider">Подписаться на новости</h3>
            {isSubscribed ? (
              <div className="text-xs p-3 border border-[#4caf50]/30 bg-[#4caf50]/5 rounded">
                Спасибо! Вы успешно подписались на нашу рассылку.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Ваш email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-2 px-3 bg-zinc-900/40 border border-zinc-800 text-xs focus:border-[#ff5252]"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 text-xs uppercase border border-zinc-800 transition-all ${
                    isSubmitting 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:border-[#ff5252] hover:bg-[#ff5252]/10'
                  }`}
                >
                  {isSubmitting ? 'Отправка...' : 'Подписаться'}
                </button>
              </form>
            )}
            <p className="text-xs opacity-50">
              Получайте уведомления о новых проектах и событиях киностудии
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Нижняя секция футера */}
      <div className="border-t border-zinc-900/10">
        <div className="te-container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xs opacity-40 mb-4 md:mb-0">
              &copy; {currentYear} Киностудия Amma. Все права защищены.
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/privacy" className="text-xs opacity-40 hover:opacity-70 transition-all">
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className="text-xs opacity-40 hover:opacity-70 transition-all">
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 