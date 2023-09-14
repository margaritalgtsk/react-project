import React, {useEffect, useReducer, useState} from 'react';
import AutocompleteItem from "./AutocompleteItem";
import classes from './Autocomplete.module.css';

const Autocomplete = ({query, results, selectedIndex, updateData}) => {

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