import { useState } from 'react'
import confetti from 'canvas-confetti'
import InputGrid from './InputGrid'
import { calculateResult } from '../utils/gameLogic'
import { saveGame } from '../utils/historyManager'
import '../styles/glass.css'

export default function TwoPlayerGame({ difficulty, onBack }) {
    const [phase, setPhase] = useState('setup') // 'setup', 'playing', 'finished'
    const [playerASecret, setPlayerASecret] = useState(Array(difficulty).fill(''))
    const [playerBSecret, setPlayerBSecret] = useState(Array(difficulty).fill(''))
    const [currentPlayer, setCurrentPlayer] = useState('A')
    const [playerAGuesses, setPlayerAGuesses] = useState([])
    const [playerBGuesses, setPlayerBGuesses] = useState([])
    const [playerAInput, setPlayerAInput] = useState(Array(difficulty).fill(''))
    const [playerBInput, setPlayerBInput] = useState(Array(difficulty).fill(''))
    const [winner, setWinner] = useState(null)
    const [setupPlayer, setSetupPlayer] = useState('A')

    const handleSecretSubmit = () => {
        const secret = setupPlayer === 'A' ? playerASecret : playerBSecret

        if (secret.some(d => d === '')) {
            alert('Please enter all digits!')
            return
        }

        const uniqueDigits = new Set(secret)
        if (uniqueDigits.size !== difficulty) {
            alert(`Please enter ${difficulty} unique digits!`)
            return
        }

        if (setupPlayer === 'A') {
            setSetupPlayer('B')
        } else {
            setPhase('playing')
        }
    }

    const handleGuess = () => {
        const input = currentPlayer === 'A' ? playerAInput : playerBInput
        const targetSecret = currentPlayer === 'A' ? playerBSecret.join('') : playerASecret.join('')

        if (input.some(d => d === '')) return

        const uniqueDigits = new Set(input)
        if (uniqueDigits.size !== difficulty) {
            alert(`Please enter ${difficulty} unique digits!`)
            return
        }

        const guessStr = input.join('')
        const res = calculateResult(targetSecret, guessStr)

        if (currentPlayer === 'A') {
            const newGuesses = [...playerAGuesses, { guess: guessStr, result: res }]
            setPlayerAGuesses(newGuesses)
            setPlayerAInput(Array(difficulty).fill(''))

            if (res === `${difficulty}A0B`) {
                handleWin('A', newGuesses, playerBGuesses)
                return
            }
        } else {
            const newGuesses = [...playerBGuesses, { guess: guessStr, result: res }]
            setPlayerBGuesses(newGuesses)
            setPlayerBInput(Array(difficulty).fill(''))

            if (res === `${difficulty}A0B`) {
                handleWin('B', playerAGuesses, newGuesses)
                return
            }
        }

        setCurrentPlayer(currentPlayer === 'A' ? 'B' : 'A')
    }

    const handleWin = (winningPlayer, aGuesses, bGuesses) => {
        setWinner(winningPlayer)
        setPhase('finished')

        saveGame({
            mode: 'two-player',
            difficulty,
            playerASecret: playerASecret.join(''),
            playerBSecret: playerBSecret.join(''),
            playerAGuesses: aGuesses,
            playerBGuesses: bGuesses,
            winner: `Player ${winningPlayer}`,
            attempts: winningPlayer === 'A' ? aGuesses.length : bGuesses.length
        })

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#016DF7', '#5243C2', '#FFD150', '#FF8CA4']
        })
    }

    const restart = () => {
        setPhase('setup')
        setPlayerASecret(Array(difficulty).fill(''))
        setPlayerBSecret(Array(difficulty).fill(''))
        setCurrentPlayer('A')
        setPlayerAGuesses([])
        setPlayerBGuesses([])
        setPlayerAInput(Array(difficulty).fill(''))
        setPlayerBInput(Array(difficulty).fill(''))
        setWinner(null)
        setSetupPlayer('A')
    }

    return (
        <div style={{ width: '100%', maxWidth: '900px', padding: '20px', minHeight: '100vh', margin: '0 auto' }}>
            <header style={{ textAlign: 'center', marginBottom: '20px', marginTop: '20px' }}>
                <button onClick={onBack} className="glass-btn" style={{ position: 'absolute', left: '20px', top: '20px', padding: '8px 16px', fontSize: '0.9rem' }}>
                    ← Back
                </button>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 700, textShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
                    Two Player Mode
                </h1>
                <p style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '5px' }}>{difficulty} Digits</p>
            </header>

            {phase === 'setup' && (
                <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>
                        Player {setupPlayer}: Set Your Secret Number
                    </h2>
                    <p style={{ marginBottom: '20px', opacity: 0.8 }}>
                        Enter {difficulty} unique digits (Player {setupPlayer === 'A' ? 'B' : 'A'} look away!)
                    </p>
                    <InputGrid
                        input={setupPlayer === 'A' ? playerASecret : playerBSecret}
                        setInput={setupPlayer === 'A' ? setPlayerASecret : setPlayerBSecret}
                        onSubmit={handleSecretSubmit}
                        disabled={false}
                    />
                    <button className="glass-btn" onClick={handleSecretSubmit} style={{ marginTop: '20px', padding: '12px 40px' }}>
                        Confirm
                    </button>
                </div>
            )}

            {phase === 'playing' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="glass-panel" style={{ padding: '20px', opacity: currentPlayer === 'A' ? 1 : 0.5 }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', textAlign: 'center' }}>
                            Player A {currentPlayer === 'A' && '👈'}
                        </h3>
                        <p style={{ textAlign: 'center', marginBottom: '10px', fontSize: '0.9rem' }}>
                            Guessing: {'*'.repeat(difficulty)}
                        </p>
                        <InputGrid
                            input={playerAInput}
                            setInput={setPlayerAInput}
                            onSubmit={currentPlayer === 'A' ? handleGuess : () => { }}
                            disabled={currentPlayer !== 'A'}
                        />
                        {currentPlayer === 'A' && (
                            <button className="glass-btn" onClick={handleGuess} style={{ width: '100%', marginTop: '10px' }}>
                                GUESS
                            </button>
                        )}
                        <div style={{ marginTop: '20px', maxHeight: '300px', overflowY: 'auto' }}>
                            {playerAGuesses.map((g, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <span>{g.guess}</span>
                                    <span style={{ fontWeight: 'bold', color: '#FFD150' }}>{g.result}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '20px', opacity: currentPlayer === 'B' ? 1 : 0.5 }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', textAlign: 'center' }}>
                            Player B {currentPlayer === 'B' && '👈'}
                        </h3>
                        <p style={{ textAlign: 'center', marginBottom: '10px', fontSize: '0.9rem' }}>
                            Guessing: {'*'.repeat(difficulty)}
                        </p>
                        <InputGrid
                            input={playerBInput}
                            setInput={setPlayerBInput}
                            onSubmit={currentPlayer === 'B' ? handleGuess : () => { }}
                            disabled={currentPlayer !== 'B'}
                        />
                        {currentPlayer === 'B' && (
                            <button className="glass-btn" onClick={handleGuess} style={{ width: '100%', marginTop: '10px' }}>
                                GUESS
                            </button>
                        )}
                        <div style={{ marginTop: '20px', maxHeight: '300px', overflowY: 'auto' }}>
                            {playerBGuesses.map((g, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <span>{g.guess}</span>
                                    <span style={{ fontWeight: 'bold', color: '#FFD150' }}>{g.result}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {phase === 'finished' && (
                <div className="glass-panel animate-pop" style={{ padding: '40px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '20px', color: 'var(--color-yellow)' }}>
                        🎉 Player {winner} Wins!
                    </h2>
                    <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
                        Player A's secret: <span style={{ fontWeight: 'bold', color: '#FF8CA4' }}>{playerASecret.join('')}</span><br />
                        Player B's secret: <span style={{ fontWeight: 'bold', color: '#FF8CA4' }}>{playerBSecret.join('')}</span>
                    </p>
                    <button className="glass-btn" onClick={restart} style={{ padding: '15px 40px', fontSize: '1.2rem' }}>
                        Play Again
                    </button>
                </div>
            )}
        </div>
    )
}
