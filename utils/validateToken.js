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
            login(credentials.server, credentials.user, credentials.password)
                .then((res) => {
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
                })
                .catch((error) => {
                    throw new Error({ status: 666, message: 'Please check your credentials and connect again' });
                });
        } else return;
    } catch (error) {
        if (error.status === 666) {
            throw error;
        }
    }
};
