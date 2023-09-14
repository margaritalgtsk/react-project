import {useMemo} from "react";

export const useSearch = (query, list) => {
    const searchingResults = useMemo(() => {
        return list.filter(elem => elem.title.toLowerCase().startsWith(query.toLowerCase()));
    }, [query, list])

    return searchingResults;

}