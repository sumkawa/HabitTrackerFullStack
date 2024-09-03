import React from 'react';
import styles from './NumberStat.module.css';

const NumberStat = ({ percentageVal, stat, label }) => {
  const percentage = percentageVal > 100 ? 100 : percentageVal;

  // Size of the SVG (including padding)
  const size = 160;
  const squareSize = 120; // Size of the square itself
  const strokeWidth = 10; // Thickness of the progress bar
  const offset = (size - squareSize) / 2; // Centering the square in the SVG

  // Calculate the length of the stroke for a square (4 sides)
  const strokeLength = (squareSize - strokeWidth) * 4;
  const strokeDashoffset = strokeLength - (percentage / 100) * strokeLength;

  return (
    <div className={styles.container}>
      <svg height={size} width={size}>
        <defs>
          <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' stopColor='#0090FF' />
            <stop offset='100%' stopColor='#00FF90' />
          </linearGradient>
        </defs>
        <rect
          x={offset + strokeWidth / 2}
          y={offset + strokeWidth / 2}
          width={squareSize - strokeWidth}
          height={squareSize - strokeWidth}
          stroke='url(#gradient)'
          fill='transparent'
          strokeWidth={strokeWidth}
          strokeDasharray={strokeLength}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap='square' // Use square caps to avoid rounded ends
        />
        <text
          x='50%'
          y='50%'
          dy='.3em'
          textAnchor='middle'
          fontSize='28px'
          fill='#7B7B7B'
        >
          {stat}
        </text>
      </svg>
      <div className={styles.label}>{label}</div>
    </div>
  );
};

export default NumberStat;
