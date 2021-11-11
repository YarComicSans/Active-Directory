import { Button, ClickAwayListener, MenuItem, MenuList, Paper, Popper, Toolbar, } from '@material-ui/core'
import { Stack, } from '@mui/material'
// eslint-disable-next-line no-use-before-define
import React, { useRef, useState, } from 'react'
import { MenuProps, } from './Menu.types'
import { useStyles, } from './Menu.styles'

const Menu = ({ title, options, }: MenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const anchorRef = useRef<HTMLButtonElement>(null)
  const classes = useStyles()

  const handleToggle = () => {
    setIsOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current?.contains(event.target as HTMLElement)) { return }
    setIsOpen(false)
  }

  return (
        <Stack spacing={2} direction="row">
            <Button
                ref={anchorRef}
                id={`${title}-button`}
                aria-controls={isOpen ? 'composition-menu' : undefined}
                aria-expanded={isOpen ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                {title}
            </Button>
            <Popper
                className={classes.option}
             open={isOpen}
             anchorEl={anchorRef.current}
             role={undefined}
             placement="bottom-start"
             transition
             disablePortal
             >
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                            autoFocusItem={isOpen}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                        >
                            {options.map((option, index) => (
                                <MenuItem className={classes.option} key={index} onClick={option.onSelect}>{option.name}</MenuItem>
                            ))}
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popper>
        </Stack>
  )
}

export default Menu
