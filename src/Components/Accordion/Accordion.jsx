import s from './Accordion.module.scss'
import AccordionArrow from '../../assets/svg/accordionArrow.svg?react'
import { useState } from 'react'
import cn from 'classnames'

export const Accordion = ({ singlePerfume }) => {

    const [openItem, setOpen] = useState([])

    const toggleAccordion = (index) => {
        setOpen(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        )
    }

    return (
        <section className={s['accordion-info']}>

            <div className={s['accordion-item']}>
                <button
                    type="button"
                    className={s['accordion-title']}
                    onClick={() => toggleAccordion(0)}
                >
                    Категория аромата
                    <span className={s['accordion-icon']}>
                        <AccordionArrow />
                    </span>
                </button>

                <div
                    className={cn(
                        s['accordion-content'],
                        openItem.includes(0) && s.open
                    )}
                >
                    {singlePerfume?.perfume_category}
                </div>
            </div>


            <div className={s['accordion-item']}>
                <button
                    type="button"
                    className={s['accordion-title']}
                    onClick={() => toggleAccordion(1)}
                >
                    Ноты аромата
                    <span className={s['accordion-icon']}>
                        <AccordionArrow />
                    </span>
                </button>

                <div
                    className={cn(
                        s['accordion-content'],
                        openItem.includes(1) && s.open
                    )}
                >
                    {singlePerfume?.notes?.map(note => note.note_name).join(', ')}
                </div>
            </div>


            <div className={s['accordion-item']}>
                <button
                    type="button"
                    className={s['accordion-title']}
                    onClick={() => toggleAccordion(2)}
                >
                    Для кого
                    <span className={s['accordion-icon']}>
                        <AccordionArrow />
                    </span>
                </button>

                <div
                    className={cn(
                        s['accordion-content'],
                        openItem.includes(2) && s.open
                    )}
                >
                    {singlePerfume?.gender === 'male'
                        ? 'Мужской'
                        : singlePerfume?.gender === 'female'
                            ? 'Женский'
                            : singlePerfume?.gender === 'unisex'
                                ? 'Унисекс'
                                : 'Не указан'}
                </div>
            </div>
            <div className={s['accordion-item']}>
                <button
                    type="button"
                    className={s['accordion-title']}
                    onClick={() => toggleAccordion(3)}
                >
                    Концентрация
                    <span className={s['accordion-icon']}>
                        <AccordionArrow />
                    </span>
                </button>

                <div
                    className={cn(
                        s['accordion-content'],
                        openItem.includes(3) && s.open
                    )}
                >
                    {singlePerfume?.concentration === 'Eau de Parfum'
                        ? 'Парфюмерная вода'
                        : singlePerfume?.concentration === 'Eau de Toilette'
                            ? 'Туалетная вода'
                            : singlePerfume?.concentration === 'Extrait de Parfum'
                                ? 'Духи'
                                : 'Не указанa'}
                </div>
            </div>

            <div className={s['accordion-item']}>
                <button
                    type="button"
                    className={s['accordion-title']}
                    onClick={() => toggleAccordion(4)}
                >
                    О бренде
                    <span className={s['accordion-icon']}>
                        <AccordionArrow />
                    </span>
                </button>

                <div
                    className={cn(
                        s['accordion-content'],
                        openItem.includes(4) && s.open
                    )}
                >
                    {singlePerfume?.brand?.description}
                </div>
            </div>

        </section>
    )
}