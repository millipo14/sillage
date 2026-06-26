import { useDispatch, useSelector } from 'react-redux'
import s from './Cart.module.scss'
import { CartItem } from '../UI/CartItem/CartItem'
import { useState } from 'react'
import OrderModal from '../OrderModal/OrderModal'
import { decrementItem, incrementItem, removeFromCart } from '../../features/cartSlice'
import Authorization from '../Authorization/Authorization'
import { useNavigate } from 'react-router-dom'

export const Cart = () => {
    const { cartItems, countItems } = useSelector(state => state.cart)
    const [openModal, setOpenModal] = useState(false)
    const totalItems = cartItems.reduce((sum, item) => sum + item.count, 0)
    const totalPrice = cartItems.reduce((sum, item) => {
        return sum + item.volume.price * item.count
    }, 0)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const makeOrder = () => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/auth')
            return
        }
        setOpenModal(true)
    }

    return (
        <section className={s['cart-container']}>
            {
                cartItems.length ?
                    <>
                        <div className={s['cart-products']}>
                            <div className={s['cart-title_item']}>Итог заказа</div>
                            <div className={s['line-item']}></div>
                            {cartItems.map(item => (
                                <CartItem
                                    key={`${item.id}-${item.volume.volume_ml}`}
                                    item={item}
                                    removeItem={() => dispatch(removeFromCart({ id: item.id, volume: item.volume }))}
                                    incrementItem={() => dispatch(incrementItem({ id: item.id, volume: item.volume }))}
                                    decrementItem={() => dispatch(decrementItem({ id: item.id, volume: item.volume }))}
                                />
                            ))}
                        </div>

                        <div className={s['cart-line']}></div>

                        <div className={s['cart-calc']}>
                            <div className={s['cart-title']}>Сумма заказа</div>
                            <div className={s['line-calc']}></div>

                            <div className={s['cart-info']}>
                                <span>В корзине ароматов</span>
                                <div className={s['cart-info_count']}>{totalItems} шт.</div>
                            </div>

                            <div className={s['cart-info']}>
                                <span>Общая стоимость</span>
                                <div className={s['cart-info_count']}>{totalPrice?.toLocaleString('ru-RU')} ₽</div>
                            </div>

                            <div className={s['total-line']}></div>

                            <div className={s['cart-total']}>
                                <span>Итого</span>
                                <div className={s['cart-total_count']}>{totalPrice?.toLocaleString('ru-RU')} ₽</div>
                            </div>

                            <button
                                onClick={() => makeOrder()}
                                className={s['cart-order_btn']}
                            >К оформлению</button>
                        </div>
                    </>
                    : <h3 className={s['empty']}>Вы пока ничего не добавили в корзину</h3>

            }
            <OrderModal
                totalPrice={totalPrice}
                openModal={openModal}
                onClose={() => setOpenModal(false)} />
        </section>

    )
}