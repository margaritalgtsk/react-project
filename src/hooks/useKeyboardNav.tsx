import {useState} from "react";

export const useKeyboardNav = <T extends {}>(searchingResults: T[], updateData: (value: T) => void): [React.KeyboardEventHandler<HTMLDivElement>, number] => {
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowUp') {
            setSelectedIndex(prevState => (prevState > 0 ? prevState - 1 : -1));
        }
        if (event.key === 'ArrowDown') {
            setSelectedIndex(prevState =>
                prevState < searchingResults.length - 1 ? prevState + 1 : prevState
            );
        }
        if (event.key === 'Enter' && selectedIndex >= 0) {
            updateData(searchingResults[selectedIndex]);
        }
    };

    return [handleKeyDown, selectedIndex];
};