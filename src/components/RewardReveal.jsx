import React from 'react';

export default function RewardReveal({ puzzleId, progress, size = 200, showBorder = true }) {
    // Current only 01.png exists. If puzzleId is something else, it might fail.
    // However, the user wants us to use whatever is in rewards.
    // For now, let's ensure we point to the absolute path correctly.
    const puzzleImg = `/rewards/${puzzleId}.png`;
    const pieceSize = size / 2;

    const containerStyle = {
        width: `${size}px`,
        height: `${size}px`,
        position: 'relative',
        background: '#2a2a2a', // Dark fallback background
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        boxShadow: showBorder ? '0 8px 25px rgba(0,0,0,0.4)' : 'none',
        margin: '0 auto',
        transition: 'all 0.5s ease',
        border: '1px solid rgba(255,255,255,0.1)'
    };

    return (
        <div style={containerStyle}>
            {[1, 2, 3, 4].map(i => {
                const isRevealed = i <= progress;
                const row = Math.floor((i - 1) / 2);
                const col = (i - 1) % 2;

                return (
                    <div key={i} style={{
                        opacity: isRevealed ? 1 : 0.1,
                        filter: isRevealed ? 'none' : 'grayscale(100%) blur(1px)',
                        backgroundImage: `url(${puzzleImg}), url(/rewards/01.png)`, // Fallback to 01.png if puzzleId doesn't exist
                        backgroundSize: `${size}px ${size}px`,
                        backgroundPosition: `${-col * pieceSize}px ${-row * pieceSize}px`,
                        backgroundRepeat: 'no-repeat',
                        border: '0.5px solid rgba(255,255,255,0.05)',
                        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                        backgroundColor: '#1a1a1a'
                    }} />
                );
            })}
        </div>
    );
}
