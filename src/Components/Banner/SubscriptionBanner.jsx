import { NavLink } from "react-router-dom"
import { Container } from "../Layout/Container/Container"
import s from './SubscriptionBanner.module.scss'

export const SubscriptionBanner = () => {
    const handleUp = () => {
        window.scrollTo(0, 0)
    }
    return (
        <section className={s['subscription-banner']}>
            <Container>
                <div className={s['subscription-banner_title']}>Найдите свой<br /> идеальный аромат</div>
                <div className={s['subscription-banner_description']}>Подписка на ежемесячные наборы образцов — найдите свой аромат
                    без риска
                </div>
                <NavLink to='/subscription' onClick={handleUp} className={s['subscription-link']}>О подписке</NavLink>
            </Container >
        </section>
    )
}