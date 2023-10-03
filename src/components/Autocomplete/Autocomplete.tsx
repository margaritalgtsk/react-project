import React, {FC} from 'react';
import AutocompleteItem from "./AutocompleteItem";
import classes from './Autocomplete.module.css';
import {ISearchAutocomplete} from "../../types/types";

interface IAutocompleteProps {
    query: string;
    selectedIndex: number;
    updateData: (value: ISearchAutocomplete) => void;
    results: ISearchAutocomplete[];
}

const Autocomplete: FC<IAutocompleteProps> = ({query, results, selectedIndex, updateData}) => {

    return (
        <div className={classes.autocomplete}>
            {results.map((result, i) =>
                <AutocompleteItem
                    key={i}
                    result={result}
                    filter={query}
                    active={i === selectedIndex}
                    updateData={updateData}
                />
            )}
        </div>
    );
};

export default Autocomplete;