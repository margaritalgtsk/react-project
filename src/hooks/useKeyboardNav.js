import {useState} from "react";

export const useKeyboardNav = (searchingResults, updateData) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleKeyDown = event => {
        if (event.key === 'ArrowUp') {
            setSelectedIndex(prevState => (prevState > 0 ? prevState - 1 : prevState));
        }
        if (event.key === 'ArrowDown') {
            setSelectedIndex(prevState =>
                prevState < searchingResults.length - 1 ? prevState + 1 : prevState
            );
        }
        if (event.key === 'Enter') {
            updateData(searchingResults[selectedIndex].title)
        }
    };

    return [handleKeyDown, selectedIndex];
}