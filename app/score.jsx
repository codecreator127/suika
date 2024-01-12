// Score.js
import React from 'react';

const Score = ({ score }) => {
  return (
    <div style={{ position: 'absolute', top: '8%', left: '35%', transform: 'translate(0%, 0%)'}}>
      <p>Score: {score}</p>
    </div>
  );
};

export default Score;
