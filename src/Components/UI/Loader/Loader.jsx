import React from 'react'
import s from './Loader.module.scss'

export default function Loader() {
    return (
        <div className={s.wrapper}>
            <div className={s.spinner}></div>
        </div>
    )
}
