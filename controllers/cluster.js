// Credit for The NATS.IO Authors
// Copyright 2021-2022 The Memphis Authors
// Licensed under the Apache License, Version 2.0 (the “License”);
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.package server

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
