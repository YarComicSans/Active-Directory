// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import { TreeView, TreeItem, } from '@mui/lab'
import { Typography, } from '@mui/material'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import PersonIcon from '@material-ui/icons/Person'

import { getStyleClasses, } from './TreeView.styles'
import { Users, } from '../../../types/types.users'

export type TreeNodes = {
  users: Users;
};

type TreeViewProps = {
  nodes: TreeNodes | null;
  onNodeSelected: (event: any, nodeId: string) => void;
};

function TreeViewComponent ({ nodes, onNodeSelected, }: TreeViewProps) {
  const { users, } = nodes! ?? {}
  const classes = getStyleClasses()

  const [expanded, setExpanded] = React.useState<string[]>([])
  const [selected, setSelected] = React.useState<string>('')

  const handleSelect = (event: React.SyntheticEvent, nodeId: string) => {
    setSelected(nodeId)
    onNodeSelected(event, nodeId)
  }

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds)
  }

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      selected={selected}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
    >
      {users && (
        <TreeItem
          nodeId="CN=Users"
          label={
            <div className={classes.labelRoot}>
              <PeopleAltIcon className={classes.labelIcon} />
              <Typography variant="body2" className={classes.labelText}>
                Users
              </Typography>
            </div>
          }
        >
          {Object.keys(users).map((id) => (
            <TreeItem
              key={users[id].dn}
              nodeId={users[id].dn}
              label={
                <div className={classes.labelRoot}>
                  <PersonIcon className={classes.labelIcon} />
                  <Typography variant="body2" className={classes.labelText}>
                    {users[id].sAMAccountName}
                  </Typography>
                </div>
              }
            />
          ))}
        </TreeItem>
      )}
    </TreeView>
  )
}

export default TreeViewComponent
