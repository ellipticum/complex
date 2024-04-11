'use client'

import React from 'react'

import Image from 'next/image'

import styles from './styles.module.scss'

import Wrapper from '@/shared/UI/wrapper'

import IProduct from '@/entities/product/model'

const Product = ({ id, image_url, title, description, price }: IProduct) => {
    const buy = () => {}

    console.log(description)

    return (
        <Wrapper>
            <Image className={styles.image} src={image_url} alt='' height={365} width={280} />
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.text}>{description}</p>
                <p className={styles.price}>цена: {price}₽</p>
                <button className='wrapper' onClick={() => buy()}>
                    купить
                </button>
            </div>
        </Wrapper>
    )
}

export default Product
