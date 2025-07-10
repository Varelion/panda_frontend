import React, { useState, useEffect } from 'react';

const StarringBanner = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleOrderClick = () => {
    console.log('Start an Order clicked');
  };

  const handleTryClick = () => {
    console.log('Try This Dish clicked');
  };

  const inside = '#e80029'; // thicker
  const outside = '#CC112C'; //thinner
  return (
    <>
      <style>{`
        .hoc-wt {
          position: relative;
          height: 44vw;
          width: 100%;
          text-align: center;
          overflow: hidden;
          background-color: ${outside};
          font-family: "proxima-nova", Arial, sans-serif;
        }

        .hoc-wt img {
          max-width: unset !important;
        }

        .hoc-wt .hoc-burst {
          position: absolute;
          top: -50vw;
          left: -9vw;
          width: 161vw;
        }

        .hoc-wt.anim .hoc-burst {
          animation-name: hoc-burst;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-fill-mode: forwards;
          animation-duration: 25s;
        }

        @keyframes hoc-burst {
          0% {
            transform: rotate(0);
          }
          100% {
            transform: rotate(90deg);
          }
        }

        .hoc-wt .hoc-burst svg {
          width: 100%;
          opacity: 0;
        }

        .hoc-wt.anim .hoc-burst svg {
          animation-name: hoc-burst-img;
          animation-fill-mode: forwards;
          animation-duration: 1s;
        }

        @keyframes hoc-burst-img {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .hoc-wt .hoc-bowl {
          position: absolute;
          top: 4vw;
          left: 48vw;
          width: 46vw;
          z-index: 2;
          opacity: 0;
        }

        .hoc-wt.anim .hoc-bowl {
          animation-name: hoc-bowl;
          animation-fill-mode: forwards;
          animation-duration: 0.5s;
        }

        @keyframes hoc-bowl {
          0% {
            opacity: 0;
            margin-left: 50vw;
          }
          100% {
            opacity: 1;
            margin-left: 0;
          }
        }

        .hoc-wt .wt-content {
          width: 34vw;
          position: absolute;
          left: 7.5vw;
          top: 4.5vw;
          z-index: 10;
        }

        .hoc-wt .wt-content h2 {
          margin: 0;
          padding: 0;
          line-height: 0;
        }

        .hoc-wt .wt-content .wt-copy {
          width: 100%;
          margin: 0;
          position: relative;
          opacity: 0;
        }

        .hoc-wt.anim .wt-content .wt-copy {
          animation-name: slide-up;
          animation-fill-mode: forwards;
          animation-duration: 0.5s;
          animation-delay: 0.4s;
        }

        @keyframes slide-up {
          0% {
            opacity: 0;
            top: 3vw;
          }
          100% {
            opacity: 1;
            top: 0;
          }
        }

        .hoc-wt .wt-content .buttons {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          margin: 2vw 0 0 0;
          grid-gap: 1vw;
          opacity: 0;
          position: relative;
        }

        .hoc-wt.anim .wt-content .buttons {
          animation-name: slide-up;
          animation-fill-mode: forwards;
          animation-delay: 0.8s;
          animation-duration: 0.3s;
        }

        .hoc-wt .wt-content .try-bt,
        .hoc-wt .wt-content .order-bt {
          font-family: "proxima-nova", Arial, sans-serif;
          width: 15vw;
          height: 3.3vw;
          color: #A91B2E !important;
          text-transform: uppercase;
          font-size: 1.2vw;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 0;
          font-weight: bold;
          text-decoration: none !important;
          margin: 0;
          position: relative;
          opacity: 0;
          top: 2vw;
          cursor: pointer;
          border: none;
          background: transparent;
        }

        .hoc-wt .wt-content .try-bt::after,
        .hoc-wt .wt-content .order-bt::after {
          -webkit-transition: all 0.2s;
          -moz-transition: all 0.2s;
          -ms-transition: all 0.2s;
          -o-transition: all 0.2s;
          transition: all 0.2s;
          content: "";
          position: absolute;
          z-index: -1;
          width: 15vw;
          height: 3.3vw;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: #FFF;
          border: 2px solid #FFF;
          border-radius: 0.35vw;
          box-sizing: border-box;
        }

        .hoc-wt .wt-content .try-bt::after {
          background-color: #FFC62D;
          border: 2px solid #FFC62D;
        }

        .hoc-wt .wt-content .try-bt:hover::after,
        .hoc-wt .wt-content .order-bt:hover::after {
          width: 15.4vw;
          height: 3.5vw;
          box-shadow: 0 4px 10px{inside}15);
        }

        .hoc-wt.anim .wt-content .try-bt,
        .hoc-wt.anim .wt-content .order-bt {
          animation-name: slide-up;
          animation-fill-mode: forwards;
          animation-duration: 0.5s;
          animation-delay: 0.6s;
        }

        /* Mobile styles */
        @media only screen and (max-width: 900px) {
          .hoc-wt {
            height: 150vw;
          }

          .hoc-wt .wt-content {
            width: 82vw;
            left: 9vw;
            top: 7vw;
          }

          .hoc-wt.anim .wt-content .wt-copy {
            animation-delay: 0;
          }

          .hoc-wt.anim .wt-content .buttons {
            animation-delay: 0.4s;
          }

          .hoc-wt.anim .hoc-bowl {
            animation-delay: 1s;
          }

          @keyframes slide-up {
            0% {
              opacity: 0;
              top: 5vw;
            }
            100% {
              opacity: 1;
              top: 0;
            }
          }

          .hoc-wt .wt-content .buttons {
            grid-gap: 3vw;
            margin-top: 4vw;
          }

          .hoc-wt .wt-content .try-bt,
          .hoc-wt .wt-content .order-bt {
            width: 40vw;
            height: 9vw;
            font-size: 3.5vw;
            border-radius: 1.25vw;
          }

          .hoc-wt .wt-content .try-bt::after,
          .hoc-wt .wt-content .order-bt::after {
            width: 40vw;
            height: 9vw;
            border-radius: 1.25vw;
          }

          .hoc-wt .wt-content .try-bt:hover::after,
          .hoc-wt .wt-content .order-bt:hover::after {
            width: 40vw;
            height: 9vw;
            box-shadow: none;
          }

          .hoc-wt .hoc-bowl {
            width: 86vw;
            left: 7vw;
            bottom: 0;
            top: unset;
          }

          @keyframes hoc-bowl {
            0% {
              opacity: 0;
              margin-bottom: -10vw;
            }
            100% {
              opacity: 1;
              margin-bottom: 0;
            }
          }

          .hoc-wt .hoc-burst {
            top: unset;
            bottom: -125vw;
            left: -100vw;
            width: 300vw;
          }
        }
      `}</style>

      <div className={`hoc-wt ${isAnimated ? 'anim' : ''}`}>
        <div className="wt-content">
          <h2>
            <div
              className="wt-copy"
              style={{
                background: `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDQwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ3aGl0ZSIvPgo8dGV4dCB4PSIyMDAiIHk9IjI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjQTkxQjJFIj5JdCdzIEJhY2shPC90ZXh0Pgo8dGV4dCB4PSIyMDAiIHk9IjQ1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjQTkxQjJFIj5Ib3QgT3JhbmdlIENoaWNrZW48L3RleHQ+Cjx0ZXh0IHg9IjIwMCIgeT0iNjUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiNBOTFCMkUiPlRoZSBPcmlnaW5hbCwgd2l0aCBhIFNwaWN5IFR3aXN0PC90ZXh0Pgo8L3N2Zz4K') no-repeat center`,
                backgroundSize: 'contain',
                width: '100%',
                height: '6vw',
                display: 'block',
              }}
            />
          </h2>
          <div className="buttons">
            <button className="order-bt" onClick={handleOrderClick} aria-label="Start an Order">
              Start an Order
            </button>
            <button className="try-bt" onClick={handleTryClick} aria-label="Try This Dish">
              Try This Dish
            </button>
          </div>
        </div>

        {/* Bowl of Hot Orange Chicken */}

        {/* Rotating burst of rays */}
        <div className="hoc-burst">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 2586.816 2586.816"
          >
            <g id="Group_3568" data-name="Group 3568" transform="translate(0 0)">
              <path
                id="Path_3082"
                data-name="Path 3082"
                d="M1186.933,0,1252.3,1293.409,1317.672,0Z"
                transform="translate(41.105)"
                fill={inside}
              />
              <path
                id="Path_3083"
                data-name="Path 3083"
                d="M1186.933,2543.522h130.739L1252.3,1250.115Z"
                transform="translate(41.105 43.293)"
                fill={inside}
              />
              <path
                id="Path_3084"
                data-name="Path 3084"
                d="M1250.114,1252.3l1293.407,65.369V1186.934Z"
                transform="translate(43.293 41.105)"
                fill={inside}
              />
              <path
                id="Path_3085"
                data-name="Path 3085"
                d="M0,1317.673,1293.407,1252.3,0,1186.934Z"
                transform="translate(0 41.105)"
                fill={inside}
              />
              <path
                id="Path_3086"
                data-name="Path 3086"
                d="M970.813,30.724,1259.787,1293.13,1099.566,8.022Z"
                transform="translate(33.621 0.278)"
                fill={inside}
              />
              <path
                id="Path_3087"
                data-name="Path 3087"
                d="M1539.089,2512.522,1250.115,1250.116l160.222,1285.109Z"
                transform="translate(43.293 43.293)"
                fill={inside}
              />
              <path
                id="Path_3088"
                data-name="Path 3088"
                d="M2512.522,970.814,1250.115,1259.788l1285.108-160.222Z"
                transform="translate(43.293 33.621)"
                fill={inside}
              />
              <path
                id="Path_3089"
                data-name="Path 3089"
                d="M30.723,1539.09,1293.13,1250.115,8.021,1410.337Z"
                transform="translate(0.278 43.293)"
                fill={inside}
              />
              <path
                id="Path_3090"
                data-name="Path 3090"
                d="M763.179,98.5l503.8,1193.048L886.034,53.783Z"
                transform="translate(26.43 1.863)"
                fill={inside}
              />
              <path
                id="Path_3091"
                data-name="Path 3091"
                d="M1753.914,2443.163l-503.8-1193.048,380.944,1237.763Z"
                transform="translate(43.293 43.293)"
                fill={inside}
              />
              <path
                id="Path_3092"
                data-name="Path 3092"
                d="M2443.163,763.18l-1193.048,503.8L2487.877,886.035Z"
                transform="translate(43.294 26.43)"
                fill={inside}
              />
              <path
                id="Path_3093"
                data-name="Path 3093"
                d="M98.5,1753.914l1193.048-503.8L53.783,1631.059Z"
                transform="translate(1.863 43.294)"
                fill={inside}
              />
              <path
                id="Path_3094"
                data-name="Path 3094"
                d="M570.341,201.263,1273.656,1288.7,683.564,135.894Z"
                transform="translate(19.752 4.706)"
                fill={inside}
              />
              <path
                id="Path_3095"
                data-name="Path 3095"
                d="M1953.431,2337.555,1250.115,1250.116l590.092,1152.808Z"
                transform="translate(43.294 43.293)"
                fill={inside}
              />
              <path
                id="Path_3096"
                data-name="Path 3096"
                d="M2337.554,570.341,1250.115,1273.657,2402.923,683.565Z"
                transform="translate(43.294 19.752)"
                fill={inside}
              />
              <path
                id="Path_3097"
                data-name="Path 3097"
                d="M201.262,1953.431,1288.7,1250.115,135.893,1840.207Z"
                transform="translate(4.706 43.293)"
                fill={inside}
              />
              <path
                id="Path_3098"
                data-name="Path 3098"
                d="M398.157,335.9l881.463,948.789L498.309,251.86Z"
                transform="translate(13.789 8.722)"
                fill={inside}
              />
              <path
                id="Path_3099"
                data-name="Path 3099"
                d="M2131.577,2198.9l-881.462-948.789,781.31,1032.826Z"
                transform="translate(43.293 43.293)"
                fill={inside}
              />
              <path
                id="Path_3100"
                data-name="Path 3100"
                d="M2198.9,398.157,1250.115,1279.62,2282.941,498.31Z"
                transform="translate(43.294 13.789)"
                fill={inside}
              />
              <path
                id="Path_3101"
                data-name="Path 3101"
                d="M335.9,2131.578l948.789-881.462L251.86,2031.426Z"
                transform="translate(8.722 43.293)"
                fill={inside}
              />
              <path
                id="Path_3102"
                data-name="Path 3102"
                d="M251.859,498.309l1032.827,781.31L335.9,398.158Z"
                transform="translate(8.722 13.789)"
                fill={inside}
              />
              <path
                id="Path_3103"
                data-name="Path 3103"
                d="M2282.942,2031.426l-1032.827-781.31L2198.9,2131.577Z"
                transform="translate(43.293 43.293)"
                fill={inside}
              />
              <path
                id="Path_3104"
                data-name="Path 3104"
                d="M2031.425,251.859l-781.31,1032.827L2131.576,335.9Z"
                transform="translate(43.293 8.722)"
                fill={inside}
              />
              <path
                id="Path_3105"
                data-name="Path 3105"
                d="M498.309,2282.942l781.31-1032.827L398.157,2198.9Z"
                transform="translate(13.789 43.293)"
                fill={inside}
              />
              <path
                id="Path_3106"
                data-name="Path 3106"
                d="M135.893,683.565,1288.7,1273.657,201.263,570.342Z"
                transform="translate(4.706 19.752)"
                fill={inside}
              />
              <path
                id="Path_3107"
                data-name="Path 3107"
                d="M2402.924,1840.208,1250.115,1250.115l1087.439,703.316Z"
                transform="translate(43.293 43.294)"
                fill={inside}
              />
              <path
                id="Path_3108"
                data-name="Path 3108"
                d="M1840.207,135.893,1250.114,1288.7,1953.43,201.264Z"
                transform="translate(43.293 4.706)"
                fill={inside}
              />
              <path
                id="Path_3109"
                data-name="Path 3109"
                d="M683.564,2402.924l590.093-1152.809L570.341,2337.554Z"
                transform="translate(19.752 43.293)"
                fill={inside}
              />
              <path
                id="Path_3110"
                data-name="Path 3110"
                d="M53.782,886.034l1237.764,380.944L98.5,763.18Z"
                transform="translate(1.863 26.43)"
                fill={inside}
              />
              <path
                id="Path_3111"
                data-name="Path 3111"
                d="M2487.878,1631.06,1250.115,1250.115l1193.048,503.8Z"
                transform="translate(43.293 43.293)"
                fill={inside}
              />
              <path
                id="Path_3112"
                data-name="Path 3112"
                d="M1631.059,53.782,1250.115,1291.546,1753.913,98.5Z"
                transform="translate(43.294 1.863)"
                fill={inside}
              />
              <path
                id="Path_3113"
                data-name="Path 3113"
                d="M886.034,2487.879l380.944-1237.764-503.8,1193.048Z"
                transform="translate(26.43 43.293)"
                fill={inside}
              />
              <path
                id="Path_3114"
                data-name="Path 3114"
                d="M8.021,1099.566,1293.13,1259.788,30.724,970.814Z"
                transform="translate(0.278 33.621)"
                fill={inside}
              />
              <path
                id="Path_3115"
                data-name="Path 3115"
                d="M2535.224,1410.337,1250.115,1250.115l1262.406,288.975Z"
                transform="translate(43.293 43.294)"
                fill={inside}
              />
              <path
                id="Path_3116"
                data-name="Path 3116"
                d="M1410.336,8.021l-160.222,1285.11L1539.089,30.724Z"
                transform="translate(43.293 0.278)"
                fill={inside}
              />
              <path
                id="Path_3117"
                data-name="Path 3117"
                d="M1099.566,2535.225l160.222-1285.109L970.813,2512.522Z"
                transform="translate(33.621 43.293)"
                fill={inside}
              />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
};

export default StarringBanner;
