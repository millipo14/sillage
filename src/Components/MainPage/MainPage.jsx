import { Link } from "react-router-dom";
import { SubscriptionBanner } from "../Banner/SubscriptionBanner"
import { Catalog } from "../Catalog/Catalog"
import s from './MainPage.module.scss'
import { Container } from "../Layout/Container/Container";
import ScrollContainer from "react-indiana-drag-scroll";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchRecommendations } from "../../features/recommendationSlice";
import { fetchUserPrefs } from "../../features/preferenceSlice";
import Loader from "../UI/Loader/Loader";

export const MainPage = () => {
    const dispatch = useDispatch()
    const { userRecommend } = useSelector(state => state.recommendations)
    const { userPrefs, status } = useSelector(state => state.preferences)

    useEffect(() => {
        dispatch(fetchUserPrefs());
    }, [dispatch])
    const isQuizPassed = userPrefs && (
        (userPrefs.category_preferences?.length > 0) ||
        (userPrefs.note_preferences?.length > 0)
    )

    useEffect(() => {
        if (isQuizPassed) {
            dispatch(fetchRecommendations())
        }
    }, [isQuizPassed])

    if (status === 'loading' || status === 'idle') {
        return <Loader />;
    }

    return (
        <>
            <Container>
                <div className={s.header}>
                    <h2 className={s.title}>
                        {isQuizPassed ? "Ваши рекомендации" : "Популярные ароматы"}
                    </h2>
                    <Link
                        to={isQuizPassed ? "/recommendations" : "/catalog"}
                        className={s.link}
                    >
                        {isQuizPassed ? "Смотреть все рекомендации" : "Весь каталог"}
                    </Link>
                </div>
            </Container>

            <Catalog isHome={true} isRecommendations={isQuizPassed} />

            <SubscriptionBanner />
        </>
    )
}