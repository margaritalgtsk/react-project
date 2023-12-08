import React, {useMemo, useState} from 'react';
import {Col, ConfigProvider} from "antd";
import {HeartTwoTone} from '@ant-design/icons';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {addFavoriteGifs, removeFavoriteGifs, selectFavorites} from "../../store/slices/favoriteSlice"
import {ISearchGif} from "../../types/types";
import classes from "./GifItem.module.css";

const GifItem: React.FC<ISearchGif> = (result) => {

    const [isShown, setIsShown] = useState<boolean>(false);
    const favorites = useAppSelector(selectFavorites);
    const dispatch = useAppDispatch();

    const isFavorites = useMemo(() => favorites.some(f => f.id === result.id),
        [favorites, result.id]
    );

    const setFavorites = (result: ISearchGif) => {

        if (isFavorites) {
            dispatch(removeFavoriteGifs(result.id))

        } else {
            dispatch(addFavoriteGifs(result))
        }
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    screenSMMin: 468,
                    screenSM: 468
                }
            }}>
            <Col xs={24} sm={12} md={8}
                 className={classes.col}
                 onMouseEnter={() => setIsShown(true)}
                 onMouseLeave={() => setIsShown(false)}>
                <img
                    className={classes.gifImage}
                    src={result.images.fixed_height.url}
                    alt="giphy"
                />
                {(isFavorites || isShown) &&
                    <HeartTwoTone
                        className={classes.favorite_icon}
                        twoToneColor={isFavorites ? 'red' : 'gray'}
                        onClick={() => setFavorites(result)} />
                }
            </Col>
        </ConfigProvider>
    );
};

export default GifItem;