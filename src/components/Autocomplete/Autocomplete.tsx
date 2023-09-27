import React, {FC} from 'react';
import AutocompleteItem from "./AutocompleteItem";
import classes from './Autocomplete.module.css';
import {ISearchResult} from "../../types/types";

interface IAutocompleteProps {
    query: string;
    results: ISearchResult[];
    selectedIndex: number;
    updateData: (value: ISearchResult) => void;
}

const Autocomplete: FC<IAutocompleteProps> = ({query, results, selectedIndex, updateData}) => {

    return (
        <div className={classes.autocomplete}>
            {results.map((result, i) =>
                <AutocompleteItem
                    key={result.id}
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