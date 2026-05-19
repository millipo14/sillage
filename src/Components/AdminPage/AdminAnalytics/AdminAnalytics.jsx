import React, { useState } from 'react'
import s from './AdminAnalytics.module.scss'
import Dashboards from './Dashboards/Dashboards'

export default function AdminAnalytics() {
  const [activePeriod, setActivePeriod] = useState('week')

  const periods = [
    { id: 'day', label: 'День' },
    { id: 'week', label: 'Неделя' },
    { id: 'month', label: 'Месяц' }
  ]

  return (
    <div>
      <div className={s["periods"]}>
        {periods.map(p => (
          <button
            key={p.id}
            className={`${s['periodBtn']} ${activePeriod === p.id ? s['activeBtn'] : ''}`}
            onClick={() => setActivePeriod(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>
      <Dashboards period={activePeriod} />
    </div>
  )
}
