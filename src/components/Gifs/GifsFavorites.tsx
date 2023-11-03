import React, {FC} from 'react';
import {Row} from 'antd';
import {IFavoriteGif} from "../../types/types";
import GifItem from "./GifItem";

interface GifsFavoritesProps {
    favorites: IFavoriteGif[];
}
const GifsFavorites: FC<GifsFavoritesProps> = ({favorites}) => {

    return (
        <Row>
            {favorites.map((favorite) =>
                <GifItem
                    key={favorite.id}
                    id={favorite.id}
                    src={favorite.src}
                />
            )}
        </Row>
    );
};

export default GifsFavorites;