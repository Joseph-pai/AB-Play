import { useState } from 'react'
import ModeSelector from './components/ModeSelector'
import SinglePlayerGame from './components/SinglePlayerGame'
import TwoPlayerGame from './components/TwoPlayerGame'
import GameHistory from './components/GameHistory'
import HistoryDetail from './components/HistoryDetail'
import SlothMascot from './components/SlothMascot'
import './styles/glass.css'
import slothBg from './assets/sloth-background.png'

function App() {
  const [view, setView] = useState('menu') // 'menu', 'single', 'two-player', 'history', 'detail'
  const [difficulty, setDifficulty] = useState(4)
  const [detailGameId, setDetailGameId] = useState(null)

  const handleModeSelect = (mode) => {
    if (mode === 'single') {
      setView('difficulty-single')
    } else if (mode === 'two-player') {
      setView('difficulty-two')
    } else if (mode === 'history') {
      setView('history')
    }
  }

  const handleDifficultySelect = (diff, mode) => {
    setDifficulty(diff)
    setView(mode)
  }

  const handleViewDetail = (gameId) => {
    setDetailGameId(gameId)
    setView('detail')
  }

  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      backgroundImage: `url(${slothBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      {/* Overlay for readability */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.3)',
        zIndex: 0
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <SlothMascot />

        {view === 'menu' && (
          <div style={{
            width: '100%',
            maxWidth: '600px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            margin: '0 auto',
            justifyContent: 'center'
          }}>
            <header style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h1 style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '3rem',
                fontWeight: 700,
                textShadow: '0 4px 10px rgba(0,0,0,0.5)',
                marginBottom: '10px'
              }}>
                Glass Guess
              </h1>
              <p style={{ fontSize: '1rem', opacity: 0.9, textShadow: '0 2px 5px rgba(0,0,0,0.5)' }}>
                1A1B Number Guessing Game
              </p>
            </header>
            <ModeSelector onSelectMode={handleModeSelect} />
          </div>
        )}

        {view === 'difficulty-single' && (
          <div style={{
            width: '100%',
            maxWidth: '600px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            margin: '0 auto',
            justifyContent: 'center'
          }}>
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
              <button
                onClick={() => setView('menu')}
                className="glass-btn"
                style={{
                  position: 'absolute',
                  left: '20px',
                  top: '20px',
                  padding: '8px 16px',
                  fontSize: '0.9rem'
                }}
              >
                ← Back
              </button>
              <h2 style={{ fontSize: '2rem', marginBottom: '30px' }}>Choose Difficulty</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {[4, 5, 6, 7, 8].map(num => (
                  <button
                    key={num}
                    className="glass-btn animate-pop"
                    onClick={() => handleDifficultySelect(num, 'single')}
                    style={{
                      padding: '20px',
                      fontSize: '1.3rem',
                      animationDelay: `${(num - 4) * 0.1}s`
                    }}
                  >
                    {num} Digits
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === 'difficulty-two' && (
          <div style={{
            width: '100%',
            maxWidth: '600px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            margin: '0 auto',
            justifyContent: 'center'
          }}>
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
              <button
                onClick={() => setView('menu')}
                className="glass-btn"
                style={{
                  position: 'absolute',
                  left: '20px',
                  top: '20px',
                  padding: '8px 16px',
                  fontSize: '0.9rem'
                }}
              >
                ← Back
              </button>
              <h2 style={{ fontSize: '2rem', marginBottom: '30px' }}>Choose Difficulty</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {[4, 5, 6, 7, 8].map(num => (
                  <button
                    key={num}
                    className="glass-btn animate-pop"
                    onClick={() => handleDifficultySelect(num, 'two-player')}
                    style={{
                      padding: '20px',
                      fontSize: '1.3rem',
                      animationDelay: `${(num - 4) * 0.1}s`
                    }}
                  >
                    {num} Digits
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === 'single' && (
          <SinglePlayerGame
            difficulty={difficulty}
            onBack={() => setView('menu')}
          />
        )}

        {view === 'two-player' && (
          <TwoPlayerGame
            difficulty={difficulty}
            onBack={() => setView('menu')}
          />
        )}

        {view === 'history' && (
          <GameHistory
            onBack={() => setView('menu')}
            onViewDetail={handleViewDetail}
          />
        )}

        {view === 'detail' && (
          <HistoryDetail
            gameId={detailGameId}
            onBack={() => setView('history')}
          />
        )}
      </div>
    </div>
  )
}

export default App
