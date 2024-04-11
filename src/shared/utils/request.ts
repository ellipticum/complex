import axios from 'axios'

const request = async (route: string) => {
    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/${route}`)

        return data
    } catch (error) {
        console.error(error)
    }
}

export default request
