import React, { useState } from 'react'
import s from './OrderModal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder } from '../../features/orderSlice';

export default function OrderModal({ totalPrice, openModal, onClose }) {
    const [address, setAddress] = useState('')
    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cart)

    if (!openModal) return null;

    const handleSubmit = () => {
        if (!address.trim()) {
            alert('Введите адрес доставки')
            return
        }
        const order = {
            items: cartItems.map((item) => {
                let pureVolume = item.volume;

                if (Array.isArray(item.volume)) {
                    pureVolume = item.volume[0]?.volume_ml;
                } else if (typeof item.volume === 'object' && item.volume !== null) {
                    pureVolume = item.volume.volume_ml;
                }

                return {
                    perfume_id: item.id,
                    quantity: item.count,
                    product_type: 'perfume',
                    volume: pureVolume
                };
            }),
            shipping_address: address
        };

        dispatch(fetchOrder(order))
            .unwrap()
            .then(() => {
                alert('Заказ оформлен!')
                onClose()
            })
            .catch(e => alert(`ERROR: ${e.message}`))
    }
    return (
        <div className={s.overlay} onClick={onClose}>
            <div className={s.modal} onClick={(e) => e.stopPropagation()}>
                <button className={s.closeBtn} onClick={onClose}>&times;</button>

                <h2 className={s.title}>Оформление заказа</h2>

                <div className={s.content}>
                    <div className={s.info}>
                        <span>Сумма заказа:</span>
                        <span className={s.price}>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                    </div>

                    <div className={s.inputGroup}>
                        <label htmlFor="address">Адрес доставки</label>
                        <textarea
                            id="address"
                            placeholder="Введите город, улицу, дом и квартиру"
                            className={s.textarea}
                            onChange={e => setAddress(e.target.value)}
                        />
                    </div>

                    <button className={s.submitBtn} onClick={handleSubmit} disabled={status === 'loading'} >
                        {status === 'loading' ? 'Оформление...' : 'Подтвердить заказ'}
                    </button>
                </div>
            </div>
        </div>
    )
}
