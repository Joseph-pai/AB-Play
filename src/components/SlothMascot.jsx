import React from 'react';
import slothImg from '../assets/sloth-climbing.png';

export default function SlothMascot() {
    return (
        <div className="sloth-container">
            <img src={slothImg} alt="Climbing Sloth" className="sloth-img" />
            <style>{`
        .sloth-container {
          position: fixed;
          left: 0;
          bottom: 0;
          height: 100vh;
          width: 100px;
          pointer-events: none;
          z-index: 1;
        }
        .sloth-img {
          width: 80px;
          position: absolute;
          bottom: -100px;
          left: 10px;
          animation: climb 60s linear infinite;
          filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.3));
        }
        @keyframes climb {
          0% { bottom: -100px; }
          100% { bottom: 110vh; }
        }
      `}</style>
        </div>
    );
}
