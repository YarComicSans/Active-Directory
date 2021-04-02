// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Table, TableHead, TableRow, TableBody, TableCell, TablePagination } from '@material-ui/core'
import api from '../../api'
import { UserFetchParams } from '../../api/activeDirectory'
import { UserInfo, CreateUserInfoFromDto } from '../../services/userService'

// const storeEnhancer = connect(
//     (state: StoreState) => ({users: state.users}),
//     {

//     }
// )

// type Props = {} & TypeOfConnect<typeof storeEnhancer>

const useRowStyles = makeStyles({
    row: {
        '& > *': {
            borderBottom: 'unset'
        }
    }
})

const columns : {label: string, id: keyof UserInfo, sortable: boolean, align?: 'right' | 'center'}[] = [
    { label: 'DN', id: 'dn', sortable: true, align: 'center' },
    { label: 'sAMAccountName', id: 'sAMAccountName', sortable: false, align: 'right' },
    { label: 'whenCreated', id: 'whenCreated', sortable: false, align: 'right' },
    { label: 'pwdLastSet', id: 'pwdLastSet', sortable: false, align: 'right' },
    { label: 'userAccountControl', id: 'userAccountControl', sortable: false, align: 'right' },
    { label: 'CN', id: 'cn', sortable: false, align: 'right' },
    { label: 'Description', id: 'description', sortable: false, align: 'right' }
]

export default function UserTable () {
    const classes = useRowStyles()
    const [fetchParams, setFetchParams] = useState<UserFetchParams>({
        pageNumber: 0,
        pageSize: 5
    })
    const [users, setUsers] = useState<UserInfo[]>([])
    const [totalCount, setTotalCount] = useState(0)

    useEffect(() => {
        (async () => {
            try {
                const response = await api.activeDirectory.getUsers(fetchParams)
                const convertedUserInfos = response.users.map(user => CreateUserInfoFromDto(user))
                setUsers(convertedUserInfos)
                setTotalCount(response.totalCount)
            } catch (e) {
                console.log(e)
            }
        })()
    }, [fetchParams])

    const onPageSizeChanged = (pageSize: number) => {
        setFetchParams({ ...fetchParams, pageSize: pageSize })
    }

    const onPageNumberChanged = (pageNumber: number) => {
        setFetchParams({ ...fetchParams, pageNumber: pageNumber })
    }

    return (
        <Box className="main-container">
            <Box className="table-container">
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map(column =>
                                <TableCell key={column.id} align = {column.align} id={column.id} scope='col'>
                                    {column.label}
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => <>
                            <TableRow key={user.dn} className={classes.row}>
                                {columns.map(column =>
                                    <TableCell align={column.align} key={`${column.id}-${index}`}>
                                        {user[column.id]}
                                    </TableCell>
                                )}
                            </TableRow>
                        </>)}
                    </TableBody>
                </Table>
            </Box>
            <TablePagination
                rowsPerPageOptions = {[5, 10, 20]}
                rowsPerPage={fetchParams.pageSize}
                component="div"
                count={totalCount}
                page={fetchParams.pageNumber}
                onChangePage={(event: any, pageNumber: number) => onPageNumberChanged(pageNumber)}
                onChangeRowsPerPage={(event: any) => onPageSizeChanged(event.target.value)}
            />
        </Box>
    )
}
