import cn from 'classnames'
import s from './BannerHeader.module.scss'
import { Container } from '../Layout/Container/Container'

export const BannerHeader = ({ children }) => {
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
            </Container>
        </div>

    )
}