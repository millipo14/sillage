import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom"; // используем Link вместо NavLink
import s from './Pagination.module.scss'
import BtnRight from '../../assets/svg/arrow-right.svg?react'
import BtnLeft from '../../assets/svg/arrow-left.svg?react'

export const Pagination = () => {
    const pathname = useLocation().pathname;
    const { page, totalPages } = useSelector(state => state.perfume)

    const renderPaginationItems = () => {
        const paginationItems = [];
        let startPage = (page === totalPages && totalPages >= 3)
            ? page - 2 : Math.max(1, page - 1);
        let endPage = Math.min(startPage + 2, totalPages);

        for (let i = startPage; i <= endPage; i++) {
            paginationItems.push(
                <li key={i} className={s.item}>
                    <Link
                        to={`${pathname}?page=${i}`}
                        className={`${s.link} ${i === page ? s.active : ''}`}
                    >
                        {i}
                    </Link>
                </li>
            )
        }
        return paginationItems;
    }

    return (
        totalPages > 1 &&
        <div className={s.pagination}>
            <Link
                to={`${pathname}?page=${Math.max(1, page - 1)}`}
                className={`${s.arrow} ${page <= 1 ? s.disabled : ''}`}
                onClick={(e) => page <= 1 && e.preventDefault()}
            >
                <BtnLeft />
            </Link>

            <ul className={s.list}>
                {renderPaginationItems()}
            </ul>

            <Link
                to={`${pathname}?page=${Math.min(totalPages, page + 1)}`}
                className={`${s.arrow} ${page >= totalPages ? s.disabled : ''}`}
                onClick={(e) => page >= totalPages && e.preventDefault()}
            >
                <BtnRight />
            </Link>
        </div>
    )
}