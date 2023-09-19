import { useMemo } from "react";
import {ISearchingResult} from "../types/types";

export const useSearch = (query: string, list: ISearchingResult[]): ISearchingResult[] => {
    const searchingResults = useMemo(() => {
        return list.filter(elem => elem.title.toLowerCase().startsWith(query.toLowerCase()));
    }, [query, list]);

    return searchingResults;
}
