import React, {FC, useEffect, useMemo, useState} from 'react';
import {Table, Modal} from 'antd';
import {IPageCurrent, ISearchGif} from "../../types/types";
import {fetchGifs} from "../../asyncAction/fetchGifs"
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {addFavoriteGifs, removeFavoriteGifs, selectFavorites} from "../../store/slices/favoriteSlice";
import {ColumnsType} from "antd/es/table/interface";
import {selectTotalGifs} from "../../store/slices/searchGifsSlice";
import classes from "./GifsTableView.module.css";

interface IGifsTableViewProps {
    results: ISearchGif[];
    searchQuery: string;
    isSearchResult: boolean;
    pageCurrent: IPageCurrent;
    setPageCurrent: (pageCurrent: IPageCurrent) => void;
}

const GifsTableView: FC<IGifsTableViewProps> = ({results, searchQuery, isSearchResult, pageCurrent, setPageCurrent}) => {

    const [page, setPage] = useState<number>(1);
    const totalGifs = useAppSelector(selectTotalGifs);
    const maxTotalGifs = 54;
    const pageSize = 9;
    const dispatch = useAppDispatch();
    const favorites = useAppSelector(selectFavorites);

    const dataTable = useMemo(()=> results.map(result => {
        return {
            ...result,
            key: result.id,
        }
    }),[results]);

    const initialSelectedRow = useMemo(()=> {
        return  dataTable.filter(result => favorites.some(favorite => result.id === favorite.id)).map(item => item.id);
    },[dataTable, favorites]);

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    useEffect(() => {
        setSelectedRowKeys(initialSelectedRow)
    }, [initialSelectedRow] );

    const onSelectSelectedRow = (record: ISearchGif, selected: boolean) => {

        const data = {
            id: record.id,
            images: {
                fixed_height: {
                    url: record.images.fixed_height.url
                },
                fixed_height_small: {
                    url: record.images.fixed_height_small.url
                },
                original: {
                    url: record.images.original.url
                }
            },
            title: record.title,
            rating: record.rating,
            type: record.type,
            import_datetime: record.import_datetime
        };

        if (!selected) {
            dispatch(removeFavoriteGifs(record.id));
            setSelectedRowKeys(selectedRowKeys => selectedRowKeys.filter((data) => data !== record.id ))

        } else {
            dispatch(addFavoriteGifs(data));
            setSelectedRowKeys([...selectedRowKeys, record.id]);
        }
    };

    const rowSelection = {
        selectedRowKeys,
        onSelect: onSelectSelectedRow
    };

    const handleChangePage = (page: number) => {
        setPage(page);
        setPageCurrent({...pageCurrent, pageSearch: page});
        const offset = (page - 1) * pageSize;
        dispatch(fetchGifs({searchQuery, offset}))
    };

    const columns: ColumnsType<ISearchGif> = [
        {
            title: 'Image',
            dataIndex: 'images',
            render: (images: {
                fixed_height_small: {
                    url: string;
                }
            }) => <img alt='giphy' src={images.fixed_height_small.url} />,
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

    const paginationSearchParams = {
        defaultCurrent: 1,
        current: pageCurrent.pageSearch,
        total: (totalGifs > maxTotalGifs ? maxTotalGifs - pageSize : totalGifs - pageSize),
        onChange: handleChangePage
    };

    const paginationFavoriteParams = {
        defaultCurrent: 1,
        current: pageCurrent.pageFavorite,
        pageSize: pageSize,
        onChange: (page: number) => setPageCurrent({...pageCurrent, pageFavorite: page})
    };

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalData, setModalData] = useState<ISearchGif | null>(null);

    const showModal = (record: ISearchGif) => {
        setModalData(record);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setModalData(null);
        setIsModalOpen(false);
    };

    return (
        <>
            {dataTable.length > 0 &&
                <Table
                    onRow={(record) => {
                        return { onClick: (event) => showModal(record)};
                    }}
                    rowClassName={classes.table_row}
                    dataSource={dataTable}
                    columns={columns}
                    rowSelection={rowSelection}
                    pagination={isSearchResult ? paginationSearchParams : paginationFavoriteParams}
                />
            }
            {modalData &&
                <Modal title={modalData.title} open={isModalOpen} onCancel={handleCancel} footer={null}>
                    <img className={classes.modal_image} src={modalData.images.original.url} alt='giphy'/>
                </Modal>
            }
        </>
    );
};

export default GifsTableView;