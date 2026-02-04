import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import InputGrid from './InputGrid'
import HistoryList from './HistoryList'
import VictoryModal from './VictoryModal'
import { generateSecret, calculateResult } from '../utils/gameLogic'
import { saveGame } from '../utils/historyManager'
import '../styles/glass.css'

export default function SinglePlayerGame({ difficulty, onBack }) {
    const [secret, setSecret] = useState(() => generateSecret(difficulty))
    const [input, setInput] = useState(Array(difficulty).fill(''))
    const [history, setHistory] = useState([])
    const [isWon, setIsWon] = useState(false)
    const [totalWins, setTotalWins] = useState(() => Number(localStorage.getItem('glass-guess-wins')) || 0)

    useEffect(() => {
        console.log('Secret (Debug):', secret)
    }, [secret])

    const restartGame = (len = difficulty) => {
        const newSecret = generateSecret(len)
        setSecret(newSecret)
        setHistory([])
        setIsWon(false)
        setInput(Array(len).fill(''))
    }

    const handleSubmit = () => {
        if (input.some(d => d === '')) return

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
            handleWin(newHistory)
        }
    }

    const handleWin = (finalHistory) => {
        setIsWon(true)
        const newWins = totalWins + 1
        setTotalWins(newWins)
        localStorage.setItem('glass-guess-wins', newWins)

        // Save to history
        saveGame({
            mode: 'single',
            difficulty,
            secret,
            guesses: finalHistory,
            winner: 'You',
            attempts: finalHistory.length
        })

        // Fire confetti
        const duration = 3000
        const end = Date.now() + duration

            ; (function frame() {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#016DF7', '#5243C2', '#FFD150', '#FF8CA4']
                })
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#016DF7', '#5243C2', '#FFD150', '#FF8CA4']
                })

                if (Date.now() < end) {
                    requestAnimationFrame(frame)
                }
            }())
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
                <button
                    onClick={onBack}
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
                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.5rem', fontWeight: 700, textShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
                    Glass Guess
                </h1>
                <p style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '5px' }}>Single Player - {difficulty} Digits</p>
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

            {isWon && <VictoryModal onRestart={() => restartGame()} totalWins={totalWins} />}
        </div>
    )
}
