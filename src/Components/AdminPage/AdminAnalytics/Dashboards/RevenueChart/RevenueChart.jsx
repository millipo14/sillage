import React, { useMemo } from 'react'
import s from './RevenueChart.module.scss'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function RevenueChart({ revenueChart, period }) {
    const data = useMemo(() => {
        if (!revenueChart || !Array.isArray(revenueChart)) return [];

        return revenueChart.map(item => {
            const date = new Date(item.date);
            let name;

            if (period === 'day') {
                name = date.getHours() === 0 && date.getMinutes() === 0
                    ? date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
                    : date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
            } else if (period === 'month') {
                name = date.getDate();
            } else {
                name = date.toLocaleDateString('ru-RU', { weekday: 'short' }); 
            }

            return {
                name: name,
                revenue: Number(item.revenue),
                orders: Number(item.orders)
            };
        });
    }, [revenueChart, period])

    const periodText = period === 'day' ? 'за последние 24 часа' :
        period === 'month' ? 'за последние 30 дней' :
            'за последнюю неделю';

    return (
        <div className={s.revenueCard}>
            <div className={s.header}>
                <h2>Выручка и заказы</h2>
                <p>Динамика {periodText}</p>
            </div>

            <ResponsiveContainer width="100%" height={420}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8056dc" stopOpacity={0.1} />
                            <stop offset="100%" stopColor="#8056dc" stopOpacity={0} />
                        </linearGradient>

                        <filter id="shadow">
                            <feDropShadow
                                dx="0"
                                dy="6"
                                stdDeviation="8"
                                floodColor="#8056dc"
                                floodOpacity="0.54"
                            />
                        </filter>
                    </defs>

                    <CartesianGrid
                        strokeDasharray="6 6"
                        vertical={false}
                        strokeWidth={2}
                        stroke="#e9e9e9"
                    />

                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickMargin={8}
                        tickLine={false}
                        tick={{ fill: '#1a1a1a', fontSize: 16, fontWeight: 600, opacity: 0.66 }}
                    />

                    <YAxis
                        width={100}
                        tickMargin={16}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#1a1a1a', fontSize: 16, fontWeight: 600, opacity: 0.66 }}
                        tickFormatter={(value) => `${value.toLocaleString('ru-RU')}₽`}
                    />

                    <Tooltip formatter={(value) => [`${value.toLocaleString('ru-RU')} ₽`, '']}
                        cursor={{
                            strokeWidth: '2px',
                            stroke: '#8056dc',
                            strokeDasharray: '7 7',
                            strokeOpacity: 0.6,
                        }}
                        contentStyle={{
                            borderRadius: '14px',
                            border: '1px solid #ececf3',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                            padding: '10px 14px',
                        }} />

                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#8056dc"
                        strokeWidth={2}
                        fill="url(#colorRevenue)"
                        filter="url(#shadow)"
                        dot={{
                            r: 0,
                        }}
                        activeDot={{
                            r: 7,
                            stroke: '#fff',
                            strokeWidth: 3,
                            fill: '#8056dc',
                            style: {
                                filter: 'drop-shadow(0 2px 7px rgba(62, 37, 115, 0.54))'
                            }
                        }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}