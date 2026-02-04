import React from 'react';
import GameRules from './GameRules';
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
                textShadow: '0 4px 10px rgba(0,0,0,0.3)',
                textAlign: 'center'
            }}>
                選擇遊戲模式<br />
                <span style={{ fontSize: '1rem', opacity: 0.8 }}>Choose Game Mode</span>
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
                🎮 單人模式<br />
                <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Single Player</span>
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
                👥 雙人模式<br />
                <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Two Player</span>
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
                📜 遊戲歷史<br />
                <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Game History</span>
            </button>

            <GameRules />
        </div>
    );
}
