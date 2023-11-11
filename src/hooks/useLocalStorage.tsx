import { useState, useEffect } from "react";

function getStorageValue(key: string, defaultValue: boolean) {
    const saved = localStorage.getItem(key);
    if (saved !== 'undefined') {
        return JSON.parse(saved!);
    } else {
        return defaultValue;
    }
}

export const useLocalStorage = (key: string, defaultValue: boolean) => {
    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};