const ApiEndpoint = require("../apiEndpoints")
const httpRequest = require("../services/httpRequest")
const fs = require('fs');

module.exports = async (url, username, password) => {
    return httpRequest({
        method: "POST",
        url: `${url}${ApiEndpoint.LOGIN}`,
        headers: null,
        bodyParams: {
            "username": username,
            "password": password,
        },
        queryParams: null,
        timeout: 0,
    })
        .then(res => {
            return res
        })
        .catch((error) => {
            if (error.status === 666){
                console.log(error.errorObj.message);
            }
            return false
        })
}