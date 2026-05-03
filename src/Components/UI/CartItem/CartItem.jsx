import s from './CartItem.module.scss'
import DeleteIcon from '../../../assets/svg/deleteIcon.svg?react'
import { useDispatch } from 'react-redux'
import { IMAGES_URL } from '../../../const';
import { incrementItem, decrementItem, removeFromCart } from '../../../features/cartSlice';
import { NavLink } from 'react-router-dom';

export const CartItem = ({
    item,
    incrementItem,
    decrementItem,
    removeItem,
    isSubscription = false
}) => {
    const { id, name, brand, volume, count, image_url } = item
    const price = volume.price * count

    return (
        <>
            <div className={s['cart-item']}>
                <button
                    onClick={() => removeItem(item)}
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
                            {
                                !isSubscription && (
                                    <div className={s['cart-item-volume']}>{volume.volume_ml}мл</div>
                                )
                            }
                        </div>
                    </div>

                    {
                        !isSubscription && (
                            <div className={s['cart-item-actions']}>
                                <button
                                    className={s['cart-item-btn']}
                                    onClick={() => decrementItem(item)}
                                >-</button>
                                <span className={s['cart-item-count']}>{count}</span>
                                <button
                                    className={s['cart-item-btn']}
                                    onClick={() => incrementItem(item)}
                                >+</button>
                                <span className={s['cart-item-price']}>{price.toLocaleString('ru-RU')} ₽</span>
                            </div>
                        )
                    }

                </div>
            </div>
            <div className={s['line-item']}></div>
        </>
    )
}