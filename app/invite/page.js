'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import MovieCard from '../components/MovieCard';
import { FadeIn, StaggerContainer, StaggerItem, GlitchText, SlideIn } from '../components/AnimateIn';


export default function Home() {
  const [isFlipped, setIsFlipped] = useState(false);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {}); // Безопасный запуск
    }
  }, []);
  
  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };
  
  const VideoBackground = () => {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen -z-10 blur-3xl">
          <Image
            src="/images/kuku2.jpg"
            layout="fill"
            objectFit="cover"
            quality={100}
        />
      </div>
    );
  };

  return (
    <>
  <VideoBackground />
      <div className="min-h-screen flex items-center justify-center " >
        <div
          className="w-[350px] h-[350px] [perspective:1200px] "
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div
            className={`relative w-full h-full transition-transform duration-1000 ease-in-out [transform-style:preserve-3d] ${
              isFlipped ? '[transform:rotateY(190deg)]' : ''
            }`}
          >
          {/* Front */}
          <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(0deg)] z-30  overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] group-hover:scale-[1.02] transition-transform duration-300">
              <div className="relative w-full h-full bg-white">
                <div className="absolute inset-0 border-[14px] border-white z-10 pointer-events-none " />
                <Image
                  src="/CUCU.gif"
                  alt="Front side"
                  fill
                  className="object-cover"
                  priority
                />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-white flex items-center justify-center z-20 [backface-visibility:hidden] overflow-hidden">
                <h1 className="text-amber-600 text-2xl font-bold font-mono tracking-wide">
                  нажми
                </h1>
              </div>
              </div>
            </div>

          {/* Back */}
          <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] z-20 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] group-hover:scale-[1.02] transition-transform duration-300">
            <div className="relative w-full h-full">
              <Image
                src="/back.png"
                alt="Back side"
                fill
                className=" brightness-100"
                priority
              />

            </div>
            </div>
   
          </div>

        </div>

      </div>

                        
      {/* Новая секция с трейлером Кукушки */}
            <section className="relative overflow-hidden">
              <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                      <span className="inline-block text-xs uppercase tracking-widest text-white/70 mb-3 border border-white/20 px-3 py-1 rounded-full">Премьера</span>
                      <h2 className="text-3xl md:text-4xl font-bold mb-4">Трейлер фильма "Кукушка"</h2>
                    </div>
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
                    </div>
                </div>
              </div>
            </section>


      <div className=" text-center pb-44 ml-11 mr-11">


      <p className="text-left text-white max-w-2xl mx-auto">Слоган: Күрэнэргэ тиэтэйимэ. Олох-бэлэх. Не спеши уходить. Жизнь - дар.  
</p>
      <p className="text-left text-white max-w-2xl mx-auto">Режиссер-постановщик: Евгений Николаев</p>
      <p className="text-left text-white max-w-2xl mx-auto">Генеральный продюсер: Анатолий Сергеев</p>
      <p className="text-left text-white max-w-2xl mx-auto">Жанр: Мистическая драма</p>
      <p className="text-left text-white max-w-2xl mx-auto">Хронометраж: 97 минут</p>
      <p className="text-left text-white max-w-2xl mx-auto">Страна: Россия</p>
      <p className="text-left text-white max-w-2xl mx-auto">Язык: Якутский, субтитры на русском языке</p>
      <p className="text-left text-white max-w-2xl mx-auto">Создатели фильма: «Кинологистика» и киностудия «AmmA»
      Дистрибьютер в РФ: «Кинологистика»</p>
      <h2 className="text-left text-white font-bold max-w-2xl mx-auto">Синопсис:</h2>
              <p className="text-left text-white max-w-2xl mx-auto">
              После долгого отсутствия, в поисках себя и ответов на вопросы, мучавших его на протяжении многих лет, Аркадий возвращается в родительский дом, где он жил с семьей до их трагической гибели. Он окунается в воспоминания о том ужасном событии, перевернувшем и разделившем его жизнь на До и После.
Вскоре, Аркадий обращает внимание на странного и нелюдимого соседа, который, как он выясняет позже, скрывает страшную тайну…              </p>

            <p className="text-left text-white max-w-2xl mx-auto">Это метафоричный фильм, талантливо облаченный в эстетику черно-белого кино. Грустная история о несбывшейся любви и сложных перипетиях поиска себя и своей идентичности, своих корней, восстановления утраченной связи с предками и родной землей, рассказана языком образов и символов, основанных на традиционном веровании народа саха. Согласно вере наших предков, жизнь воспринималась, как благословенный Дар свыше, а добровольный уход из жизни считался большим грехом - «аньыы», который мог иметь самые непредсказуемые и ужасающие последствия.
Евгений Николаев, якутский режиссер и актер (именно он сыграл одну из главных ролей в фильме «Чума» Дмитрия Давыдова) создал «Кукушку» на основе своего же одноименного короткого метра.
</p>

<p className="text-left text-white max-w-2xl mx-auto">
В 2023 году на фестивале «Горький fest» за свою «короткометражку» он получил сразу две награды – за лучшее изобразительное решение и лучшую режиссуру, а на фестивале «Дух огня» режиссер был отмечен за лучший дебютный короткометражный фильм.
Полнометражная «Кукушка» начала свое шествие с Международного фестиваля «Зеркало», где получила специальный приз жюри с формулировкой «Впечатляющий дебют, который бросает вызов зрителю». Международный кинофестиваль дебютов Евразии «Одна шестая» в Екатеринбурге отметил картину призом «За лучшую операторскую работу».

</p>
          </div>

    </>
  );
}
