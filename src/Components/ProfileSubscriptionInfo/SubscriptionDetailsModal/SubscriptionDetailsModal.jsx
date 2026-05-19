import React from 'react';
import s from './SubscriptionDetailsModal.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cancelSubscription } from '../../../features/subscriptionSlice';

export default function SubscriptionDetailsModal({ openModal, onClose, activeSubscription }) {
    if (!openModal) return null;
    const navigate = useNavigate()
    const { plan, selected_samples, start_date, end_date } = activeSubscription;
    const dispatch = useDispatch()
    const manualSamples = selected_samples.filter(
        item => item.sample_type !== 'recommended'
    );

    const autoCount = selected_samples.filter(
        item => item.sample_type === 'recommended'
    ).length
    const formatDate = (dateString) => {
        if (!dateString) return '...';
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? '...' : date.toLocaleDateString();
    }
    const handleChangePlan = async () => {
        const result = await dispatch(cancelSubscription(activeSubscription.subscription_id));

        if (cancelSubscription.fulfilled.match(result)) {
            navigate('/subscription');
        }
    }

    return (
        <div className={s.overlay} onClick={onClose}>
            <div className={s.modalCard} onClick={e => e.stopPropagation()}>
                <button className={s.closeBtn} onClick={onClose}>
                    &times;
                </button>

                <h3 className={s.modalTitle}>Детали подписки</h3>

                <div className={s.content}>

                    <div className={s.section}>
                        <span className={s.label}>Тариф</span>

                        <div className={s.planCard}>
                            <div>
                                <div className={s.planName}>{plan.name}</div>
                                <div className={s.planMeta}>
                                    с {formatDate(start_date)} по {formatDate(end_date)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={s.section}>
                        <span className={s.label}>Ваш выбор</span>

                        <div className={s.list}>
                            {manualSamples.map((item, idx) => (
                                <div key={idx} className={s.item}>
                                    <div>
                                        <div className={s.brand}>
                                            {item.sample?.perfume?.brand?.name}
                                        </div>
                                        <div className={s.name}>
                                            {item.sample?.perfume?.name}
                                        </div>
                                    </div>

                                    <span className={s.badge}>
                                        Выбрано
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {autoCount > 0 && (
                        <div className={s.autoBlock}>
                            <div className={s.autoTitle}>
                                Подбор сервиса
                            </div>
                            <div className={s.autoText}>
                                Добавим ещё {autoCount} аромата на основе ваших предпочтений
                            </div>
                        </div>
                    )}
                </div>

                <div className={s.actions}>
                    <button className={s.secondaryBtn} onClick={onClose}>
                        Закрыть
                    </button>

                    <button className={s.primaryBtn} onClick={handleChangePlan}>
                        Изменить тариф
                    </button>
                </div>
            </div>
        </div>
    );
}