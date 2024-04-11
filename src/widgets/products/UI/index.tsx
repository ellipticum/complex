'use client'

import React, { useState, useEffect, useRef } from 'react'

import styles from './styles.module.scss'

import request from '@/shared/utils/request'

import IProduct from '@/entities/product/model'

import Product from '@/entities/product/UI'

interface Props {
    items: any
}

const Products = ({ items }: Props) => {
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [products, setProducts] = useState<IProduct[]>(items.products)

    console.log(products)

    const sentinelRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        fetchData(page)
    }, [page])

    const fetchData = async (page: number) => {
        try {
            setLoading(true)
            const data = await request(`products?page=${page}&page_size=20`)
            setProducts((prevProducts) => [...prevProducts, ...data.products])
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        const sentinel = entries[0]
        if (sentinel.isIntersecting && !loading) {
            setPage((prevPage) => prevPage + 1)
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, { threshold: 1 })
        if (sentinelRef.current) {
            observer.observe(sentinelRef.current)
        }
        return () => {
            observer.disconnect()
        }
    }, [])

    return (
        <div className={styles.products}>
            {products.map((product: IProduct, index) => (
                <Product key={index} {...product} />
            ))}
            <div ref={sentinelRef}></div>
            {loading && <div className={styles.loader}>Loading...</div>}
        </div>
    )
}

export default Products
