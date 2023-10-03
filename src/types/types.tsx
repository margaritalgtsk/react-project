export interface ISearchResult {
    id: number;
    title: string;
}

export interface ISearchAutocomplete {
    name: string;
}
export interface IGetAutocompleteResponse {
    data: ISearchAutocomplete[];
};