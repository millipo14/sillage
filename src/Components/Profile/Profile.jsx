import React, { useEffect } from 'react'
import { Container } from '../Layout/Container/Container'
import s from './Profile.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../features/authSlice';
import OrdersList from '../OrdersList/OrdersList';
import UserPreferences from '../UserPreferences/UserPreferences';
import ProfileSubscriptionInfo from '../ProfileSubscriptionInfo/ProfileSubscriptionInfo';
import Loader from '../UI/Loader/Loader';


export default function Profile() {
    const { user, status } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    if (status === 'loading') return <Loader />
    
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
                        <div className="user-preferenceInfo">
                            <h2 className={s["user-title"]}>Ваши предпочтения</h2>
                            <UserPreferences />
                        </div>
                        <div className="user-subscriptionInfo">
                            <ProfileSubscriptionInfo />
                        </div>

                    </div>
                </section>
                <OrdersList />
            </div>
        </Container>
    )
}
