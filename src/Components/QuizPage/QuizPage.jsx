import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import s from './QuizPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilter } from '../../features/perfumeSlice';
import { fetchQuiz, fetchQuizOptions } from '../../features/preferenceSlice';


export const QuizPage = () => {
    const { notes, categories } = useSelector(state => state.preferences)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [step, setStep] = useState(0)
    const [answers, setAnswers] = useState({
        gender: null,
        categories: [],
        notes: []
    })

    useEffect(() => {
        dispatch(fetchQuizOptions())
        console.log(dispatch(fetchQuizOptions()))
    }, [dispatch])

    const quizData = useMemo(() => {
        return [
            {
                id: 'gender', question: 'Какие ароматы  Вам ближе?',
                type: 'single',
                options: [
                    { value: 'male', label: 'Мужские' },
                    { value: 'female', label: 'Женские' },
                    { value: 'unisex', label: 'Унисекс' },
                    { value: 'any', label: 'Нет предпочтений' }
                ]
            },
            {
                id: 'categories', question: 'Какое звучание парфюма Вам нравится?',
                type: 'multiple',
                options: (categories || []).map(cat => ({
                    value: cat,
                    label: cat
                }))
            },
            {
                id: 'notes', question: 'Может, Вам нравятся определенные ноты?',
                type: 'multiple',
                options: (notes || []).map(note => ({
                    value: note.id || note,
                    label: note.name || note
                }))
            }
        ]
    }, [notes, categories])

    const currentQuestion = quizData[step]

    const handleSelect = (value) => {
        if (currentQuestion.type === 'single') {
            setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }))
        } else {
            const currentSelect = answers[currentQuestion.id]
            const newSelect = currentSelect.includes(value)
                ? currentSelect.filter(i => i !== value) :
                [...currentSelect, value];
            setAnswers(prev => ({ ...prev, [currentQuestion.id]: newSelect }))
        }
    }

    const handleNext = () => {
        if (step < quizData.length - 1) {
            setStep(prev => prev + 1)
        } else {
            dispatch(fetchQuiz(answers)).then(() => {
                navigate('/recommendations')
            })
        }
    }

    const handleBack = () => {
        if (step > 0) setStep(prev => prev - 1)
    }

    return (
        <div className={s.wrapper}>
            <div className={s.quizCard}>
                <div className={s.header}>
                    <div className={s.progress} style={{ width: `${((step + 1) / quizData.length) * 100}%` }} />
                </div>
                <p className={s.subtitle}>
                    Ответьте на несколько вопросов - и мы подберем идеальный аромат
                </p>

                <div className={s.content}>
                    <h1 className={s.title}>
                        {currentQuestion.question}
                    </h1>

                    {/* <div className={cn(s.options)}>

                        {
                            currentQuestion.options.map(option => (

                                <div
                                    key={option.value}
                                    className={cn(s.optionCard, {
                                        [s.active]: currentQuestion.type === 'single'
                                            ? answers[currentQuestion.id] === option.value
                                            : answers[currentQuestion.id].includes(option.value)
                                    })}
                                    onClick={() => handleSelect(option.value)}
                                >
                                    <div className={s.cardContent}>
                                        <span className={s.optTitle}>
                                            {option.label}
                                        </span>

                                        <span className={s.optDesc}>

                                        </span>

                                    </div>
                                </div>
                            ))
                        }

                    </div> */}
                    <div className={cn(s.options, {
                        [s.cards]: currentQuestion.id === 'gender',
                        [s.tags]: currentQuestion.id === 'categories' || currentQuestion.id === 'notes'
                    })}>
                        {currentQuestion.options.map(option => (
                            <div
                                key={option.value}
                                className={cn(s.optionCard, {
                                    [s.active]: currentQuestion.type === 'single'
                                        ? answers[currentQuestion.id] === option.value
                                        : answers[currentQuestion.id].includes(option.value)
                                })}
                                onClick={() => handleSelect(option.value)}
                            >
                                <span className={s.optTitle}>{option.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={s.footer}>
                    <button
                        className={s.btnBack}
                        onClick={handleBack}>
                        Назад
                    </button>
                    <button
                        className={s.btnBack}
                        onClick={handleNext}>
                        {step === quizData.length - 1 ? 'Завершить' : 'Продолжить'}
                    </button>
                </div>
            </div>
        </div>
    );
};