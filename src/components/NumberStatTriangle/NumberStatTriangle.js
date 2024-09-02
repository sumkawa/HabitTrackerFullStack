import React from 'react';
import styles from './NumberStat.module.css';

const NumberStatTriangle = ({ stat, label }) => {
  // Size of the SVG (including padding)
  const size = 160;
  const triangleSize = 120; // Size of the triangle itself
  const strokeWidth = 10; // Thickness of the border
  const offset = (size - triangleSize) / 2; // Centering the triangle in the SVG

  // Coordinates for the triangle's vertices
  const height = (Math.sqrt(3) / 2) * triangleSize;
  const halfBase = triangleSize / 2;

  const points = `
    ${offset + halfBase},${offset} 
    ${offset},${offset + height} 
    ${offset + triangleSize},${offset + height}
  `;

  return (
    <div className={styles.container}>
      <svg height={size} width={size}>
        <defs>
          <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' stopColor='#0090FF' />
            <stop offset='100%' stopColor='#00FF90' />
          </linearGradient>
        </defs>
        <polygon
          points={points}
          stroke='url(#gradient)'
          fill='transparent'
          strokeWidth={strokeWidth}
          strokeLinecap='square'
        />
        <text
          x='50%'
          y='50%'
          dy='.3em'
          textAnchor='middle'
          fontSize='20px'
          fill='#7B7B7B'
        >
          {stat}
        </text>
      </svg>
      <label className={styles.label}>{label}</label>
    </div>
  );
};

export default NumberStatTriangle;
