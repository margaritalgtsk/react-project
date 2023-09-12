import {useMemo} from "react";

export const useSearch = (query, list) => {
    const searchingResults = useMemo(() => {
        return list.filter(elem => elem.title.toLowerCase().includes(query));
    }, [query, list])

    return searchingResults;

}