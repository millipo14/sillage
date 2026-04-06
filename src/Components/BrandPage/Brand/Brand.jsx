import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Catalog } from "../../Catalog/Catalog"
import { useEffect } from 'react'
import { fetchBrands } from "../../../features/brandsSlice"
import { IMAGES_URL } from '../../../const'
import s from './Brand.module.scss'
import { setBrand } from "../../../features/filterSlice"
import { fetchPerfume } from "../../../features/perfumeSlice"

export const Brand = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { brands } = useSelector(state => state.brands)

    const brand = brands.find(b => b.brand_id === Number(id))

    useEffect(() => {
        if (!brands || brands.length === 0) {
            dispatch(fetchBrands())
        }

        dispatch(setBrand(id))
        dispatch(fetchPerfume({ page: 1 }))

        return () => {
            dispatch(setBrand(null))
        }
    }, [dispatch, brands, id])

    return (
        <>
            <div className={s.brandPage}>
                <div className={s.header}>
                    <div className={s.logo}>
                        <img src={`${IMAGES_URL}${brand?.logo_url}`} alt={brand?.name || ''} />
                    </div>
                    <div className={s.info}>
                        <h1 className={s.name}>{brand?.name}</h1>
                        <div className={s.meta}>
                            <span className={s.country}>Страна: {brand?.country}</span>
                            <span className={`${s.luxury} ${s[brand?.luxury_level] || ''}`}>
                                {brand?.luxury_level === 'niche' ? 'Нишевый' : 'Премиум'}
                            </span>
                        </div>
                        <p className={s.description}>{brand?.description}</p>
                    </div>
                </div>
            </div>

            <Catalog brandId={id} fromPage='brand' />
        </>

    )
}