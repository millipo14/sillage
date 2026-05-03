import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeSampleSubscription } from '../../features/subscriptionSlice'
import s from './SelectionSample.module.scss'
import { CartItem } from '../UI/CartItem/CartItem'
import OrderModal from '../OrderModal/OrderModal'

export default function SelectionSummary() {
    const { selectedSamples, activePlan } = useSelector(state => state.subscriptionPlans)
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false)

    const canConfirm = selectedSamples.length === activePlan?.custom_samples

    return (
        <section className={s['summary']}>
            <h3>Ваш бокс</h3>
            <div className={s['summary-list']}>
                {selectedSamples.map(item => (
                    <CartItem
                        key={item.id}
                        item={item}
                        isSubscription={true}
                        removeItem={(i) => dispatch(removeSampleSubscription(i.id))}
                    />
                ))}

                <div className={s['secret-item']}>
                    <div className={s['secret-icon']}>?</div>
                    <span>Секретные ароматы от экспертов</span>
                </div>
            </div>

            <button
                className={s['order-btn']}
                disabled={!canConfirm}
                onClick={() => setOpenModal(true)}
            >
                {canConfirm ? 'Подтвердить выбор' : `Выберите еще ${activePlan.custom_samples - selectedSamples.length}`}
            </button>

            <OrderModal 
                openModal={openModal}
                onClose={()=>setOpenModal(false)}
                totalPrice={Number(activePlan?.price_per_month || 0)}
                isSubscription={true}
            />
        </section>
    )
}
