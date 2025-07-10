import React from 'react';
import Header from './Header';
import PremiereItemPoster from './PremiereItemPoster';
import StarringBanner from './StarringBanner';
import MesmerizingCarousel from './MesmerizingCarousel';

function Home() {
  const handleOrderClick = () => {
    console.log('Start an Order clicked');
  };

  const handleTryClick = () => {
    console.log('Try This Dish clicked');
  };

  return (
    <div className="overflow-hidden">
      <Header />

      {/* Container with StarringBanner as background */}
      <div className="relative min-h-screen">
        {/* StarringBanner as background */}
        <div className="absolute inset-0 ">
          <StarringBanner />
        </div>

        {/* Overlay content */}
        <div className="relative z-10 wt-content">
          {/* Main content container with flex layout */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 w-full">
            {/* Left side - Hot Orange Chicken component */}
            <div className="flex-1 flex justify-start"></div>

            <PremiereItemPoster />
            <MesmerizingCarousel />

            {/* Right side - Mesmerizing Carousel */}
            <div className="flex-1 flex justify-end">
              <div className=""></div>
            </div>
          </div>

          {/* Buttons section */}
          <div className="buttons mt-8">
            <button className="order-bt" onClick={handleOrderClick} aria-label="Start an Order">
              Start an Order
            </button>
            <button className="try-bt" onClick={handleTryClick} aria-label="Try This Dish">
              Try Dis Bish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
