import React, {useState} from 'react';
import SearchInput from "./SearchInput";
import Autocomplete from "../Autocomplete/Autocomplete";
import {useSearch} from "../../hooks/useSearch";
import animals from "../../data/animals";
import {useKeyboardNav} from "../../hooks/useKeyboardNav";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const searchingResults = useSearch(searchQuery, animals);

    const updateData = (value) => {
        setSearchQuery(value);
    }
    const [handleKeyDown, selectedIndex] = useKeyboardNav(searchingResults, updateData);


    return (
        <div onKeyDown={handleKeyDown}>
            <SearchInput query={searchQuery} setQuery={setSearchQuery} />
            {searchQuery &&
            <Autocomplete query={searchQuery}
                          results={searchingResults}
                          updateData={updateData}
                          selectedIndex={selectedIndex}
            />
            }
        </div>
    );
};

export default Search;