import s from './BrandPage.module.scss'
import { Container } from '../Layout/Container/Container'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchBrands } from '../../features/brandsSlice'
import { IMAGES_URL } from '../../const'

export const BrandPage = () => {
    const dispatch = useDispatch()
    const { brands } = useSelector(state => state.brands)

    useEffect(() => {
        dispatch(fetchBrands())
        // .unwrap()
        // .then((data) => console.log('Fetched brands:', data))
        // .catch(err => console.error(err));
    }, [dispatch]);
    console.log('brands array:', brands);
    console.log('brands length:', brands?.length);
    return (

        <Container className={s['brands']}>
            <h2 className={s['brands-title']}>Бренды</h2>
            <div className={s['brands-grid']}>
                {

                    brands?.map((brand) => (

                        <div key={brand.brand_id} className={s['brand-card']}>
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