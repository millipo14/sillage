import { Container } from "../../Layout/Container/Container"
import cn from 'classnames'
import s from './AdminHeader.module.scss'
import { NavLink, useNavigate } from "react-router-dom"
import Exit from '../../../assets/svg/exit.svg?react'
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../../features/authSlice"
import { clearCart } from "../../../features/cartSlice"

export const AdminHeader = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <Container>
            <div className={s['header-container']}>
                <span className={cn('logo', s['header-logo'], s['text-black'])}>Sillage Éclatant</span>
                <ul className={s['header-nav_list']}>
                    <li className={s['header-nav_item']} >
                        <NavLink to="/admin/analysis" className={({ isActive }) => cn(s['header-nav_link'], s['text-black'], isActive && s['active-black'])}>Аналитика</NavLink>
                    </li>
                    <li className={s['header-nav_item']} >
                        <NavLink to="/admin/users" className={({ isActive }) => cn(s['header-nav_link'], s['text-black'], isActive && s['active-black'])}>Пользователи</NavLink>
                    </li>
                    <li className={s['header-nav_item']}>
                        <NavLink to="/admin/subscriptions_users" className={({ isActive }) => cn(s['header-nav_link'], s['text-black'], isActive && s['active-black'])}>Подписки</NavLink>
                    </li>
                </ul>
                <button
                    type="button"
                    onClick={handleLogout}
                    className={cn(s['header-actions_link'], s['text-black'])}>
                    <Exit />
                </button>
                <div className={cn(s['header-line'], s['line-black'])}></div>
            </div>
        </Container>
    )

}