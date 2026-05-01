import React, { useState } from 'react'
import s from './ReviewModal.module.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReview, fetchReviewUser } from '../../features/reviewSlice';
import Star from '../../assets/svg/star.svg?react'
import cn from 'classnames'

export default function ReviewModal({ openModal, onClose }) {
    const { id } = useParams()
    const { status } = useSelector(state => state.reviews)
    const [commentUser, setCommentUser] = useState('')
    const [ratingUser, setRatingUser] = useState(0)
    const dispatch = useDispatch()
    if (!openModal) return null

    const handleSubmit = async () => {
        if (ratingUser === 0) return alert('Пожалуйста, поставьте оценку')
        const reviewUserData = {
            perfume_id: id,
            rating: ratingUser,
            comment: commentUser
        }
        const result = await dispatch(fetchReviewUser(reviewUserData))

        if (fetchReviewUser.fulfilled.match(result)) {
            dispatch(fetchReview(id))
            onClose()
        }
    }


    return (
        <div className={s.overlay} onClick={onClose}>
            <div className={s.modal} onClick={(e) => e.stopPropagation()}>
                <button className={s.closeBtn} onClick={onClose}>&times;</button>
                <h2 className={s.title}>Как вам этот аромат?</h2>

                <div className={s.ratingSelection}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className={cn(s.starBtn, { [s.active]: star <= ratingUser })}
                            onClick={() => setRatingUser(star)}
                        >
                            <Star />
                        </button>
                    ))}
                    <span className={s.ratingNumber}>{ratingUser || ''}</span>
                </div>

                <div className={s.inputGroup}>
                    <label htmlFor="comment">Ваш отзыв</label>
                    <textarea
                        id="comment"
                        placeholder="Поделитесь впечатлениями о аромате"
                        className={s.textarea}
                        value={commentUser}
                        onChange={e => setCommentUser(e.target.value)}
                    />
                </div>

                <button
                    className={s.submitBtn}
                    onClick={handleSubmit}
                    disabled={status === 'loading'}
                >
                    {status === 'loading' ? 'Отправка...' : 'Опубликовать'}
                </button>
            </div>
        </div>
    )
}
