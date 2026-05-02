import { TopCatalog } from "./TopCatalog/TopCatalog"
import { Container } from "../Layout/Container/Container"
import { Perfume } from "../Perfume/Perfume"
import { useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchPerfume } from '../../features/perfumeSlice'
import { Pagination } from "../Pagintaion/Pagination"

export const Catalog = ({ brandId, isHome = false, isRecommendations = false }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const { perfume, total } = useSelector(state => state.perfume);
    const page = Number(new URLSearchParams(location.search).get('page')) || 1;

    const from = brandId ? 'brand' : 'catalog'

    useEffect(() => {
        dispatch(fetchPerfume({ page: isHome ? 1 : page }))
    }, [dispatch, page, brandId, isHome])

    const displayItems = isHome ? perfume.slice(0, 4) : perfume;

    return (
        <Container>
            {!isHome && !isRecommendations && <TopCatalog total={total} />}
            <Perfume
                isHome={isHome}
                perfume={displayItems}
                sourceFrom={from} />
            {!isHome && <Pagination />}
        </Container>

    )
}