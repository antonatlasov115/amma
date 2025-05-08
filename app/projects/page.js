'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import MovieCard from '../components/MovieCard';
import { FadeIn, StaggerContainer, StaggerItem, GlitchText, SlideIn } from '../components/AnimateIn';

// Данные о проектах
const projects = [
  {
    id: "kukushka",
    title: "Кукушка",
    category: "Полнометражные ФИЛЬМ",
    description: "Психологический хоррор о женщине, которая сталкивается со своими страхами и прошлым в заброшенном доме.",
    year: "2024",
    duration: "92 мин",
    image: "/images/ima3.png",
    tags: ["Ужасы", "Психология"]
  },
 
];

// Все категории проектов
const allCategories = ["ВСЕ", ...new Set(projects.map(project => project.category))];

// Все теги проектов
const allTags = ["ВСЕ", ...new Set(projects.flatMap(project => project.tags).filter(tag => tag))];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("ВСЕ");
  const [activeTag, setActiveTag] = useState("ВСЕ");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [currentView, setCurrentView] = useState('grid'); // 'grid' или 'list'
  const [showFilterMobile, setShowFilterMobile] = useState(false);
  const filterRef = useRef(null);
  const heroRef = useRef(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hideHeader, setHideHeader] = useState(false);
  
  // Для параллакс эффекта
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  // Контролируем видимость плавающего заголовка при скролле
  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      
      // Если разница больше 10px и скролл вниз - скрываем заголовок
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setHideHeader(true);
      } else {
        // Если скролл вверх или в начале страницы - показываем заголовок
        setHideHeader(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', controlHeader);
    
    // Убираем слушатель при размонтировании
    return () => {
      window.removeEventListener('scroll', controlHeader);
    };
  }, [lastScrollY]);
  
  // Фильтрация проектов
  const filteredProjects = projects.filter(project => {
    const categoryMatch = activeCategory === "ВСЕ" || project.category === activeCategory;
    const tagMatch = activeTag === "ВСЕ" || (project.tags && project.tags.includes(activeTag));
    return categoryMatch && tagMatch;
  });
  
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    // Если выбрана новая категория, сбрасываем активный тег
    if (category !== activeCategory) {
      setActiveTag("ВСЕ");
    }
    
    // На мобильных устройствах закрываем панель фильтров после выбора категории
    if (window.innerWidth < 768) {
      setShowFilterMobile(false);
    }
  };
  
  const handleTagClick = (tag) => {
    setActiveTag(tag);
    
    // На мобильных устройствах закрываем панель фильтров после выбора тега
    if (window.innerWidth < 768) {
      setShowFilterMobile(false);
    }
  };
  
  // Плавный скролл к отфильтрованным проектам
  useEffect(() => {
    if (filterRef.current) {
      setTimeout(() => {
        window.scrollTo({
          top: filterRef.current.offsetTop + filterRef.current.offsetHeight,
          behavior: 'smooth'
        });
      }, 200);
    }
  }, [activeCategory, activeTag]);
  
  return (
    <main className="pt-16 bg-black">
      {/* Герой-секция с параллакс эффектом */}
      <section ref={heroRef} className="min-h-[80vh] relative flex items-center py-20 overflow-hidden">
        <div className="absolute inset-0 min-grid opacity-10"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/70 z-10"></div>
          <motion.div style={{ y: headerY, opacity }} className="absolute inset-0">
            {filteredProjects.length > 0 && hoveredProject !== null ? (
              <motion.div 
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <Image 
                  src={filteredProjects[hoveredProject % filteredProjects.length].image} 
                  alt="Проект" 
                  fill 
                  className="object-cover opacity-40 grayscale" 
                />
              </motion.div>
            ) : (
              <Image 
                src="/images/kuku1.jpg" 
                alt="Проекты" 
                fill 
                className="object-cover opacity-30 grayscale" 
                priority
              />
            )}
          </motion.div>
        </div>
        
        <div className="te-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <SlideIn delay={0.2}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 leading-tight tracking-tight">
                Наши <GlitchText text="проекты" className="text-[#ff5252]" />
              </h1>
            </SlideIn>
            
            <FadeIn delay={0.4}>
              <p className="text-sm md:text-base opacity-70 max-w-xl mx-auto mb-12">
                Коллекция наших работ в различных жанрах и форматах. 
                От короткометражных фильмов до масштабных коммерческих проектов.
              </p>
            </FadeIn>
            
            <StaggerContainer delayChildren={0.6} staggerChildren={0.1}>
              <div className="flex flex-wrap justify-center gap-5">
                <StaggerItem>
                  <Link href="#filter" className="min-button">
                    <span>Смотреть проекты</span>
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </Link>
                </StaggerItem>
              </div>
            </StaggerContainer>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21L12 3" stroke="white" strokeWidth="1" strokeLinecap="round"/>
            <path d="M18 15L12 21L6 15" stroke="white" strokeWidth="1" strokeLinecap="round"/>
          </svg>
        </motion.div>
        
        {/* Боковая навигация - индикаторы разделов */}
        <div className="hidden md:flex flex-col items-center fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
          {["ВСЕ", ...allCategories.slice(1, 4)].map((section, index) => (
            <motion.button
              key={section}
              className="w-2 h-2 rounded-full bg-white/30 my-3 relative group"
              onClick={() => setActiveCategory(section)}
              whileHover={{ scale: 1.5 }}
              animate={{ 
                backgroundColor: activeCategory === section ? "rgba(255, 82, 82, 1)" : "rgba(255, 255, 255, 0.3)" 
              }}
            >
              <motion.span 
                className="absolute left-0 top-0 opacity-0 whitespace-nowrap transform -translate-x-full -translate-y-1/2 text-xs pr-4"
                animate={{ opacity: activeCategory === section ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {section}
              </motion.span>
            </motion.button>
          ))}
          {allCategories.length > 4 && (
            <motion.button
              className="w-2 h-2 rounded-full bg-white/30 my-3 relative group"
              whileHover={{ scale: 1.5 }}
            >
              <span className="absolute left-0 top-0 opacity-0 group-hover:opacity-100 whitespace-nowrap transform -translate-x-full -translate-y-1/2 text-xs pr-4">
                Ещё...
              </span>
            </motion.button>
          )}
        </div>
      </section>
      
      {/* Плавающий заголовок с количеством проектов */}
      <motion.div 
        className="fixed top-16 left-0 w-full bg-black/80 backdrop-blur-md z-40 py-2 md:py-3 px-4 border-b border-white/5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: 1, 
          y: hideHeader ? -100 : 0,
          transition: {
            y: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }
        }}
        transition={{ delay: 0.8 }}
      >
        <div className="te-container flex justify-between items-center">
          <div className="text-xs md:text-sm">
            <span className="text-[#ff5252] font-medium mr-2">{filteredProjects.length}</span>
            <span className="opacity-70">
              {filteredProjects.length === 1 ? 'проект' : 
                filteredProjects.length >= 2 && filteredProjects.length <= 4 ? 'проекта' : 'проектов'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="flex bg-black/20 p-1 rounded-md">
              <button 
                className={`p-1 md:p-1.5 rounded-md transition-all ${currentView === 'grid' ? 'bg-[#ff5252] text-white' : 'hover:bg-white/5'}`}
                onClick={() => setCurrentView('grid')}
                aria-label="Сетка"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </button>
              <button 
                className={`p-1 md:p-1.5 rounded-md transition-all ${currentView === 'list' ? 'bg-[#ff5252] text-white' : 'hover:bg-white/5'}`}
                onClick={() => setCurrentView('list')}
                aria-label="Список"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M3 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M3 18H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            
            {/* Сбросить фильтры - видно всегда */}
            {(activeCategory !== "ВСЕ" || activeTag !== "ВСЕ") && (
              <button 
                onClick={() => {setActiveCategory("ВСЕ"); setActiveTag("ВСЕ");}}
                className="flex text-xs items-center gap-1 opacity-70 hover:opacity-100 transition-all"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span className="hidden md:inline">Сбросить фильтры</span>
              </button>
            )}
            
            {/* Кнопка фильтров для мобильных */}
            <button 
              onClick={() => setShowFilterMobile(!showFilterMobile)} 
              className="md:hidden flex items-center text-xs gap-1.5 bg-white/5 hover:bg-white/10 rounded-full px-3 py-1.5 relative"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm3 8a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1zm4 8a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1z" fill="currentColor"/>
              </svg>
              <span>Фильтр</span>
              
              {/* Индикатор активных фильтров */}
              {(activeCategory !== "ВСЕ" || activeTag !== "ВСЕ") && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#ff5252] rounded-full" />
              )}
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Выдвижная панель фильтров для мобильных устройств */}
      <AnimatePresence>
        {showFilterMobile && (
          <>
            {/* Затемнение фона */}
            <motion.div 
              className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilterMobile(false)}
            />
            
            {/* Панель фильтров */}
            <motion.div 
              className="md:hidden fixed right-0 top-0 h-full w-[80%] max-w-[300px] bg-zinc-900 z-50 flex flex-col shadow-lg"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Заголовок панели */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <p className="font-medium">Фильтры</p>
                <button onClick={() => setShowFilterMobile(false)} aria-label="Закрыть">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              
              {/* Содержимое панели */}
              <div className="p-4 overflow-y-auto flex-1">
                {/* Категории */}
                <div className="mb-6">
                  <p className="text-xs uppercase mb-2 opacity-70">Категории</p>
                  <div className="flex flex-wrap gap-1.5">
                    {allCategories.map((category) => (
                      <motion.button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className={`text-[10px] px-2 py-1 rounded-full transition-all ${activeCategory === category ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {category}
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                {/* Теги */}
                <div>
                  <p className="text-xs uppercase mb-2 opacity-70">Теги</p>
                  <div className="flex flex-wrap gap-1.5">
                    {allTags.map((tag) => (
                      <motion.button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`text-[10px] px-2 py-1 rounded-full transition-all ${activeTag === tag ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tag}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Нижняя панель с действиями */}
              <div className="p-4 border-t border-white/10">
                {(activeCategory !== "ВСЕ" || activeTag !== "ВСЕ") ? (
                  <button 
                    onClick={() => {setActiveCategory("ВСЕ"); setActiveTag("ВСЕ"); setShowFilterMobile(false);}}
                    className="w-full py-2 text-center bg-white/5 hover:bg-white/10 rounded text-xs transition-colors"
                  >
                    Сбросить все фильтры
                  </button>
                ) : (
                  <button 
                    onClick={() => setShowFilterMobile(false)}
                    className="w-full py-2 text-center bg-[#ff5252] text-white rounded text-xs"
                  >
                    Применить
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Десктопные фильтры */}
      <section id="filter" ref={filterRef} className="py-6 md:py-8 bg-zinc-950 z-30 hidden md:block border-b border-white/5">
        <div className="te-container">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-light">Исследуйте наши проекты</h2>
                  <button 
                    onClick={() => window.location.href = '/contact'}
                    className="min-button-outline group"
                  >
                    <span>Заказать проект</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
          
          <div className="flex flex-row gap-8 items-center overflow-x-auto pb-2 no-scrollbar">
            {/* Категории */}
            <div>
              <div className="flex gap-2 items-center">
                <span className="text-xs uppercase opacity-70 whitespace-nowrap">Категории:</span>
                <div className="flex flex-wrap gap-2">
                  {allCategories.map((category) => (
                    <motion.button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className={`text-xs px-3 py-1 rounded-full transition-all ${activeCategory === category ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Теги */}
            <div>
              <div className="flex gap-2 items-center">
                <span className="text-xs uppercase opacity-70 whitespace-nowrap">Теги:</span>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <motion.button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className={`text-xs px-3 py-1 rounded-full transition-all ${activeTag === tag ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tag}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Список проектов */}
      <section className="py-16 bg-black min-h-[50vh]">
        <div className="te-container">
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              <motion.div
                key="projects"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {currentView === 'grid' ? (
                  // Сетка проектов
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project, index) => (
                      <motion.div 
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        onHoverStart={() => setHoveredProject(index)}
                      >
                        <MovieCard movie={project} index={index} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  // Список проектов
                  <StaggerContainer delayChildren={0.1} staggerChildren={0.1}>
                    {filteredProjects.map((project, index) => (
                      <StaggerItem key={project.id}>
                        <motion.div
                          className="flex flex-col md:flex-row border border-white/5 rounded-lg overflow-hidden bg-black hover:border-white/20 transition-all"
                          onHoverStart={() => setHoveredProject(index)}
                          whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.5)" }}
                        >
                          <div className="md:w-1/3 aspect-video md:aspect-square relative overflow-hidden">
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 z-10"
                            />
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.7 }}
                              className="h-full w-full"
                            >
                              <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-all duration-700"
                              />
                            </motion.div>
                          </div>
                          <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                            <div>
                              <div className="text-xs text-[#ff5252] mb-2 uppercase tracking-wider font-light">{project.category}</div>
                              <h3 className="text-xl md:text-2xl mb-3 font-light tracking-tight">{project.title}</h3>
                              <p className="text-sm opacity-70 mb-4 line-clamp-2">{project.description}</p>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.filter(tag => tag).map(tag => (
                                  <span 
                                    key={tag} 
                                    className="text-xs px-2 py-1 bg-white/5 rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <div className="text-xs opacity-50">
                                {project.year} · {project.duration}
                              </div>
                              <Link
                                href={`/projects/${project.id}`}
                                className="text-xs group flex items-center gap-2 border border-white/10 rounded-full px-4 py-1 hover:border-[#ff5252] transition-all"
                              >
                                <span>Подробнее</span>
                                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="no-projects"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center min-h-[30vh]"
              >
                <div className="text-center bg-zinc-950 p-8 rounded-lg max-w-md mx-auto">
                  <svg className="w-12 h-12 mx-auto mb-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg mb-2">Проекты не найдены</h3>
                  <p className="text-sm opacity-70 mb-6">Попробуйте изменить критерии поиска</p>
                  <motion.button 
                    onClick={() => {setActiveCategory("ВСЕ"); setActiveTag("ВСЕ");}}
                    className="min-button inline-flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Сбросить фильтры</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      
      {/* Призыв к действию с параллакс эффектом */}
      <section className="py-20 bg-zinc-950 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-black/80 z-10"></div>
          
        </motion.div>
        
        <div className="te-container text-center relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto"
          >
            <GlitchText text="У вас есть идея для проекта?" className="text-2xl md:text-3xl font-light mb-6" />
            <p className="text-sm opacity-70 mb-10">
              Мы готовы воплотить в жизнь ваше видение. Каждый проект начинается с идеи - 
              позвольте нам помочь вам превратить её в реальность.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 82, 82, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              className="text-sm px-8 py-3 border border-[#ff5252] rounded-full hover:border-[#ff5252] transition-all flex items-center gap-2 mx-auto"
              onClick={() => window.location.href = '/contact'}
            >
              <span>Связаться с нами</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
        
        {/* Декоративные элементы */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </section>
    </main>
  );
} 