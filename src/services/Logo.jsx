import React from 'react';

const Logo = (className) => (
  <svg className={ className } viewBox="0 0 84.575 107.636">
    <g transform="translate(709.885 -608.268)">
      <rect
        width="81.675"
        height="81.675"
        x="-708.435"
        y="632.779"
        rx="20"
        fill="#19684a"
        stroke="#19684a"
        strokeWidth="2.9"
      />
      <g transform="translate(-801.857 445.779)">
        <circle
          cx="134.26"
          cy="189.06"
          r="25.121"
          fill="#ffd42a"
          stroke="#19684a"
          strokeWidth="2.9"
          paintOrder="markers stroke fill"
        />
        <text
          x="122.265"
          y="206.033"
          fontFamily="Sarai"
          fontSize="48.424"
          letterSpacing="0"
          wordSpacing="0"
          fill="#19684a"
          stroke="none"
        >
          <tspan>$</tspan>
        </text>
      </g>
      <path
        d={ `M-626.76 665.432l-23.662 13.66v35.362h3.683a19.956 
          19.956 0 0019.979-20z` }
        fill="#2ec18b"
      />
      <path
        d={ `M-626.956 649.99l-23.467 13.549c-13.47 7.777-13.47 
          7.584-13.47 
          23.332v27.583h13.47v-35.36l23.663-13.662v-12.653c0-.947-.07-1.877-.196-2.789z` }
        fill="#fff"
      />
      <g>
        <path
          d={ `M-708.435 665.432l23.662 13.66v35.362h-3.683a19.956 
            19.956 0 01-19.979-20z` }
          fill="#2ec18b"
        />
        <path
          d={ `M-708.239 649.99l23.467 13.549c13.47 7.777 13.47 
            7.584 13.47 23.332v27.583h-13.47v-35.36l-23.663-13.662v-12
            .653c0-.947.07-1.877.196-2.789z` }
          fill="#fff"
        />
      </g>
    </g>
  </svg>
);

export default Logo;
