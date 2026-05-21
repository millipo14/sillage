import React, { useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsersForAdmins } from '../../../features/adminSlice'
import Loader from '../../UI/Loader/Loader'
import s from './AdminUsers.module.scss'
import { Container } from '../../Layout/Container/Container'
import UserInfo from './UserInfo/UserInfo'

export default function AdminUsers() {
    const { users, status } = useSelector(state => state.admin)
    const dispatch = useDispatch()
    const [selectedUser, setSelectedUser] = useState(null)

    useEffect(() => {
        dispatch(fetchUsersForAdmins())
    }, [dispatch])

    const subscriptionTranslations = useMemo(() => ({
        active: {
            text: 'Активна',
            className: s.active
        },
        cancelled: {
            text: 'Отменена',
            className: s.cancelled
        },
        none: {
            text: 'Неактивна',
            className: s.cancelled
        }
    }), [])

    if (status === 'loading') return <Loader />

    return (
        <Container className={s.admin}>
            <div className={s.header}>
                <h2 className={s.title}>Пользователи</h2>

                <span className={s.count}>
                    {users?.length || 0} пользователей
                </span>
            </div>

            <div className={s.grid}>
                {users?.map((user) => {
                    const subStatus = user.subscription_status || 'none'
                    const subInfo = subscriptionTranslations[subStatus]
                    const totalSpent = user.orders?.reduce((acc, order) => acc + Number(order.total_amount || 0), 0) || 0
                    const ordersCount = user.orders?.length || 0

                    return (
                        <div className={s.card} key={user.customer_id}>
                            <div className={s.cardTop}>
                                <div>
                                    <h3 className={s.name}>
                                        {user.first_name} {user.last_name}
                                    </h3>
                                    <div className={s.contacts}>
                                        <span>{user.email}</span>
                                        {user.phone && (
                                            <span>{user.phone}</span>
                                        )}
                                    </div>
                                </div>
                                <div className={`${s.status} ${subInfo.className}`}>
                                    {subInfo.text}
                                </div>
                            </div>
                            <div className={s.stats}>
                                <div className={s.stat}>
                                    <span className={s.statLabel}>
                                        Заказов
                                    </span>
                                    <span className={s.statValue}>
                                        {ordersCount}
                                    </span>
                                </div>
                                <div className={s.stat}>
                                    <span className={s.statLabel}>
                                        Потрачено
                                    </span>
                                    <span className={s.statValue}>
                                        {totalSpent.toLocaleString()} ₽
                                    </span>
                                </div>
                                <div className={s.stat}>
                                    <span className={s.statLabel}>
                                        Регистрация
                                    </span>
                                    <span className={s.statValue}>
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            <button
                                className={s.button}
                                onClick={() =>
                                    setSelectedUser(user)
                                }>
                                Подробнее
                            </button>
                        </div>
                    )
                })}
            </div>
            {selectedUser && (
                <UserInfo
                    user={users.find(u => u.customer_id === selectedUser.customer_id) || selectedUser}
                    onClose={() => setSelectedUser()}
                />
            )}

        </Container>
    )
}