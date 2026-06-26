import React from 'react'
import { Link } from 'react-router-dom'
import s from './Authorization.module.scss'

export default function Authorization() {
    return (
        <div className={s['auth']}>
            <h2 className={s['auth-title']}>Пожалуйста, войдите в профиль.</h2>
            <Link className={s['auth-btn']} to={'/login'}>
                Войти в профиль
            </Link>
        </div>
    )
}
