import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminSubscriptions } from '../../../features/adminSlice';
import s from './AdminSubscriptions.module.scss';
import { Container } from '../../Layout/Container/Container';
import Loader from '../../UI/Loader/Loader';

const statusMap = {
    active: { text: 'Активна', color: '#27ae60' },
    cancelled: { text: 'Отменена', color: '#e74c3c' },
    paused: { text: 'Приостановлена', color: '#f39c12' }
};

export default function AdminSubscriptions() {
    const dispatch = useDispatch()
    const { subsriptionsUsers, status } = useSelector(state => state.admin)
    const [openedId, setOpenedId] = useState(null)

    useEffect(() => {
        dispatch(fetchAdminSubscriptions());
    }, [dispatch])

    const filteredSubs = useMemo(() => {
        if (!subsriptionsUsers) return []

        const activeOnly = subsriptionsUsers.filter(sub => sub.status === 'active')
        const unique = {}
        activeOnly.forEach(sub => {
            unique[sub.customer_id] = sub
        });

        return Object.values(unique).sort((a, b) => b.subscription_id - a.subscription_id)
    }, [subsriptionsUsers])

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('ru-RU', {
            day: 'numeric', month: 'long', year: 'numeric'
        }).replace(/\s*г\.?$/, '')
    };
    if (status === 'loading') {
        return <Loader />
    }
    return (
        <Container className={s.subscriptions}>
            <h2 className={s.title}>Активные подписки ({filteredSubs.length})</h2>

            <div className={s.list}>
                {filteredSubs.map(subscription => {
                    const statusInfo = statusMap[subscription.status] || { text: subscription.status, color: '#777' };
                    const isOpen = openedId === subscription.subscription_id;

                    return (
                        <div className={s.card} key={subscription.subscription_id}>
                            <div className={s.top}>
                                <div className={s.left}>
                                    <span className={s.id}>№{subscription.subscription_id}</span>
                                    <span className={s.user}>{subscription.customer.first_name} {subscription.customer.last_name}</span>
                                    <span className={s.email}>{subscription.customer.email}</span>
                                </div>

                                <div className={s.center}>
                                    <span className={s.plan}>{subscription.plan.name}</span>
                                    <span className={s.price}>{Number(subscription.plan.price_per_month).toLocaleString('ru-RU')} ₽</span>
                                </div>

                                <div className={s.right}>
                                    <span className={s.status} style={{ color: statusInfo.color }}>{statusInfo.text}</span>
                                    <button className={s.open} onClick={() => setOpenedId(isOpen ? null : subscription.subscription_id)}>
                                        {isOpen ? 'Скрыть' : 'Открыть'}
                                    </button>
                                </div>
                            </div>

                            <div className={s.line}></div>

                            {isOpen && (
                                <div className={s.details}>
                                    <div className={s.info}>
                                        <div><span>Начало:</span> <strong>{formatDate(subscription.start_date)}</strong></div>
                                        <div><span>Окончание:</span> <strong>{formatDate(subscription.end_date)}</strong></div>
                                        <div><span>Доставка:</span> <strong>{subscription.shipping_status === 'awaiting_shipment' ? 'Ожидает отправки' : subscription.shipping_status}</strong></div>
                                        <div><span>Адрес:</span> <strong>{subscription.shipping_address}</strong></div>
                                    </div>

                                    <div className={s.samples}>
                                        <h4>Выбранные ароматы</h4>
                                        {subscription.selected_samples?.map(sample => (
                                            <div key={sample.subscription_sample_id} className={s.sample}>
                                                <div>
                                                    <strong>{sample.sample.perfume.name}</strong>
                                                    <span>{sample.sample.perfume.brand?.name}</span>
                                                </div>
                                                <div className={s.sampleRight}>
                                                    <span>{sample.sample.volume_ml} мл</span>
                                                    <span className={sample.sample_type === 'recommended' ? s.recommended : s.custom}>
                                                        {sample.sample_type === 'recommended' ? 'Рекомендация' : 'Выбор пользователя'}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </Container>
    );
}