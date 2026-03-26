import { CatalogProducts } from '../Layout/CatalogProducts/CatalogProducts'
import { Raiting } from '../Raiting/Raiting'
import s from './Perfume.module.scss'
import AddToCart from '../../assets/svg/addToCart.svg?react'
import { IMAGES_URL } from '../../const';
import { Link } from 'react-router-dom'
import { addToCart } from '../../features/cartSlice';
import { useDispatch } from 'react-redux';

export const Perfume = ({ perfume }) => {
    const dispatch = useDispatch()
    return (
        <CatalogProducts>
            {perfume?.map((perfume) => {
                const category = perfume.perfume_category?.split(' ') || [];
                const volumes = perfume.volumes || []
                const sortVolume = [...volumes].sort((a, b) => a.volume_ml - b.volume_ml)
                const minPrice = volumes.length > 0 ? Math.min(...volumes.map(v => v.price)) : 0;

                return (
                    <div className={s['product']} key={perfume.perfume_id}>

                        <Link to={`/perfume/${perfume.perfume_id}`}>
                            <img
                                src={`${IMAGES_URL}${perfume.image_url}`}
                                alt={perfume.name}
                                className={s['catalog-img']}
                            />
                        </Link>

                        <div className={s['product-card']}>

                            <Link to={`/perfume/${perfume.perfume_id}`}>
                                <div className={s['product-info']}>
                                    <Raiting />

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
                            </Link>

                            <button
                                className={s['addToCart']}
                                onClick={() => dispatch(addToCart({
                                    id: perfume.perfume_id,
                                    name: perfume.name,
                                    brand: perfume.brand.name,
                                    volume: sortVolume[0],
                                    count: 1,
                                    image_url: perfume.image_url
                                }))}
                            >
                                <AddToCart />
                            </button>

                        </div>

                    </div>
                )
            }
            )}
        </CatalogProducts>
    )
}