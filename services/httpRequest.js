const axios = require('axios');

const httpRequest = async ({ method, url, headers = {}, bodyParams = {}, queryParams = {}, timeout = 0 }) => {
    // console.log(method, url, headers, bodyParams, queryParams, timeout);
    if (method !== 'GET' && method !== 'POST' && method !== 'PUT' && method !== 'DELETE')
        throw {
            status: 400,
            message: `Invalid HTTP method`,
            data: { method, url, data }
        };

    try {
        let fixedUrl;
        if (!url.startsWith("http")){
            fixedUrl = "https://" + url;
        }
        else{
            fixedUrl = url;
        }
        const response = await axios({ method, url: fixedUrl, headers, timeout, data: bodyParams, params: queryParams });
        const results = response.data;
        return results;
        
    } catch (ex) {
        if(!url.startsWith("http") || url.startsWith("https")){
            let fixedUrl;
            if (method !== 'GET' && method !== 'POST' && method !== 'PUT' && method !== 'DELETE'){
                throw {
                    status: 400,
                    message: `Invalid HTTP method`,
                    data: { method, url, data }
                };
            }
            try {
                fixedUrl = "http://" + url;
                console.log(fixedUrl);
                const response = await axios({ method, url: fixedUrl, headers, timeout, data: bodyParams, params: queryParams });
                const results = response.data;
                return results;
            } catch (ex) {
                if (ex?.response?.status === 400) throw { status: 400, errorObj: ex.response.data };
                else throw ex;
            }
        }
        else if(!url.startsWith("https")){
            let fixedUrl;
            if (method !== 'GET' && method !== 'POST' && method !== 'PUT' && method !== 'DELETE'){
                throw {
                    status: 400,
                    message: `Invalid HTTP method`,
                    data: { method, url, data }
                };
            }
            try {
                if(url.startsWith("http")){
                    fixedUrl = url.replace("http", "https");
                } else{
                    fixedUrl = "https://" + url;
                }
                const response = await axios({ method, url: fixedUrl, headers, timeout, data: bodyParams, params: queryParams });
                const results = response.data;
                return results;
            } catch (ex) {
                if (ex?.response?.status === 400) throw { status: 400, errorObj: ex.response.data };
                else throw ex;
            }
        }
        else if (ex?.response?.status === 400) throw { status: 400, errorObj: ex.response.data };
        else throw ex;
    }
};

module.exports = httpRequest;