import s from './BannerHeader.module.scss'
import { Container } from '../Layout/Container/Container'
import { NavLink } from "react-router-dom"

export const BannerHeader = ({ children }) => {

    const handleUp = () => {
        window.scrollTo(0, 0)
    }

    return (
        <div className={s.banner}>
            {children}
            <Container>
                <h2 className={s['banner-title']}>Найдите свой <br />идеальный аромат</h2>
                <div className={s['banner-description']}>Изысканная коллекция премиальной и нишевой парфюмерии, созданная для
                    тех, <br />кто
                    ценит индивидуальность и тонкость ароматов. Мы подбираем композиции <br />персонально, чтобы каждый аромат
                    раскрывался именно на вашей коже <br />и
                    отражал ваш уникальный характер.</div>

                <NavLink to='/quiz' onClick={handleUp} className={s['banner-link']}>Подобрать ароматы</NavLink>
            </Container>
        </div>

    )
}