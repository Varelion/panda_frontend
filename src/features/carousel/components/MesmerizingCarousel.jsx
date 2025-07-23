import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const MesmerizingCarousel = ({ className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Get images from Redux store
  const images = useSelector((state) => state.mesmerizingCarousel.image_array);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };


  // SVG Heart Component
  const FlutteringHeart = ({ delay = 0, duration = 3, size = 16 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className="absolute text-pink-500 animate-pulse"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        transform: `rotate(${Math.random() * 360}deg)`,
      }}
    >
      <path
        fill="currentColor"
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      />
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0; 2,-2; -1,1; 1,-1; 0,0"
        dur={`${duration}s`}
        repeatCount="indefinite"
        begin={`${delay}s`}
      />
    </svg>
  );

  // SVG Sparkle Component
  const SparklingDust = ({ delay = 0, duration = 2, size = 12 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className="absolute text-pink-300 opacity-70"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
      }}
    >
      <path
        fill="currentColor"
        d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2L12 17.4l-6 3.8 2.4-7.2-6-4.8h7.6z"
      />
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0; 0,100; 0,200"
        dur={`${duration}s`}
        repeatCount="indefinite"
        begin={`${delay}s`}
      />
      <animate
        attributeName="opacity"
        values="0;1;0"
        dur={`${duration}s`}
        repeatCount="indefinite"
        begin={`${delay}s`}
      />
    </svg>
  );

  return (
    <div className={`${className} relative`}>
      {/* Mesmerizing Background Effects */}
      <div className="absolute inset-0 -m-20 overflow-hidden pointer-events-none">
        {/* Floating fireflies */}
        {[...Array(25)].map((_, i) => (
          <div
            key={`firefly-${i}`}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-pulse shadow-lg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              boxShadow: '0 0 8px #fef08a, 0 0 16px #fef08a, 0 0 24px rgba(254, 240, 138, 0.5)',
            }}
          />
        ))}

        {/* Falling sparkling dust */}
        {[...Array(30)].map((_, i) => (
          <SparklingDust
            key={`dust-${i}`}
            delay={Math.random() * 3}
            duration={3 + Math.random() * 2}
            size={8 + Math.random() * 8}
          />
        ))}

        {/* Floating SVG hearts */}
        {[...Array(15)].map((_, i) => (
          <FlutteringHeart
            key={`bg-heart-${i}`}
            delay={Math.random() * 5}
            duration={3 + Math.random() * 2}
            size={12 + Math.random() * 8}
          />
        ))}
      </div>

      {/* Main carousel container */}
      <div
        className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-[var(--panda-secondary)]"
        style={{
          aspectRatio: '8/12',
          background: 'linear-gradient(135deg, #fce7f3, #fbcfe8, #f9a8d4, #f472b6)',
        }}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Mesmerizing glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 via-rose-200/30 to-red-200/30 animate-pulse"></div>

        {/* Animated border glow */}
        <div
          className="absolute inset-0 rounded-3xl animate-pulse"
          style={{
            background: 'linear-gradient(45deg, transparent, rgba(236, 72, 153, 0.3), transparent)',
            animation: 'borderGlow 3s ease-in-out infinite',
          }}
        ></div>

        {/* Image container with enhanced 3D effect */}
        <div className="relative w-full h-full perspective-1000">
          {images.map((image, index) => {
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + images.length) % images.length;
            const isNext = index === (currentIndex + 1) % images.length;

            let transformClass = 'translate-x-full opacity-0 scale-75 rotate-y-45';
            if (isActive) {
              transformClass = 'translate-x-0 opacity-100 scale-100 rotate-y-0';
            } else if (isPrev) {
              transformClass = '-translate-x-full opacity-40 scale-80 -rotate-y-45';
            } else if (isNext) {
              transformClass = 'translate-x-full opacity-40 scale-80 rotate-y-45';
            }

            return (
              <div
                key={image.uuid}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${transformClass}`}
              >
                <img
                  src={image.src}
                  alt={image.name}
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />

                {/* Active image overlay effects */}
                {isActive && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
                    {/* Fluttering SVG hearts */}
                    {[...Array(12)].map((_, i) => (
                      <FlutteringHeart
                        key={`active-heart-${i}`}
                        delay={Math.random() * 2}
                        duration={2 + Math.random() * 2}
                        size={14 + Math.random() * 6}
                      />
                    ))}

                    {/* Sparkling dust overlay */}
                    {[...Array(20)].map((_, i) => (
                      <SparklingDust
                        key={`active-dust-${i}`}
                        delay={Math.random() * 3}
                        duration={2 + Math.random() * 2}
                        size={6 + Math.random() * 6}
                      />
                    ))}

                    {/* Magical shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-200/20 to-transparent animate-pulse"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Enhanced navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl z-10 border-2 border-pink-200 backdrop-blur-sm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-rose-500 to-red-500 text-white flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl z-10 border-2 border-pink-200 backdrop-blur-sm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Corner accent SVG hearts */}
        <div className="absolute -top-2 -left-2">
          <FlutteringHeart size={20} delay={0} duration={2} />
        </div>
        <div className="absolute -top-2 -right-2">
          <FlutteringHeart size={20} delay={0.5} duration={2.5} />
        </div>
        <div className="absolute -bottom-2 -left-2">
          <FlutteringHeart size={20} delay={1} duration={2} />
        </div>
        <div className="absolute -bottom-2 -right-2">
          <FlutteringHeart size={20} delay={1.5} duration={2.5} />
        </div>
      </div>

      {/* Enhanced indicators */}
      <div className="flex justify-center mt-6 space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
              index === currentIndex
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 scale-125 shadow-lg border-pink-300'
                : 'bg-pink-200 hover:bg-pink-300 border-pink-300'
            }`}
          />
        ))}
      </div>

      {/* Floating accent elements */}
      <div className="absolute -top-6 -right-6 w-10 h-10 rounded-full animate-bounce flex items-center justify-center text-lg">
        <FlutteringHeart size={16} delay={0.5} duration={1.5} />
      </div>
      <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-gradient-to-r from-rose-500 to-red-500 rounded-full animate-pulse opacity-70 flex items-center justify-center text-white backdrop-blur-sm">
        <FlutteringHeart size={12} delay={0.5} duration={2} />
      </div>

      {/* Additional mesmerizing elements */}
      <div className="absolute top-1/4 -left-8 opacity-60">
        <SparklingDust size={24} delay={0} duration={3} />
      </div>
      <div className="absolute bottom-1/4 -right-8 opacity-60">
        <SparklingDust size={20} delay={1} duration={2.5} />
      </div>

      <style jsx>{`
        @keyframes borderGlow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .rotate-y-45 {
          transform: rotateY(45deg);
        }

        .-rotate-y-45 {
          transform: rotateY(-45deg);
        }

        .rotate-y-0 {
          transform: rotateY(0deg);
        }
      `}</style>
    </div>
  );
};

export default MesmerizingCarousel;
