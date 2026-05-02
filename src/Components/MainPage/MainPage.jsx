import { Link } from "react-router-dom";
import { SubscriptionBanner } from "../Banner/SubscriptionBanner"
import { Catalog } from "../Catalog/Catalog"
import s from './MainPage.module.scss'
import { Container } from "../Layout/Container/Container";
import ScrollContainer from "react-indiana-drag-scroll";

export const MainPage = () => {
    const isQuizPassed = false;
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