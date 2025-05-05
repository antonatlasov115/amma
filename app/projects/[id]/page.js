'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { FadeIn, SlideIn, GlitchText, StaggerContainer, StaggerItem } from '../../components/AnimateIn';

// Пример проектов (в реальном приложении данные должны приходить из API/CMS)
const projects = [
  {
    id: 'kukushka',
    title: 'Кукушка',
    category: 'Полнометражный фильм',
    description: 'Психологический хоррор о женщине, которая сталкивается со своими страхами и прошлым в заброшенном доме.',
    fullDescription: 'После долгого отсутствия, в поисках себя и ответов на вопросы, мучавших его на протяжении многих лет, Аркадий возвращается в родительский дом, где он жил с семьей до их трагической гибели. Он окунается в воспоминания о том ужасном событии, перевернувшем и разделившем его жизнь на До и После.Вскоре, Аркадий обращает внимание на странного и нелюдимого соседа, который, как он выясняет позже, скрывает страшную тайну… Это метафоричный фильм, талантливо облаченный в эстетику черно-белого кино. Грустная история о несбывшейся любви и сложных перипетиях поиска себя и своей идентичности, своих корней, восстановления утраченной связи с предками и родной землей, рассказана языком образов и символов, основанных на традиционном веровании народа саха. Согласно вере наших предков, жизнь воспринималась, как благословенный Дар свыше, а добровольный уход из жизни считался большим грехом - «аньыы», который мог иметь самые непредсказуемые и ужасающие последствия.',
    year: '2024',
    duration: '1 час 37 мин',
    director: 'Евгений Николаев',
    cinematographer: 'Евгений Николаев',
    producer: '	Дмитрий Давыдов, Анатолий Сергеев',
    starring: '	Иван Шамаев, Николай Солдатов, Саяна Банзаракцаева',
    image: '/images/kuku1.jpg',
    galleryImages: ['/images/kuku1.jpg', '/images/kuku2.jpg', '/images/ima.png', '/images/ima1.png ','/images/ima3.png','/images/ima4.png', '/images/kuku3.jpeg', '/images/kuku4.webp',],
    videoUrl: 'https://vkvideo.ru/video_ext.php?oid=-220787057&id=456359225&hash=1377cb4ae7f4e12b',
    tags: ['хоррор', 'психология', 'триллер'],
    awards: [
    ],
    filmCrew: [
      { role: 'Сценарист', name: 'Анна Соколова' },
      { role: 'Монтажер', name: 'Игорь Кравцов' },
      { role: 'Композитор', name: 'Дмитрий Орлов' },
      { role: 'Художник-постановщик', name: 'Елена Белова' }
    ]
  },
  {
    id: 'hero-path',
    title: 'ПУТЬ ГЕРОЯ',
    category: 'Документальный фильм',
    description: 'Документальный фильм о спортсмене, преодолевающем трудности на пути к чемпионству.',
    fullDescription: 'Документальный фильм о спортсмене, преодолевающем физические и психологические трудности на пути к чемпионству. Лента следит за жизнью выдающегося атлета в течение года, показывая его тренировки, личную жизнь и внутренние конфликты. Это история о человеческой силе духа, настойчивости и способности преодолевать, казалось бы, непреодолимые препятствия.',
    year: '2022',
    duration: '78 мин',
    director: 'Сергей Иванов',
    cinematographer: 'Дмитрий Светлов',
    producer: 'Антон Атласов',
    starring: 'Игорь Степанов',
    image: '/images/project-2.jpg',
    galleryImages: ['/images/project-2.jpg', '/images/project-1.jpg', '/images/project-3.jpg'],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['спорт', 'биография', 'вдохновение'],
    awards: [
      'Лучший документальный фильм, Спортивный кинофестиваль 2022'
    ],
    filmCrew: [
      { role: 'Сценарист', name: 'Олег Петров' },
      { role: 'Монтажер', name: 'Алексей Кузнецов' },
      { role: 'Оператор', name: 'Андрей Соколов' }
    ]
  },
  {
    id: 'silent-voice',
    title: 'Тихий голос',
    category: 'Короткометражный фильм',
    description: 'История о немой девочке, находящей свой голос через искусство.',
    fullDescription: 'История о немой девочке, находящей свой голос через искусство. В мире, где коммуникация кажется ключом к пониманию, главная героиня открывает новые способы самовыражения. Этот короткометражный фильм исследует темы инклюзивности, творческого потенциала и несловесного общения, приглашая зрителей переосмыслить то, как мы воспринимаем голос и самовыражение.',
    year: '2021',
    duration: '15 мин',
    director: 'Антон Атласов',
    cinematographer: 'Алексей Ветров',
    producer: 'Елена Соколова',
    starring: 'Маша Иванова, Петр Сидоров',
    image: '/images/project-3.jpg',
    galleryImages: ['/images/project-3.jpg', '/images/project-1.jpg', '/images/project-2.jpg'],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['драма', 'искусство', 'общество'],
    awards: [
      'Лучший короткометражный фильм, Фестиваль молодого кино 2021',
      'Приз зрительских симпатий, Международный фестиваль короткометражек 2021'
    ],
    filmCrew: [
      { role: 'Сценарист', name: 'Мария Иванова' },
      { role: 'Художник по костюмам', name: 'Татьяна Соколова' },
      { role: 'Звукорежиссер', name: 'Николай Петров' }
    ]
  }
];

