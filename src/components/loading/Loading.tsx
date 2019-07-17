import React from 'react';
import s from './Loading.scss';

function Loading() {
  return (
    <div className={s.mask}>
      <svg
        width="96px"
        height="96px"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          strokeLinecap="round"
          r="40"
          strokeWidth="4"
          stroke="#f7a9b5"
          strokeDasharray="62.83185307179586 62.83185307179586"
          transform="rotate(253.819 50 50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="linear"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1.7s"
            begin="0s"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx="50"
          cy="50"
          fill="none"
          strokeLinecap="round"
          r="35"
          strokeWidth="4"
          stroke="#ffe2aa"
          strokeDasharray="54.97787143782138 54.97787143782138"
          strokeDashoffset="54.97787143782138"
          transform="rotate(-253.819 50 50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="linear"
            values="0 50 50;-360 50 50"
            keyTimes="0;1"
            dur="1.7s"
            begin="0s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}

export default Loading;
