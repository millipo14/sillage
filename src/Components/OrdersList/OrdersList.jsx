import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrderUser } from '../../features/orderSlice'
import s from './OrderList.module.scss';
import { useNavigate } from 'react-router-dom';
import Loader from '../UI/Loader/Loader';
import OrderItem from './OrderItem/OrderItem';

const statusTranslations = {
    'pending': { text: 'В обработке', color: '#f39c12' },
    'shipped': { text: 'Отправлен', color: '#2980b9' },
    'delivered': { text: 'Доставлен', color: '#27ae60' },
    'cancelled': { text: 'Отменен', color: '#e74c3c' }
}

export default function OrdersList() {
    const [orderItem, setOrderItem] = useState(null)
    const { userOrders, status } = useSelector(state => state.order)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchOrderUser())
    }, [])

    if (status === 'loading') return <Loader />

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).replace(/\s*г\.?$/, '');
    }

    const toggleOrder = (id) => {
        setOrderItem(orderItem === id ? null : id)
    }

    return (
        <div>
            <section className={s["order"]}>
                <h2 className={s["order-title"]}>Заказы</h2>
                {userOrders?.length > 0 ? (
                    <ul className={s["order-list"]}>
                        {userOrders.map((order) => {
                            const statusInfo = statusTranslations[order.status] || { text: order.status || 'Завершен', color: '#777' }
                            const isOpen = orderItem === order.order_id
                            return (
                                <li className={s["order-item"]} key={order.order_id}>
                                    <div className={s["order-item_content"]}>
                                        <span className={s["order-id"]}>Заказ №{order.order_id}</span>
                                        <span className={s["order-date"]}>{formatDate(order.order_date)}</span>
                                        <span className={s["total-amount"]}>{Number(order.total_amount).toLocaleString('ru-RU')}₽</span>
                                        <span
                                            className={s["order-status"]}
                                            style={{ color: statusInfo.color }}
                                        >
                                            {statusInfo.text}
                                        </span>
                                        <button
                                            onClick={() => toggleOrder(order.order_id)}
                                            className={s["order-open"]}>
                                            {isOpen ? 'Закрыть' : 'Открыть'}
                                        </button>
                                    </div>

                                    {isOpen && (
                                        <div className={s["order-details"]}>
                                            {order.items.map((item) => (
                                                <OrderItem key={item.order_item_id} item={item} />
                                            ))}
                                        </div>
                                    )}

                                    <div className={s["order-line"]}></div>
                                </li>
                            )
                        })
                        }
                    </ul>
                )
                    : (
                        <div className={s["empty-orders"]}>
                            <p>У вас пока нет оформленных заказов.</p>
                            <button className={s["go-shopping"]} onClick={() => navigate('/catalog')}>
                                Перейти к покупкам
                            </button>
                        </div>
                    )
                }
            </section>
        </div>
    )
}
