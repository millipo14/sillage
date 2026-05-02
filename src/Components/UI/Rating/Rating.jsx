import s from './Rating.module.scss'
import Star from '../../../assets/svg/star.svg?react'
import cn from 'classnames'

export const Raiting = ({ currentRating = 0, showCurrentRating = false, className = '', starsClassName = '' }) => {
    const stars = Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1
        const isFull = starValue <= Math.floor(currentRating)
        const isHalf = !isFull && starValue - 0.5 <= currentRating
        const classLi = cn(s.star, starsClassName, {
            [s.full]: isFull,
            [s.half]: isHalf
        })

        return (
            <li key={index} className={classLi} >
                <Star />
            </li>
        )
    })

    return (
        <div className={`${s['rating']}`}>
            <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                    <linearGradient id="halfGrad">
                        <stop offset="50%" stopColor="#8056DC" />
                        <stop offset="50%" stopColor="#8056DC" stopOpacity="0.5" />
                    </linearGradient>
                </defs>
            </svg>
            {showCurrentRating && <span className={s['value']}>{currentRating}</span>}
            <ul className={cn(s.stars, className)}>
                {stars}
            </ul>
        </div>
    )
}