'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function MovieCard({ movie, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const cardRef = useRef(null);
  
  // Для эффекта 3D наклона
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);
  
  // Плавная анимация для 3D эффекта
  const springConfig = { damping: 15, stiffness: 150 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  
  // Обработка движения мыши для 3D эффекта
  function handleMouseMove(e) {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }
  
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }
  
  // Возвращаем стандартный вид на мобильных устройствах
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      x.set(0);
      y.set(0);
    }
  }, [x, y]);
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="relative overflow-hidden bg-black border border-zinc-900/20 group rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -5 }}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
        rotateX: springRotateX,
        rotateY: springRotateY
      }}
      layout
    >
      {/* Индикатор в углу */}
      <motion.div 
        className="absolute top-3 right-3 z-20 w-2 h-2 rounded-full bg-[#ff5252]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 1 : 0.6
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Фоновое изображение */}
      <div className="relative h-[40vh] overflow-hidden rounded-t-lg">
        <motion.img 
          src={movie.image || `/images/project-${index + 1}.jpg`}
          alt={movie.title}
          className="w-full h-full object-cover opacity-80 grayscale"
          animate={{ 
            scale: isHovered ? 1.05 : 1,
            filter: isHovered ? 'grayscale(70%)' : 'grayscale(100%)'
          }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Градиентный оверлей */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent rounded-t-lg"
          animate={{
            opacity: isHovered ? 0.8 : 1
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Категория в верхней части */}
        <motion.div 
          className="absolute top-4 left-4 z-10"
          animate={{
            y: isHovered ? 0 : -10,
            opacity: isHovered ? 1 : 0
          }}
          initial={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10"
            whileHover={{ backgroundColor: "rgba(255, 82, 82, 0.2)", borderColor: "rgba(255, 82, 82, 0.4)" }}
          >
            <span className="text-[10px] uppercase tracking-wider opacity-80">
              {movie.category || 'КОРОТКОМЕТРАЖНЫЙ ФИЛЬМ'}
            </span>
          </motion.div>
        </motion.div>
        
        {/* Кнопка трейлера */}
        
      </div>
      
      {/* Теги проекта */}
      {movie.tags && movie.tags.length > 0 && (
        <motion.div 
          className="absolute top-16 left-4 z-10 flex flex-wrap gap-1 max-w-[70%]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : -10
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {movie.tags.map((tag, i) => (
            <motion.span 
              key={tag}
              className="text-[8px] uppercase px-2 py-0.5 bg-black/30 backdrop-blur-sm rounded-full border border-white/5"
              initial={{ opacity: 0, x: -10 }}
              animate={{ 
                opacity: isHovered ? 0.8 : 0,
                x: isHovered ? 0 : -10
              }}
              transition={{ duration: 0.3, delay: 0.1 + (i * 0.05) }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      )}
      
      {/* Информация о проекте */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full p-5"
        animate={{ 
          y: isHovered ? 0 : 10,
          opacity: isHovered ? 1 : 0.9
        }}
        transition={{ duration: 0.4 }}
      >
        <motion.h3 
          className="text-sm md:text-base uppercase tracking-wide mb-2 font-medium flex items-center justify-between"
          animate={{ 
            y: isHovered ? 0 : 5,
            opacity: isHovered ? 1 : 0.9
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <span>{movie.title || `ПРОЕКТ ${index + 1}`}</span>
          <motion.span 
            className="inline-block ml-2"
            animate={{ 
              x: isHovered ? 5 : 0,
              opacity: isHovered ? 1 : 0
            }}
            transition={{ duration: 0.3, repeat: isHovered ? Infinity : 0, repeatType: "reverse" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19" stroke="#ff5252" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 5L19 12L12 19" stroke="#ff5252" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.span>
        </motion.h3>
        
        <motion.div 
          className="text-xs opacity-50 mb-6 flex items-center"
          animate={{ 
            y: isHovered ? 0 : 5,
            opacity: isHovered ? 0.7 : 0.3
          }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <span className="inline-block mr-3">{movie.year || '2023'}</span>
          <span className="inline-block w-1 h-1 bg-white/50 rounded-full mr-3"></span>
          <span>{movie.duration || '15 мин'}</span>
        </motion.div>
        
        {/* Краткое описание - появляется при наведении */}
        <motion.div
          className="overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: isHovered ? 'auto' : 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <motion.p
            className="text-xs opacity-70 mb-6 line-clamp-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isHovered ? 0.7 : 0,
              y: isHovered ? 0 : 20
            }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {movie.description || 'Описание проекта будет здесь. Краткая информация о фильме, его сюжете и основной идее.'}
          </motion.p>
        </motion.div>
        
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10
          }}
          transition={{ duration: 0.3, delay: 0.25 }}
        >
          <Link 
            href={`/projects/${movie.id || `project-${index + 1}`}`}
            className="text-xs opacity-80 hover:opacity-100 inline-flex items-center transition-all px-4 py-2 border border-[#ff5252]/30 bg-[#ff5252]/5 hover:bg-[#ff5252]/10 rounded-full"
          >
            <span className="mr-2">ПОДРОБНЕЕ</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          
          <motion.div 
            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center cursor-pointer"
            whileHover={{ borderColor: 'rgba(255, 82, 82, 0.5)', scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Верхняя линия */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-[2px] z-10 overflow-hidden bg-transparent"
      >
        <motion.div 
          className="h-full bg-[#ff5252]/60 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
      
      {/* Правая вертикальная линия */}
      <motion.div 
        className="absolute top-0 right-0 h-full w-[2px] z-10 bg-transparent"
      >
        <motion.div 
          className="w-full bg-[#ff5252]/60"
          initial={{ height: "0%", top: "100%" }}
          animate={{ 
            height: isHovered ? "100%" : "0%", 
            top: isHovered ? "0%" : "100%" 
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        />
      </motion.div>
      
      {/* Нижняя линия */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-[2px] z-10 overflow-hidden bg-transparent"
      >
        <motion.div 
          className="h-full bg-[#ff5252]/60 rounded-full"
          initial={{ width: "0%", left: "100%" }}
          animate={{ 
            width: isHovered ? "100%" : "0%",
            left: isHovered ? "0%" : "100%"
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </motion.div>
      
      {/* Левая вертикальная линия */}
      <motion.div 
        className="absolute top-0 left-0 h-full w-[2px] z-10 bg-transparent"
      >
        <motion.div 
          className="w-full bg-[#ff5252]/60"
          initial={{ height: "0%", bottom: "100%" }}
          animate={{ 
            height: isHovered ? "100%" : "0%", 
            bottom: isHovered ? "0%" : "100%" 
          }}
          transition={{ duration: 0.3, delay: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
} 