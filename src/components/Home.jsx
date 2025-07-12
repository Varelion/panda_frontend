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
      <div className=''>

          <StarringBanner />

      </div>
      <div id="home-body-grid" className="min-w-full min-h-[calc(100vh-70px)] !z-10 absolute top-[70px]  grid-cols-3 grid gap-5 p-8 justify-center items-center"
      >

        <div id='grid-col-1' className='min-h-[20%] min-w-[20%] bg-green-500 self-start'>

        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia dolores quam quasi architecto, veritatis nostrum nisi fuga vel, error necessitatibus, fugiat dolorem excepturi natus sit iste nihil delectus autem recusandae.
        </div>

        <div id='grid-col-2' className='bg-yellow-500 self-end'>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores vero ad et alias in quis, qui optio facere labore dolorum ipsam esse, eos earum at beatae sequi tempora sit iure.
        </div>
        <div id='grid-col-3' className=' max-w-[50vh] flex justify-center items-center flex-col justify-self-end'>
<MesmerizingCarousel  />
        </div>
      </div>
    </div>
  );
}

export default Home;
