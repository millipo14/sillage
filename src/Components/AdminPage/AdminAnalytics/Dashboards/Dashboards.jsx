import React, { useEffect } from 'react'
import s from './Dashboards.module.scss'
import { Container } from '../../../Layout/Container/Container'
import RevenueChart from './RevenueChart/RevenueChart'
import GenderChart from './GenderChart/GenderChart'
import HitsChart from './HitsChart/HitsChart'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDashboards, fetchGenderChart, fetchHitsChart, fetchRevenueChart } from '../../../../features/adminAnalyticsSlice'


export default function Dashboards({ period }) {
    const dispatch = useDispatch()
    const { stats, revenueChart, genderChart, hitsPerfumes } = useSelector(state => state.adminAnalytics)

    useEffect(() => {
        dispatch(fetchDashboards(period))
        dispatch(fetchRevenueChart(period))
        dispatch(fetchGenderChart(period))
        dispatch(fetchHitsChart(period))
    }, [dispatch, period])

    const periodLabel = period === 'day' ? 'вчерашнего дня' :
        period === 'month' ? 'прошлого месяца' :
            'прошлой недели';

    const statsData = [
        {
            id: 1,
            title: 'Выручка',
            value: `${stats.revenue.toLocaleString('ru-RU')} ₽`,
            trend: stats.trends?.revenue || '0%',
            period: periodLabel
        },
        {
            id: 2,
            title: 'Заказы',
            value: stats.ordersCount.toLocaleString('ru-RU'),
            trend: stats.trends?.orders || '0%',
            period: periodLabel
        },
        {
            id: 3,
            title: 'Средний чек',
            value: `${stats.averageCheck.toLocaleString('ru-RU')} ₽`,
            trend: stats.trends?.averageCheck || '0%',
            period: periodLabel
        },
        {
            id: 4,
            title: 'Новые пользователи',
            value: stats.usersCount.toLocaleString('ru-RU'),
            trend: stats.trends?.users || '0%',
            period: periodLabel
        },
    ];

    return (
        <Container>
            <div className={s['statsData']}>
                {statsData.map(data => (
                    <div key={data.id} className={s['statsCard']}>
                        <span className={s['statsTitle']}>{data.title}</span>
                        <p className={s['statsValue']}>{data.value}</p>
                        <p className={s['statsTrendAndPeriod']}>{data.trend} от {data.period}</p>
                    </div>
                ))}
            </div>
            <section className={s["charts"]}>
                <RevenueChart revenueChart={revenueChart} period={period} />
                <GenderChart genderChart={genderChart} period={period} />
            </section>
            <HitsChart hitsPerfumes={hitsPerfumes} period={period} />

        </Container>
    )
}