export default function ProjectDetails() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [activeImage, setActiveImage] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [trailerLoading, setTrailerLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
    layoutEffect: false
  });
  
  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    if (params.id) {
      const foundProject = projects.find(p => p.id === params.id);
      if (foundProject) {
        setProject(foundProject);
        // Устанавливаем заголовок документа
        document.title = `${foundProject.title} | AMMA Studio`;
      } else {
        // Проект не найден - перенаправляем на страницу проектов
        router.push('/projects');
      }
    }
    setIsLoading(false);
  }, [params.id, router]);

  useEffect(() => {
    // Прокручиваем страницу наверх при загрузке проекта
    window.scrollTo(0, 0);
  }, [project]);

  useEffect(() => {
    // Добавляем глобальный стиль для анимации
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      @keyframes scanline {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100%); }
      }
      
      @keyframes noise {
        0% { background-position: 0 0; }
        50% { background-position: 100% 100%; }
        100% { background-position: 0 0; }
      }
      
      @keyframes flicker {
        0% { opacity: 0.3; }
        25% { opacity: 0.4; }
        50% { opacity: 0.2; }
        75% { opacity: 0.5; }
        100% { opacity: 0.3; }
      }
      
      @keyframes subtle-zoom {
        0% { transform: scale(1); }
        50% { transform: scale(1.03); }
        100% { transform: scale(1); }
      }
      
      .hero-image-animation {
        animation: subtle-zoom 20s infinite ease-in-out;
        filter: brightness(0.85) contrast(1.15) saturate(0.9);
        transform-origin: center;
      }
      
      .gallery-perspective {
        perspective: 1000px;
      }
      
      .gallery-3d-card {
        transform-style: preserve-3d;
        backface-visibility: hidden;
      }
    `;
    document.head.appendChild(styleEl);
    
    return () => {
      // Удаляем стиль при размонтировании компонента
      document.head.removeChild(styleEl);
    };
  }, []);

  // Слайдшоу для hero секции
  useEffect(() => {
    if (project && project.galleryImages && project.galleryImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % project.galleryImages.length);
      }, 8000); // Меняем изображение каждые 8 секунд вместо 5
      
      return () => clearInterval(interval);
    }
  }, [project]);

  // Устанавливаем начальный слайд как изображение обложки
  useEffect(() => {
    if (project && project.id === 'kukushka') {
      // Найдем индекс kuku1.jpg в galleryImages, если он есть
      const indexOfKuku1 = project.galleryImages.findIndex(img => img.includes('kuku1'));
      if (indexOfKuku1 !== -1) {
        setCurrentSlide(indexOfKuku1);
      } else {
        // Если не нашли, используем первое изображение
        setCurrentSlide(0);
      }
    }
  }, [project]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-t-2 border-l-2 border-[#ff5252] rounded-full"
        />
      </div>
    );
  }

  if (!project) {
    return null;
  }

  const relatedProjects = projects
    .filter(p => p.id !== project.id)
    .slice(0, 3);

  return (
    <main className="bg-black text-white relative">
      {/* Герой-секция с параллакс эффектом и слайдшоу */}
      <section 
        ref={heroRef} 
        className="relative h-[85vh] overflow-hidden" 
        style={{ position: 'relative', contain: 'layout' }}
      >
        <motion.div 
          style={{ y: headerY, opacity }} 
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 min-grid opacity-10 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90 z-10 backdrop-blur-[10px]"></div>
          
          {project.galleryImages && project.galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: currentSlide === index ? 1 : 0,
                transition: { duration: 1.5 }
              }}
              className="absolute inset-0"
            >
              <motion.div
                className="w-full h-full hero-image-animation"
                animate={currentSlide === index ? {
                  scale: [1, 1.1],
                } : { scale: 1 }}
                transition={{
                  duration: 8,
                  ease: "easeOut",
                  times: [0, 1]
                }}
              >
                <Image 
                  src={image} 
                  alt={`${project.title} - изображение ${index + 1}`} 
                  fill 
                  className="object-cover grayscale-[35%] blur-[5px]" 
                  priority={index === 0 || (project.id === 'kukushka' && image.includes('kuku1'))}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          style={{ y: textY }} 
          className="absolute bottom-[15%] left-0 w-full px-6 md:px-10 z-20"
        >
          <div className="container mx-auto">
            <SlideIn direction="up">
              <div className="flex flex-wrap gap-3 mb-6">
                {project.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="text-xs uppercase px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </SlideIn>
            
            <SlideIn direction="up" delay={0.1}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-4 tracking-tight">
                {project.title}
              </h1>
            </SlideIn>
            
            <SlideIn direction="up" delay={0.2}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm md:text-base text-white/70">
                <div className="flex items-center">
                  <span className="w-4 h-4 mr-2">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 5h-8a2 2 0 00-2 2v3H3a2 2 0 00-2 2v4m3-3l7 7m0 0h-3m3 0v-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span>{project.category}</span>
                </div>
                
                <span className="hidden md:block">•</span>
                
                <div className="flex items-center">
                  <span className="w-4 h-4 mr-2">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 7v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 10l-6 4V6l6 4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span>{project.duration}</span>
                </div>
                
                <span className="hidden md:block">•</span>
                
                <div className="flex items-center">
                  <span className="w-4 h-4 mr-2">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span>{project.year}</span>
                </div>
              </div>
            </SlideIn>
            
            <SlideIn direction="up" delay={0.3}>
              <Link 
                href="#trailer"
                onClick={() => setActiveTab('trailer')}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-[#ff5252] rounded-full hover:bg-[#ff3838] transition-colors duration-300 group"
              >
                <span>Смотреть трейлер</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </SlideIn>
          </div>
        </motion.div>
        
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 14l-7 7-7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 3v18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
            <span className="text-xs mt-2 text-white/50">Прокрутите вниз</span>
          </motion.div>
        </div>
        
        {/* Индикаторы слайдов */}
        {project.galleryImages && project.galleryImages.length > 1 && (
          <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 z-20 hidden md:block">
            <div className="flex gap-2">
              {project.galleryImages.map((_, index) => (
                <button 
                  key={index}
                  aria-label={`Показать изображение ${index + 1}`}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white w-4' 
                      : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Индикаторы слайдов для мобильных устройств */}
        {project.galleryImages && project.galleryImages.length > 1 && (
          <div className="absolute top-4 right-4 z-20 md:hidden">
            <div className="flex gap-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1.5">
              {project.galleryImages.map((_, index) => (
                <button 
                  key={index}
                  aria-label={`Показать изображение ${index + 1}`}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white w-4' 
                      : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </section>
      
      {/* Основной контент */}
      <section className="py-20" id="content">
        <div className="container mx-auto px-6 md:px-10">
          {/* Навигация по вкладкам */}
          <div className="border-b border-white/10 mb-12">
            <div className="flex overflow-x-auto no-scrollbar">
              {['overview', 'gallery', 'trailer', 'credits'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative py-4 px-6 transition-colors ${
                    activeTab === tab 
                      ? 'text-white' 
                      : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  <span className="whitespace-nowrap capitalize">
                    {tab === 'overview' ? 'Обзор' : 
                     tab === 'gallery' ? 'Галерея' : 
                     tab === 'trailer' ? 'Трейлер' : 'Съемочная группа'}
                  </span>
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="activeTabLine"
                      className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#ff5252]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Содержимое вкладок */}
          <div className="min-h-[50vh]">
            {/* Обзор */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
                <div className="lg:col-span-2">
                  <FadeIn>
                    <h2 className="text-2xl font-light mb-8">О проекте</h2>
                    <div className="prose prose-lg prose-invert">
                      <p className="text-white/80 leading-relaxed mb-8 text-lg">
                        {project.fullDescription}
                      </p>
                    </div>
                    
                    {project.awards && project.awards.length > 0 && (
                      <div className="mt-12">
                        <h3 className="text-xl font-light mb-6">Награды и признание</h3>
                        <ul className="space-y-3">
                          {project.awards.map((award, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-[#ff5252] mr-2">🏆</span>
                              <span className="text-white/80">{award}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </FadeIn>
                </div>
                
                <div>
                  <FadeIn delay={0.2}>
                    <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm">
                      <h3 className="text-xl font-light mb-6">Информация</h3>
                      
                      <div className="space-y-4">
                        <div className="flex flex-col">
                          <span className="text-white/50 text-sm mb-1">Режиссёр</span>
                          <span className="text-lg">{project.director}</span>
                        </div>
                        
                        <div className="flex flex-col">
                          <span className="text-white/50 text-sm mb-1">Оператор</span>
                          <span className="text-lg">{project.cinematographer}</span>
                        </div>
                        
                        <div className="flex flex-col">
                          <span className="text-white/50 text-sm mb-1">Продюсер</span>
                          <span className="text-lg">{project.producer}</span>
                        </div>
                        
                        <div className="flex flex-col">
                          <span className="text-white/50 text-sm mb-1">В ролях</span>
                          <span className="text-lg">{project.starring}</span>
                        </div>
                        
                        <div className="flex flex-col">
                          <span className="text-white/50 text-sm mb-1">Год выпуска</span>
                          <span className="text-lg">{project.year}</span>
                        </div>
                        
                        <div className="flex flex-col">
                          <span className="text-white/50 text-sm mb-1">Длительность</span>
                          <span className="text-lg">{project.duration}</span>
                        </div>
                      </div>
                      
                      <div className="mt-8 pt-8 border-t border-white/10">
                        <Link 
                          href="/contact"
                          className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-white/10 hover:bg-white/20 rounded-lg transition-colors group"
                        >
                          <span>Связаться для сотрудничества</span>
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </FadeIn>
                </div>
              </div>
            )}
            
            {/* Галерея */}
            {activeTab === 'gallery' && (
              <FadeIn>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {project.galleryImages && project.galleryImages.map((image, index) => (
                    <motion.div 
                      key={index} 
                      className="aspect-video relative overflow-hidden cursor-pointer rounded-lg gallery-perspective"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        setActiveImage(index);
                        setShowLightbox(true);
                      }}
                    >
                      <Image 
                        src={image} 
                        alt={`${project.title} - кадр ${index + 1}`} 
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-black/50 backdrop-blur-sm p-2 rounded-full">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Лайтбокс для просмотра изображений */}
                <AnimatePresence>
                  {showLightbox && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center gallery-perspective"
                      onClick={() => setShowLightbox(false)}
                    >
                      <button 
                        className="absolute top-6 right-6 p-2 bg-black/40 rounded-full z-10"
                        onClick={() => setShowLightbox(false)}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      
                      <div className="absolute top-1/2 left-6 transform -translate-y-1/2">
                        <button 
                          className="p-2 bg-black/40 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImage((activeImage - 1 + project.galleryImages.length) % project.galleryImages.length);
                          }}
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 19l-7-7 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                      
                      <div className="absolute top-1/2 right-6 transform -translate-y-1/2">
                        <button 
                          className="p-2 bg-black/40 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImage((activeImage + 1) % project.galleryImages.length);
                          }}
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                      
                      <div className="relative w-full h-full max-w-5xl max-h-[80vh] flex items-center justify-center">
                        <motion.div
                          key={activeImage}
                          initial={{ opacity: 0, scale: 0.5, rotateY: -90, z: -200 }}
                          animate={{ opacity: 1, scale: 1, rotateY: 0, z: 0 }}
                          exit={{ opacity: 0, scale: 0.5, rotateY: 90, z: -200 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 150, 
                            damping: 20, 
                            mass: 1.2 
                          }}
                          className="relative w-full h-full gallery-3d-card"
                        >
                          <Image 
                            src={project.galleryImages[activeImage]} 
                            alt={`${project.title} - кадр ${activeImage + 1}`} 
                            fill
                            className="object-contain"
                            style={{ 
                              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                              borderRadius: "8px"
                            }}
                          />
                        </motion.div>
                      </div>
                      
                      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                        <div className="flex gap-2">
                          {project.galleryImages.map((_, index) => (
                            <button 
                              key={index}
                              aria-label={`Показать изображение ${index + 1}`}
                              className={`w-2 h-2 rounded-full ${index === activeImage ? 'bg-white' : 'bg-white/30'}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveImage(index);
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </FadeIn>
            )}
            
            {/* Трейлер */}
            {activeTab === 'trailer' && (
              <FadeIn>
                <div id="trailer" className="aspect-video rounded-xl overflow-hidden relative">
                  <div className="w-full h-full bg-black relative">
                    {trailerLoading && (
                      <div className="absolute inset-0 z-10 bg-black flex flex-col justify-center items-center" style={{boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.3)'}}>
                        {/* CRT Сканлайны */}
                        <div className="absolute inset-0" style={{
                          backgroundImage: 'linear-gradient(0deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent 100%)',
                          backgroundSize: '100% 4px',
                          pointerEvents: 'none',
                          opacity: 0.5,
                          animation: 'scanline 4s linear infinite'
                        }}></div>
                        
                        {/* Шум */}
                        <div className="absolute inset-0" style={{
                          background: 'url("data:image/png;base64,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")',
                          backgroundSize: 'cover',
                          opacity: 0.05,
                          pointerEvents: 'none',
                          animation: 'noise 1s linear infinite, flicker 2s infinite'
                        }}></div>
                        
                        {/* Блик */}
                        <div className="absolute inset-0 pointer-events-none" style={{
                          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1), rgba(0,0,0,0) 60%)'
                        }}></div>
                        
                        {/* Контент */}
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="z-10 text-center"
                        >
                          <motion.h3 
                            className="text-white font-mono text-2xl mb-2 uppercase tracking-widest" 
                            style={{
                              textShadow: '0.05em 0 0 rgba(255, 0, 0, 0.4), -0.05em 0 0 rgba(0, 255, 255, 0.4)'
                            }}
                            animate={{ textShadow: ['0.05em 0 0 rgba(255, 0, 0, 0.4), -0.05em 0 0 rgba(0, 255, 255, 0.4)', '-0.05em 0 0 rgba(255, 0, 0, 0.4), 0.05em 0 0 rgba(0, 255, 255, 0.4)'] }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                          >
                            ЗАГРУЗКА
                          </motion.h3>
                          
                          <p className="text-white/60 font-mono text-sm tracking-wider mb-8">{project.title.toLowerCase()} ({project.year})</p>
                          
                          <div className="w-64 h-px bg-white/20 mb-8 relative overflow-hidden">
                            <motion.div 
                              className="h-full bg-white"
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 2.5, repeat: Infinity }}
                            />
                          </div>
                          
                          <motion.p 
                            className="text-white/50 font-mono text-xs tracking-wider"
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            Воспроизведение...
                          </motion.p>
                        </motion.div>
                      </div>
                    )}
                    
                    {/* Функция для добавления параметров в URL видео */}
                    {(() => {
                      let videoSrc = project.videoUrl;
                      
                      // Добавляем параметры для улучшения плеера если это ВКонтакте
                      if (videoSrc && videoSrc.includes('vk.com')) {
                        if (!videoSrc.includes('?')) {
                          videoSrc += '?';
                        } else if (!videoSrc.endsWith('&') && !videoSrc.endsWith('?')) {
                          videoSrc += '&';
                        }
                        
                        if (!videoSrc.includes('autoplay=')) videoSrc += 'autoplay=1&';
                        if (!videoSrc.includes('mute=')) videoSrc += 'mute=0&';
                        if (!videoSrc.includes('hd=')) videoSrc += 'hd=1&';
                        if (!videoSrc.includes('show_title=')) videoSrc += 'show_title=0&';
                        if (!videoSrc.includes('no_controls=')) videoSrc += 'no_controls=1&';
                        
                        // Удаляем лишний & в конце, если есть
                        if (videoSrc.endsWith('&')) {
                          videoSrc = videoSrc.slice(0, -1);
                        }
                      }
                      
                      return (
                        <iframe 
                          src={videoSrc}
                          width="100%" 
                          height="100%" 
                          frameBorder="0" 
                          allowFullScreen={true}
                          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                          className="w-full h-full rounded-lg"
                          title={`Трейлер фильма ${project.title}`}
                          onLoad={() => {
                            // Имитируем задержку загрузки
                            setTimeout(() => setTrailerLoading(false), 4000);
                          }}
                        ></iframe>
                      );
                    })()}
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff5252] rounded-full hover:bg-[#ff3838] transition-colors duration-300 group"
                  >
                    <span>Организовать показ</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </FadeIn>
            )}
            
            {/* Съемочная группа */}
            {activeTab === 'credits' && (
              <FadeIn>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h2 className="text-2xl font-light mb-8">Основная команда</h2>
                    <ul className="space-y-8">
                      <li className="flex flex-col">
                        <span className="text-white/50 text-sm mb-1">Режиссёр</span>
                        <span className="text-xl">{project.director}</span>
                      </li>
                      <li className="flex flex-col">
                        <span className="text-white/50 text-sm mb-1">Оператор</span>
                        <span className="text-xl">{project.cinematographer}</span>
                      </li>
                      <li className="flex flex-col">
                        <span className="text-white/50 text-sm mb-1">Продюсер</span>
                        <span className="text-xl">{project.producer}</span>
                      </li>
                      <li className="flex flex-col">
                        <span className="text-white/50 text-sm mb-1">В ролях</span>
                        <span className="text-xl">{project.starring}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-light mb-8">Съемочная группа</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {project.filmCrew && project.filmCrew.map((member, index) => (
                        <div key={index} className="flex flex-col">
                          <span className="text-white/50 text-sm mb-1">{member.role}</span>
                          <span className="text-lg">{member.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </section>
      
      {/* Похожие проекты */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-6 md:px-10">
          <div className="mb-10 flex justify-between items-center">
            <h2 className="text-2xl font-light">Другие проекты</h2>
            <Link 
              href="/projects" 
              className="text-sm flex items-center gap-2 group"
            >
              <span>Все проекты</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StaggerContainer delayChildren={0.1} staggerChildren={0.1}>
              {relatedProjects.map((relatedProject, index) => (
                <StaggerItem key={relatedProject.id}>
                  <Link href={`/projects/${relatedProject.id}`}>
                    <motion.div 
                      className="group relative aspect-video rounded-lg overflow-hidden"
                      whileHover={{ y: -5 }}
                    >
                      <Image
                        src={relatedProject.image}
                        alt={relatedProject.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-300"></div>
                      <div className="absolute bottom-0 left-0 w-full p-6">
                        <div className="flex flex-col">
                          <span className="text-sm text-white/75 mb-1">{relatedProject.category}</span>
                          <h3 className="text-xl font-medium group-hover:text-[#ff5252] transition-colors">{relatedProject.title}</h3>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>
    </main>
  );
} 