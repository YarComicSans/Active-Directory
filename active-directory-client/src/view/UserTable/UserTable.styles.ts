import { createStyles, makeStyles, Theme, } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    view: {
      zIndex: 0,
    },
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
