import React from 'react';
import Header from '../header';
import PremiereItemPoster from '../premireItemPoster';
import StarringBanner from '../starringBanner';
import MesmerizingCarousel from '../mesmerizingCarousel';

function Home() {
  const handleOrderClick = () => {
    console.log('Start an Order clicked');
  };

  const handleTryClick = () => {
    console.log('Try This Dish clicked');
  };

  return (
    <div className="">
      <Header />
      {/* Container with StarringBanner as background */}
      <div className="">
        <StarringBanner />
      </div>
      <div
        id="home-body-grid"
        className=" !z-10 absolute top-[70px] min-h-[85vh] flex flex-row gap-5 m-4 justify-center items-center overflow-y-auto"
      >
        <div id="grid-col-1" className="min-h-[20%] min-w-[20%] bg-green-500 self-start ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia dolores quam quasi
          architecto, veritatis nostrum nisi fuga vel, error necessitatibus, fugiat dolorem
          excepturi natus sit iste nihil delectus autem recusandae.
        </div>

        <div id="grid-col-2" className="bg-yellow-500 self-end min-w- !grow ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores vero ad et alias in
          quis, qui optio facere labore dolorum ipsam esse, eos earum at beatae sequi tempora sit
          iure.
        </div>
        <div id="grid-col-3" className="max-w-[50vh]  justify-self-end shrin-0">
          {/* <MesmerizingCarousel  /> */}
          <div id="placeholder" className="bg-green-500 min-w-[100%] min-h-[100%]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi quas autem ducimus
            sint suscipit, quasi recusandae cumque aliquam illo consequuntur blanditiis, voluptatum
            culpa iure nulla veritatis illum? Ipsa, labore neque?
          </div>
        </div>
      </div>
      // TODO: Find out why this div under here isn't being rendered -- it's stuck behind{' '}
      <StarringBanner />
      {/* <div className=" !z-10 overflow-y-auto bg-orange-500"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat est iure cumque? Impedit quos quae sunt pariatur assumenda temporibus natus culpa illum numquam error. Consectetur unde iure eos repellat soluta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat est iure cumque? Impedit quos quae sunt pariatur assumenda temporibus natus culpa illum numquam error. Consectetur unde iure eos repellat soluta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat est iure cumque? Impedit quos quae sunt pariatur assumenda temporibus natus culpa illum numquam error. Consectetur unde iure eos repellat soluta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat est iure cumque? Impedit quos quae sunt pariatur assumenda temporibus natus culpa illum numquam error. Consectetur unde iure eos repellat soluta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat est iure cumque? Impedit quos quae sunt pariatur assumenda temporibus natus culpa illum numquam error. Consectetur unde iure eos repellat soluta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat est iure cumque? Impedit quos quae sunt pariatur assumenda temporibus natus culpa illum numquam error. Consectetur unde iure eos repellat soluta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat est iure cumque? Impedit quos quae sunt pariatur assumenda temporibus natus culpa illum numquam error. Consectetur unde iure eos repellat soluta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat est iure cumque? Impedit quos quae sunt pariatur assumenda temporibus natus culpa illum numquam error. Consectetur unde iure eos repellat soluta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat est iure cumque? Impedit quos quae sunt pariatur assumenda temporibus natus culpa illum numquam error. Consectetur unde iure eos repellat soluta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat est iure cumque? Impedit quos quae sunt pariatur assumenda temporibus natus culpa illum numquam error. Consectetur unde iure eos repellat soluta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat est iure cumque? Impedit quos quae sunt pariatur assumenda temporibus natus culpa illum numquam error. Consectetur unde iure eos repellat soluta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat est iure cumque? Impedit quos quae sunt pariatur assumenda temporibus natus culpa illum numquam error. Consectetur unde iure eos repellat soluta. </div> */}
    </div>
  );
}

export default Home;
