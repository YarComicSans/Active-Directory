import { createStyles, makeStyles, Theme, } from '@material-ui/core'

export const getStyleClasses = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
    tree: {
      zIndex: 0,
    },
    title: {
      flexGrow: 1,
    },
    labelIcon: {
      marginRight: theme.spacing(1),
    },
    labelText: {
      fontWeight: 'inherit',
      flexGrow: 1,
    },
    labelRoot: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0.5, 0),
    },
  })
)
