import React, {FC, useEffect, useState} from 'react';
import {Row} from 'antd';
import {Pagination} from 'antd';
import {ISearchGif} from "../../types/types";
import GifItem from "./GifItem";
import {fetchGifs} from "../../asyncAction/fetchGifs"
import {useAppDispatch, useAppSelector} from "../../store/hooks";

interface IGifsResultProps {
    results: ISearchGif[];
    searchQuery: string;
}

const GifsResult: FC<IGifsResultProps> = ({results, searchQuery}) => {

    const [page, setPage] = useState<number>(1);
    const totalGifs = useAppSelector((state) => state.searchGifs.total);
    const maxTotalGifs = 54;
    const pageSize = 9;
    const offset = page * pageSize;

    const dispatch = useAppDispatch();

    const changePage = (page: number) => {
        setPage(page)
    };

    useEffect(() => {
        dispatch(fetchGifs({searchQuery, offset}))
    },[page]);

    return (
        <>
            <Row gutter={[16, 16]}>
                {results.map((result, i) =>
                    <GifItem
                        key={result.id}
                        id={result.id}
                        src={result.images.fixed_height.url}/>
                )}
            </Row>
            {results.length > 0 &&
                <Pagination
                    defaultCurrent={1}
                    total={totalGifs > maxTotalGifs ? maxTotalGifs - pageSize : totalGifs - pageSize}
                    pageSize={pageSize}
                    onChange={changePage}/>
            }
        </>

    );
};

export default GifsResult;