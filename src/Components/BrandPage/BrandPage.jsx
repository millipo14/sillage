import s from './BrandPage.module.scss'
import { Container } from '../Layout/Container/Container'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchBrands } from '../../features/brandsSlice'
import { IMAGES_URL } from '../../const'
import { useNavigate } from 'react-router-dom'
import Loader from '../UI/Loader/Loader'

export const BrandPage = () => {
    const dispatch = useDispatch()
    const { brands, status } = useSelector(state => state.brands)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchBrands())
    }, [dispatch]);


    if (status === 'loading') {
        return <Loader />
    }

    return (
        <Container className={s['brands']}>
            <h2 className={s['brands-title']}>Бренды</h2>
            <div className={s['brands-grid']}>
                {

                    brands?.map((brand) => (

                        <div
                            key={brand.brand_id}
                            className={s['brand-card']}
                            onClick={() => navigate(`/brands/${brand.brand_id}`)}
                        >
                            <div className={s['brand-card_logo']}>
                                <img src={`${IMAGES_URL}${brand?.logo_url}`} alt={brand?.name} />
                            </div>
                            <h3 className={s['brand-card_name']}>{brand?.name}</h3>
                        </div>

                    ))
                }
            </div>
        </Container>
    )
}