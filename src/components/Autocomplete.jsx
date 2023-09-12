import React from 'react';
import AutocompleteItem from "./AutocompleteItem";

const Autocomplete = ({query, results}) => {
    return (
        <div className="autocomplete">
            {results.map((result) =>
                <AutocompleteItem key={result.id} name={result.title} filter={query} />
            )}
        </div>
    );
};

export default Autocomplete;