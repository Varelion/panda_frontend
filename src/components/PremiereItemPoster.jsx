import React from 'react';

const PremiereItemPoster = React.memo(function HotOrangeChickenTextOriginalHeight({
  width = '80%', // dynamic width, e.g. '400px', '80vw', etc
  aspectRatio = 8 / 12, // aspect ratio as a number (width / height)
  className = '',
}) {
  // const images_for_carousel = [
  //   'panda-pink',
  //   'panda-arm',
  //   'panda-blue',
  //   'panda-hooters',
  //   'panda-poster',
  //   'panda-red',
  // ];
  return (
    <div
      className={`relative overflow-hidden ${className} mt-[-3rem] rounded-2xl `}
      style={{
        width,
        aspectRatio, // CSS aspect-ratio preserves the ratio dynamically
      }}
    >
      <img src="./assets/panda-pink.webp" alt="Hot Orange Chicken Poster" className="" />

      <div className="absolute inset-0 bg-black/70 z-10 flex flex-col justify-center items-center text-white px-4 text-center hover:opacity-0 transition-all duration-[900ms] ease-in-out animate-pulse hover:animate-none">
        {/* <!-- Glow layer --> */}
        <div className="h-full w-full flex flex-col justify-between items-center">
          <div id="glow-section-1" className="">
            <span class="absolute mx-auto py-4 flex border w-fit bg-gradient-to-r blur-xl from-[#E4002B] via-[#FF6F00] to-[#FFC107] bg-clip-text text-7xl font-extrabold text-transparent text-center select-none ">
              Authentic
            </span>
            <h1 class="relative w-fit h-auto py-4 flex items-center justify-center bg-gradient-to-r from-[#E4002B] via-[#FF6F00] to-[#FFC107] bg-clip-text text-7xl font-extrabold text-transparent text-center">
              Authentic
            </h1>
          </div>

          <div id="glow-section-2" className="">
            <span class="absolute mx-auto py-4 flex border w-fit bg-gradient-to-r blur-xl from-[#E4002B] via-[#FF6F00] to-[#FFC107] bg-clip-text text-7xl font-extrabold text-transparent text-center select-none ">
              Moon guard
            </span>
            <h1 class="relative w-fit h-auto py-4 flex items-center justify-center bg-gradient-to-r from-[#E4002B] via-[#FF6F00] to-[#FFC107] bg-clip-text text-7xl font-extrabold text-transparent text-center">
              Moon guard
            </h1>
          </div>

          <div id="glow-section-3" className="">
            <span class="absolute mx-auto py-4 flex border w-fit bg-gradient-to-r blur-xl from-[#E4002B] via-[#FF6F00] to-[#FFC107] bg-clip-text text-7xl font-extrabold text-transparent text-center select-none ">
              Moon guard
            </span>
            <h1 class="relative w-fit h-auto py-4 flex items-center justify-center bg-gradient-to-r from-[#E4002B] via-[#FF6F00] to-[#FFC107] bg-clip-text text-7xl font-extrabold text-transparent text-center">
              Moon guard
            </h1>
          </div>
        </div>

        <p className="text-xl md:text-2xl mt-2 drop-shadow">The Original, with a Spicy Twist</p>
      </div>
    </div>
  );
});

export default PremiereItemPoster;
