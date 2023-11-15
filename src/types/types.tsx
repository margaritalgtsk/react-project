export interface ISearchResult {
    id: number;
    title: string;
}

export interface ISearchAutocomplete {
    name: string;
}

export interface ISearchGif {
    id: string;
    key?: React.Key;
    images: {
        fixed_height: {
            url: string;
        }
    };
    title: string;
    rating: string;
    type: string;
    import_datetime: string;
}

export interface IPageCurrent {
    pageSearch: number;
    pageFavorite: number;
}