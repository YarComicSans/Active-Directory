import { AppBar, Button, Toolbar, } from '@material-ui/core'
// eslint-disable-next-line no-use-before-define
import React from 'react'
import Menu from '../Menu/Menu'
import { MenuProps, } from '../Menu/Menu.types'
import { getStyles, } from './Header.styles'

type HeaderProps = {
    headerItems: MenuProps[];
}

const Header = ({ headerItems, }: HeaderProps) => {
  const styles = getStyles()
  return (
        <AppBar className={styles.option} position='static'>
            <Toolbar>
                {headerItems.map((item, index) => (
                    <Menu key={index} title={item.title} options={item.options}/>
                ))}
            </Toolbar>
        </AppBar>
  )
}

export default Header
