export interface ISearchResult {
    id: number;
    title: string;
}

export interface ISearchAutocomplete {
    name: string;
}

export interface ISearchGif {
    id: string;
    images: {
        fixed_height: {
            url: string;
        }
    };
}

export interface IFavoriteGif {
    id: string;
    src: string;
}