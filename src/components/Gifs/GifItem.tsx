import React, {useState} from 'react';
import {Col} from "antd";
import {HeartTwoTone} from '@ant-design/icons';
import classes from "./Gifs.module.css";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {addFavoriteGifs, removeFavoriteGifs} from "../../store/favoriteGifsReducer"

interface IGifItemProps {
    id: string;
    src: string;
}

const GifItem: React.FC<IGifItemProps> = ({id, src}) => {

    const [isShown, setIsShown] = useState<boolean>(false);
    const favorites = useAppSelector((state) => state.favorites.favorites);
    const dispatch = useAppDispatch();

    const setFavorites = (id: string, src: string) => {
        const data = {
            id: id,
            src: src,
        };

        if (favorites.some(f => f.id === id) ) {
            dispatch(removeFavoriteGifs({id}))

        } else {
            dispatch(addFavoriteGifs(data))
        }
    };

    return (
        <Col span={8}
             className={classes.col}
             onMouseEnter={() => setIsShown(true)}
             onMouseLeave={() => setIsShown(false)}>
            <img
                className={classes.gifImage}
                src={src}
                alt="giphy"
            />
            {isShown && (
                <HeartTwoTone
                    className={classes.favorite_icon}
                    twoToneColor={favorites.some(f => f.id === id) ? 'red' : 'grey'}
                    onClick={() => setFavorites(id, src)}
                />
            )}
        </Col>
    );
};

export default GifItem;