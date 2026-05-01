import { Raiting } from "../Rating/Rating";
import s from './PerfumePage.module.scss'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPerfumeID } from "../../features/perfumeSlice";
import { IMAGES_URL } from "../../const";
import { Accordion } from "../Accordion/Accordion";
import { addToCart } from '../../features/cartSlice';
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import Reviews from "../Reviews/Reviews";
import { fetchReview } from "../../features/reviewSlice";

function PerfumePage() {
    const { id } = useParams();
    const dispatch = useDispatch()
    const { singlePerfume } = useSelector(state => state.perfume)
    const { averageRating, total, ratingBar } = useSelector(state => state.reviews)
    const [selectedVolume, setSelectedVolume] = useState(null)

    const getReviewWord = (total) => {
        total = Math.abs(total) % 100;
        const lastDigit = total % 10;

        if (total > 10 && total < 20) return 'отзывов';
        if (lastDigit === 1) return 'отзыв';
        if (lastDigit >= 2 && lastDigit <= 4) return 'отзыва';
        return 'отзывов';
    }

    useEffect(() => {
        dispatch(fetchPerfumeID(id))
        dispatch(fetchReview(id))
    }, [id])

    useEffect(() => {
        if (singlePerfume?.volumes?.length > 0) {
            setSelectedVolume(singlePerfume.volumes[0])
        }
    }, [singlePerfume])

    const handleVolumeSelected = (volume) => {
        setSelectedVolume(volume)
    }

    return (
        <>
            <Breadcrumbs currentName={singlePerfume?.name} />
            <section className={s['perfume-container']}>
                <div className={s['perfume-content']}>
                    {!total ? 'отзывов пока нет' : <div className={s['perfume-raiting']}>
                        <span className={s['perfume-raiting_value']}>{averageRating}</span>
                        <Raiting currentRating={averageRating} />
                        <span className={s['point']}>•</span>
                        <span className={s['perfume-review_value']}>{total} {getReviewWord(total)}</span>
                    </div>}
                    <div className={s['perfume-titles']}>
                        <div className={s['perfume-title']}>{singlePerfume?.name}</div>
                        <p className={s['perfume-brand']}>{singlePerfume?.brand?.name}</p>
                    </div>

                    <div className={s['perfume-price']}>
                        <div className={s['perfume-price_price']}>
                            {selectedVolume?.price ? Number(selectedVolume.price).toLocaleString('ru-RU') : '—'} ₽
                        </div>
                        <div className={s['perfume-price_volume']}>
                            / {selectedVolume?.volume_ml ?? '—'} мл
                        </div>
                    </div>
                    <div className={s['perfume-description']}>{singlePerfume?.description}</div>
                </div>
                <div className={s['perfume-image']}>
                    <img src={`${IMAGES_URL}${singlePerfume?.image_url}`} alt={singlePerfume?.name} />
                </div>
                <div className={s['perfume-actions']}>
                    <div className={s['volume']}>
                        <div className={s['volume-list']}>
                            {
                                singlePerfume?.volumes?.map((volume) => (
                                    <label key={volume.id} htmlFor={`volume-${volume.id}`} className={s['volume-item']}>
                                        <input
                                            type="radio"
                                            id={`volume-${volume.id}`}
                                            className={s['volume-input']}
                                            name="volume"
                                            checked={selectedVolume?.id === volume.id}
                                            onChange={() => handleVolumeSelected(volume)}
                                        />
                                        <span className={s['volume-check']}>{volume.volume_ml}</span>
                                    </label>
                                ))
                            }
                        </div>
                    </div>
                    <button
                        className={s['addCart']}
                        type="submit"
                        onClick={() => dispatch(addToCart({
                            id: singlePerfume.perfume_id,
                            name: singlePerfume.name,
                            brand: singlePerfume.brand.name,
                            volume: selectedVolume,
                            count: 1,
                            image_url: singlePerfume.image_url
                        }))}
                    >
                        Добавить в корзину
                    </button>
                    <Accordion singlePerfume={singlePerfume} />
                </div>
            </section>
            <Reviews />
        </>
    );
}

export default PerfumePage;