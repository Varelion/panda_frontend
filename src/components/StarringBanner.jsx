import React, { useState, useEffect } from 'react';

import MesmerizingCarousel from './MesmerizingCarousel';
import './starring-banner.css'; // External CSS file

const StarringBanner = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  const inside = '#e80029'; // thicker
  return (
    <>
      <div className={`  hoc-wt ${isAnimated ? 'anim' : ''}`}>
        {/* Rotating burst of rays */}
        <div id="background_image" className="hoc-burst">
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
