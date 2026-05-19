import React from 'react'
import s from './OrderItem.module.scss'
import { IMAGES_URL } from '../../../const'
import { NavLink } from 'react-router-dom'

export default function OrderItem({ item }) {
    const { perfume, price_at_purchase, quantity, volume } = item;

    return (
        <div className={s['cart-item-wrapper']}>
            <div className={s['cart-item']}>
                <div className={s['cart-item-product']}>
                    <div className={s['cart-item-product_info']}>
                        <img
                            className={s['cart-item-img']}
                            src={`${IMAGES_URL}${perfume.image_url}`}
                            alt={perfume.name}
                        />
                        <div className={s['cart-item-product_meta']}>
                            <NavLink to={`/perfume/${perfume.perfume_id}`} className={s['cart-item-product_link']}>
                                <div className={s['cart-item-title']}>{perfume.name}</div>
                                <div className={s['cart-item-titleBrand']}>{perfume.brand}</div>
                            </NavLink>
                            <div className={s['cart-item-volume']}>{volume} мл</div>
                        </div>
                    </div>

                    <div className={s['cart-item-actions']}>
                        <div className={s['cart-item-count']}>{quantity} шт.</div>
                        <div className={s['cart-item-price']}>
                            {Number(price_at_purchase).toLocaleString('ru-RU')} ₽
                        </div>
                    </div>
                </div>
            </div>
            <div className={s['line-item']}></div>
        </div>
    )
}