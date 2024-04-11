import React from 'react'

import styles from './styles.module.scss'

import request from '@/shared/utils/request'

import IProduct from '@/entities/product/model'

import Product from '@/entities/product/UI'

const Products = async () => {
    const data = await request('products?page=1&page_size=20')

    return (
        <div className={styles.products}>
            {data.products.map((product: IProduct) => {
                return <Product {...product} />
            })}
        </div>
    )
}

export default Products
