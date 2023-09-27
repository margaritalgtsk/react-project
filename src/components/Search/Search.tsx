import React, {useState} from 'react';
import SearchInput from "./SearchInput";
import Autocomplete from "../Autocomplete/Autocomplete";
import {useSearch} from "../../hooks/useSearch";
import animals from "../../data/animals.json";
import {useKeyboardNav} from "../../hooks/useKeyboardNav";
import {ISearchResult} from "../../types/types";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const searchingResults = useSearch(searchQuery, animals);

    const updateData = (value: ISearchResult) => {
        setSearchQuery(value.title);
    }

    const [handleKeyDown, selectedIndex] = useKeyboardNav<ISearchResult>(searchingResults, updateData);

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