import React, { useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import s from './GenderChart.module.scss'

const CATEGORY_COLORS = {
    'Женские': '#CA46DC',
    'Мужские': '#B1DC46',
    'Унисекс': '#FB3335',
}

export default function GenderChart({ genderChart, period }) {
    const data = useMemo(() => {
        if (!genderChart || !Array.isArray(genderChart)) return [];

        const total = genderChart.reduce((sum, item) => sum + Number(item.value), 0);

        return genderChart.map(item => ({
            name: item.name,
            value: Number(item.value),
            percentage: total > 0 ? Math.round((Number(item.value) / total) * 100) : 0,
            color: CATEGORY_COLORS[item.name] || '#e9e9e9'
        }));
    }, [genderChart]);

    return (
        <div className={s.genderCard}>
            <div className={s.header}>
                <h2>Распределение по полу</h2>
                <p>Продажи по категориям</p>
            </div>

            <div className={s.chartWrapper}>
                <ResponsiveContainer width={320} height={320}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            innerRadius={83}
                            outerRadius={117}
                            paddingAngle={-20}
                            cornerRadius={30}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={entry.color}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className={s.legend}>
                {data.map((item) => (
                    <div key={item.name} className={s.legendItem}>
                        <span
                            className={s.dot}
                            style={{ background: item.color }}
                        />

                        <span className={s.label} style={{ color: item.color }}>
                            {item.name}

                            <strong>{item.percentage}%</strong>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}