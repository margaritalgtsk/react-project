import { useMemo } from "react";
import {ISearchResult} from "../types/types";

export const useSearch = (query: string, list: ISearchResult[]): ISearchResult[] => {
    const searchingResults = useMemo(() => {
        return list.filter(elem => elem.title.toLowerCase().startsWith(query.toLowerCase()));
    }, [query, list]);

    return searchingResults;
};