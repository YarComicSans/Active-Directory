import { Button, DialogActions, DialogContent, DialogContentText, TextField, } from '@material-ui/core'
import { DialogTitle, } from '@mui/material'
import Dialog from '@mui/material/Dialog'
// eslint-disable-next-line no-use-before-define
import React, { useContext, useState, } from 'react'
import UserStore from '../../../store/UserStore'

type AddModalProps = {
    isOpen: boolean;
    fields: string[];
    onRequestClose: () => void;
}

const TITLE = 'Добавить запись'
const MODAL_DESCRIPTION = 'Добавить запись'

const AddModal = ({ isOpen, fields, onRequestClose, }:AddModalProps) => {
  const { addUser, generateUser, } = useContext(UserStore)
  const [fieldValues, setFieldValues] = useState<{[key: string]: string}>({})

  const handleFieldValueChange = (key: string, value: string) => {
    const values = { ...fieldValues, }
    values[key] = value
    setFieldValues(values)
  }

  const onSubmit = () => {
    const user = generateUser(fieldValues)
    addUser(user)
    onRequestClose()
  }

  return (
        <div>
          <Dialog open={isOpen} onClose={onRequestClose}>
            <DialogTitle>{TITLE}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {MODAL_DESCRIPTION}
              </DialogContentText>
              {fields.map((name, index) => (
                  <TextField
                  key={index}
                  autoFocus
                  margin="dense"
                  id={name}
                  label={name}
                  type="email"
                  fullWidth
                  variant="standard"
                  placeholder=""
                  value={fieldValues[name]}
                  onChange={(event: any) => handleFieldValueChange(name, event.target.value)}
                />
              ))}
            </DialogContent>
            <DialogActions>
              <Button onClick={onRequestClose}>Отменить</Button>
              <Button onClick={onSubmit}>Добавить</Button>
            </DialogActions>
          </Dialog>
        </div>

  )
}

export default AddModal
