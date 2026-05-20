import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import s from './RegisterPage.module.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRegister } from '../../features/authSlice'

export const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token, status, user } = useSelector(state => state.auth);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(fetchRegister({
                first_name: firstName,
                last_name: lastName,
                phone,
                email,
                password
            })).unwrap();
        } catch (err) {
            console.log('Ошибка регистрации:', err);
        }
    };

    useEffect(() => {
        if (token && user) {
            if (user.role === 'admin') {
                navigate('/admin')
            } else {
                navigate('/')
            }
        }
    }, [token, navigate, user])

    return (
        <div className={s['auth']}>
            <div className={s['auth-container']}>
                <h1 className={cn('logo', s['auth-logo'])}>Sillage Éclatant</h1>
                <div className={s['auth-content']}>
                    <h2 className={s['auth-title']}>Регистрация</h2>
                    <p className={s['auth-description']}>Создайте аккаунт для продолжения</p>

                    <form className={s['auth-form']} onSubmit={handleSubmit}>
                        <label htmlFor="firstName" className={s['auth-email']}>Имя</label>
                        <input
                            id='firstName'
                            value={firstName}
                            type="text"
                            onChange={e => setFirstName(e.target.value)}
                            placeholder="Ваше имя"
                            className={s['email']}
                            required />

                        <label htmlFor="lastName" className={s['auth-email']}>Фамилия</label>
                        <input
                            id='lastName'
                            value={lastName}
                            type="text"
                            onChange={e => setLastName(e.target.value)}
                            placeholder="Ваша фамилия"
                            className={s['email']}
                            required />

                        <label htmlFor="phone" className={s['auth-email']}>Телефон</label>
                        <input
                            id='phone'
                            value={phone}
                            type="tel"
                            onChange={e => setPhone(e.target.value)}
                            placeholder="Ваш номер с +7"
                            className={s['email']}
                            maxLength={12}
                            required />

                        <label htmlFor="email" className={s['auth-email']}>Email</label>
                        <input
                            id='email'
                            value={email}
                            type="email"
                            onChange={e => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className={s['email']}
                            required />

                        <label htmlFor="password" className={s['auth-password']}>Пароль</label>
                        <input
                            id='password'
                            value={password}
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                            className={s['password']}
                            required />

                        <button className={s['auth-btn_input']} type="submit" disabled={status === 'loading'}>
                            {status === 'loading' ? 'Загрузка...' : 'Зарегистрироваться'}
                        </button>
                        <p className={s['register-link']}>
                            <span>Уже есть аккаунт?</span>
                            <NavLink to="/login" className={s['register-link_action']}>Войти</NavLink>
                        </p>
                    </form>
                </div>
            </div>
            <div className={s['auth-picture']}></div>
        </div>
    )
}

export default RegisterPage