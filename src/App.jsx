import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import InputGrid from './components/InputGrid'
import HistoryList from './components/HistoryList'
import VictoryModal from './components/VictoryModal'
import SlothMascot from './components/SlothMascot'
import { generateSecret, calculateResult } from './utils/gameLogic'
import './styles/glass.css'

function App() {
  const [difficulty, setDifficulty] = useState(4)
  const [secret, setSecret] = useState(() => generateSecret(4))
  const [input, setInput] = useState(Array(4).fill(''))
  const [history, setHistory] = useState([])
  const [isWon, setIsWon] = useState(false)
  const [totalWins, setTotalWins] = useState(() => Number(localStorage.getItem('glass-guess-wins')) || 0)

  // Debugging
  useEffect(() => {
    console.log('Secret (Debug):', secret)
  }, [secret])

  const handleDifficultyChange = (e) => {
    const val = Number(e.target.value)
    if (val === difficulty) return
    setDifficulty(val)
    restartGame(val)
  }

  const restartGame = (len = difficulty) => {
    setSecret(generateSecret(len))
    setHistory([])
    setIsWon(false)
    setInput(Array(len).fill(''))
  }

  const handleSubmit = () => {
    if (input.some(d => d === '')) return // Not full

    // Check duplicates
    const uniqueDigits = new Set(input)
    if (uniqueDigits.size !== difficulty) {
      alert(`Please enter ${difficulty} unique digits!`)
      return
    }

    const guessStr = input.join('')
    const res = calculateResult(secret, guessStr)

    const newHistory = [...history, { guess: guessStr, result: res }]
    setHistory(newHistory)
    setInput(Array(difficulty).fill(''))

    if (res === `${difficulty}A0B`) {
      handleWin()
    }
  }

  const handleWin = () => {
    setIsWon(true)
    const newWins = totalWins + 1
    setTotalWins(newWins)
    localStorage.setItem('glass-guess-wins', newWins)

    // Fire confetti
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#016DF7', '#5243C2', '#FFD150', '#FF8CA4']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#016DF7', '#5243C2', '#FFD150', '#FF8CA4']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }

  return (
    <div style={{
      width: '100%',
      maxWidth: '600px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      margin: '0 auto'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '10px', zIndex: 10, marginTop: '20px' }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.5rem', fontWeight: 700, textShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
          Glass Guess
        </h1>
        {/* Difficulty Selector */}
        <div style={{ marginTop: '10px' }}>
          <select
            value={difficulty}
            onChange={handleDifficultyChange}
            className="glass-btn"
            style={{ padding: '8px 16px', fontSize: '0.9rem', borderRadius: '12px', background: 'rgba(255,255,255,0.2)' }}
          >
            {[4, 5, 6, 7, 8].map(d => (
              <option key={d} value={d} style={{ color: '#333' }}>{d} Digits</option>
            ))}
          </select>
        </div>
      </header>

      <main className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px', position: 'relative', zIndex: 10, marginBottom: '20px' }}>
        <InputGrid input={input} setInput={setInput} onSubmit={handleSubmit} disabled={isWon} />

        <div style={{ textAlign: 'center', margin: '10px 0' }}>
          <button className="glass-btn" onClick={handleSubmit} disabled={isWon}>
            GUESS
          </button>
        </div>

        <HistoryList history={history} />
      </main>

      <SlothMascot />

      {isWon && <VictoryModal onRestart={() => restartGame()} totalWins={totalWins} />}
    </div>
  )
}

export default App
