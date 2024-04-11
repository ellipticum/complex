import axios from 'axios'

const request = async (
    route: string,
    method: 'get' | 'post' = 'get',
    body: { [key: string]: any } = {}
) => {
    try {
        const { data } = await axios[method](`${process.env.NEXT_PUBLIC_API_URL}/${route}`, body)

        return data
    } catch (error) {
        console.error(error)
    }
}

export default request
