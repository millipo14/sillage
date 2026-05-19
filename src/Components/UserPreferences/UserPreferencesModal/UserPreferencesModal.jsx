import React from 'react'
import s from './UserPreferencesModal.module.scss'
import { useNavigate } from 'react-router-dom'

export default function UserPreferencesModal({ userPrefs, onClose, openModal }) {
    if (!openModal) return null

    const userGender = localStorage.getItem('user')
    const target_gender = JSON.parse(userGender)
    const navigate = useNavigate()

    const handleQuiz = () => {
        onClose()
        navigate('/quiz')
    }

    return (

        <div className={s["overlay"]} onClick={onClose}>
            <div className={s["modal-card"]} onClick={e => e.stopPropagation()}>
                <button className={s["close-btn"]} onClick={onClose}>&times;</button>
                <h3 className={s["modal-title"]}>Ваши предпочтения</h3>

                <div className={s["pref-group"]}>
                    <span className={s["pref-label"]}>Выбранный гендер:</span>
                    <div className={s["pref-list"]}>
                        <span className={s["badge"]} style={{marginBottom: '15px'}}>
                            {target_gender.target_gender === 'male'
                                ? 'мужчина'
                                : target_gender.target_gender === 'female'
                                    ? 'женщина'
                                    : target_gender.target_gender === 'unisex'
                                        ? 'унисекс'
                                        : 'любой'
                            }
                        </span>
                    </div>
                </div>

                <div className={s["preferences-content"]}>
                    {userPrefs.category_preferences?.length > 0 && (
                        <div className={s["pref-group"]}>
                            <span className={s["pref-label"]}>Любимые категории:</span>
                            <div className={s["pref-list"]}>
                                {userPrefs.category_preferences.map(pref => (
                                    <span key={pref.category_name} className={`${s["badge"]} ${s["badge--note"]}`}>
                                        {pref.category_name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    {userPrefs.note_preferences?.length > 0 && (
                        <div className={s["pref-group"]}>
                            <span className={s["pref-label"]}>Любимые ноты:</span>
                            <div className={s["pref-list"]}>
                                {userPrefs.note_preferences.map(item => (
                                    <span key={item.note_id} className={`${s["badge"]} ${s["badge--note"]}`}>
                                        {item.note?.note_name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className={s["modal-actions"]}>
                    <button
                        className={s["edit-button"]}
                        onClick={handleQuiz}
                    >
                        Изменить предпочтения
                    </button>
                </div>
            </div>
        </div>

    )
}
