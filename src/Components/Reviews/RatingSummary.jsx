import React, { useEffect } from 'react'
import s from './Reviews.module.scss'
import { Raiting } from '../UI/Rating/Rating';
import { useDispatch, useSelector } from 'react-redux'
import { fetchReview } from '../../features/reviewSlice'
import { useParams } from 'react-router-dom'
import Star from '../../assets/svg/star.svg?react'

export default function RatingSummary() {
    const { averageRating, total, ratingBar } = useSelector(state => state.reviews)
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchReview(id))
    }, [id])

    const getReviewWord = (total) => {
        total = Math.abs(total) % 100;
        const lastDigit = total % 10;

        if (total > 10 && total < 20) return 'отзывов';
        if (lastDigit === 1) return 'отзыв';
        if (lastDigit >= 2 && lastDigit <= 4) return 'отзыва';
        return 'отзывов';
    }
    if (!total) {
        return <h2>У этого парфюма пока нет отзывов. Станьте первым!</h2>
    }

    return (
        <section className={s["rating"]}>
            <div className={s["rating-summary"]}>
                <div className={s["rating-value"]}>{averageRating}</div>
                <Raiting
                    currentRating={averageRating}
                    className={s["rating_stars"]}
                    starsClassName={s["rating_star"]}
                />
                <div className={s["rating-reviews_count"]}>{total} {getReviewWord(total)}</div >
            </div >
            <div className={s["separating-line"]} ></div >
            <ul className={s["rating-list"]} >
                {ratingBar.map((item) =>
                (
                    <li key={item.label} className={s["rating-details"]}>
                        <span className={s["rating-label"]}>{item.label}</span>
                        <span className={s["rating-star"]}>
                            <Star />
                        </span>
                        <div className={s["rating-bar"]}>
                            <div
                                className={s["rating-bar_fill"]}
                                style={{ width: `${item.percent}%` }}
                            ></div>
                        </div>
                        <span className={s["rating-percent"]}>{item.percent}%</span>
                    </li>
                ))}
            </ul >
        </section >
    )
}
