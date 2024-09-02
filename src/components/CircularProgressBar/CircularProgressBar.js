import React from 'react';
import styles from './CircularProgressBar.module.css';

const CircularProgressBar = ({ percentageVal, label }) => {
  const percentage = percentageVal > 100 ? 100 : percentageVal;

  // Increase the radius for a larger circle
  const radius = 80; // Increase this value to make the circle bigger
  const strokeWidth = 5; // You might want to increase this slightly as well
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100.0) * circumference;

  return (
    <div className={styles.container}>
      <svg height={radius * 2} width={radius * 2}>
        <defs>
          <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' stopColor='#0090FF' />
            <stop offset='100%' stopColor='#00FF90' />
          </linearGradient>
        </defs>
        <circle
          stroke='#484848'
          fill='transparent'
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke='white'
          fill='transparent'
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap='round'
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
        />
        <text
          x='50%'
          y='50%'
          dy='.3em'
          textAnchor='middle'
          fontSize='28px' // Adjust font size accordingly
          fill='white'
        >
          {percentage}%
        </text>
      </svg>
      <label className={styles.label}>{label}</label>
    </div>
  );
};

export default CircularProgressBar;
