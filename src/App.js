import React, {useState} from 'react';
import animals from './data/animals.json';
import {useSearch} from "./hooks/useSearch";
import SearchInput from "./components/SearchInput";
import Autocomplete from "./components/Autocomplete";
import './styles/App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const searchingResults = useSearch(searchQuery, animals);

  return (
    <>
      <SearchInput query={searchQuery} setQuery={setSearchQuery} />
      {searchQuery &&
        <Autocomplete query={searchQuery} results={searchingResults} />
      }
    </>
  );
}

export default App;
