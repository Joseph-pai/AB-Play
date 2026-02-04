import React, { useState } from 'react'
import { getHistory, deleteGame, clearHistory } from '../utils/historyManager'
import '../styles/glass.css'

export default function GameHistory({ onBack, onViewDetail }) {
    const [history, setHistory] = useState(getHistory())
    const [showConfirm, setShowConfirm] = useState(false)

    const handleDelete = (id) => {
        deleteGame(id)
        setHistory(getHistory())
    }

    const handleClearAll = () => {
        clearHistory()
        setHistory([])
        setShowConfirm(false)
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
                    Game History
                </h1>
                {history.length > 0 && (
                    <button
                        onClick={() => setShowConfirm(true)}
                        className="glass-btn"
                        style={{
                            position: 'absolute',
                            right: '20px',
                            top: '20px',
                            padding: '8px 16px',
                            fontSize: '0.9rem',
                            background: 'linear-gradient(135deg, #ff4444, #cc0000)'
                        }}
                    >
                        Clear All
                    </button>
                )}
            </header>

            {showConfirm && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div className="glass-panel" style={{ padding: '30px', textAlign: 'center', maxWidth: '400px' }}>
                        <h3 style={{ marginBottom: '20px' }}>Clear all history?</h3>
                        <p style={{ marginBottom: '30px', opacity: 0.8 }}>This action cannot be undone.</p>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            <button className="glass-btn" onClick={() => setShowConfirm(false)} style={{ background: 'rgba(255,255,255,0.2)' }}>
                                Cancel
                            </button>
                            <button className="glass-btn" onClick={handleClearAll} style={{ background: 'linear-gradient(135deg, #ff4444, #cc0000)' }}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="glass-panel" style={{ padding: '20px' }}>
                {history.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 20px', opacity: 0.6 }}>
                        <p style={{ fontSize: '1.2rem' }}>No games played yet</p>
                        <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Start playing to see your history here!</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {history.map((game) => (
                            <div
                                key={game.id}
                                className="glass-panel animate-pop"
                                style={{
                                    padding: '20px',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s',
                                    background: 'rgba(255,255,255,0.1)'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div onClick={() => onViewDetail(game.id)} style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                            <span style={{ fontSize: '1.5rem' }}>
                                                {game.mode === 'single' ? '🎮' : '👥'}
                                            </span>
                                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                                {game.mode === 'single' ? 'Single Player' : 'Two Player'}
                                            </span>
                                            <span style={{
                                                padding: '4px 12px',
                                                borderRadius: '12px',
                                                background: 'var(--color-purple)',
                                                fontSize: '0.8rem'
                                            }}>
                                                {game.difficulty} digits
                                            </span>
                                        </div>
                                        <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                                            <span>Winner: <strong style={{ color: 'var(--color-yellow)' }}>{game.winner}</strong></span>
                                            <span style={{ margin: '0 10px' }}>•</span>
                                            <span>Attempts: <strong>{game.attempts}</strong></span>
                                            <span style={{ margin: '0 10px' }}>•</span>
                                            <span>{formatDate(game.date)}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleDelete(game.id)
                                        }}
                                        className="glass-btn"
                                        style={{
                                            padding: '8px 12px',
                                            fontSize: '0.8rem',
                                            background: 'rgba(255,68,68,0.3)'
                                        }}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
