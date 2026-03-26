import s from './CartItem.module.scss'
import DeleteIcon from '../../../assets/svg/deleteIcon.svg?react'
import { useDispatch } from 'react-redux'
import { IMAGES_URL } from '../../../const';
import { incrementItem, decrementItem, removeFromCart } from '../../../features/cartSlice';
import { NavLink } from 'react-router-dom';

export const CartItem = ({ id, name, brand, volume, count, image_url }) => {

    const dispatch = useDispatch();
    const price = volume.price * count

    return (
        <>
            <div className={s['cart-item']}>
                <button
                    onClick={() => dispatch(removeFromCart({ id, volume }))}
                    className={s['cart-item-delete']}>
                    <DeleteIcon />
                </button>

                <div className={s['cart-item-product']}>
                    <div className={s['cart-item-product_info']}>
                        <img
                            className={s['cart-item-img']}
                            src={`${IMAGES_URL}${image_url}`}
                            alt={name}
                        />
                        <div className={s['cart-item-product_meta']}>
                            <NavLink to={`/perfume/${id}`} className={s['cart-item-product_link']}>
                                <div className={s['cart-item-title']}>{name} </div>
                                <div className={s['cart-item-titleBrand']}>{brand} </div>
                            </NavLink>
                            <div className={s['cart-item-volume']}>{volume.volume_ml}мл</div>
                        </div>
                    </div>


                    <div className={s['cart-item-actions']}>
                        <button
                            className={s['cart-item-btn']}
                            onClick={() => dispatch(decrementItem({ id, volume }))}
                        >-</button>
                        <span className={s['cart-item-count']}>{count}</span>
                        <button
                            className={s['cart-item-btn']}
                            onClick={() => dispatch(incrementItem({ id, volume }))}
                        >+</button>
                        <span className={s['cart-item-price']}>{price.toLocaleString('ru-RU')} ₽</span>
                    </div>
                </div>
            </div>
            <div className={s['line-item']}></div>
        </>
    )
}