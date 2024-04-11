'use client'

import React, { useEffect, useState } from 'react'

import cn from 'classnames'

import styles from './styles.module.scss'

import useCartStore from '@/widgets/cart/model'
import useNotificationStore from '@/widgets/notification/model'

import formatPhoneNumber from '@/shared/utils/format-phone-number'
import unformatPhoneNumber from '@/shared/utils/unformat-phone-number'

import request from '@/shared/utils/request'

import Loader from '@/shared/UI/loader'

const Cart = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>(
        () => localStorage.getItem('phoneNumber') || ''
    )
    const [isValid, setIsValid] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const { setIsNotificationHidden } = useNotificationStore()
    const { setCurrentProductId } = useCartStore()

    const { items, setItems } = useCartStore()

    const order = async () => {
        try {
            if (phoneNumber.length < 18) {
                setIsValid(false)

                return
            }

            if (items.length === 0) {
                return
            }

            setIsLoading(true)

            const data = await request('order', 'post', {
                phone: unformatPhoneNumber(phoneNumber),
                cart: items.map((item) => ({ id: item.product.id, quantity: item.quantity }))
            })

            if (data.success) {
                setIsNotificationHidden(false)

                setItems([])
                setPhoneNumber('')
                setCurrentProductId(null)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (value: string) => {
        setIsValid(true)
        setPhoneNumber(formatPhoneNumber(value))
    }

    useEffect(() => {
        localStorage.setItem('phoneNumber', String(phoneNumber))
    }, [phoneNumber])

    return (
        <div className={styles.cart}>
            <h2 className={styles.heading}>Добавленные товары</h2>
            <ul className={styles.content}>
                {items.map((item, index) => {
                    return (
                        <li key={index} className={styles.item}>
                            <p className={styles.title}>{item.product.title}</p>
                            <div className={styles.info}>
                                <p className={styles.quantity}>x{item.quantity}</p>
                                <p>{item.price}₽</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <div className={styles.bottom}>
                <input
                    className={cn('wrapper', styles.input, { [styles.invalid]: !isValid })}
                    type='phone'
                    placeholder='+7 (___) ___ __-__'
                    maxLength={18}
                    value={phoneNumber}
                    onChange={(event) => handleChange(event.target.value)}
                />
                <button className='wrapper' onClick={() => order()}>
                    {isLoading ? <Loader isSmall={true} /> : 'заказать'}
                </button>
            </div>
        </div>
    )
}

export default Cart
