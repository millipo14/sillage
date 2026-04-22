import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setBrand,
    setGender,
    setPrice,
    setNotes,
    setCategory,
    setConcentration,
    resetFilters
} from '../../features/filterSlice';
import { fetchPerfume, fetchFilter } from '../../features/perfumeSlice';
import s from './FilterModal.module.scss';
import DeleteIcon from '../../assets/svg/deleteIcon.svg?react'

export const FilterModal = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const currentFilters = useSelector(state => state.filters);

    const isBrandFixed = useSelector(state => state.filters.brand !== null);

    const { filters } = useSelector(state => state.perfume);

    const categories = filters?.categories || [];
    const notes = filters?.notes || [];
    const concentration = filters?.concentration || [];

    const [tempFilters, setTempFilters] = useState(currentFilters);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (open && notes.length === 0) {
            dispatch(fetchFilter());
        }
    }, [open, notes.length, dispatch]);

    useEffect(() => {
        if (open) {
            setTempFilters(currentFilters);
        }
    }, [open, currentFilters]);

    const filteredNotes = useMemo(() => {
        return notes.filter(n =>
            n.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [notes, searchTerm]);

    if (!open) return null;

    const handleNoteToggle = (note) => {
        const isSelected = tempFilters.notes.includes(note);
        const newNotes = isSelected
            ? tempFilters.notes.filter(n => n !== note)
            : [...tempFilters.notes, note];

        setTempFilters({ ...tempFilters, notes: newNotes });
    };

    const handleApply = () => {
        dispatch(setGender(tempFilters.gender));
        dispatch(setPrice({
            min: tempFilters.minPrice,
            max: tempFilters.maxPrice
        }));
        dispatch(setNotes(tempFilters.notes));
        dispatch(setCategory(tempFilters.category));
        dispatch(setConcentration(tempFilters.concentration));

        if (currentFilters.brand) {
            dispatch(setBrand(currentFilters.brand));
        }

        dispatch(fetchPerfume({ page: 1 }));
        onClose();
    };

    const handleReset = () => {
        dispatch(resetFilters());

        if (isBrandFixed) {
            dispatch(setBrand(currentFilters.brand));
        }

        dispatch(fetchPerfume({ page: 1 }));
        onClose();
    };

    return (
        <div className={s['modal-overlay']} onClick={onClose}>
            <div className={s['modal']} onClick={e => e.stopPropagation()}>
                <header className={s['modal-header']}>
                    <h3>Фильтры</h3>
                    <button onClick={onClose} className={s['close-btn']}>&times;</button>
                </header>

                <div className={s['modal-body']}>

                    {/* ПОЛ */}
                    <section className={s['filter-section']}>
                        <h4 className={s['section-title']}>Для кого</h4>
                        <div className={s['chips-group']}>
                            {['male', 'female', 'unisex'].map(g => (
                                <button
                                    key={g}
                                    className={`${s['chip']} ${tempFilters.gender === g ? s['active'] : ''}`}
                                    onClick={() => setTempFilters({ ...tempFilters, gender: g })}
                                >
                                    {g === 'male' ? 'Мужской' : g === 'female' ? 'Женский' : 'Унисекс'}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* ЦЕНА */}
                    <section className={s['filter-section']}>
                        <h4 className={s['section-title']}>Цена (₽)</h4>
                        <div className={s['price-inputs']}>
                            <input
                                type="number"
                                placeholder="От"
                                value={tempFilters.minPrice || ''}
                                onChange={e => setTempFilters({ ...tempFilters, minPrice: e.target.value })}
                            />
                            <div className={s['divider']} />
                            <input
                                type="number"
                                placeholder="До"
                                value={tempFilters.maxPrice || ''}
                                onChange={e => setTempFilters({ ...tempFilters, maxPrice: e.target.value })}
                            />
                        </div>
                    </section>

                    {/* НОТЫ */}
                    <section className={s['filter-section']}>
                        <h4 className={s['section-title']}>Ноты состава</h4>

                        {/* Блок выбранных нот (тот самый крутой фильтр) */}
                        {tempFilters.notes.length > 0 && (
                            <div className={s['selected-badges']}>
                                {tempFilters.notes.map(note => (
                                    <span key={note} className={s['badge']} onClick={() => handleNoteToggle(note)}>
                                        {note} <span className={s['delete-note']}><DeleteIcon/></span>
                                    </span>
                                ))}
                            </div>
                        )}

                        <input
                            type="text"
                            className={s['search-input']}
                            placeholder="Поиск нот"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />

                        <div className={s['scroll-area']}>
                            <div className={s['notes-list']}>
                                {filteredNotes.length > 0 ? (
                                    filteredNotes.map(note => (
                                        <label key={note} className={s['checkbox-item']}>
                                            <input
                                                type="checkbox"
                                                checked={tempFilters.notes.includes(note)}
                                                onChange={() => handleNoteToggle(note)}
                                            />
                                            <span className={s['checkmark']} />
                                            <span className={s['label-text']}>{note}</span>
                                        </label>
                                    ))
                                ) : (
                                    <p className={s['empty-text']}>Ничего не найдено</p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* КАТЕГОРИИ */}
                    <section className={s['filter-section']}>
                        <h4 className={s['section-title']}>Группа ароматов</h4>
                        <select
                            value={tempFilters.category || ''}
                            onChange={e => setTempFilters({ ...tempFilters, category: e.target.value })}
                            className={s['select-input']}
                        >
                            <option value="">Все группы</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </section>
                    {/* КОНЦЕНТРАЦИЯ */}
                    <section className={s['filter-section']}>
                        <h4 className={s['section-title']}>Концентрация</h4>
                        <select
                            value={tempFilters.concentration || ''}
                            onChange={e => setTempFilters({ ...tempFilters, concentration: e.target.value })}
                            className={s['select-input']}
                        >
                            <option value="">Любая</option>
                            {concentration.map(conc => (
                                <option key={conc} value={conc}>
                                    {
                                        conc === 'Eau de Parfum' ? 'Парфюмерная вода' :
                                            conc === 'Eau de Toilette' ? 'Туалетная вода' :
                                                conc === 'Extrait de Parfum' ? 'Духи' : conc
                                    }
                                </option>
                            ))}
                        </select>
                    </section>
                </div>

                <footer className={s['modal-footer']}>
                    <button onClick={handleReset} className={s['reset-btn']}>Сбросить</button>
                    <button onClick={handleApply} className={s['apply-btn']}>Применить</button>
                </footer>
            </div>
        </div>
    );
};