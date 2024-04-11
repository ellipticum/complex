'use client'

import React, { useEffect, useState } from 'react'

import styles from './styles.module.scss'

import IReview from '@/entities/review/model'

import Wrapper from '@/shared/UI/wrapper'
import sanitize from '@/shared/utils/sanitize'

const Review = ({ id, text }: IReview) => {
    const [elements, setElements] = useState<React.ReactElement[]>()

    useEffect(() => {
        const parse = (string: string): React.ReactElement[] => {
            const sanitizedString = sanitize(string)

            const parser = new DOMParser()
            const doc = parser.parseFromString(sanitizedString, 'text/html')
            const elements: React.ReactElement[] = []

            const childNodes = Array.from(doc.body.childNodes)

            for (let i = 0; i < childNodes.length; i++) {
                const node = childNodes[i]
                if (node instanceof HTMLElement) {
                    elements.push(
                        React.createElement(node.tagName.toLowerCase(), {
                            key: i,
                            dangerouslySetInnerHTML: {
                                __html: node.innerHTML
                            }
                        })
                    )
                }
            }

            return elements
        }

        setElements(parse(text))
    }, [])

    return (
        <Wrapper>
            <div className={styles.review}>{elements}</div>
        </Wrapper>
    )
}

export default Review
