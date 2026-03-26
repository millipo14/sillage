import s from './TopCatalog.module.scss'
import Filter from '../../../assets/svg/filter.svg?react'

export const TopCatalog = ({ total }) => {


    return (
        <div className={s['catalog-container']}>
            <div className={s['catalog-header']}>
                <div className={s['catalog-filters']}>
                    <button className={s['filter-btn']}>
                        <div className={s['filter-icon']}>
                            <Filter />
                        </div>
                        фильтры
                    </button>
                    <div className={s['sort']}>
                        <select id="sort-select" className={s['sort-select']}>
                            <option value="popularity">по популярности</option>
                            <option value="price-asc">по цене &uarr;</option>
                            <option value="price-desc">по цене &darr;</option>
                        </select>
                    </div>
                </div>

                <div className={s['count-products']}>
                    {total} аромата
                </div>
            </div>
        </div>
    )
}