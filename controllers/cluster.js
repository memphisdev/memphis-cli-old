// Copyright 2021-2022 The Memphis Authors
// Licensed under the MIT License (the "License");
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// This license limiting reselling the software itself "AS IS".
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

const fs = require('fs');

const ApiEndpoint = require('../apiEndpoints');
const httpRequest = require('../services/httpRequest');
const configDir = require('../utils/configDir');

exports.getClusterInfo = async () => {
    const memConfigDir = configDir();
    if (memConfigDir === null) {
        console.log(`No support for this OS`);
        return;
    }
    const data = fs.readFileSync(memConfigDir + '.memconfig', 'utf8');
    if (data.length == 0) {
        return;
    }
    const credentials = JSON.parse(data.toString());
    httpRequest({
        method: 'GET',
        url: `${credentials.server}${ApiEndpoint.GET_CLUSTER_INFO}`,
        headers: { Authorization: 'Bearer ' + credentials.jwt },
        bodyParams: null,
        queryParams: null,
        timeout: 0
    })
        .then((res) => {
            if (res.length === 0) {
                console.log('Failed to get cluster info');
            } else {
                console.log('\x1b[33m', 'Cluster Info: ');
                console.log('\x1b[0m', '');
                console.log(`Memphis version: ${res.version}`);
            }
        })
        .catch((error) => {
            console.log('Failed to get cluster info');
            if (error.response?.status === 666) {
                console.log(error.response.data.message);
            }
        });
};
