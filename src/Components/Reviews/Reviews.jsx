import React, { useState } from 'react'
import { Container } from '../Layout/Container/Container'
import s from './Reviews.module.scss'
import RatingSummary from './RatingSummary'
import ReviewList from './ReviewList/ReviewList'
import ReviewModal from './ReviewModal/ReviewModal'


export default function Reviews() {
    const [openModal, setOpenModal] = useState(false)

    return (
        <div>
            <div className={s["ratingAndReviews"]}>
                <Container>
                    <div className={s["rating-title"]}>Рейтинг и отзывы</div>
                    <RatingSummary />
                </Container>

                <ReviewList />

                <Container>
                    <button
                        onClick={() => setOpenModal(true)}
                        className={s["btn-review"]}>
                        Оставить отзыв
                    </button>

                    <ReviewModal
                        openModal={openModal}
                        onClose={() => setOpenModal(false)}
                    />
                </Container >
            </div >

        </div >
    )
}
