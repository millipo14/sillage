import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrderUser } from '../../features/orderSlice'
import s from './OrderList.module.scss';
import { useNavigate } from 'react-router-dom';

const statusTranslations = {
    'pending': { text: 'В обработке', color: '#f39c12' },
    'paid': { text: 'Оплачен', color: '#27ae60' },
    'shipped': { text: 'Доставлен', color: '#2980b9' },
    'cancelled': { text: 'Отменен', color: '#e74c3c' }
}

export default function OrdersList() {
    const { userOrders } = useSelector(state => state.order)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchOrderUser())
    }, [])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).replace(/\s*г\.?$/, '');
    }

    return (
        <div>
            <section className={s["order"]}>
                <h2 className={s["order-title"]}>Заказы</h2>
                {userOrders.length > 0 ? (
                    <ul className={s["order-list"]}>
                        {userOrders.map((order) => {
                            const statusInfo = statusTranslations[order.status] || { text: order.status || 'Завершен', color: '#777' };
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
                                        <button className={s["order-open"]}>Открыть</button>
                                    </div>
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
