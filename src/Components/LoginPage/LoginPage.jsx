import Google from '../../assets/svg/google.svg?react'
import cn from 'classnames'
import s from './LoginPage.module.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchAuth } from '../../features/authSlice'

export const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token, status, user } = useSelector(state => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(fetchAuth({ email, password })).unwrap();
        } catch (err) {
            console.log('Ошибка:', err);
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
                    <h2 className={s['auth-title']}>Добро пожаловать</h2>
                    <p className={s['auth-description']}>Войдите в свой аккаунт для продолжения</p>

                    <form className={s['auth-form']} onSubmit={handleSubmit}>
                        <label htmlFor="email" className={s['auth-email']}>Email</label>
                        <input
                            id='email'
                            value={email}
                            type="email"
                            onChange={email => setEmail(email.target.value)}
                            placeholder="your@email.com"
                            className={s['email']}
                            required />

                        <label htmlFor="password" className={s['auth-password']}>Пароль</label>
                        <input
                            id='password'
                            value={password}
                            onChange={password => setPassword(password.target.value)}
                            type="password"
                            className={s['password']}
                            required />
                        {/* <NavLink to="#" className={s['link-password']}>Забыли пароль?</NavLink> */}

                        <button className={s['auth-btn_input']} type="submit" disabled={status === 'loading'}>
                            {status === 'loading' ? 'Загрузка...' : 'Войти'}
                        </button>
                        {/* <button className={s['auth-btn_google']}>
                            <Google />
                            Войти через Google
                        </button> */}
                        <p className={s['register-link']}>
                            <span>Нет аккаунта?</span>
                            <NavLink to="/register" className={s['register-link_action']}>Зарегистрироваться</NavLink>
                        </p>
                    </form>
                </div>
            </div>
            <div className={s['auth-picture']}></div>
        </div>
    )
}