import React, { useState, useEffect } from 'react';
import Header from '../shared/components/layout/Header';
import PremiereItemPoster from '../shared/components/ui/PremiereItemPoster';
import StarringBanner from '../shared/components/feedback/StarringBanner';
import MesmerizingCarousel from '../features/carousel/components/MesmerizingCarousel';
import { MenuModal } from '../features/menu';
import { useSelector, useDispatch } from 'react-redux';
import { setShowMenuModal, selectShowMenuModal } from '../features/ui/uiSlice';

function Home() {
  const showMenuModal = useSelector(selectShowMenuModal); // ✅ read from store
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('showMenu') === 'true') {
      dispatch(setShowMenuModal(true)); // ✅ update Redux state
    }
  }, [dispatch]);

  const handleOrderClick = () => {
    dispatch(setShowMenuModal(true));
  };

  const handleTryClick = () => {
    window.open(import.meta.env.VITE_DISCORD_INVITE_URL, '_blank');
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Background StarringBanner - positioned behind content */}
      <div className="fixed inset-0 z-0">
        <StarringBanner />
      </div>

      {/* Main content container */}
      <div className="relative z-10 pt-20">
        {/* Main content grid - properly centered and responsive */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row-reverse items-start justify-center gap-8">
            {/* Text content column */}
            <div className="flex-1 max-w-2xl">
              <div className="bg-gradient-to-br from-red-50 via-white to-orange-50 backdrop-blur-sm rounded-lg p-6 shadow-xl border border-red-100">
                <div className="text-center mb-4">
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                    Welcome to ...
                    <br />
                    <span className="!text-black">🐼</span>
                    Pandaren Express!
                    <span className="text-black">🥡</span>
                  </h1>
                  <p className="text-lg text-red-700 font-medium">
                    Where Bold Flavors Meet Pandaren Tradition
                  </p>
                  <p className='animate-pulse underline text-lg font-bold'>... And an RP partner comes to you!</p>
                </div>

                <div className="bg-white/70 rounded-lg p-6 mb-2 border border-red-200">
                  <p className="text-gray-700 text-lg leading-relaxed text-center mb-4">
                    Experience the{' '}
                    <span className="font-bold text-red-600">authentic taste of Pandaria</span> with
                    our fresh-wok cooking and time-honored recipes passed down through generations
                    of Pandaren masters.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-4 bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-lg">
                      <h3 className="font-bold text-lg mb-2">🥢 Fresh Wok Cooking</h3>
                      <p className="text-sm">Every dish prepared fresh in our blazing woks</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-orange-500 to-yellow-500 text-white rounded-lg">
                      <h3 className="font-bold text-lg mb-2">🌟 Pandaren Heritage</h3>
                      <p className="text-sm">Traditional recipes from the Wandering Isle</p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                  <p className="text-center text-sm text-gray-600">
                    <strong className="text-red-600">Pandren Express</strong> is a{' '}
                    <strong>fun parody project</strong> celebrating the{' '}
                    <strong>Pandaren race</strong> from World of Warcraft, specially crafted for the
                    <strong className="text-blue-600"> Moon Guard roleplay community</strong>. Not
                    affiliated with Panda Express or Blizzard Entertainment.
                  </p>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full mx-auto">
                  <button
                    onClick={handleOrderClick}
                    className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 max-w-71 min-w-71"
                  >
                    <span className="animate-pulse text-2xl">🥡</span> Plan an order
                  </button>
                  <button
                    onClick={handleTryClick}
                    className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full hover:from-indigo-600 hover:to-purple-710 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 max-w-71 min-w-71"
                  >
                    <span className="animate-pulse text-2xl">💬</span> Join Discord
                  </button>
                </div>
              </div>
            </div>

            {/* Carousel column */}
            <div className="flex-shrink-0 w-full max-w-sm lg:max-w-md">
              <MesmerizingCarousel className="w-full" />
            </div>
          </div>
        </div>

        {/* Additional content section */}

        <div className="container mx-auto px-4 py-16 ">
          <div className="bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-red-200 ">
            <div className="absolute top-0 right-0 rounded-xl bg-white border-2 border-yellow-400 p-4 text-wrap max-w-80 chinese">
              If 10 minutes have elapsed, and you do not receive an in-game confirmation, we might
              not have any delivery pandas available! <br /> <br />⭐ Automated system coming soon!
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-6 text-center">
              🌟 Discover Our Legendary Dishes 🌟
            </h2>

            <p className="text-gray-700 text-lg leading-relaxed text-center max-w-3xl mx-auto">
              From the <span className="font-bold text-red-600">Valley of the Four Winds</span> to
              your table - experience the finest Pandaren culinary creations crafted with{' '}
              <span className="font-bold text-orange-600">ancient wisdom</span> and the freshest
              ingredients. Our master delivery gals bring you a perfect harmony of{' '}
              <span className="font-bold text-red-600">traditional Pandaren flavors</span>   and
              modern wok techniques.
            </p>
            <div className="mt-6 text-center">
              <span className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                🥢 Freshly Wok'd • 🌶️ Bold Flavors • 🐼 Pandaren Approved
              </span>
            </div>
          </div>
        </div>
      </div>

      <MenuModal isOpen={showMenuModal} onClose={() => dispatch(setShowMenuModal(false))} />
    </div>
  );
}

export default Home;
export { Home as HomePage };
