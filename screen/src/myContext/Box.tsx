import React, { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

const Box = () => {
    const theme = useContext(ThemeContext)
    return (
        <div style={{ backgroundColor: theme.priary.main, color: theme.secondary.text }}>Box</div>
    )
}

export default Box