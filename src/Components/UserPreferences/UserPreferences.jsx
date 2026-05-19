import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserPrefs } from '../../features/preferenceSlice'
import s from './UserPreferences.module.scss'
import { useNavigate } from 'react-router-dom'
import UserPreferencesModal from './UserPreferencesModal/UserPreferencesModal'

export default function UserPreferences() {
    const { userPrefs, status } = useSelector(state => state.preferences)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        dispatch(fetchUserPrefs())
    }, [])

    if (status === 'loading') return <div>Загрузка предпочтений...</div>

    const hasPrefs = userPrefs && (
        userPrefs.category_preferences?.length > 0 ||
        userPrefs.note_preferences?.length > 0 ||
        userPrefs.brand_preferences?.length > 0
    );

    if (!hasPrefs) {
        return (
            <section className={s["empty-wrapper"]}>

                <button
                    className={s["quiz-button"]}
                    onClick={() => navigate('/quiz')}
                >
                    Настроить предпочтения
                </button>
            </section>
        )
    }

    return (
        <section>
            <button
                className={s["quiz-button"]}
                onClick={() => setOpenModal(true)}
            >
                Посмотреть предпочтения
            </button>
            <UserPreferencesModal
                openModal={openModal}
                onClose={() => setOpenModal(false)}
                userPrefs={userPrefs}
            />
        </section>

    )
}
