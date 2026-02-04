const HISTORY_KEY = 'glass-guess-history';
const MAX_HISTORY = 50;

export const saveGame = (gameData) => {
    const history = getHistory();
    const newGame = {
        id: Date.now(),
        date: new Date().toISOString(),
        ...gameData
    };

    history.unshift(newGame);

    // Keep only last 50 games
    if (history.length > MAX_HISTORY) {
        history.splice(MAX_HISTORY);
    }

    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    return newGame.id;
};

export const getHistory = () => {
    try {
        const data = localStorage.getItem(HISTORY_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
};

export const getGameById = (id) => {
    const history = getHistory();
    return history.find(game => game.id === id);
};

export const deleteGame = (id) => {
    const history = getHistory();
    const filtered = history.filter(game => game.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
};

export const clearHistory = () => {
    localStorage.removeItem(HISTORY_KEY);
};
