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
// limitations under the License.

const fs = require('fs');

const configDir = require('../utils/configDir');
const login = require('../controllers/login');

module.exports = (credentials) => {
    let fixedUrl;
    let url = credentials.server.endsWith('/') ? credentials.server.slice(0, -1) : credentials.server;
    url = url.endsWith('api') ? url.replace('/api', '') : url;
    try {
        if (!url.startsWith('http')) {
            fixedUrl = 'https://' + url;
        } else {
            fixedUrl = url;
        }
        return login(fixedUrl, credentials.user, credentials.password)
            .then((res) => {
                if (res) {
                    const d = new Date();
                    const expiration = d.getTime() + res.expires_in - 100000;
                    const credentialsDetails = {
                        user: credentials.user,
                        password: credentials.password,
                        server: fixedUrl,
                        jwt: res.jwt,
                        expiration: expiration
                    };
                    const data = JSON.stringify(credentialsDetails);
                    const memConfigDir = configDir();
                    if (memConfigDir === null) {
                        console.log(`No support for this OS`);
                        return;
                    }
                    if (!fs.existsSync(memConfigDir)) {
                        fs.mkdirSync(memConfigDir);
                    }
                    fs.writeFileSync(memConfigDir + '.memconfig', data);
                    const loginInfo = fixedUrl.startsWith('https') ? fixedUrl.replace('https://', '') : fixedUrl.replace('http://', '');
                    console.log(`Connected successfully to ${loginInfo}`);
                } else {
                    let fixedUrl;
                    try {
                        if (!url.startsWith('http')) {
                            fixedUrl = 'http://' + url;
                        } else if (url.startsWith('https')) {
                            fixedUrl = url.replace('https', 'http');
                        } else if (!url.startsWith('https')) {
                            fixedUrl = url.replace('http', 'https');
                        }
                        return login(fixedUrl, credentials.user, credentials.password)
                            .then((res) => {
                                if (res) {
                                    const d = new Date();
                                    const expiration = d.getTime() + res.expires_in - 100000;
                                    const credentialsDetails = {
                                        user: credentials.user,
                                        password: credentials.password,
                                        server: fixedUrl,
                                        jwt: res.jwt,
                                        expiration: expiration
                                    };
                                    const data = JSON.stringify(credentialsDetails);
                                    const memConfigDir = configDir();
                                    if (memConfigDir === null) {
                                        console.log(`No support for this OS`);
                                        return;
                                    }
                                    if (!fs.existsSync(memConfigDir)) {
                                        fs.mkdirSync(memConfigDir);
                                    }
                                    fs.writeFileSync(memConfigDir + '.memconfig', data);
                                    const loginInfo = fixedUrl.startsWith('https') ? fixedUrl.replace('https://', '') : fixedUrl.replace('http://', '');
                                    console.log(`Connected successfully to ${loginInfo}`);
                                } else {
                                    console.log('Failed to connect to Memphis.');
                                }
                            })
                            .catch((error) => {
                                if (error.status === 666) {
                                    console.log(error.message);
                                } else {
                                    console.log('Failed to connect to Memphis.');
                                }
                            });
                    } catch (error) {
                        if (error.status === 666) {
                            console.log(error.message);
                        } else {
                            console.log('Failed to connect to Memphis.');
                        }
                    }
                    console.log('Failed to connect to Memphis.');
                    const memConfigDir = configDir();
                    if (memConfigDir === null) {
                        console.log(`No support for this OS`);
                        return;
                    }
                }
                return res;
            })
            .catch((error) => {
                if (error.status === 666) {
                    console.log(error.message);
                } else {
                    console.log('Failed to connect to Memphis.');
                }
            });
    } catch (error) {
        if (error.status === 666) {
            console.log(error.message);
        } else {
            console.log('Failed to connect to Memphis.');
        }
    }
};
