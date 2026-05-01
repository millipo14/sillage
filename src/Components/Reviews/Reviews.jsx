import React, { useState } from 'react'
import { Container } from '../Layout/Container/Container'
import s from './Reviews.module.scss'
import RatingSummary from './RatingSummary'
import ReviewList from './ReviewList'
import ReviewModal from './ReviewModal'


export default function Reviews() {
    const [openModal, setOpenModal] = useState(false)

    return (
        <div>
            <Container>
                <div className={s["ratingAndReviews"]}>
                    <div className={s["rating-title"]}>Рейтинг и отзывы</div>

                    <RatingSummary />
                    <ReviewList />

                    <button
                        onClick={() => setOpenModal(true)}
                        className={s["btn-review"]}>
                        Оставить отзыв
                    </button>

                    <ReviewModal
                        openModal={openModal}
                        onClose={() => setOpenModal(false)}
                    />
                </div >
            </Container >
        </div >
    )
}
