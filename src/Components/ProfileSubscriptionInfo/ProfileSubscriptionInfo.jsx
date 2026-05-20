import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchActiveSubscription } from '../../features/subscriptionSlice'
import { useNavigate } from 'react-router-dom'
import s from './ProfileSubscriptionInfo.module.scss'
import SubscriptionDetailsModal from './SubscriptionDetailsModal/SubscriptionDetailsModal'

export default function ProfileSubscriptionInfo() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { activeSubscription } = useSelector(state => state.subscriptionPlans)
    const [openModal, setOpenModal] = useState(false)
    
    useEffect(() => {
        dispatch(fetchActiveSubscription())
    }, [])

    const hasActiveSubscription = activeSubscription && activeSubscription.status === 'active'

    return (
        <div className={s.wrapper}>
            {hasActiveSubscription ? (
                <div className={s.activeContent}>
                    <div className={s.infoRow}>
                        <span className={s.planName}>{activeSubscription.plan.name}</span>
                        <span className={s.statusBadge}>Подписка активна</span>
                    </div>
                    <p className={s.description}>
                        В вашу подписку входит {activeSubscription.stats.total_samples} пробника по {activeSubscription.plan.sample_volume_ml} мл.
                    </p>
                    <button
                        className={s.actionButton}
                        onClick={() => setOpenModal(true)}
                    >
                        Управление подпиской
                    </button>
                </div>
            ) : (
                <div className={s.emptyContent}>
                    <p className={s.promoText}>Получайте персональную подборку ароматов <br /> каждый месяц</p>
                    <button
                        className={s.subscribeButton}
                        onClick={() => navigate('/subscription')}
                    >
                        Оформить подписку
                    </button>
                </div>
            )}

            {hasActiveSubscription && (
                <SubscriptionDetailsModal
                    openModal={openModal}
                    onClose={() => setOpenModal(false)}
                    activeSubscription={activeSubscription}
                />
            )}
        </div>
    )
}
