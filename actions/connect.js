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
        if (fixedUrl.split(':').length - 1 < 2) {
            fixedUrl = fixedUrl + ':9000';
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
                        if (fixedUrl.split(':').length - 1 < 2) {
                            fixedUrl = fixedUrl + ':9000';
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
                                console.log('Failed to connect to Memphis.');
                                if (error.response?.status === 666) {
                                    console.log(error.response.data.message);
                                }
                            });
                    } catch (error) {
                        console.log('Failed to connect to Memphis.');
                        if (error.response?.status === 666) {
                            console.log(error.response.data.message);
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
                console.log('Failed to connect to Memphis.');
                if (error.response?.status === 666) {
                    console.log(error.response.data.message);
                }
            });
    } catch (error) {
        console.log('Failed to connect to Memphis.');
        if (error.response?.status === 666) {
            console.log(error.response.data.message);
        }
    }
};
