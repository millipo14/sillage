import { CatalogProducts } from '../Layout/CatalogProducts/CatalogProducts'
import { Raiting } from '../UI/Rating/Rating'
import s from './Perfume.module.scss'
import AddToCart from '../../assets/svg/addToCart.svg?react'
import { IMAGES_URL } from '../../const';
import { Link } from 'react-router-dom'
import { addToCart } from '../../features/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export const Perfume = ({ perfume, sourceFrom, isHome, status }) => {
    const dispatch = useDispatch()

    if (status === 'loading' && (!perfume || perfume.length === 0)) {
        return null;
    }

    if (status !== 'loading' && (!perfume || perfume.length === 0)) {
        return (
            <CatalogProducts>
                <div className={s['no-results']}>
                    <div className={s['no-results_icon']}>&#10006;</div>
                    <h3>Ароматы не найдены</h3>
                    <p>Попробуйте сбросить фильтры или изменить параметры поиска</p>
                </div>
            </CatalogProducts>
        );
    }

    return (
        <CatalogProducts className={isHome ? s.oneLine : ''}>
            {perfume?.map((perfume) => {
                const category = perfume.perfume_category?.split(' ') || [];
                const volumes = perfume.volumes || []
                const sortVolume = [...volumes].sort((a, b) => a.volume_ml - b.volume_ml)
                const minPrice = volumes.length > 0 ? Math.min(...volumes.map(v => v.price)) : 0;

                const currentRating = perfume.rating || 0;

                return (
                    <div className={s['product']} key={perfume.perfume_id}>

                        <Link
                            to={`/perfume/${perfume.perfume_id}`}
                            state={
                                sourceFrom === 'brand'
                                    ? {
                                        from: 'brand',
                                        brandId: perfume.brand.brand_id,
                                        brandName: perfume.brand.name
                                    }
                                    : sourceFrom === 'recommendations'
                                        ? { from: 'recommendations' }
                                        : { from: 'catalog' }
                            }
                        >
                            <img
                                src={`${IMAGES_URL}${perfume.image_url}`}
                                alt={perfume.name}
                                className={s['catalog-img']}
                            />

                            <div className={s['product-card']}>
                                <div className={s['product-info']}>
                                    <Raiting currentRating={currentRating} />

                                    <div className={s['product-brand']}>
                                        {perfume.brand.name}
                                    </div>

                                    <div className={s['product-name']}>
                                        {perfume.name}
                                    </div>

                                    <div className={s['product-category']}>
                                        {category.map((category, index) => (
                                            <span key={index} className={s['product-category_name']}>
                                                {category}
                                            </span>
                                        ))}
                                    </div>

                                    <div className={s['product-volume']}>
                                        <div className={s['product-volume_list']}>
                                            {sortVolume.map(v => (
                                                <span key={v.id} className={s['product-volume_item']}>
                                                    {v.volume_ml}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={s['product-price']}>
                                        от {minPrice ? Number(minPrice).toLocaleString('ru-RU') : '-'} ₽
                                    </div>
                                </div>

                                <button
                                    className={s['addToCart']}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        dispatch(addToCart({
                                            id: perfume.perfume_id,
                                            name: perfume.name,
                                            brand: perfume.brand.name,
                                            volume: sortVolume[0],
                                            count: 1,
                                            image_url: perfume.image_url
                                        }))
                                    }}>
                                    <AddToCart />
                                </button>

                            </div>
                        </Link>
                    </div>
                )
            }
            )}
        </CatalogProducts>
    )
}