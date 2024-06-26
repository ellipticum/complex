'use client'

import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import cn from 'classnames'

import styles from './styles.module.scss'

import useCartStore from '@/widgets/cart/model'

import IProduct from '@/entities/product/model'

const Product = ({ id, image_url, title, description, price }: IProduct) => {
    const { currentProductId, setCurrentProductId, items, setItems } = useCartStore()

    const existingItem = items.find((item) => item.product.id === id)

    const addToCart = () => {
        setItems((prevState) => {
            const existingItem = prevState.find((item) => item.product.id === id)
            if (!existingItem) {
                return [...prevState, { quantity: 1, product: { id, title }, price }]
            }
            return prevState
        })
        setCurrentProductId(id)
    }

    const changeQuantity = (delta: number) => {
        const newQuantity = (existingItem ? existingItem.quantity : 0) + delta
        if (newQuantity < 0) return

        if (!existingItem) {
            addToCart()
        }

        setItems((prevState) =>
            newQuantity === 0
                ? prevState.filter((item) => item.product.id !== id)
                : prevState.map((item) =>
                      item.product.id === id
                          ? { ...item, quantity: newQuantity, price: price * newQuantity }
                          : item
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
                        <div className={cn('wrapper', styles.quantity)}>
                            {existingItem ? existingItem.quantity : 0}
                        </div>
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
