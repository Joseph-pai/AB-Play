export const generateSecret = (length = 4) => {
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let secret = '';
    while (secret.length < length) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        secret += digits[randomIndex];
        digits.splice(randomIndex, 1);
    }
    return secret;
};

export const calculateResult = (secret, guess) => {
    let A = 0;
    let B = 0;
    const secretArr = secret.split('');
    const guessArr = guess.split('');

    guessArr.forEach((digit, index) => {
        if (digit === secretArr[index]) {
            A++;
        } else if (secretArr.includes(digit)) {
            B++;
        }
    });

    return `${A}A${B}B`;
};
