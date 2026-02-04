import React from 'react';
import RewardReveal from './RewardReveal';
import '../styles/glass.css';

export default function VictoryModal({ onRestart, totalWins }) {
    // totalWins is updated BEFORE this modal shows.
    // Progress calculation: 
    // If totalWins was 0 and now 1 -> currentProgress=1.
    // If totalWins was 3 and now 4 -> currentProgress=4 (Complete).
    const currentProgress = ((totalWins - 1) % 4) + 1;
    const isComplete = currentProgress === 4;

    const [puzzleId, setPuzzleId] = React.useState('01');

    React.useEffect(() => {
        const savedId = localStorage.getItem('glass-guess-puzzle-id') || '01';
        setPuzzleId(savedId);
    }, []);

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)',
            display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100
        }}>
            <div className="glass-panel animate-pop" style={{ padding: '40px', textAlign: 'center', maxWidth: '90%', width: '380px' }}>
                <h2 style={{
                    fontSize: '2.8rem',
                    marginBottom: '10px',
                    color: 'var(--color-yellow)',
                    textShadow: '0 0 15px rgba(255, 209, 80, 0.4)',
                    fontFamily: 'Outfit, sans-serif'
                }}>
                    VICTORY!
                </h2>
                <p style={{ marginBottom: '30px', fontSize: '1.2rem', opacity: 0.9 }}>You've cracked the code!</p>

                {/* Puzzle Container */}
                <div style={{ marginBottom: '30px', transform: isComplete ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.5s ease' }}>
                    <RewardReveal puzzleId={puzzleId} progress={currentProgress} size={240} />
                </div>

                {isComplete ? (
                    <div className="animate-pop">
                        <p style={{ color: '#FFD150', fontWeight: 'bold', fontSize: '1.3rem', marginBottom: '8px' }}>Puzzle Mastery! 🎉</p>
                        <p style={{ fontSize: '1rem', opacity: 0.8, marginBottom: '25px' }}>Whole image revealed. Ready for more?</p>
                    </div>
                ) : (
                    <p style={{ marginBottom: '30px', fontSize: '1.1rem' }}>
                        Progress: <span style={{ color: '#FF8CA4', fontWeight: 'bold' }}>{currentProgress}/4</span> Shards
                    </p>
                )}

                <button className="glass-btn" onClick={() => {
                    if (isComplete) {
                        localStorage.removeItem('glass-guess-puzzle-id');
                    }
                    onRestart();
                }} style={{ width: '100%', fontSize: '1.3rem', padding: '15px' }}>
                    {isComplete ? 'Start New Puzzle' : 'Play Next Level'}
                </button>
            </div>
        </div>
    )
}
