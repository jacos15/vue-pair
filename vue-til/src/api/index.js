/* eslint-disable no-undef */
import axios     from 'axios'
const request = () => {}

const send = axios.create({
    baseURL: 'http://localhost:3000',
})

// interceptors  token 심기!!!

request.prototype.post = (baseURI, data) => {
    // eslint-disable-next-line no-undef

    return send.post(baseURI, data)
                .then((response) => {
                    return response.data
                })
}

request.prototype.get = (baseURI) => {
    // eslint-disable-next-line no-undef

    return send.get(baseURI)
                .then((response) => {
                    return response.data
                })
}

export default request
