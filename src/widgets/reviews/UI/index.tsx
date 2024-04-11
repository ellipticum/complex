import React from 'react'

import styles from './styles.module.scss'

import IReview from '@/entities/review/model'

import Review from '@/entities/review/UI'

interface Props {
    data: IReview[]
}

const Reviews = ({ data }: Props) => {
    return (
        <div className={styles.reviews}>
            {data.map((review, index) => {
                return <Review key={index} {...review} />
            })}
        </div>
    )
}

export default Reviews
