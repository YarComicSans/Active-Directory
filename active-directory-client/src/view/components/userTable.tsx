// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import { useState, useEffect } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import TreeItem from '@material-ui/lab/TreeItem'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import TreeView from '@material-ui/lab/TreeView'
import SplitterLayout from 'react-splitter-layout'
import 'react-splitter-layout/lib/index.css'
import api from '../../api'
import { UserFetchParams } from '../../api/activeDirectory'
import { UserInfo, CreateUserInfoFromDto } from '../../services/userService'
import { TextField, AppBar, Toolbar, Typography, createStyles } from '@material-ui/core'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import PersonIcon from '@material-ui/icons/Person'

// const storeEnhancer = connect(
//     (state: StoreState) => ({users: state.users}),
//     {

//     }
// )

// type Props = {} & TypeOfConnect<typeof storeEnhancer>

const useRowStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      '& > *': {
        borderBottom: 'unset'
      }
    },
    tree: {
      height: 216,
      flexGrow: 1,
      maxWidth: 400
    },
    title: {
      flexGrow: 1
    },
    labelIcon: {
      marginRight: theme.spacing(1)
    },
    labelText: {
      fontWeight: 'inherit',
      flexGrow: 1
    },
    labelRoot: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0.5, 0)
    }
  }))

export default function UserTable () {
  const classes = useRowStyles()
  const [fetchParams] = useState<UserFetchParams>({
    pageNumber: 0,
    pageSize: 5
  })
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  const [users, setUsers] = useState<{[id: string]: UserInfo}>({})

  useEffect(() => {
    (async () => {
      try {
        const response = await api.activeDirectory.getUsers(fetchParams)
        const convertedUserInfos = CreateUserInfoFromDto(response.users)
        setUsers(convertedUserInfos)
        setSelectedUser(null)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [fetchParams])

  const handleTreeNodeSelect = (event: any, nodeId: string) => {
    if (Object.keys(users).includes(nodeId)) setSelectedUser(nodeId)
  }

  return (
   <React.Fragment>
    <AppBar position='static'>
      <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Users
          </Typography>
      </Toolbar>
    </AppBar>
    <SplitterLayout>
        <TreeView
          className={classes.tree}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          onNodeSelect={handleTreeNodeSelect}
        >
          {users &&
          <TreeItem nodeId='CN=Users' label={
            <div className={classes.labelRoot}>
              <PeopleAltIcon className={classes.labelIcon}/>
              <Typography variant="body2" className={classes.labelText}>Users</Typography>
            </div>
          }>
            {Object.keys(users).map(id => <TreeItem key={users[id].cn} nodeId={users[id].cn} label={
              <div className={classes.labelRoot}>
                <PersonIcon className={classes.labelIcon}/>
                <Typography variant="body2" className={classes.labelText}>{users[id].sAMAccountName}</Typography>
              </div>
            }/>)}
          </TreeItem>
          }
        </TreeView>
        <div>
        {selectedUser &&
          <div>
            {
              Object.keys(users[selectedUser]).map((key, index) =>
                <TextField value={Object.values(users[selectedUser])[index]} fullWidth key={key} label={key} disabled></TextField>)}
          </div>
        }
        </div>
      </SplitterLayout>
   </React.Fragment>
  )
}
