import cn from 'classnames'
import s from './Subscription.module.scss'
import { Container } from '../Layout/Container/Container'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchSubscription, setActivePlan } from '../../features/subscriptionSlice'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../UI/Loader/Loader'

export const Subscription = () => {
    const dispatch = useDispatch()
    const { subscriptionPlans, status } = useSelector(state => state.subscriptionPlans)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchSubscription())
    }, [dispatch])

    const handlePlan = (plan) => {
        dispatch(setActivePlan(plan))
        navigate('/selectsample')
    }
    if(status === 'loading'){
        return <Loader />
    }

    return (
        <Container className={s['subscription']}>
            <h2 className={s['subscription-title']}>Подписка на образцы</h2>
            <div className={s['subscription-description']}>Каждый месяц получайте набор пробников, чтобы найти свой <br /> идеальный
                аромат без риска покупки полного флакона
            </div>
            <div className={s['subscription-descriptionQuiz']}>
                Заполните
                <Link to={'/quiz'} className={s.quizLink}>  анкету</Link>, чтобы система подобрала ароматы специально для Вас!
            </div>
            <div className={s['subscription-tarifs']}>
                {subscriptionPlans?.map((plan, index) =>
                (
                    <div
                        key={plan.plan_id}
                        className={cn(s['subscription-tarif'],
                            {
                                [s['subscription-tarif_base']]: index === 0,
                                [s['subscription-tarif_luxe']]: index === 1,
                                [s['subscription-tarif_premium']]: index === 2,
                            }
                        )}
                    >
                        <div className={s['subscription-tarif_name']}>{plan.name}</div>

                        <div className={s['subscription-tarif_info']}>
                            <div className={s['subscription-tarif_description']}>{plan.description}</div>
                            <div className={s['subscription-tarif_count']}>{plan.recommended_samples} рекомендованных + {plan.custom_samples} на ваш выбор</div>
                            <div className={s['subscription-tarif_volume']}>По {parseFloat(plan.sample_volume_ml)} мл каждый</div>
                        </div>
                        <div className={s['subscription-tarif_fare']}>
                            <div className={s['subscription-tarif_price']}>
                                {parseFloat(plan.price_per_month)} ₽
                                <span>/ в месяц</span>
                            </div>
                            <button onClick={() => handlePlan(plan)} className={s['subscription-tarif_start']}>Начать</button>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    )
}