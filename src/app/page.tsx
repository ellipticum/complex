import React from 'react'

import axios from 'axios'

import styles from '@/shared/styles/pages/home.module.scss'

import request from '@/shared/utils/request'

import Container from '@/shared/UI/container'

import Reviews from '@/widgets/reviews/UI'
import Cart from '@/widgets/cart/UI'
import Products from '@/widgets/products/UI'
import Notification from '@/widgets/notification/UI'

const Home = async () => {
    const reviews = await request('reviews')
    const items = await request('products?page=1&page_size=20')

    return (
        <div className={styles.wrapper}>
            <Container>
                <div className={styles.content}>
                    <h1 className={styles.heading}>тестовое задание</h1>
                    {reviews && <Reviews data={reviews} />}
                    <Cart />
                    <Products items={items} />
                </div>
            </Container>
            <Notification />
        </div>
    )
}

export default Home
