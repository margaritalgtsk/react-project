export const saveToLocalStorage = <T extends {}>(state: T): void  => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        console.log('error occured ', err)
    }
};

export const loadFromLocalStorage = <T extends {}>(): T | undefined => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (err) {
        console.log('error occured ', err)
    }
};