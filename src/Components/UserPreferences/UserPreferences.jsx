import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserPrefs } from '../../features/preferenceSlice'
import s from './UserPreferences.module.scss'

export default function UserPreferences() {
    const { userPrefs, status } = useSelector(state => state.preferences)
    const dispatch = useDispatch()

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
        return <div className={s["no-prefs"]}>Предпочтения еще не настроены</div>
    }

    return (
        <div className={s["preferences-content"]}>
            {userPrefs.category_preferences?.length > 0 && (
                <div className={s["pref-group"]}>
                    <span className={s["pref-label"]}>Любимые категории:</span>
                    <div className={s["pref-list"]}>
                        {userPrefs.category_preferences.map(pref => (
                            <span key={pref.id} className={s["badge"]}>
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
    )
}
