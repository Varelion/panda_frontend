import React, { useState, useEffect } from 'react';

const MesmerizingCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const images = [
    { src: './assets/panda-pink.webp', alt: 'Panda Pink Special' },
    { src: './assets/panda-arm.webp', alt: 'Panda Arm Dish' },
    { src: './assets/panda-blue.webp', alt: 'Panda Blue Delight' },
    { src: './assets/panda-hooters.webp', alt: 'Panda Hooters Style' },
    { src: './assets/panda-poster.webp', alt: 'Panda Poster' },
    { src: './assets/panda-red.webp', alt: 'Panda Red Creation' },
  ];

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

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main carousel container */}
      <div
        className="relative overflow-hidden rounded-3xl shadow-2xl"
        style={{ aspectRatio: '16/10' }}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E4002B] via-[#FF6F00] to-[#FFC107] opacity-20 animate-pulse"></div>

        {/* Image container with 3D transform effect */}
        <div className="relative w-full h-full perspective-1000">
          {images.map((image, index) => {
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + images.length) % images.length;
            const isNext = index === (currentIndex + 1) % images.length;

            let transformClass = 'translate-x-full opacity-0 scale-75';
            if (isActive) {
              transformClass = 'translate-x-0 opacity-100 scale-100';
            } else if (isPrev) {
              transformClass = '-translate-x-full opacity-30 scale-75';
            } else if (isNext) {
              transformClass = 'translate-x-full opacity-30 scale-75';
            }

            return (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${transformClass}`}
                style={{
                  filter: isActive ? 'brightness(1.1) saturate(1.2)' : 'brightness(0.8) saturate(0.8)',
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />

                {/* Overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                {/* Animated particles overlay */}
                {isActive && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-gradient-to-r from-[#E4002B] to-[#FFC107] rounded-full animate-pulse"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 2}s`,
                          animationDuration: `${2 + Math.random() * 2}s`,
                        }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-[#E4002B] to-[#FF6F00] text-white flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-[#FF6F00] to-[#FFC107] text-white flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Pulsing border effect */}
        <div className="absolute inset-0 rounded-3xl border-4 border-transparent bg-gradient-to-r from-[#E4002B] via-[#FF6F00] to-[#FFC107] opacity-30 animate-pulse pointer-events-none"></div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-6 space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-gradient-to-r from-[#E4002B] to-[#FFC107] scale-125 shadow-lg'
                : 'bg-gray-400 hover:bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-4 w-full bg-gray-300 rounded-full h-1 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#E4002B] via-[#FF6F00] to-[#FFC107] transition-all duration-300 ease-out"
          style={{
            width: `${((currentIndex + 1) / images.length) * 100}%`,
          }}
        />
      </div>

      {/* Floating accent elements */}
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-[#E4002B] to-[#FF6F00] rounded-full animate-bounce opacity-60"></div>
      <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-[#FF6F00] to-[#FFC107] rounded-full animate-pulse opacity-60"></div>
    </div>
  );
};

export default MesmerizingCarousel;
