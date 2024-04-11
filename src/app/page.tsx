import React from 'react'

import styles from '@/shared/styles/pages/home.module.scss'

import Container from '@/shared/UI/container'

const Home = () => {
    return (
        <div className={styles.wrapper}>
            <Container>
                <h1 className={styles.heading}>тестовое задание</h1>
            </Container>
        </div>
    )
}

export default Home
