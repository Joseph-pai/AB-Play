import React from 'react';
import '../styles/glass.css';

export default function VictoryModal({ onRestart, totalWins }) {
    // Logic: 
    // 1 win -> piece 1. 4 wins -> piece 4 (complete).
    // Current progress in the cycle (1-4)
    const currentProgress = ((totalWins - 1) % 4) + 1;
    const isComplete = currentProgress === 4;

    const [puzzleId, setPuzzleId] = React.useState('01');

    React.useEffect(() => {
        // If it's the start of a new puzzle (progress 1), we might need a new ID.
        // However, we want to keep the SAME ID for the duration of the 4 pieces.
        // So we store 'currentPuzzleId' in localStorage.

        let savedId = localStorage.getItem('glass-guess-puzzle-id');

        // If we just finished a puzzle (previous was 4, now we are restarting cycle?), 
        // actually 'totalWins' updates BEFORE this modal shows. 
        // If totalWins=1, 5, 9... it means we just started a NEW piece 1.
        // So if currentProgress === 1, we should ensure we have a valid ID, 
        // OR if the user just won, maybe we should generate a NEW one if they clicked "Next Level" previously?
        // Wait, the modal shows the CURRENT state. 
        // If I just won my 1st game (totalWins=1), progress=1. I need a puzzle ID.
        // If I won 2nd game (totalWins=2), progress=2. I need same ID.

        if (currentProgress === 1 && !savedId) {
            // Generate new random ID 01-30
            const randomNum = Math.floor(Math.random() * 30) + 1;
            savedId = String(randomNum).padStart(2, '0');
            localStorage.setItem('glass-guess-puzzle-id', savedId);
        } else if (!savedId) {
            // Fallback
            savedId = '01';
            localStorage.setItem('glass-guess-puzzle-id', savedId);
        }

        // If we just COMPLETED a puzzle (progress 4), we keep showing this ID.
        // Next time the user clicks "Start New Collection", we should probably clear/reset the ID in App.jsx or here.
        // But for now, we just load what's there.

        setPuzzleId(savedId);
    }, [currentProgress]);

    const puzzleImg = `/rewards/${puzzleId}.png`;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
            display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100
        }}>
            <div className="glass-panel animate-pop" style={{ padding: '32px', textAlign: 'center', maxWidth: '90%', width: '360px' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '8px', color: 'var(--color-yellow)', textShadow: '0 0 10px rgba(255, 209, 80, 0.5)' }}>Victory!</h2>
                <p style={{ marginBottom: '24px', fontSize: '1.1rem' }}>You found the secret code!</p>

                {/* Puzzle Container */}
                <div style={{
                    width: '240px', height: '240px', margin: '0 auto 24px',
                    position: 'relative', background: 'rgba(0,0,0,0.2)',
                    borderRadius: '12px', overflow: 'hidden',
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
                }}>
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} style={{
                            opacity: i <= currentProgress ? 1 : 0.1,
                            filter: i <= currentProgress ? 'none' : 'grayscale(100%)',
                            backgroundImage: `url(${puzzleImg})`,
                            backgroundSize: '240px 240px',
                            backgroundPosition: `${(i - 1) % 2 * -120}px ${Math.floor((i - 1) / 2) * -120}px`,
                            border: '1px solid rgba(255,255,255,0.1)',
                            transition: 'all 1s ease',
                            backgroundColor: '#2a2a2a' // Fallback color
                        }} />
                    ))}
                </div>

                {isComplete ? (
                    <div className="animate-pop">
                        <p style={{ color: '#FFD150', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '8px' }}>Puzzle Completed!</p>
                        <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '20px' }}>A new masterpiece awaits...</p>
                    </div>
                ) : (
                    <p style={{ marginBottom: '24px' }}>Memory Shard <span style={{ color: '#FF8CA4', fontWeight: 'bold' }}>{currentProgress}/4</span> Collected</p>
                )}

                <button className="glass-btn" onClick={() => {
                    if (isComplete) {
                        // If complete, we should effectively "reset" the puzzle ID for the next round.
                        // We can do this by removing it. Next time modal opens (win 5 -> progress 1), it generates new one.
                        localStorage.removeItem('glass-guess-puzzle-id');
                    }
                    onRestart();
                }} style={{ width: '100%', fontSize: '1.2rem' }}>
                    {isComplete ? 'Start New Collection' : 'Play Next Level'}
                </button>
            </div>
        </div>
    )
}
