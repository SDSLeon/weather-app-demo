import React from 'react';

export default ({ deg }) => (
    <svg height="15" width="15">
      <g id='wind-direction-arrow' transform={ `rotate(${deg} 7.5 7.5)` }>
        <polygon points="0.2,7.4 14.8,11.1 11.4,7.4 14.8,3.7 " fill="white"/>
      </g>
    </svg>
);