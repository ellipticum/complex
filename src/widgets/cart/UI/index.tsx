'use client'

import React, { useState } from 'react'

import cn from 'classnames'

import styles from './styles.module.scss'

import formatPhoneNumber from '@/shared/utils/format-phone-number'

import Wrapper from '@/shared/UI/wrapper'

const Cart = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>('')

    return (
        <Wrapper isFitted={true}>
            <div className={styles.cart}>
                <h2 className={styles.heading}>Добавленные товары</h2>
                <ul className={styles.products}></ul>
                <div className={styles.bottom}>
                    <input
                        className='wrapper'
                        type='phone'
                        placeholder='+7 (___) ___ __-__'
                        maxLength={18}
                        value={phoneNumber}
                        onChange={(event) => setPhoneNumber(formatPhoneNumber(event.target.value))}
                    />
                    <button className='wrapper'>заказать</button>
                </div>
            </div>
        </Wrapper>
    )
}

export default Cart
