import React, { useRef, useEffect } from 'react';
import '../styles/glass.css';

export default function InputGrid({ input, setInput, onSubmit, disabled }) {
    const inputsRef = useRef([]);

    useEffect(() => {
        // Focus first input on mount or when reset
        if (inputsRef.current[0] && !disabled) {
            inputsRef.current[0].focus();
        }
    }, [disabled, input.length]);

    const handleChange = (index, value) => {
        if (!/^\d?$/.test(value)) return; // Only digits
        const newInput = [...input];
        newInput[index] = value;
        setInput(newInput);

        // Auto focus next
        if (value && index < input.length - 1) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !input[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
        if (e.key === 'Enter') {
            onSubmit();
        }
    };

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${input.length}, 1fr)`,
            gap: input.length > 6 ? '6px' : '10px',
            width: '100%',
            maxWidth: input.length > 6 ? 'min(90vw, 420px)' : 'min(90vw, 360px)',
            margin: '20px auto',
            padding: '0 10px',
            transition: 'all 0.3s ease'
        }}>
            {input.map((val, i) => (
                <input
                    key={i}
                    ref={el => inputsRef.current[i] = el}
                    className="glass-input"
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={val}
                    disabled={disabled}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    style={{
                        height: input.length > 6 ? '50px' : '60px',
                        fontSize: input.length > 6 ? '1.5rem' : '2rem',
                        minWidth: 0
                    }}
                />
            ))}
        </div>
    );
}
