import React from 'react';
import slothImg from '../assets/sloth-climbing.png';

export default function SlothMascot() {
  return (
    <div className="sloth-container">
      <div className="tree-trunk"></div>
      <img src={slothImg} alt="Climbing Sloth" className="sloth-img" />
      <style>{`
        .sloth-container {
          position: fixed;
          left: 20px;
          bottom: 0;
          height: 100vh;
          width: 100px;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }
        
        .tree-trunk {
          position: absolute;
          left: 35px;
          bottom: 0;
          width: 30px;
          height: 100%;
          background: linear-gradient(to right, #5d4037, #795548, #5d4037);
          border-radius: 15px;
          box-shadow: inset -2px 0 5px rgba(0,0,0,0.3);
        }
        
        .sloth-img {
          width: 70px;
          height: auto;
          position: absolute;
          left: 15px;
          bottom: 0;
          animation: climbUp 60s linear infinite;
          filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.3));
          transform-origin: center;
        }
        
        @keyframes climbUp {
          0% { 
            bottom: -80px;
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(3deg);
          }
          75% {
            transform: rotate(-3deg);
          }
          100% { 
            bottom: calc(100vh + 80px);
            transform: rotate(0deg);
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .sloth-container {
            left: 5px;
            width: 60px;
          }
          .tree-trunk {
            left: 20px;
            width: 20px;
          }
          .sloth-img {
            width: 50px;
            left: 5px;
          }
        }
      `}</style>
    </div>
  );
}
