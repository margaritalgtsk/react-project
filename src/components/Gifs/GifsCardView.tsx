import React, {FC, useState} from 'react';
import {Row} from 'antd';
import {Pagination} from 'antd';
import {IPageCurrent, ISearchGif} from "../../types/types";
import GifItem from "./GifItem";
import {fetchGifs} from "../../asyncAction/fetchGifs"
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectTotalGifs} from "../../store/slices/searchGifsSlice";

interface IGifsResultProps {
    results: ISearchGif[];
    searchQuery: string;
    isSearchResult: boolean;
    pageCurrent: IPageCurrent;
    setPageCurrent: (pageCurrent: IPageCurrent) => void;
}

const GifsCardView: FC<IGifsResultProps> = ({results, searchQuery, isSearchResult, pageCurrent, setPageCurrent}) => {

    const [page, setPage] = useState<number>(1);
    const maxTotalGifs = 54;
    const pageSize = 9;
    const totalGifs = useAppSelector(selectTotalGifs);
    const dispatch = useAppDispatch();

    const handleChangeSearchPage = (page: number) => {
        setPage(page);
        setPageCurrent({...pageCurrent, pageSearch: page});
        const offset = (page - 1) * pageSize;
        dispatch(fetchGifs({searchQuery, offset}))
    };

    const handleChangeFavoritePage = (page: number) => {
        setPage(page);
        setPageCurrent({...pageCurrent, pageFavorite: page});
    };

    const dataCards = isSearchResult ? results : results.slice((page - 1) * pageSize, pageSize * page);

    return (
        <>
            <Row gutter={[16, 16]}>
                {dataCards.map((result) =>
                    <GifItem key={result.id} {...result} />
                )}
            </Row>
            {dataCards.length > 0 && (
                isSearchResult
                    ? <Pagination
                        defaultCurrent={1}
                        current={pageCurrent.pageSearch}
                        total={totalGifs > maxTotalGifs ? maxTotalGifs - pageSize : totalGifs - pageSize}
                        onChange={handleChangeSearchPage} />
                    :  <Pagination
                        defaultCurrent={1}
                        current={pageCurrent.pageFavorite}
                        pageSize={pageSize}
                        total={results.length}
                        onChange={handleChangeFavoritePage}/>
            )}
        </>
    );
};

export default GifsCardView;