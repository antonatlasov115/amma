'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

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
      <div className="fixed top-0 left-0 w-screen h-screen -z-10 blur-xl">
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


      <div className=" text-center pb-44 ml-11 mr-11">
              <p className="text-gray-500 font-bold max-w-2xl mx-auto">
              По всем вопросам обращаться: +79246643582 Яна Байгожаева
              </p>
            
          </div>

    </>
  );
}
