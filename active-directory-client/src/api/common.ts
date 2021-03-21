import fetch from 'cross-fetch'

const url = 'http://localhost:3005/'

export async function get<T> (resource: string): Promise<T> {
    const params = {
        mode: 'no-cors',
        method: 'GET',
        headers: { Accept: 'application/json' }
    } as const

    const response = await fetch(`${url}${resource}`, params)

    return (await response.json()) as T
}

export async function put (resource: string) {
    const params = {
        mode: 'no-cors',
        method: 'PUT'
    } as const
    await fetch(`${url}${resource}`, params)
}
