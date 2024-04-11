import React from 'react'

import styles from './styles.module.scss'

import cn from 'classnames'

const Loader = ({ isSmall = false }: { isSmall?: boolean }) => {
    return <div className={cn(styles.loader, { [styles.small]: isSmall })}></div>
}

export default Loader
