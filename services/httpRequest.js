const axios = require('axios');

const httpRequest = async ({ method, url, headers = {}, bodyParams = {}, queryParams = {}, timeout = 0 }) => {
    if (method !== 'GET' && method !== 'POST' && method !== 'PUT' && method !== 'DELETE')
        throw {
            status: 400,
            message: `Invalid HTTP method`,
            data: { method, url, data }
        };

    try {
        const response = await axios({ method, url, headers, timeout, data: bodyParams, params: queryParams });
        const results = response.data;
        return results;
        
    } catch (ex) {
        if (ex?.response?.status === 400) throw { status: 400, errorObj: ex.response.data };
        else if (ex.status === 666 || ex?.response?.status === 666){
            console.log(error.errorObj.message);
        }
        else throw ex;
    }
};

module.exports = httpRequest;