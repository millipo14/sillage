import React, { useEffect, useState } from 'react'
import { Catalog } from '../Catalog/Catalog'
import s from './SelectionSample.module.scss'
import { Container } from '../Layout/Container/Container'
import SelectionSummary from './SelectionSummary'
import { useSelector } from 'react-redux'

export default function SelectionSample() {
    const [openSelected, setOpenSelected] = useState(false)
    const { selectedSamples, activePlan } = useSelector(state => state.subscriptionPlans)

    const getSamplewWord = (total) => {
        total = Math.abs(total) % 100;
        const lastDigit = total % 10;

        if (total > 10 && total < 20) return 'пробников';
        if (lastDigit === 1) return 'пробник';
        if (lastDigit >= 2 && lastDigit <= 4) return 'пробника';
        return 'пробников';
    }

    return (
        <Container>
            <h2 className={s['sample-title']}>Соберите свой идеальный набор</h2>
            <p className={s.subtitle}>По выбранному тарифу вы можете самостоятельно выбрать {activePlan.custom_samples} {getSamplewWord(activePlan.custom_samples)}</p>

            <div className={s['catalog-wrapper']}>
                <Catalog isSelectionSample={true} />
            </div>
            <button
                className={s['floating-cart']}
                onClick={() => setOpenSelected(true)}
            >
                {selectedSamples.length > 0 && (
                    <span className={s['badge']}>{selectedSamples.length}</span>
                )}
                Выбранные <br />пробники
            </button>

            {openSelected && (
                <div className={s['modal-overlay']} onClick={() => setOpenSelected(false)}>
                    <div className={s['modal-content']} onClick={e => e.stopPropagation()}>
                        <button
                            className={s['close-modal']}
                            onClick={() => setOpenSelected(false)}
                        >
                            &times;
                        </button>
                        <SelectionSummary />
                    </div>
                </div>
            )}
        </Container>
    )
}
