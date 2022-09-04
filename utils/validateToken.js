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

module.exports = async () => {
    try {
        const memConfigDir = configDir();
        if (memConfigDir === null) {
            console.log(`No support for this OS`);
            return;
        }
        const data = fs.readFileSync(memConfigDir + '.memconfig', 'utf8');
        if (data.length == 0) {
            return false;
        }
        const credentials = JSON.parse(data.toString());
        const d = new Date();
        if (d.getTime() > credentials.expiration) {
            const memConfigDir = configDir();
            if (memConfigDir === null) {
                throw new Error({ status: 666, message: 'No support for this OS' });
            }
            const data = fs.readFileSync(memConfigDir + '.memconfig', 'utf8');
            if (data.length == 0) {
                throw new Error({ status: 666, message: 'Please Login' });
            }
            const credentials = JSON.parse(data.toString());
            const res = await login(credentials.server, credentials.user, credentials.password);
            if (res) {
                const d = new Date();
                const expiration = d.getTime() + res.expires_in - 100000;
                const credentialsDetails = {
                    user: credentials.user,
                    password: credentials.password,
                    server: credentials.server,
                    jwt: res.jwt,
                    expiration: expiration
                };
                const data = JSON.stringify(credentialsDetails);
                if (!fs.existsSync(memConfigDir)) {
                    fs.mkdirSync(memConfigDir);
                }
                fs.writeFileSync(memConfigDir + '.memconfig', data);
            } else {
                throw new Error({ status: 666, message: 'Please check your credentials and connect again' });
            }
        } else return;
    } catch (error) {
        if (error.response?.status === 666) {
            throw error;
        } else {
            throw new Error({ status: 666, message: 'Please check your credentials and connect again' });
        }
    }
};
