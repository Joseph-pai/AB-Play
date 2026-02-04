import React from 'react'
import { getGameById } from '../utils/historyManager'
import '../styles/glass.css'

export default function HistoryDetail({ gameId, onBack }) {
    const game = getGameById(gameId)

    if (!game) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <p>Game not found</p>
                <button onClick={onBack} className="glass-btn" style={{ marginTop: '20px' }}>
                    Back to History
                </button>
            </div>
        )
    }

    const formatDate = (dateStr) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString('zh-TW', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div style={{ width: '100%', maxWidth: '800px', padding: '20px', minHeight: '100vh', margin: '0 auto' }}>
            <header style={{ textAlign: 'center', marginBottom: '20px', marginTop: '20px' }}>
                <button onClick={onBack} className="glass-btn" style={{ position: 'absolute', left: '20px', top: '20px', padding: '8px 16px', fontSize: '0.9rem' }}>
                    ← Back
                </button>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 700, textShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
                    Game Details
                </h1>
            </header>

            <div className="glass-panel" style={{ padding: '30px' }}>
                <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
                        {game.mode === 'single' ? '🎮 Single Player' : '👥 Two Player'}
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                        {formatDate(game.date)} • {game.difficulty} Digits
                    </div>
                </div>

                <div style={{ marginBottom: '30px', padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}>
                    <h3 style={{ marginBottom: '15px', fontSize: '1.3rem' }}>Game Info</h3>
                    {game.mode === 'single' ? (
                        <>
                            <p style={{ marginBottom: '10px' }}>
                                Secret Number: <span style={{ fontWeight: 'bold', color: 'var(--color-yellow)', fontSize: '1.5rem', letterSpacing: '3px' }}>{game.secret}</span>
                            </p>
                            <p>
                                Winner: <span style={{ fontWeight: 'bold', color: 'var(--color-pink)' }}>{game.winner}</span>
                            </p>
                            <p>
                                Total Attempts: <span style={{ fontWeight: 'bold' }}>{game.attempts}</span>
                            </p>
                        </>
                    ) : (
                        <>
                            <p style={{ marginBottom: '10px' }}>
                                Player A's Secret: <span style={{ fontWeight: 'bold', color: 'var(--color-yellow)', fontSize: '1.3rem', letterSpacing: '3px' }}>{game.playerASecret}</span>
                            </p>
                            <p style={{ marginBottom: '10px' }}>
                                Player B's Secret: <span style={{ fontWeight: 'bold', color: 'var(--color-yellow)', fontSize: '1.3rem', letterSpacing: '3px' }}>{game.playerBSecret}</span>
                            </p>
                            <p>
                                Winner: <span style={{ fontWeight: 'bold', color: 'var(--color-pink)' }}>{game.winner}</span>
                            </p>
                        </>
                    )}
                </div>

                <div>
                    <h3 style={{ marginBottom: '15px', fontSize: '1.3rem' }}>Guess History</h3>

                    {game.mode === 'single' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {game.guesses.map((g, i) => (
                                <div
                                    key={i}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '12px 16px',
                                        background: 'rgba(255,255,255,0.05)',
                                        borderRadius: '8px',
                                        borderLeft: g.result.includes('4A') ? '4px solid var(--color-yellow)' : '4px solid transparent'
                                    }}
                                >
                                    <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>#{i + 1}</span>
                                    <span style={{ fontSize: '1.3rem', letterSpacing: '3px', fontFamily: 'monospace' }}>{g.guess}</span>
                                    <span style={{
                                        fontWeight: 'bold',
                                        color: g.result.includes('4A') ? 'var(--color-yellow)' : 'white',
                                        fontSize: '1.1rem',
                                        padding: '4px 12px',
                                        background: g.result.includes('4A') ? 'var(--color-purple)' : 'rgba(255,255,255,0.1)',
                                        borderRadius: '8px'
                                    }}>
                                        {g.result}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div>
                                <h4 style={{ marginBottom: '10px', color: 'var(--color-blue)' }}>Player A</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {game.playerAGuesses.map((g, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                padding: '10px',
                                                background: 'rgba(1,109,247,0.1)',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <span style={{ fontSize: '1.1rem', letterSpacing: '2px' }}>{g.guess}</span>
                                            <span style={{ fontWeight: 'bold', color: 'var(--color-yellow)' }}>{g.result}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 style={{ marginBottom: '10px', color: 'var(--color-pink)' }}>Player B</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {game.playerBGuesses.map((g, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                padding: '10px',
                                                background: 'rgba(255,140,164,0.1)',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <span style={{ fontSize: '1.1rem', letterSpacing: '2px' }}>{g.guess}</span>
                                            <span style={{ fontWeight: 'bold', color: 'var(--color-yellow)' }}>{g.result}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
