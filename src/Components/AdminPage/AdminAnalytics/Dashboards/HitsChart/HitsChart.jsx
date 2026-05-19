import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import s from './HitsChart.module.scss';


export default function HitsChart({ hitsPerfumes, period }) {
    const hitsData = useMemo(() => {
        if (!hitsPerfumes || !Array.isArray(hitsPerfumes)) return [];

        return hitsPerfumes.map(item => ({
            name: item.perfume?.name || 'Unknown',
            sales: Number(item.totalSold)
        }));
    }, [hitsPerfumes]);

    const periodText = period === 'day' ? 'за 24 часа' :
        period === 'month' ? 'за месяц' :
            'за неделю';

    return (
        <div className={s.chartCard}>
            <h3 className={s.title}>Хиты продаж</h3>
            <p className={s.subtitle}>Топ-5 товаров {periodText}</p>

            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={hitsData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="6 6" vertical={false} strokeWidth={2} stroke="#e9e9e9" />

                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 16, fontWeight: 600 }}
                            dy={10}
                        />

                        <YAxis
                            dx={-22}
                            axisLine={false}
                            tickLine={false}
                            allowDecimals={false}
                            interval={0}
                            tick={{ fontSize: 16, fontWeight: 600 }}
                        />

                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />

                        <Bar
                            dataKey="sales"
                            fill="#8056dc"
                            radius={[6, 6, 6, 6]}
                            barSize={230}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className={s.footer}>Продажи (шт)</div>
        </div>
    );
}