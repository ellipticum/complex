'use client'

import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import cn from 'classnames'

import styles from './styles.module.scss'

import useCartStore from '@/widgets/cart/model'

import IProduct from '@/entities/product/model'

const Product = ({ id, image_url, title, description, price }: IProduct) => {
    const [quantity, setQuantity] = useState(0)
    const { currentProductId, setCurrentProductId, items, setItems } = useCartStore()

    useEffect(() => {
        const existingItem = items.find((item) => item.productId === id)
        setQuantity(existingItem?.quantity || 0)
    }, [id, useCartStore])

    const addToCart = () => {
        setItems((prevState) => {
            const existingItem = prevState.find((item) => item.productId === id)
            if (!existingItem) {
                return [...prevState, { quantity: 1, productId: id }]
            }
            return prevState
        })
        setCurrentProductId(id)
    }

    const changeQuantity = (delta: number) => {
        const newQuantity = quantity + delta
        if (newQuantity < 0) return

        setQuantity(newQuantity)
        setItems((prevState) =>
            newQuantity === 0
                ? prevState.filter((item) => item.productId !== id)
                : prevState.map((item) =>
                      item.productId === id ? { ...item, quantity: newQuantity } : item
                  )
        )
    }

    return (
        <div className={styles.product}>
            <Image className={styles.image} src={image_url} alt='' height={365} width={280} />
            <div className={styles.content}>
                <div className={styles.top}>
                    <h3 className={styles.heading}>{title}</h3>
                    <p className={styles.text}>{description}</p>
                </div>
                <p className={styles.price}>цена: {price}₽</p>
                {id === currentProductId ? (
                    <div className={styles.menu}>
                        <button className='wrapper' onClick={() => changeQuantity(-1)}>
                            -
                        </button>
                        <div className={cn('wrapper', styles.quantity)}>{quantity}</div>
                        <button className='wrapper' onClick={() => changeQuantity(1)}>
                            +
                        </button>
                    </div>
                ) : (
                    <button className='wrapper' onClick={() => addToCart()}>
                        купить
                    </button>
                )}
            </div>
        </div>
    )
}

export default Product
