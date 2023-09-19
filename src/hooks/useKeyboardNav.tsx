import {useState} from "react";
import {ISearchingResult} from "../types/types";

export const useKeyboardNav = (searchingResults: ISearchingResult[], updateData: (title: string) => void): [React.KeyboardEventHandler<HTMLDivElement>, number] => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

        const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
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
