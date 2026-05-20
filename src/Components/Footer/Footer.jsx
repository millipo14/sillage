import { Container } from "../Layout/Container/Container"
import cn from 'classnames'
import s from './Footer.module.scss'
import VK from '../../assets/svg/vk.svg?react'
import TG from '../../assets/svg/tg.svg?react'

export const Footer = () => {
    return (
        <footer className={s['footer']}>
            <Container>
                <div className={s['footer-container']}>
                    <h2 className={cn('logo', s['footer-logo'])}>Sillage Éclatant</h2>
                    <div className={s['footer-contacts']}>
                        <div className={s['footer-title']}>8 950 341 29 01</div>
                        <p className={s['footer-contacts_description']}>круглосуточный телефон</p>
                        <ul className={s['footer-contacts_list']}>
                            <li className={s['footer-contacts_item']}>
                                <a href='https://vk.com/millipo' className={s['footer-link']}>
                                    <div className={s['footer-contacts_icon']}>
                                        <VK />
                                    </div>
                                    <span>VK</span>
                                </a>
                            </li>
                            <li className={s['footer-contacts_item']}>
                                <a href='https://t.me/milllipoo' className={s['footer-link']}>
                                    <div className={s['footer-contacts_icon']}>
                                        <TG />
                                    </div>
                                    <span>Telegram</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className={s['footer-about']}>
                        <div className={s['footer-title']}>
                            о нас
                        </div>
                        <div className={s['footer-description']}>
                            <p><a href="#">политика обработки персональных <br /> данных</a></p>
                            <p><a href="#">документы сайта</a></p>
                        </div>

                    </div>

                    <div className={s['footer-clients']}>
                        <div className={s['footer-title']}>
                            клиентам
                        </div>
                        <div className={s['footer-description']}>
                            <p><a href="#">вопросы и ответы</a></p>
                            <p><a href="#">заказы и доставка</a></p>
                            <p><a href="#">возврат</a></p>
                        </div>
                    </div>

                    <div className={s['footer-other']}>
                        <div className={s['footer-title']}>
                            контакты
                        </div>
                        <div className={s['footer-description']}>
                            <p><a href="#">общие контакты</a></p>
                            <p><a href="#">партнёрская программа</a></p>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    )
}