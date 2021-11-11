// eslint-disable-next-line no-use-before-define
import React, { useState, } from 'react'
import AddModal from '../view/components/AddModal'
import Header from '../view/components/Header'
import { MenuProps, } from '../view/components/Menu/Menu.types'
import UserTable from '../view/UserTable'

const Home = () => {
  const [isAddEntryOpen, setIsAddEntryOpen] = useState<boolean>(false)

  const onAddEntrySelect = () => {
    setIsAddEntryOpen(true)
  }

  const headerItems: MenuProps[] = [
    {
      title: 'Операции',
      options: [{
        name: 'Добавить запись',
        onSelect: onAddEntrySelect,
      }],
    }
  ]

  const addEntryFields: string[] = [
    'dn'
  ]

  const onAddEntryCancel = () => {
    setIsAddEntryOpen(false)
  }

  return (
        <React.Fragment>
           <Header headerItems={headerItems}/>
           <UserTable/>
           <AddModal
                isOpen={isAddEntryOpen}
                fields={addEntryFields}
                onRequestClose={onAddEntryCancel}
           />
        </React.Fragment>
  )
}

export default Home
