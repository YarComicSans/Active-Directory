// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import { useState, useEffect, useRef, } from 'react'
import {
  Container,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
  makeStyles,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import * as commands from '../../commands'
import { connect, TypeOfConnect, ApplicationState, } from '../../store'
import { UserSignInParams, } from '../../api/api'

const storeEnhancer = connect(
  (state: ApplicationState) => ({
    isUserAuthenticated: state.isUserAuthenticated,
  }),
  {
    signInUser: commands.signInUser,
  }
)

type SignInProps = {} & TypeOfConnect<typeof storeEnhancer>;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

function SignIn (props: SignInProps) {
  const classes = useStyles()
  const [userSignInParams, setUserSignInParams] = useState<UserSignInParams>({
    username: '',
    domain: '',
    password: '',
    ldapUrl: '',
  })
  const [isSending, setIsSending] = useState(false)
  const isMounted = useRef(true)

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  const onSignInButtonClicked = async () => {
    if (isSending) return

    setIsSending(true)
    await props.signInUser(userSignInParams)

    if (isMounted.current) setIsSending(false)
  }

  const handleUsernameChanged = (event: any) => {
    setUserSignInParams({ ...userSignInParams, username: event.target.value, })
  }

  const handleDomainChanged = (event: any) => {
    setUserSignInParams({
      ...userSignInParams,
      domain: event.target.value,
      ldapUrl: `ldaps://${event.target.value}`,
    })
  }

  const handlePasswordChanged = (event: any) => {
    setUserSignInParams({ ...userSignInParams, password: event.target.value, })
  }

  const handleLdapUrlChanged = (event: any) => {
    setUserSignInParams({ ...userSignInParams, ldapUrl: event.target.value, })
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(event) => handleUsernameChanged(event)}
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Ldap Username"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(event) => handleDomainChanged(event)}
                variant="outlined"
                required
                fullWidth
                id="domain"
                label="Domain Name"
                name="domain"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(event) => handleLdapUrlChanged(event)}
                variant="outlined"
                required
                fullWidth
                id="url"
                label="LDAP Url"
                name="ldapUrl"
                value={userSignInParams.ldapUrl}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(event) => handlePasswordChanged(event)}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
            </Grid>
          </Grid>
          <Button
            className={classes.submit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSending}
            onClick={onSignInButtonClicked}
          >
            Войти
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default storeEnhancer(SignIn)
