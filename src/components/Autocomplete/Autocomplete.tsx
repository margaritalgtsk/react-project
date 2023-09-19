import React, {FC} from 'react';
import AutocompleteItem from "./AutocompleteItem";
import classes from './Autocomplete.module.css';
import {ISearchingResult} from "../../types/types";

interface AutocompleteProps {
    query: string;
    results: ISearchingResult[];
    selectedIndex: number;
    updateData: (name: string) => void;
}

const Autocomplete: FC<AutocompleteProps> = ({query, results, selectedIndex, updateData}) => {
    
    return (
        <div className={classes.autocomplete}>
            {results.map((result, i) =>
                <AutocompleteItem
                    key={result.id}
                    name={result.title}
                    filter={query}
                    active={i === selectedIndex}
                    updateData={updateData}
                />
            )}
        </div>
    );
};

export default Autocomplete;