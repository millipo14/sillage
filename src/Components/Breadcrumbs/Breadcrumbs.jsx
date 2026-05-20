import { Link, useLocation } from "react-router-dom";
import s from './Breadcrumbs.module.scss'

export const Breadcrumbs = ({ currentName }) => {
    const location = useLocation();
    const fromBrand = location.state?.fromBrand;
    const brandName = location.state?.brandName;
    const brandId = location.state?.brandId;

    const fromPage = location.state?.from;

    return (
        <nav className={s['breadcrumbs']} aria-label="хлебные крошки">
            <ol className={s['breadcrumbs-list']}>
                <li className={s['breadcrumbs-item']}>
                    <Link to="/" className={s['breadcrumbs-link']}>Главная</Link>
                </li>
                {fromPage === 'recommendations' && (
                    <li className={s['breadcrumbs-item']}>
                        <Link to="/recommendations" className={s['breadcrumbs-link']}>
                            Рекомендации
                        </Link>
                    </li>
                )}
                {fromPage === 'brand' && brandName && (
                    <>
                        <li className={s['breadcrumbs-item']}>
                            <Link to="/brands" className={s['breadcrumbs-link']}>Бренды</Link>
                        </li>
                        <li className={s['breadcrumbs-item']}>
                            <Link to={`/brands/${brandId}`} className={s['breadcrumbs-link']}>
                                {brandName}
                            </Link>
                        </li>
                    </>
                )}

                {(!fromPage || fromPage === 'catalog') && (
                    <li className={s['breadcrumbs-item']}>
                        <Link to="/catalog" className={s['breadcrumbs-link']}>Каталог</Link>
                    </li>
                )}

                <li className={s['breadcrumbs-item']}>
                    <span className={s['breadcrumbs-current']} aria-current="page">
                        {currentName || 'Загрузка...'}
                    </span>
                </li>
            </ol>
        </nav>
    )
}