import React, {FC} from 'react';
import {Row} from 'antd';
import {ISearchGif} from "../../types/types";
import GifItem from "./GifItem";

interface GifsFavoritesProps {
    favorites: ISearchGif[];
}
const GifsFavorites: FC<GifsFavoritesProps> = ({favorites}) => {

    return (
        <Row>
            {favorites.map((favorite) =>
                <GifItem key={favorite.id} {...favorite} />
            )}
        </Row>
    );
};

export default GifsFavorites;