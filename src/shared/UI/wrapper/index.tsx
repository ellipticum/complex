import React, { ReactNode } from 'react'

import cn from 'classnames'

import styles from './styles.module.scss'

interface Props {
    children: ReactNode
    isFitted?: boolean
}

const Wrapper = ({ children, isFitted = false }: Props) => {
    return <div className={cn(styles.wrapper, { [styles.fitted]: isFitted })}>{children}</div>
}

export default Wrapper
