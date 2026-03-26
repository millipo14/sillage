import cn from 'classnames'
import s from './CatalogProducts.module.scss'

export const CatalogProducts = ({ className, children }) => {
    return <div className={cn(s['catalog-products'], className)}>{children}</div>
}