import { useState, useEffect } from "react";

const getStorageValue = <T extends {}>(key: string, defaultValue: T): T => {
    const saved = localStorage.getItem(key);
    if (saved !== null) {
        return JSON.parse(saved!);
    } else {
        return defaultValue;
    }
};

const useLocalStorage = <T extends {}>(key: string, defaultValue: T,): [T, (newValue: T) => void] => {
    const [value, setValue] = useState<T>(() => getStorageValue(key, defaultValue));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};

export default useLocalStorage;