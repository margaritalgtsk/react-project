import React, {useEffect, useReducer, useState} from 'react';
import AutocompleteItem from "./AutocompleteItem";
import {useKeyPress} from "../hooks/useKeyPress";

const Autocomplete = ({query, results}) => {
    const arrowUpPressed = useKeyPress('ArrowUp');
    const arrowDownPressed = useKeyPress('ArrowDown');
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        if (arrowUpPressed) {
            setSelectedIndex(selectedIndex !== 0 ? selectedIndex - 1 : results.length - 1)
        }
    }, [arrowUpPressed]);

    useEffect(() => {
        if (arrowDownPressed) {
            setSelectedIndex(selectedIndex !== results.length - 1 ? selectedIndex + 1 : 0)
        }
    }, [arrowDownPressed]);

    return (
        <div className="autocomplete">
            {results.map((result, i) =>
                <AutocompleteItem
                    key={result.id}
                    name={result.title}
                    filter={query}
                    active={i === selectedIndex}
                />
            )}
        </div>
    );
};

export default Autocomplete;