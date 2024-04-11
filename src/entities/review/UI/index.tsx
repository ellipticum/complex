'use client'

import React from 'react'

import styles from './styles.module.scss'

import parse from '@/shared/utils/parse'

import IReview from '@/entities/review/model'

import Wrapper from '@/shared/UI/wrapper'

const Review = ({ id, text }: IReview) => {
    const elements = parse(text)

    return (
        <Wrapper>
            <div className={styles.review}>{elements}</div>
        </Wrapper>
    )
}

export default Review
