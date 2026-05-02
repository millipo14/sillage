import { TopCatalog } from "./TopCatalog/TopCatalog"
import { Container } from "../Layout/Container/Container"
import { Perfume } from "../Perfume/Perfume"
import { useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchPerfume } from '../../features/perfumeSlice'
import { Pagination } from "../Pagintaion/Pagination"
import Loader from "../UI/Loader/Loader";

export const Catalog = ({ brandId, isHome = false, isRecommendations = false }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const { perfume, total, status: catalogStatus } = useSelector(state => state.perfume);
    const { userRecommend, status: recStatus } = useSelector(state => state.recommendations)

    const page = Number(new URLSearchParams(location.search).get('page')) || 1;

    const currentItems = isRecommendations ? userRecommend : perfume;
    const currentStatus = isRecommendations ? recStatus : catalogStatus;

    useEffect(() => {
        if (brandId || isRecommendations) return
        dispatch(fetchPerfume({ page: isHome ? 1 : page }))
    }, [dispatch, page, brandId, isHome, isRecommendations])

    const displayItems = isHome ? currentItems.slice(0, 4) : currentItems;

    const from = isRecommendations ? 'recommendations' : (brandId ? 'brand' : 'catalog');


    return (
        <Container>
            {!isHome && !isRecommendations && <TopCatalog total={total} />}
            <div style={{ position: 'relative', minHeight: '700px' }}>
                {currentStatus === 'loading' && (
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(255,255,255,0.6)',
                        zIndex: 10,
                        display: 'flex',
                        justifyContent: 'center',
                        paddingTop: '100px',
                        backdropFilter: 'blur(2px)'
                    }}>
                        <Loader />
                    </div>
                )}
                <Perfume
                    isHome={isHome}
                    perfume={displayItems}
                    sourceFrom={from}
                    status={currentStatus}
                />
            </div>

            {!isHome && !isRecommendations && <Pagination />}
        </Container>

    )
}