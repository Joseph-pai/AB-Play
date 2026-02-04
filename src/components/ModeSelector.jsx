import React from 'react';
import '../styles/glass.css';

export default function ModeSelector({ onSelectMode }) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'center',
            padding: '40px 20px'
        }}>
            <h2 style={{
                fontSize: '2rem',
                marginBottom: '20px',
                textShadow: '0 4px 10px rgba(0,0,0,0.3)'
            }}>
                Choose Game Mode
            </h2>

            <button
                className="glass-btn animate-pop"
                onClick={() => onSelectMode('single')}
                style={{
                    width: '100%',
                    maxWidth: '300px',
                    padding: '20px',
                    fontSize: '1.3rem'
                }}
            >
                🎮 Single Player
            </button>

            <button
                className="glass-btn animate-pop"
                onClick={() => onSelectMode('two-player')}
                style={{
                    width: '100%',
                    maxWidth: '300px',
                    padding: '20px',
                    fontSize: '1.3rem',
                    animationDelay: '0.1s'
                }}
            >
                👥 Two Player
            </button>

            <button
                className="glass-btn animate-pop"
                onClick={() => onSelectMode('history')}
                style={{
                    width: '100%',
                    maxWidth: '300px',
                    padding: '20px',
                    fontSize: '1.3rem',
                    background: 'linear-gradient(135deg, var(--color-purple), var(--color-pink))',
                    animationDelay: '0.2s'
                }}
            >
                📜 Game History
            </button>
        </div>
    );
}
