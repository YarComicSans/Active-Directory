// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import { useState, useEffect, useContext, } from 'react'
import { makeStyles, Theme, } from '@material-ui/core/styles'
import SplitterLayout from 'react-splitter-layout'
import 'react-splitter-layout/lib/index.css'
import {
  TextField,
  createStyles,
  Avatar,
  Button,
  Box,
} from '@material-ui/core'
import { Stack, } from '@mui/material'
import UserStore from '../../store/UserStore'
import { User, } from '../../types/types.users'
import { observer, } from 'mobx-react-lite'
import TreeView from '../components/TreeView'
import { TreeNodes, } from '../components/TreeView/TreeView.types'
import { useStyles, } from './UserTable.styles'

const UserTable = observer(() => {
  const { fetchUserData, getUsers, updateUser, isUpdating, deleteUser, } = useContext(UserStore)
  const classes = useStyles()
  // const classes = useRowStyles()
  const [selectedNode, setSelectedNode] = useState<User | null>(null)
  const [selectedNodeValues, setSelectedNodeValues] = useState<User | null>(null)

  const [treeNodes, setTreeNodes] = useState<TreeNodes | null>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const setTree = (nodes: TreeNodes) => {
    setTreeNodes(nodes)
  }

  const handleTreeNodeSelect = (event: any, nodeId: string) => {
    if (nodeId.toUpperCase().indexOf('CN=USERS') !== -1) {
      setSelectedNode(treeNodes!.users[nodeId])
    }
  }

  const setEditing = () => {
    setIsEditing(true)
  }

  const onDeletePress = async () => {
    await deleteUser(selectedNode!)
  }

  const saveChanges = async () => {
    await updateUser(selectedNode!)
    setIsEditing(false)
  }

  const cancelChanges = () => {
    setSelectedNode(treeNodes!.users['CN=Guest,CN=Users,DC=mydomain,DC=ru'])
    setIsEditing(false)
  }

  const handleSelectedNodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedNode = { ...selectedNode, } as any
    updatedNode[event.target.name] = event.target.value
    setSelectedNode(updatedNode)
  }

  const renderTextField = (key: string, value: string) =>
    <TextField
      name={key}
      value={value}
      fullWidth
      key={key}
      label={key}
      onChange={handleSelectedNodeChange}
      disabled={!isEditing}
  />

  console.log(treeNodes)

  const renderEditScreen = () => {
    return (
      selectedNode && (
        <div>
          <Box
            style={{
              flexDirection: 'row',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button disabled={!isEditing}>
            <Avatar style={{ height: 60, width: 60, }}>User</Avatar>
            </Button>
            <Stack spacing={2} direction="row" style={{}}>
              <Button onClick={setEditing}>Edit</Button>
              <Button onClick={onDeletePress}>Delete</Button>
            </Stack>
          </Box>
          {Object.keys(selectedNode!).map((key, index) =>
            renderTextField(key, (selectedNode as any)[key]))}
          {isEditing && (
            <Stack spacing={2} direction="row" style={{ flexGrow: 1, }}>
              <Button onClick={saveChanges}>Save</Button>
              <Button onClick={cancelChanges}>Cancel</Button>
            </Stack>
          )}
        </div>
      )
    )
  }

  const fetchTreeData = async () => {
    try {
      await fetchUserData()
      setTree({ users: getUsers(), })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchTreeData()
    setSelectedNode(null)
  }, [])

  useEffect(() => {
    if (treeNodes && !isUpdating) {
      !!treeNodes!.users && setSelectedNode({ ...treeNodes!.users['CN=Guest,CN=Users,DC=mydomain,DC=ru']!, })
    }
  }, [isUpdating])

  return (
      <SplitterLayout customClassName={classes.view}>
        <TreeView nodes={treeNodes ?? null} onNodeSelected={handleTreeNodeSelect} />
        <div>{renderEditScreen()}</div>
      </SplitterLayout>
  )
})

export default UserTable
