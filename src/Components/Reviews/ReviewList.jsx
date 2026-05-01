import React, { useEffect } from 'react'
import s from './Reviews.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReview } from '../../features/reviewSlice'
import { Raiting } from '../Rating/Rating'
import { useParams } from 'react-router-dom'


export default function ReviewList() {
    const { reviews } = useSelector(state => state.reviews)
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        if (id) {
            dispatch(fetchReview(id))
        }
    }, [id])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        }).replace(/\s*г\.?$/, '');
    }

    return (
        <section className={s["reviews"]}>
            <ul className={s["reviews-list"]}>
                {
                    reviews.map(review => (
                        <li key={review.review_id} className={s["reviews-item"]}>
                            <div className={s["review-info"]}>
                                <div className={s["review-user"]}>{review.customer.first_name}</div>
                                <div className={s["review-date"]}>{formatDate(review.created_at)}</div>
                                <p className={s["review-text"]}>{review.comment}</p>
                                <a href="#" className={s["review-detail"]}>Подробнее</a>
                            </div>
                            <Raiting currentRating={review.rating} className={s["review-stars"]} starsClassName={s["review-star"]} />
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}
