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
        <div className=" flex flex-row bg-blue-500 min-w-screen min-h-screen  justify-around items-center">
          {/* Main content container with flex layout */}
          <div className="">
            <div className="buttons mt-8">
              <button className="order-bt" onClick={handleOrderClick} aria-label="Start an Order">
                Start an Order
              </button>
              <button className="try-bt" onClick={handleTryClick} aria-label="Try This Dish">
                Try Dis Bish
              </button>
            </div>
            {/* Left side - Hot Orange Chicken component */}
            <div className="flex-1 flex justify-start"></div>

            {/* <PremiereItemPoster width={'30vw'} aspectRatio={'8 / 12'} className={' '} /> */}
          </div>

          {/* Buttons section */}

          <div className="grow ">
            <MesmerizingCarousel className={'max-w-[30vw] mt-[-4rem] ml-[-4rem]' } />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
