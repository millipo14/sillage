import React, { useEffect, useState } from 'react'
import s from './ReviewList.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReview } from '../../../features/reviewSlice'
import { Raiting } from '../../Rating/Rating'
import { useParams } from 'react-router-dom'
import ScrollContainer from 'react-indiana-drag-scroll'


export default function ReviewList() {
    const { reviews } = useSelector(state => state.reviews)
    const [selectedReview, setSelectedReview] = useState(null)
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
            <ScrollContainer className={s["reviews-list"]}>
                {
                    reviews.map(review => (
                        <li key={review.review_id} className={s["reviews-item"]}>
                            <div className={s["review-info"]}>
                                <div className={s["review-header"]}>
                                    <div className={s["user-data"]}>
                                        <div className={s["review-user"]}>{review.customer.first_name}</div>
                                        <div className={s["review-date"]}>{formatDate(review.created_at)}</div>
                                    </div>
                                    <Raiting currentRating={review.rating} className={s["review-stars"]} starsClassName={s["review-star"]} />
                                </div>
                                <p className={s["review-text"]}>{review.comment}</p>
                                <button
                                    className={s["review-detail"]}
                                    onClick={() => setSelectedReview(review)}
                                >
                                    Подробнее
                                </button>
                            </div>
                        </li>
                    ))
                }
            </ScrollContainer>

            {selectedReview && (
                <div className={s["modal-overlay"]} onClick={() => setSelectedReview(null)}>
                    <div className={s["modal-content"]} onClick={e => e.stopPropagation()}>
                        <button className={s["modal-close"]} onClick={() => setSelectedReview(null)}>&times;</button>

                        <div className={s["modal-header"]}>
                            <div className={s["modal-user-info"]}>
                                <h3>{selectedReview.customer.first_name}</h3>
                                <div className={s["modal-date"]}>{formatDate(selectedReview.created_at)}</div>
                            </div>
                            <Raiting
                                currentRating={selectedReview.rating}
                                className={s["review-stars"]}
                                starsClassName={s["review-star"]}
                            />
                        </div>

                        <div className={s["modal-body"]}>
                            {selectedReview.comment}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
