import { BannerHeader } from "../BannerHeader/BannerHeader"
import { Container } from "../Layout/Container/Container"
import cn from 'classnames'
import s from './Header.module.scss'
import { NavLink, useNavigate } from "react-router-dom"
import Profile from '../../assets/svg/profile.svg?react'
import Cart from '../../assets/svg/cart.svg?react'
import Exit from '../../assets/svg/exit.svg?react'
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../features/authSlice"
import { clearCart } from "../../features/cartSlice"

export const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { cartItems } = useSelector(state => state.cart)
    const totalItems = cartItems.reduce((sum, item) => sum + item.count, 0)

    const handleLogout = () => {
        dispatch(logout())
        dispatch(clearCart())
        navigate('/login')
    }

    const isHome = location.pathname === '/'
    const textColor = isHome ? s['text-white'] : s['text-black']
    const activeColor = isHome ? s['active'] : s['active-black']
    const lineColor = isHome ? s['header-line'] : s['line-black']

    const countCart = totalItems > 0 ? s['cart-count'] : s['none-count'];

    const content = (
        <Container>
            <div className={s['header-container']}>
                <ul className={s['header-nav_list']}>
                    <li className={s['header-nav_item']} >
                        <NavLink to="/" className={({ isActive }) => cn(s['header-nav_link'], textColor, isActive && activeColor)}>Главная</NavLink>
                    </li>
                    <li className={s['header-nav_item']} >
                        <NavLink to="/catalog" className={({ isActive }) => cn(s['header-nav_link'], textColor, isActive && activeColor)}>Каталог</NavLink>
                    </li>
                    <li className={s['header-nav_item']}>
                        <NavLink to="/brands" className={({ isActive }) => cn(s['header-nav_link'], textColor, isActive && activeColor)}>Бренды</NavLink>
                    </li>
                    <li className={s['header-nav_item']}>
                        <NavLink to="/subscription" className={({ isActive }) => cn(s['header-nav_link'], textColor, isActive && activeColor)}>Подписка</NavLink>
                    </li>
                </ul>
                <NavLink to='/' className={cn('logo', s['header-logo'], textColor)}>Sillage Éclatant</NavLink>

                <ul className={s['header-actions_list']}>
                    <li className={s['header-actions_item']}>
                        <NavLink to="/profile" className={cn(s['header-actions_link'], textColor)}>
                            <Profile />
                        </NavLink>
                    </li>
                    <li className={s['header-actions_item']}>
                        <NavLink to="/cart" className={cn(s['header-actions_link'], textColor, s['cart'])}>
                            <Cart />
                            <span className={countCart}>{totalItems}</span>
                        </NavLink>
                    </li>
                    <li className={s['header-actions_item']}>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className={cn(s['header-actions_link'], textColor)}>
                            <Exit />
                        </button>
                    </li>
                </ul>
                <div className={cn(s['header-line'], lineColor)}></div>
            </div>
        </Container>
    )

    return isHome ? <BannerHeader>{content}</BannerHeader> : content
}