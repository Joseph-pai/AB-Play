import React from 'react';

export default function RewardReveal({ puzzleId, progress, size = 200, showBorder = true }) {
    const puzzleImg = `/rewards/${puzzleId}.png`;
    const pieceSize = size / 2;

    const containerStyle = {
        width: `${size}px`,
        height: `${size}px`,
        position: 'relative',
        background: 'rgba(0,0,0,0.2)',
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        boxShadow: showBorder ? '0 8px 20px rgba(0,0,0,0.3)' : 'none',
        margin: '0 auto',
        transition: 'all 0.5s ease'
    };

    return (
        <div style={containerStyle}>
            {[1, 2, 3, 4].map(i => (
                <div key={i} style={{
                    opacity: i <= progress ? 1 : 0.05,
                    filter: i <= progress ? 'none' : 'grayscale(100%) blur(2px)',
                    backgroundImage: `url(${puzzleImg})`,
                    backgroundSize: `${size}px ${size}px`,
                    backgroundPosition: `${(i - 1) % 2 * -pieceSize}px ${Math.floor((i - 1) / 2) * -pieceSize}px`,
                    border: '1px solid rgba(255,255,255,0.05)',
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    backgroundColor: '#1a1a1a'
                }} />
            ))}
        </div>
    );
}
