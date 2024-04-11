'use client'

import React, { useEffect, useRef } from 'react'

import cn from 'classnames'

import styles from './styles.module.scss'

import useNotificationStore from '@/widgets/notification/model'

const Notification = () => {
    const { isNotificationHidden, setIsNotificationHidden } = useNotificationStore()

    const modalRef = useRef<HTMLDivElement | null>(null)

    const handleCloseModal = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setIsNotificationHidden(true)
        }
    }

    useEffect(() => {
        if (!isNotificationHidden) {
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isNotificationHidden])

    return (
        <div
            className={cn(styles.overlay, { [styles.hidden]: isNotificationHidden })}
            onClick={handleCloseModal}
        >
            <div ref={modalRef} className={styles.modal}>
                <h1 className={styles.heading}>Заказ успешно сформирован!</h1>
                <button className={styles.button} onClick={() => setIsNotificationHidden(true)}>
                    закрыть
                </button>
            </div>
        </div>
    )
}

export default Notification
