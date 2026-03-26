import { TopCatalog } from "./TopCatalog/TopCatalog"
import { Container } from "../Layout/Container/Container"
import { Perfume } from "../Perfume/Perfume"
import { useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchPerfume } from '../../features/perfumeSlice'
import { Pagination } from "../Pagintaion/Pagination"

export const Catalog = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { perfume, total } = useSelector(state => state.perfume);
    const page = Number(new URLSearchParams(location.search).get('page')) || 1;

    useEffect(() => {
        dispatch(fetchPerfume(page))
    }, [dispatch, page])

    return (
        <Container>
            <TopCatalog total={total} />
            <Perfume perfume={perfume} />
            <Pagination/>
        </Container>

    )
}