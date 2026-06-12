import axios from "axios"

export const commonAPI = async (
    httpMethod,
    url,
    reqBody,
    reqHeader
) => {

    const config = {
        method: httpMethod,
        url,
        data: reqBody,
        headers: reqHeader
            ? reqHeader
            : {
                "Content-Type": "application/json"
            }
    }

    return await axios(config)
        .then((result) => result)
        .catch((err) => err)

}