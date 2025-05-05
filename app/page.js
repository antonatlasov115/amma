'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FadeIn, GlitchText, SlideIn, StaggerContainer, StaggerItem, PulseButton, MouseTracker, ParallaxSection } from './components/AnimateIn';

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [activeTrailerUrl, setActiveTrailerUrl] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const mainContainerRef = useRef(null);
  
  // Эффект для анимированных счетчиков
  const [countersStarted, setCountersStarted] = useState(false);
  const statsRef = useRef(null);
  
  // Для эффекта параллакса при скролле
  const { scrollY } = useScroll({ layoutEffect: false });
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 2000], [0, -300]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.2]);

  // Данные о проектах
  const projects = [
    {
      title: "Кукушка",
      category: "Полнометражный фильм",
      image: "/images/kuku1.jpg",
      description: "Мистический триллер о тайнах северной деревни. История о столкновении с неизвестным и поиске истины в мире, где граница между реальным и потусторонним стирается.",
      link: "/projects/kukushka",
      trailerUrl: "https://vk.com/video_ext.php?oid=-220787057&id=456359225&hash=1377cb4ae7f4e12b",
      trailerType: "vk"
    },
    {
      title: "ПУТЬ ГЕРОЯ",
      category: "Документальный фильм",
      image: "/images/project2.jpg",
      description: "Документальный фильм о выдающемся спортсмене, преодолевшем все трудности на пути к победе. История силы духа и несгибаемой воли человека.",
      link: "/projects/put-geroya",
      trailerUrl: "https://vk.com/video_ext.php?oid=-220787057&id=456359225&hash=1377cb4ae7f4e12b",
      trailerType: "vk"
    },
    {
      title: "Новый проект",
      category: "Короткометражный фильм",
      image: "/images/project3.jpg",
      description: "Экспериментальный короткометражный фильм, исследующий границы восприятия и реальности. Визуальный эксперимент в жанре арт-хаус.",
      link: "/projects/novyj-proekt",
      trailerUrl: "https://vk.com/video_ext.php?oid=-220787057&id=456359225&hash=1377cb4ae7f4e12b",
      trailerType: "vk"
    }
  ];

  // Статистика для секции достижений
  const stats = [
    { number: 15, label: "Завершенных проектов" },
    { number: 12, label: "Наград фестивалей" },
    { number: 6, label: "Лет опыта" },
    { number: 30, label: "Участников команды" }
  ];

  // Обработчик отправки формы подписки
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Имитация отправки запроса на сервер
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Спасибо за подписку!');
      setEmail('');
      
      // Скрываем сообщение через 3 секунды
      setTimeout(() => {
        setSubmitMessage('');
      }, 3000);
    }, 1500);
  };
  
  // Функция для открытия модального окна с трейлером
  const openTrailer = (url) => {
    setActiveTrailerUrl(url);
    setShowTrailer(true);
    // Блокировка прокрутки страницы
    document.body.style.overflow = 'hidden';
  };
  
  // Функция для закрытия модального окна с трейлером
  const closeTrailer = () => {
    setShowTrailer(false);
    // Разблокировка прокрутки страницы
    document.body.style.overflow = '';
  };

  // Эффект для автоматического переключения слайдера
  useEffect(() => {
    setIsMounted(true);
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [projects.length]);
  
  // Эффект для отслеживания видимости блока со статистикой и запуска анимации счетчиков
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !countersStarted) {
        setCountersStarted(true);
      }
    }, { threshold: 0.5 });
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [countersStarted]);

  // Добавляем useEffect для инъекции SVG-стилей
  useEffect(() => {
    // Добавляем CSS для SVG-паттерна прямо в head документа
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      .hero-pattern-overlay {
        position: absolute;
        top: -20%;
        left: -20%;
        width: 140%;
        height: 140%;
        opacity: 0.15;
        background-image: url('/hero.svg');
        background-size: 200%;
        background-position: center center;
        z-index: 0;
        pointer-events: none;
      }
      
      @keyframes heroPatternPulse {
        0% { opacity: 0.05; }
        25% { opacity: 0.20; }
        50% { opacity: 0.25; }
        75% { opacity: 0.20; }
        100% { opacity: 0.05; }
      }
      
      @keyframes infiniteScroll {
        0% { transform: scale(1) translate(0, 0); }
        50% { transform: scale(1.08) translate(-2%, -1%); }
        100% { transform: scale(1) translate(0, 0); }
      }
      
      .hero-pattern-animate {
        animation: 
          heroPatternPulse 10s infinite ease-in-out,
          infiniteScroll 15s infinite ease-in-out;
        background-repeat: no-repeat;
        transition: all 0.5s ease-out;
        transform-origin: center center;
        will-change: transform, opacity;
      }
      
      .hero-gradient {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0.8), rgba(0,0,0,0));
        z-index: 1;
        pointer-events: none;
      }
      
      /* Оптимизация для мобильных устройств */
      @media (max-width: 768px) {
        .hero-pattern-overlay {
          opacity: 100;
          top: -10%;
          left: -10%;
          width: 190%;
          height: 190%;
          background-size: 250%;
        }
        
        @keyframes mobileInfiniteScroll {
          0% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.05) translate(-1.5%, -0.75%); }
          100% { transform: scale(1) translate(0, 0); }
        }
        
        .hero-pattern-animate {
          animation: 
            heroPatternPulse 10s infinite ease-in-out,
            mobileInfiniteScroll 12s infinite ease-in-out;
        }
      }
      
      /* Оптимизация для очень маленьких экранов */
      @media (max-width: 480px) {
        .hero-pattern-overlay {
          opacity: 0.04;
          background-size: 120%;
        }
        
       
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Если страница еще не монтирована, показываем заглушку
  if (!isMounted) {
    return null;
  }

  return (
    <main className="flex flex-col min-h-screen relative bg-black text-white overflow-x-hidden">
      {/* Добавляем отступ для контента под фиксированным хедером */}
      <div className="h-16"></div>
      
      {/* Боковая навигация */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block">
        <StaggerContainer>
          {[0, 1, 2].map((i) => (
            <StaggerItem key={i} index={i}>
              <button
                className={`w-3 h-3 rounded-full mb-4 transition-all duration-300 ${
                  activeIndex === i ? "bg-white scale-125" : "bg-gray-500 hover:bg-gray-300"
                }`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Переключить на проект ${projects[i].title}`}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
      
      {/* Секция герой с параллаксом - добавляем более структурированный дизайн */}
      <section className="relative min-h-screen pt-24 pb-16 flex items-center overflow-hidden">
        {/* Контейнер для фоновых эффектов, ограниченный пределами этой секции */}
        <div className="absolute inset-0 overflow-hidden">
          {/* SVG Паттерн фон - только для hero секции */}
          <div className="hero-pattern-overlay hero-pattern-animate"></div>
          
          {/* Черный градиент для улучшения читаемости текста - только для hero секции */}
          <div className="hero-gradient"></div>
        </div>
        
        <motion.div style={{ y: y1, opacity }} className="w-full z-10 relative">
          <div className="container mx-auto px-6 z-10 relative">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <FadeIn direction="up">
                  <h2 className="text-sm font-light mb-4 tracking-widest uppercase flex items-center">
                    <span className="w-8 h-[1px] bg-white/30 mr-4 hidden sm:block"></span>
                    <GlitchText text="A Miracle Moving Arts" />
                  </h2>
                </FadeIn>
                
                <FadeIn direction="up" delay={0.2}>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                    Создаем<br/>истории<br/>через кадры
                  </h1>
                </FadeIn>
                
                <FadeIn direction="up" delay={0.4}>
                  <p className="text-gray-300 mb-10 max-w-md leading-relaxed">
                    Мы превращаем идеи в визуальные шедевры. Каждый проект — это уникальное путешествие, которое мы проживаем вместе с нашими клиентами.
                  </p>
                </FadeIn>
                
                <FadeIn direction="up" delay={0.6}>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <Link href="/projects">
                      <PulseButton className="min-button">
                        <span>Смотреть проекты</span>
                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </PulseButton>
                    </Link>
                    <Link href="/about">
                      <motion.div
                        className="min-button-outline flex items-center justify-center group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>О студии</span>
                        <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.div>
                    </Link>
                  </div>
                </FadeIn>
                
                {/* Добавляем индикатор года основания */}
                <FadeIn direction="up" delay={0.8}>
                  <div className="mt-16 flex items-center">
                    <div className="w-8 h-[1px] bg-white/30 mr-4"></div>
                    <span className="text-xs text-gray-400">Основано в 2018</span>
                  </div>
                </FadeIn>
              </div>
              
              <div className="relative h-[400px] lg:h-[500px] mt-8 lg:mt-0 overflow-hidden rounded-lg">
                <SlideIn direction="right">
                  <div className="relative w-full h-full group" style={{ position: 'relative' }}>
        <Image
                      src={projects[activeIndex].image}
                      alt={projects[activeIndex].title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
                    
                    {/* Улучшенная информация о текущем проекте */}
                    <div className="absolute bottom-8 left-8 z-10">
                      <span className="inline-block text-xs uppercase tracking-widest text-white/70 mb-3 border border-white/20 px-3 py-1 rounded-full">{projects[activeIndex].category}</span>
                      <h3 className="text-2xl md:text-3xl font-bold">{projects[activeIndex].title}</h3>
                      <p className="text-white/70 mt-2 pr-8 max-w-md text-sm hidden md:block">{projects[activeIndex].description.substring(0, 100)}...</p>
                      
                      {/* Кнопка "Подробнее" */}
                      <Link href={projects[activeIndex].link} className="inline-flex items-center mt-4 text-sm text-white/80 hover:text-white transition-colors">
                        <span>Подробнее</span>
                        <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    </div>
                    
                    {/* Индикаторы слайдера */}
                    <div className="absolute bottom-8 right-8 flex space-x-2 z-10 md:block hidden">
                      {projects.map((_, i) => (
                        <button
                          key={i}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            activeIndex === i ? "bg-white w-6" : "bg-white/30 hover:bg-white/50"
                          }`}
                          onClick={() => setActiveIndex(i)}
                          aria-label={`Переключить на проект ${projects[i].title}`}
                        />
                      ))}
                    </div>
                    
                    {/* Индикаторы слайдера для мобильных устройств */}
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10 md:hidden">
                      {projects.map((_, i) => (
                        <button
                          key={i}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            activeIndex === i ? "bg-white w-6" : "bg-white/30 hover:bg-white/50"
                          }`}
                          onClick={() => setActiveIndex(i)}
                          aria-label={`Переключить на проект ${projects[i].title}`}
                        />
                      ))}
                    </div>
                  </div>
                </SlideIn>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Новая секция с трейлером Кукушки */}
      <section className="py-16 bg-zinc-950 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <div className="text-center mb-8">
                <span className="inline-block text-xs uppercase tracking-widest text-white/70 mb-3 border border-white/20 px-3 py-1 rounded-full">Премьера</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Трейлер фильма "Кукушка"</h2>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="w-full aspect-video rounded-lg overflow-hidden border border-white/10">
                <iframe 
                  src="https://vk.com/video_ext.php?oid=-220787057&id=456359225&hash=1377cb4ae7f4e12b" 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  allowFullScreen="1" 
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="w-full h-full"
                  title="Трейлер фильма Кукушка"
                ></iframe>
              </div>
              <div className="mt-6 flex justify-center">
                <Link href="/projects/kukushka" className="min-button inline-flex items-center">
                  Подробнее о фильме
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      
     
      
      
     
      
      {/* Модальное окно с трейлером */}
      <AnimatePresence>
        {showTrailer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
            onClick={closeTrailer}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-4xl aspect-video mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeTrailer}
                className="absolute -top-12 right-0 text-white hover:text-[#ff5252] transition-colors"
                aria-label="Закрыть"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="w-full h-full rounded-lg overflow-hidden bg-black/50">
                {activeTrailerUrl && (
                  <iframe
                    src={activeTrailerUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                    frameBorder="0"
                    title="Трейлер проекта"
                    loading="lazy"
                  ></iframe>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      
    </main>
  );
}

// Компонент для анимированного счетчика
function CountUp({ end, duration }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime;
    let animationFrame;
    
    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrame = requestAnimationFrame(updateCount);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);
  
  return count;
}
