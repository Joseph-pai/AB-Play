import React from 'react';
import slothSprite from '../assets/sloth-sprite.png';

export default function SlothMascot() {
  return (
    <div className="sloth-container">
      <div className="tree-trunk"></div>
      <div className="sloth-animated"></div>
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
        
        .sloth-animated {
          width: 120px;
          height: 120px;
          position: absolute;
          left: 10px;
          bottom: 0;
          background-image: url(${slothSprite});
          background-size: 400% 100%;
          background-position: 0% 0%;
          animation: climbUp 60s linear infinite, spriteWalk 2s steps(4) infinite;
          filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.3));
        }
        
        @keyframes climbUp {
          0% { 
            bottom: -120px;
          }
          100% { 
            bottom: calc(100vh + 120px);
          }
        }
        
        @keyframes spriteWalk {
          0% { background-position: 0% 0%; }
          25% { background-position: 25% 0%; }
          50% { background-position: 50% 0%; }
          75% { background-position: 75% 0%; }
          100% { background-position: 100% 0%; }
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .sloth-container {
            left: 5px;
            width: 70px;
          }
          .tree-trunk {
            left: 25px;
            width: 20px;
          }
          .sloth-animated {
            width: 80px;
            height: 80px;
            left: 0px;
          }
        }
      `}</style>
    </div>
  );
}
