const axios = require('axios')

export default async function WriteSheet(url, data) {
    const response = axios.post(url, {
        "data": data
    }, {
        "auth": {
            "username": "ofbu0ykn",
            "password": "ftvr7ew7vvk6g1hosdgy"
        }
    })

    return response

}