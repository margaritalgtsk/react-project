import React, {FC, useEffect, useMemo, useState} from 'react';
import {Table} from 'antd';
import {ISearchGif} from "../../types/types";
import {removeFavoriteGifs} from "../../store/favoriteGifsReducer";
import {useAppDispatch} from "../../store/hooks";

interface GifsFavoritesTableProps {
    favorites: ISearchGif[];
}

const GifsFavoritesTable: FC<GifsFavoritesTableProps> = ({favorites}) => {

    const dispatch = useAppDispatch();
    const dataTable = useMemo(()=> favorites.map(result => {
        return {
            ...result,
            key: result.id,
        }
    }),[favorites]);

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    useEffect(() => {
        setSelectedRowKeys(dataTable.map(item => item.id))
    }, [dataTable] );

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

    const onSelectSelectedRow = (record: any) => {
        dispatch(removeFavoriteGifs(record.id));
        setSelectedRowKeys(selectedRowKeys => selectedRowKeys.filter((data) => data !== record.id ))
    };

    const rowSelection = {
        selectedRowKeys,
        onSelect: onSelectSelectedRow
    };

    return (
        <Table rowSelection={rowSelection} columns={columns} dataSource={dataTable} />
    );
};

export default GifsFavoritesTable;