import s from './TopCatalog.module.scss'
import Filter from '../../../assets/svg/filter.svg?react'
import { FilterModal } from '../../FilterModal/FilterModal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../../../features/filterSlice';
import { fetchPerfume } from '../../../features/perfumeSlice';

const getPerfumeWord = (count) => {
    count = Math.abs(count) % 100;
    const lastDigit = count % 10;

    if (count > 10 && count < 20) return 'ароматов';
    if (lastDigit === 1) return 'аромат';
    if (lastDigit >= 2 && lastDigit <= 4) return 'аромата';
    return 'ароматов';
}

export const TopCatalog = ({ total }) => {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()

    const currentSort = useSelector(state => state.filters.sort)

    const handleSortChange = (e) => {
        const newSort = e.target.value
        dispatch(setSort(newSort))
        dispatch(fetchPerfume({ page: 1 }))
    }


    return (
        <div className={s['catalog-container']}>
            <div className={s['catalog-header']}>
                <div className={s['catalog-filters']}>
                    <button
                        className={s['filter-btn']}
                        onClick={() => setOpen(true)}
                    >
                        <div className={s['filter-icon']}>
                            <Filter />
                        </div>
                        фильтры
                    </button>

                    <div className={s['sort']}>
                        <select
                            id="sort-select"
                            className={s['sort-select']}
                            value={currentSort}
                            onChange={handleSortChange}
                        >
                            <option value="popularity">по популярности</option>
                            <option value="price-asc">по цене &uarr;</option>
                            <option value="price-desc">по цене &darr;</option>
                        </select>
                    </div>
                </div>

                <div className={s['count-products']}>
                    {total} {getPerfumeWord(total)}
                </div>

                <FilterModal
                    open={open}
                    onClose={() => setOpen(false)}
                />
            </div>
        </div>
    )
}