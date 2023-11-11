import React, {FC, useEffect, useMemo, useState} from 'react';
import {Table} from 'antd';
import {Pagination} from 'antd';
import {ISearchGif} from "../../types/types";
import {fetchGifs} from "../../asyncAction/fetchGifs"
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {addFavoriteGifs, removeFavoriteGifs} from "../../store/favoriteGifsReducer";

interface IGifsResultTabletProps {
    results: ISearchGif[];
    searchQuery: string;
}

const GifsResultTable: FC<IGifsResultTabletProps> = ({results, searchQuery}) => {

    const [page, setPage] = useState<number>(1);
    const totalGifs = useAppSelector((state) => state.searchGifs.total);
    const maxTotalGifs = 54;
    const pageSize = 9;
    const offset = page * pageSize;
    const dispatch = useAppDispatch();
    const favorites = useAppSelector((state) => state.favorites.favorites);

    const dataTable = useMemo(()=> results.map(result => {
        return {
            ...result,
            key: result.id,
        }
    }),[results]);

    const initialSelectedRow = useMemo(()=> {
        return  dataTable.filter(result => favorites.some(favorite => result.id === favorite.id)).map(item => item.id);
    },[results, favorites]);

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    useEffect(() => {
        setSelectedRowKeys(initialSelectedRow)
    }, [initialSelectedRow] );


    //selectedRowKeys: React.Key[]
    const onSelectSelectedRow = (record: any, selected: boolean, selectedRowKeys: any) => {

        const data = {
            id: record.id,
            images: {
                fixed_height: {
                    url: record.images.fixed_height.url
                }
            },
            title: record.title,
            rating: record.rating,
            type: record.type,
            import_datetime: record.import_datetime
        };

        if (!selected) {
            dispatch(removeFavoriteGifs(record.id))
            setSelectedRowKeys(selectedRowKeys => selectedRowKeys.filter((data) => data !== record.id ))

        } else {
            dispatch(addFavoriteGifs(data))
            setSelectedRowKeys([...selectedRowKeys, record.id]);
        }
    };

    const rowSelection = {
        selectedRowKeys,
        onSelect: onSelectSelectedRow
    };

    useEffect(() => {
        dispatch(fetchGifs({searchQuery, offset}))
    },[page]);

    const changePage = (page: number) => {
        setPage(page)
    };

    const columns  = [
        {
            title: 'Image',
            dataIndex: 'images',
            render: (images: any) => <img alt='giphy' src={images.fixed_height.url} />,
            key: 'images',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Import datetime',
            dataIndex: 'import_datetime',
            key: 'import_datetime',
        },
    ];

    return (
        <>
            {dataTable.length > 0 &&
                <>
                    <Table
                        dataSource={dataTable}
                        columns={columns}
                        rowSelection={rowSelection}
                        pagination={false}
                    />

                    <Pagination
                        defaultCurrent={1}
                        total={totalGifs > maxTotalGifs ? maxTotalGifs - pageSize : totalGifs - pageSize}
                        pageSize={pageSize}
                        onChange={changePage}/>
                </>
            }
        </>

    );
};

export default GifsResultTable;