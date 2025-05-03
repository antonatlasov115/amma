'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem, GlitchText, DiagonalReveal } from '../components/AnimateIn';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('studio');
  const [hoverIndex, setHoverIndex] = useState(null);

  // Команда
  const team = [
    {
      name: 'Андрей Соколов',
      position: 'Арт-директор',
      image: '/images/project1.jpg',
      quote: 'Каждый кадр должен рассказывать историю'
    },
    {
      name: 'Мария Волкова',
      position: 'Креативный продюсер',
      image: '/images/project2.jpg',
      quote: 'Творчество без границ и рамок'
    },
    {
      name: 'Сергей Иванов',
      position: 'Оператор',
      image: '/images/project3.jpg',
      quote: 'Свет создаёт атмосферу, камера передаёт эмоции'
    }
  ];

  // Вехи компании
  const milestones = [
    {
      year: '2018',
      title: 'Основание студии',
      description: 'Начало творческого пути команды единомышленников',
      icon: '🚀'
    },
    {
      year: '2019',
      title: 'Первый крупный проект',
      description: 'Реализация документального фильма "Глубина" о подводном мире',
      icon: '🎬'
    },
    {
      year: '2021',
      title: 'Международное признание',
      description: 'Победа на независимом кинофестивале в категории "Лучший короткометражный фильм"',
      icon: '🏆'
    },
    {
      year: '2023',
      title: 'Расширение студии',
      description: 'Открытие нового направления анимационных проектов',
      icon: '✨'
    }
  ];

  // Преимущества студии
  const advantages = [
    {
      title: "Оборудование",
      description: "Используем профессиональное оборудование последнего поколения для создания проектов высочайшего качества",
      icon: "🎥",
      color: "#ff5252"
    },
    {
      title: "Подход",
      description: "Индивидуальный подход к каждому проекту с учетом всех особенностей и требований заказчика",
      icon: "💡",
      color: "#ffeb3b"
    },
    {
      title: "Креативность",
      description: "Не боимся экспериментировать и находить нестандартные решения для воплощения самых смелых идей",
      icon: "🎨",
      color: "#2196f3"
    },
    {
      title: "Сроки",
      description: "Соблюдаем дедлайны и предоставляем результаты в оговоренные сроки",
      icon: "⏱️",
      color: "#4caf50"
    },
    {
      title: "Команда",
      description: "Талантливые профессионалы с богатым опытом работы в киноиндустрии",
      icon: "👥",
      color: "#9c27b0"
    },
    {
      title: "Качество",
      description: "Высокое качество исполнения на всех этапах производства",
      icon: "✅",
      color: "#e91e63"
    }
  ];

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <main className="pt-20 bg-black overflow-hidden">
      {/* Герой-секция */}
      <section className="min-h-[70vh] relative flex items-center py-20">
        <div className="absolute inset-0 min-grid opacity-10"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/70"></div>
          <Image 
            src="/images/project1.jpg" 
            alt="О студии" 
            fill 
            className="object-cover opacity-30 grayscale" 
            priority
          />
        </div>
        
        <div className="te-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
              Создаем <span className="text-[#ff5252]">визуальные истории</span>,<br />которые запоминаются
            </h1>
            <p className="text-sm md:text-base opacity-70 max-w-xl mx-auto mb-8">
              Наша студия объединяет талантливых профессионалов в сфере кинопроизводства, 
              создавая уникальные визуальные проекты, которые находят отклик у зрителей
            </p>
            
            <div className="flex justify-center space-x-5">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-3 h-3 rounded-full bg-[#ff5252]"
              />
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-3 h-3 rounded-full bg-white/20"
              />
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-3 h-3 rounded-full bg-white/20"
              />
            </div>
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
      </section>
      
      {/* Философия */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 min-grid opacity-10"></div>
        <div className="te-container">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <DiagonalReveal className="md:w-1/2" delay={0.3}>
              <div className="aspect-square relative overflow-hidden rounded-lg">
                <Image 
                  src="/images/project1.jpg" 
                  alt="О студии" 
                  fill 
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute bottom-6 left-6 right-6"
                >
                  <blockquote className="text-sm italic opacity-80">
                    "Мы не просто снимаем видео, мы создаем визуальные истории, которые вдохновляют и запоминаются"
                  </blockquote>
                </motion.div>
              </div>
            </DiagonalReveal>
            
            <motion.div 
              className="md:w-1/2" 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-light mb-8 leading-tight">Наша философия</h2>
              <p className="text-sm opacity-70 mb-6 leading-relaxed">
                Мы верим в силу визуального повествования и стремимся создавать 
                проекты, которые не только развлекают, но и заставляют задуматься. 
                Каждая наша работа — это результат тщательного планирования, 
                креативного видения и технического мастерства.
              </p>
              <p className="text-sm opacity-70 mb-8 leading-relaxed">
                Наша цель — создавать уникальный контент, который находит отклик 
                у зрителей и оставляет след в их сердцах и умах.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-white/5 p-4 rounded-lg">
                  <div className="text-xl md:text-2xl font-light mb-2">50+</div>
                  <div className="text-xs uppercase opacity-50">завершенных проектов</div>
                </div>
                <div className="border border-white/5 p-4 rounded-lg">
                  <div className="text-xl md:text-2xl font-light mb-2">12</div>
                  <div className="text-xs uppercase opacity-50">профессиональных наград</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Преимущества */}
      <section className="py-20 bg-zinc-950">
        <div className="te-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-light mb-4">Почему нас выбирают</h2>
            <div className="w-20 h-1 bg-[#ff5252] mx-auto mb-6"></div>
            <p className="text-sm opacity-70 max-w-xl mx-auto">
              Мы сочетаем современные технологии, креативное мышление и многолетний опыт 
              для создания проектов высочайшего качества
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-black/30 p-6 rounded-lg border border-white/5 group"
              >
                <div 
                  className="text-2xl mb-4 w-12 h-12 flex items-center justify-center rounded-full" 
                  style={{ background: `${advantage.color}20` }}
                >
                  {advantage.icon}
                </div>
                <h3 className="text-lg mb-2 group-hover:text-[#ff5252] transition-colors">{advantage.title}</h3>
                <p className="text-sm opacity-70">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Табы с информацией */}
      <section className="py-24 bg-black">
        <div className="te-container">
          {/* Табы */}
          <div className="flex justify-center mb-16">
            <div className="flex gap-2">
              <button 
                className={`px-5 py-2 text-xs uppercase rounded-full transition-all ${activeTab === 'studio' ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'}`}
                onClick={() => setActiveTab('studio')}
              >
                Студия
              </button>
              <button 
                className={`px-5 py-2 text-xs uppercase rounded-full transition-all ${activeTab === 'team' ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'}`}
                onClick={() => setActiveTab('team')}
              >
                Команда
              </button>
              <button 
                className={`px-5 py-2 text-xs uppercase rounded-full transition-all ${activeTab === 'history' ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'}`}
                onClick={() => setActiveTab('history')}
              >
                История
              </button>
            </div>
          </div>
          
          {/* Содержимое табов */}
          <div className="mb-12 min-h-[400px]">
            {/* Студия */}
            {activeTab === 'studio' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-xl mb-6 font-light">Наше пространство</h3>
                    <p className="text-sm opacity-70 mb-6 leading-relaxed">
                      Современная студия площадью более 300 кв.м включает в себя съемочный павильон, 
                      помещение для цветокоррекции, звуковую комнату, монтажную и креативное пространство
                      для встреч с клиентами.
                    </p>
                    <p className="text-sm opacity-70 mb-8 leading-relaxed">
                      Продуманное до мелочей пространство помогает создавать идеальные условия
                      для работы над проектами любой сложности.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#ff5252]"></div>
                        <div className="text-sm">Съемочный павильон 150 кв.м</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#ff5252]"></div>
                        <div className="text-sm">Звукоизолированное помещение</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#ff5252]"></div>
                        <div className="text-sm">3 монтажные станции</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#ff5252]"></div>
                        <div className="text-sm">Гримерная комната</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-square relative rounded-lg overflow-hidden">
                      <Image 
                        src="/images/project1.jpg" 
                        alt="Студия" 
                        fill 
                        className="object-cover hover:scale-105 transition-transform duration-700" 
                      />
                    </div>
                    <div className="aspect-square relative rounded-lg overflow-hidden">
                      <Image 
                        src="/images/project2.jpg" 
                        alt="Студия" 
                        fill 
                        className="object-cover hover:scale-105 transition-transform duration-700" 
                      />
                    </div>
                    <div className="aspect-square relative rounded-lg overflow-hidden">
                      <Image 
                        src="/images/project3.jpg" 
                        alt="Студия" 
                        fill 
                        className="object-cover hover:scale-105 transition-transform duration-700" 
                      />
                    </div>
                    <div className="aspect-square relative rounded-lg overflow-hidden">
                      <Image 
                        src="/images/project1.jpg" 
                        alt="Студия" 
                        fill 
                        className="object-cover hover:scale-105 transition-transform duration-700" 
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Команда */}
            {activeTab === 'team' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-10">
                  <h3 className="text-xl mb-4 font-light">Наша команда</h3>
                  <p className="text-sm opacity-70 max-w-2xl mx-auto">
                    Талантливые профессионалы с многолетним опытом работы в киноиндустрии, 
                    объединенные общей целью - создавать проекты, которые вдохновляют и запоминаются
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {team.map((member, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -10 }}
                      onHoverStart={() => setHoverIndex(index)}
                      onHoverEnd={() => setHoverIndex(null)}
                      className="relative group"
                    >
                      <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
                        <Image 
                          src={member.image} 
                          alt={member.name} 
                          fill 
                          className={`object-cover transition-all duration-700 ${hoverIndex === index ? 'grayscale-0 scale-105' : 'grayscale'}`} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                        
                        <div className={`absolute inset-x-0 bottom-0 p-6 transition-all duration-500 ${hoverIndex === index ? 'opacity-100' : 'opacity-90'}`}>
                          <h3 className="text-lg mb-1">{member.name}</h3>
                          <p className="text-sm opacity-70 mb-3">{member.position}</p>
                          
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: hoverIndex === index ? 1 : 0, y: hoverIndex === index ? 0 : 10 }}
                            transition={{ duration: 0.3 }}
                          >
                            <blockquote className="text-sm italic opacity-80">
                              "{member.quote}"
                            </blockquote>
                          </motion.div>
                        </div>
                      </div>
                      
                      <motion.div 
                        className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#ff5252] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.2 }}
                      >
                        +
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* История */}
            {activeTab === 'history' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-12">
                  <h3 className="text-xl mb-4 font-light">История студии</h3>
                  <p className="text-sm opacity-70 max-w-2xl mx-auto">
                    Наш творческий путь начался в 2018 году и продолжает развиваться, 
                    охватывая новые горизонты и достигая новых высот
                  </p>
                </div>
                
                <div className="relative max-w-3xl mx-auto">
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/10"></div>
                  
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`flex items-start gap-8 mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                    >
                      <div className="flex-1 relative">
                        <div 
                          className={`absolute w-4 h-4 rounded-full bg-[#ff5252] top-2 ${index % 2 === 0 ? 'right-[-30px]' : 'left-[-30px]'}`}
                        ></div>
                        
                        <div className={`text-right ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                          <div className="text-3xl opacity-30 mb-2">{milestone.year}</div>
                          <h4 className="text-lg mb-2">{milestone.title}</h4>
                          <p className="text-sm opacity-70">{milestone.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-4xl opacity-70">{milestone.icon}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
      
      {/* Призыв к действию */}
      <section className="py-24 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/80 z-10"></div>
          <Image 
            src="/images/project3.jpg" 
            alt="Связаться с нами" 
            fill 
            className="object-cover opacity-30 grayscale" 
          />
        </div>
        
        <div className="te-container text-center relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-light mb-6">
              Готовы воплотить вашу идею в жизнь?
            </h2>
            <p className="text-sm opacity-70 mb-10">
              Свяжитесь с нами, чтобы обсудить ваш проект и узнать, как мы можем помочь воплотить его в реальность.
              Первая консультация бесплатна!
            </p>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 82, 82, 0.1)' }}
              className="text-sm px-8 py-3 border border-[#ff5252] rounded-full hover:border-[#ff5252] transition-all"
              onClick={() => window.location.href = '/contact'}
            >
              Связаться с нами
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 