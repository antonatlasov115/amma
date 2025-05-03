'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';

// Базовая анимация появления
export function FadeIn({ 
  children, 
  delay = 0, 
  direction = null, 
  fullWidth = true, 
  padding = true, 
  className = '', 
  duration = 0.5,
  distance = 50
}) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.1 });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const getDirectionOffset = () => {
    switch (direction) {
      case 'up': return { y: distance };
      case 'down': return { y: -distance };
      case 'left': return { x: distance };
      case 'right': return { x: -distance };
      default: return { y: 0, x: 0 };
    }
  };

  const variants = {
    hidden: {
      opacity: 0,
      ...getDirectionOffset()
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  const widthStyle = fullWidth ? 'w-full' : '';
  const paddingStyle = padding ? 'py-4' : '';

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={`${widthStyle} ${paddingStyle} ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Анимация с задержкой для группы элементов
export function StaggerContainer({ children, delay = 0, className = '' }) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.1 });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: delay
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Элемент для StaggerContainer
export function StaggerItem({ 
  children, 
  index = 0, 
  direction = 'up', 
  className = '',
  distance = 30
}) {
  const getDirectionOffset = () => {
    switch (direction) {
      case 'up': return { y: distance };
      case 'down': return { y: -distance };
      case 'left': return { x: distance };
      case 'right': return { x: -distance };
      default: return { y: distance };
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      ...getDirectionOffset()
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Анимация размытия текста
export function GlitchText({ text = "", delay = 0, className = "inline-block" }) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.1 });
  
  useEffect(() => {
    if (!inView) return;
    
    let timer;
    let currentIndex = 0;
    const textLength = text.length;
    
    // Задержка перед началом анимации
    setTimeout(() => {
      timer = setInterval(() => {
        if (currentIndex < textLength) {
          setDisplayText(text.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(timer);
          setIsComplete(true);
        }
      }, 40); // Скорость печати
    }, delay * 1000);
    
    return () => clearInterval(timer);
  }, [text, delay, inView]);
  
  return (
    <span ref={ref} className={className}>
      {displayText}
      {!isComplete && <span className="animate-blink">|</span>}
    </span>
  );
}

// Анимация для плавного слайдера
export function SlideIn({ 
  children, 
  direction = 'up', 
  delay = 0, 
  className = '',
  distance = 100,
  duration = 0.7
}) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.1 });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const getDirectionOffset = () => {
    switch (direction) {
      case 'up': return { y: distance };
      case 'down': return { y: -distance };
      case 'left': return { x: distance };
      case 'right': return { x: -distance };
      default: return { y: distance };
    }
  };

  const variants = {
    hidden: {
      opacity: 0,
      ...getDirectionOffset()
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Анимация появления с диагональным эффектом
export function DiagonalReveal({ 
  children, 
  delay = 0, 
  className = '',
  duration = 0.8,
  direction = 'top-left' // 'top-left', 'top-right', 'bottom-left', 'bottom-right'
}) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.1 });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const getInitialPosition = () => {
    switch (direction) {
      case 'top-left': return { clipPath: 'polygon(0 0, 0 0, 0 0, 0 0)' };
      case 'top-right': return { clipPath: 'polygon(100% 0, 100% 0, 100% 0, 100% 0)' };
      case 'bottom-left': return { clipPath: 'polygon(0 100%, 0 100%, 0 100%, 0 100%)' };
      case 'bottom-right': return { clipPath: 'polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)' };
      default: return { clipPath: 'polygon(0 0, 0 0, 0 0, 0 0)' };
    }
  };

  const variants = {
    hidden: {
      opacity: 0,
      ...getInitialPosition()
    },
    visible: {
      opacity: 1,
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      transition: {
        clipPath: { duration: duration, delay: delay, ease: [0.25, 0.1, 0.25, 1.0] },
        opacity: { duration: duration * 0.5, delay: delay, ease: [0.25, 0.1, 0.25, 1.0] }
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Анимация вращения
export function RotateIn({ 
  children, 
  delay = 0, 
  className = '',
  initialRotation = -10, 
  duration = 0.7
}) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.1 });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: {
      opacity: 0,
      rotate: initialRotation,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Анимированная кнопка с пульсацией
export function PulseButton({ 
  children, 
  onClick, 
  className = '',
  pulseColor = 'rgba(255, 82, 82, 0.3)',
  hoverScale = 1.05
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative ${className}`}
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className="absolute inset-0 rounded-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0, 0.5, 0],
          backgroundColor: pulseColor
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
      {children}
    </motion.button>
  );
}

// Анимированный счетчик
export function CountUp({ 
  end = 100, 
  duration = 2, 
  delay = 0, 
  prefix = '', 
  suffix = '',
  decimals = 0,
  className = 'font-bold'
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.1 });
  
  useEffect(() => {
    if (!inView) return;
    
    let startTime;
    let animationFrame;
    
    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const currentCount = Math.floor(progress * end);
      
      setCount(currentCount);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animateCount);
      } else {
        setCount(end);
      }
    };
    
    setTimeout(() => {
      animationFrame = requestAnimationFrame(animateCount);
    }, delay * 1000);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, delay, inView]);
  
  const formatNumber = (num) => {
    return num.toFixed(decimals);
  };
  
  return (
    <span ref={ref} className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
}

// Анимированный скролл-триггер
export function ScrollTrigger({ 
  children, 
  animateOnce = true, 
  threshold = 0.1,
  className = '' 
}) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: animateOnce, threshold });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else if (!animateOnce) {
      controls.start("hidden");
    }
  }, [controls, inView, animateOnce]);
  
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Анимированный текстовый спиннер
export function TextSpinner({ 
  items = [], 
  delay = 3, 
  className = '' 
}) {
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    if (items.length <= 1) return;
    
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, delay * 1000);
    
    return () => clearInterval(timer);
  }, [items.length, delay]);
  
  return (
    <div className={`relative h-8 overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {items[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Трекер мыши для интерактивных эффектов
export function MouseTracker({ 
  children, 
  sensitivity = 0.1, 
  className = '' 
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = (e.clientX - centerX) * sensitivity;
      const y = (e.clientY - centerY) * sensitivity;
      
      setPosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [sensitivity]);
  
  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{
        x: position.x,
        y: position.y,
        rotateX: -position.y,
        rotateY: position.x
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}

// Эффект параллакса при скролле
export function ParallaxSection({ 
  children, 
  speed = 0.2, 
  className = '' 
}) {
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const y = scrollY * speed;
  
  return (
    <motion.div
      ref={ref}
      className={`${className} relative`}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
} 