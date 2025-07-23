import React from 'react';
import Header from '../shared/components/layout/Header';

function AboutPage() {
  return (
    <div className="bg-white">
      <Header />
      <main className="pt-0 overflow-x-hidden">
        {/* Inline CSS styles */}
        <style jsx>{`
          body {
            overflow-y: auto !important;
            height: auto !important;
          }

          .panda-rewards {
            overflow-y: visible;
            height: auto;
          }

          .panda-rewards .panda-rewards-illustration-section {
            width: 100%;
            position: relative;
            overflow: hidden;
            /* Hero section background color - change this for different background */
          }

          .panda-rewards .panda-rewards-illustration-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: url(https://s3.amazonaws.com/PandaExpressWebsite/www/pr-2022-benefits-bg-pattern.svg);
            background-size: 5.5vw;
            background-repeat: repeat;
            /* SVG pattern color filter - change hue for different pattern color */
            /* Current: converts red to black while preserving transparency */
            filter: hue-rotate(180deg) saturate(0) brightness(0.3);
            z-index: 1;
          }

          .panda-rewards .pr-intro {
            z-index: 2;
            margin: 0 auto;
            text-align: center;
            max-width: 50vw;
          }

          .panda-rewards .pr-intro h1 {
            font-family: 'proxima-nova', Arial, sans-serif;
            font-style: normal;
            font-weight: 700;
            text-transform: uppercase;
            /* Main title color - change this for different title color */
            color: #d1282e;
            margin: 0 0 2vw 0;
            font-size: 3.42vw;
            line-height: 2.9vw;
          }

          .panda-rewards .pr-intro p {
            font-family: 'proxima-nova', Arial, sans-serif;
            font-style: normal;
            font-weight: 700;
            color: #000000;
            margin: 1vw 0 2.25vw 0;
            font-size: 1.28vw;
            line-height: 1.6vw;
          }

          .panda-rewards .pr-intro .button-red {
            /* Button background color - change this for different button color */
            background: #d1282e;
            border-radius: 8px;
            font-family: 'proxima-nova', Arial, sans-serif;
            font-style: normal;
            font-weight: 700;
            text-align: center;
            text-transform: uppercase;
            display: inline-block;
            text-decoration: none;
            /* Button text color - change this for different button text color */
            color: #fff;
            border-radius: 0.46vw;
            font-size: 1.1vw;
            min-width: 13.2vw;
            height: 3.2vw;
            line-height: 3.1vw;
          }

          .panda-rewards .pr-member-benefits {
            /* Red section background color - change this for different red section color */
            background-color: #d1282e;
            width: 100%;
            background-image: url(https://s3.amazonaws.com/PandaExpressWebsite/www/pr-2022-benefits-bg-pattern.svg);
            background-size: 5.5vw;
            background-repeat: repeat;
            /* No filter here - keeps original red SVG pattern */
            padding: 2vw 0;
            text-align: center;
          }

          .panda-rewards .pr-feature-grid {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2vw;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2vw;
            margin-top: 3vw;
          }

          .panda-rewards .pr-feature-card {
            background-color: #fff;
            border-radius: 0.5vw;
            padding: 2vw;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .panda-rewards .pr-feature-card h3 {
            font-family: 'proxima-nova', Arial, sans-serif;
            font-weight: 700;
            /* Feature card title color - change this for different card title color */
            color: #d1282e;
            font-size: 1.5vw;
            margin: 1vw 0;
            text-transform: uppercase;
          }

          .panda-rewards .pr-feature-card p {
            font-family: 'proxima-nova', Arial, sans-serif;
            font-weight: 500;
            color: #000;
            font-size: 1.1vw;
            line-height: 1.4vw;
          }

          .panda-rewards .pr-feature-icon {
            font-size: 4vw;
            margin-bottom: 1vw;
          }

          @media only screen and (min-width: 1400px) {
            .panda-rewards .pr-intro h1 {
              font-size: 48px;
              line-height: 41px;
            }

            .panda-rewards .pr-intro p {
              font-size: 18px;
              line-height: 22px;
              margin: 14px 0 32px 0;
            }

            .panda-rewards .pr-intro .button-red {
              min-width: 185px;
              height: 45px;
              border-radius: 6px;
              font-size: 16px;
              line-height: 45px;
            }

            .panda-rewards .pr-intro {
              max-width: 700px;
            }

            .panda-rewards .panda-rewards-illustration-section {
              padding: 56px 0;
            }

            .panda-rewards .pr-member-benefits {
              padding: 28px 0;
              background-size: 75px;
            }

            .panda-rewards .pr-feature-grid {
              gap: 28px;
              margin-top: 42px;
            }

            .panda-rewards .pr-feature-card {
              padding: 28px;
              border-radius: 8px;
            }

            .panda-rewards .pr-feature-card h3 {
              font-size: 21px;
              margin: 14px 0;
            }

            .panda-rewards .pr-feature-card p {
              font-size: 16px;
              line-height: 20px;
            }

            .panda-rewards .pr-feature-icon {
              font-size: 56px;
              margin-bottom: 14px;
            }
          }

          @media only screen and (max-width: 900px) {
            .panda-rewards .pr-intro {
              max-width: 90vw;
            }

            .panda-rewards .pr-intro h1 {
              font-size: 12vw;
              line-height: 12vw;
              margin-bottom: 4vw;
            }

            .panda-rewards .pr-intro p {
              font-size: 4.6vw;
              line-height: 5.4vw;
              margin: 2vw 0 6vw 0;
            }

            .panda-rewards .pr-intro .button-red {
              min-width: 70vw;
              height: auto;
              border-radius: 2vw;
              font-size: 4.2vw;
              line-height: 100%;
              padding: 4vw 0;
            }

            .panda-rewards .panda-rewards-illustration-section {
              padding: 8vw 0;
              margin-top: 0;
            }

            .panda-rewards .pr-member-benefits {
              padding: 8vw 0;
              background-size: 20vw;
            }

            .panda-rewards .pr-feature-grid {
              grid-template-columns: 1fr;
              gap: 6vw;
              margin-top: 8vw;
            }

            .panda-rewards .pr-feature-card {
              padding: 6vw;
              border-radius: 2vw;
            }

            .panda-rewards .pr-feature-card h3 {
              font-size: 6vw;
              margin: 4vw 0 2vw 0;
            }

            .panda-rewards .pr-feature-card p {
              font-size: 4.2vw;
              line-height: 5.5vw;
            }

            .panda-rewards .pr-feature-icon {
              font-size: 15vw;
              margin-bottom: 4vw;
            }
          }
        `}</style>

        <div className="panda-rewards">
          {/* Hero Illustration Section */}
          <div className="panda-rewards-illustration-section" id="black-and-white-design-here">
            <div className="relative py-40">
              {' '}
              <div className="pr-intro absolute  left-1/2 translate-x-[-50%] bg-white p-10 rounded-lg border-yellow-400 border-2  ">
                <h1>PANDREN EXPRESS!</h1>
                <p>
                  Experience the most <strong>epic</strong> roleplay dining adventure in Azeroth!
                  Where <strong>delicious Pandaren cuisine</strong> meets{' '}
                  <strong>immersive storytelling</strong>, bringing you the finest feast in
                  Stormwind. With Pandren Express, <strong>Great Adventures Await</strong>.
                </p>
                <a className="button-red !bg-red-500" href="/?showMenu=true">
                  Order Now
                </a>
              </div>
            </div>
          </div>

          {/* About Us Section */}
          <div className="pr-member-benefits">
            <h2 className="text-center text-white text-4xl font-bold mb-8">
              About Pandren Express
            </h2>
            <div className="max-w-6xl mx-auto text-center text-white px-8">
              <p className="text-xl leading-relaxed mb-6">
                <strong>Pandren Express</strong> is a <strong>fun parody website</strong> inspired
                by the beloved Panda Express restaurant, specially created for the
                <strong> World of Warcraft roleplay community</strong> on{' '}
                <strong>Moon Guard</strong> server.
              </p>
              <p className="text-xl leading-relaxed mb-6">
                We're celebrating the <strong>Pandaren race</strong> from World of Warcraft with a
                <strong> themed food delivery experience</strong> that brings together two things we
                love:
                <strong> great in-game cuisine</strong> and <strong>immersive roleplay!</strong>
              </p>
              <p className="text-xl leading-relaxed mb-8">
                This is a <strong>parody and fan project</strong> - we're not affiliated with Panda
                Express or Blizzard Entertainment. We're just passionate{' '}
                <strong>WoW players</strong> who wanted to create something{' '}
                <strong>fun and unique</strong> for our roleplay community!
              </p>
              <div className="bg-black bg-opacity-30 p-6 rounded-lg">
                <p className="text-2xl font-bold text-yellow-300">
                  "Bringing Pandaren Spirit to Your Doorstep!"
                </p>
              </div>
            </div>

            {/* Feature Grid */}
            <div className="pr-feature-grid">
              <div className="pr-feature-card">
                <div className="pr-feature-icon">🎭</div>
                <h3>Immersive Roleplay</h3>
                <p>
                  Blending fantasy with delicious reality for the ultimate Moon Guard experience!
                </p>
              </div>

              <div className="pr-feature-card">
                <div className="pr-feature-icon">🐼</div>
                <h3>Pandaren Themed</h3>
                <p>
                  Celebrating the beloved Pandaren race with authentic Chinese cuisine delivery!
                </p>
              </div>

              <div className="pr-feature-card">
                <div className="pr-feature-icon">🏰</div>
                <h3>Moon Guard Focused</h3>
                <p>Specially designed for our amazing roleplay server community!</p>
              </div>

              <div className="pr-feature-card">
                <div className="pr-feature-icon">🍜</div>
                <h3>Authentic Flavors</h3>
                <p>Enjoy traditional Pandaren recipes and exotic in-game delicacies!</p>
              </div>

              <div className="pr-feature-card">
                <div className="pr-feature-icon">🚚</div>
                <h3>Fast Delivery</h3>
                <p>Quicker than a rogue's stealth ability - hot food to your location!</p>
              </div>

              <div className="pr-feature-card">
                <div className="pr-feature-icon">🎪</div>
                <h3>Fun & Creative</h3>
                <p>Bringing whimsy and innovation to your gaming and dining experience!</p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-white p-8 text-center">
            <div className="max-w-4xl mx-auto">
              <p className="text-sm text-gray-600 leading-relaxed">
                <span className="font-bold">Parody Notice:</span> Pandren Express is a loving parody
                created for the World of Warcraft roleplay community. We are not affiliated with
                Panda Express, Blizzard Entertainment, or any official entities. This is a fan-made
                project designed to bring joy and creativity to the
                <span className="text-purple-600 font-bold"> Moon Guard</span> server. All
                trademarks belong to their respective owners.
                <span className="text-green-600 font-bold">
                  {' '}
                  For the fun! For the community! For the food!
                </span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AboutPage;
