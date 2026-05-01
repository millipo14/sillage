import React, { useEffect } from 'react'
import { Container } from '../Layout/Container/Container'
import s from './Profile.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../features/authSlice';
import OrdersList from '../OrdersList/OrdersList';


export default function Profile() {
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUser())
    }, [])

    return (
        <Container>
            <div className={s["profile-container"]}>
                <section className={s["user-info"]}>
                    <div className={s["user-profile"]}>
                        <div className={s["user-title"]}>Профиль</div>
                        <div className={s["user-username"]}>{user?.first_name} {user?.last_name}</div>
                        <div className={s["user-email"]}>{user?.email}</div>
                    </div>
                    <div className={s["user-preferences"]}>
                        <h2>{user.subscription_status === 'active' ? 'Подписка активна' : 'Подписки нет'}</h2>
                    </div>
                </section>

               <OrdersList />
            </div>
        </Container>
    )
}
