import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecommendations } from '../../features/recommendationSlice';
import { Catalog } from '../Catalog/Catalog';
import s from './Recommendations.module.scss';
import { Container } from '../Layout/Container/Container';

export const Recommendations = () => {
    const dispatch = useDispatch();
    const { status } = useSelector(state => state.recommendations);

    useEffect(() => {
        dispatch(fetchRecommendations());
    }, [dispatch]);

    return (
        <section className={s.recommendationsSection}>
            <Container>
                <h1 className={s['rec']}>Персональные рекомендации</h1>
                <p className={s.subtitle}>Подобрано специально для вас на основе ваших предпочтений</p>
            </Container>

            <Catalog isRecommendations={true} />
        </section>
    );
};