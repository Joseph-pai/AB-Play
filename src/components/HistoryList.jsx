import React, { useEffect, useRef } from 'react';
import '../styles/glass.css';

export default function HistoryList({ history }) {
    const listRef = useRef(null);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [history]);

    return (
        <div className="glass-panel" ref={listRef} style={{
            flex: 1,
            minHeight: '200px',
            overflowY: 'auto',
            padding: '16px',
            marginTop: '20px',
            marginBottom: '20px',
            background: 'rgba(255, 255, 255, 0.15)'
        }}>
            {history.length === 0 && (
                <div style={{
                    color: 'rgba(255,255,255,0.6)',
                    textAlign: 'center',
                    marginTop: '60px'
                }}>
                    Start guessing... <br />
                    <span style={{ fontSize: '0.8rem' }}>Try 4 unique digits</span>
                </div>
            )}
            {history.map((item, i) => (
                <div key={i} className="animate-pop" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px',
                    marginBottom: '8px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <span style={{ fontSize: '1.4rem', letterSpacing: '4px', fontFamily: 'monospace' }}>{item.guess}</span>
                    <span style={{
                        fontWeight: 'bold',
                        color: item.result === '4A0B' ? '#FFD150' : 'white',
                        background: item.result === '4A0B' ? 'var(--color-purple)' : 'rgba(255,255,255,0.1)',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        minWidth: '60px',
                        textAlign: 'center'
                    }}>{item.result}</span>
                </div>
            ))}
        </div>
    )
}
