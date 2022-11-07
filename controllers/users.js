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

exports.getUsers = async () => {
    try {
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
            url: `${credentials.server}${ApiEndpoint.GET_ALL_USERS}`,
            headers: { Authorization: 'Bearer ' + credentials.jwt },
            bodyParams: null,
            queryParams: null,
            timeout: 0
        })
            .then((res) => {
                res.sort((a, b) => a.creation_date.localeCompare(b.creation_date));
                console.table(
                    res.map((user) => {
                        return {
                            user_name: user.username,
                            creation_date: user.creation_date,
                            user_type: user.user_type
                        };
                    })
                );
            })
            .catch((error) => {
                console.log('Failed to fetch all users');
                if (error.response?.status === 666) {
                    console.log(error.response.data.message);
                }
            });
    } catch (error) {
        console.log('Failed to fetch all users');
        if (error.response?.status === 666) {
            console.log(error.response.data.message);
        }
    }
};

exports.addUser = async (user) => {
    try {
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
            method: 'POST',
            url: `${credentials.server}${ApiEndpoint.ADD_USER}`,
            headers: { Authorization: 'Bearer ' + credentials.jwt },
            bodyParams: {
                username: user.username,
                password: user.password,
                // "hub_username": user.hubuser,
                // "hub_password": user.hubpass,
                user_type: user.type
            },
            queryParams: null,
            timeout: 0
        })
            .then((res) => {
                console.log(`User ${res.username} was created.`);
                if (res.user_type === 'application') {
                    console.log(`Broker connection credentials: ${res.broker_connection_creds}`);
                    console.warn(`These credentials CAN'T be restored, save them in a safe place`);
                }
            })
            .catch((error) => {
                console.log(`Failed to add user ${user.username}.`);
                if (error.response?.status === 666) {
                    console.log(error.response.data.message);
                }
            });
    } catch (error) {
        console.log(`Failed to add user ${user.username}.`);
        if (error.response?.status === 666) {
            console.log(error.response.data.message);
        }
    }
};

exports.removeUser = async (user) => {
    try {
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
            method: 'DELETE',
            url: `${credentials.server}${ApiEndpoint.REMOVE_USER}`,
            headers: { Authorization: 'Bearer ' + credentials.jwt },
            bodyParams: { username: user },
            queryParams: null,
            timeout: 0
        })
            .then((res) => {
                Object.keys(res).length === 0 ? console.log(`User ${user} was removed.`) : console.log(`Failed removing user ${user}.`);
            })
            .catch((error) => {
                console.log(`Failed to remove user ${user}.`);
            });
    } catch (error) {
        console.log(`Failed to remove user ${user}.`);
        if (error.response?.status === 666) {
            console.log(error.response.data.message);
        }
    }
};

// exports.edithubcred = async (user) => {
//     try {
//         const memConfigDir = configDir();
//        if (memConfigDir === null) {
//            console.log(`No support for this OS`);
//            return;
//        }
//        const data = fs.readFileSync(memConfigDir + '.memconfig', 'utf8');
//         if (data.length == 0) {
//             return
//         }
//         const credentials = JSON.parse(data.toString())
//         httpRequest({
//             method: "PUT",
//             url: `${credentials.server}${ApiEndpoint.EDIT_HUB_CREDS}`,
//             headers: { 'Authorization': 'Bearer ' + credentials.jwt },
//             bodyParams: {
//                 "hub_username": user.hubuser,
//                 "hub_password": user.hubpass,
//             },
//             queryParams: null,
//             timeout: 0,
//         })
//             .then(res => {
//                 user.hubuser && console.log(`User's hub name was updated.`)
//                 user.hubpass && console.log(`User's hub password was updated.`)
//             })
//             .catch((error) => {
//                 console.error(`Failed to update hub credentials.`)
//             })
//     } catch (error) {

//     console.error(`Failed to update hub credentials.`)
//      if (error.response?.status === 666) {
//          console.log(error.response.data.message);
//      }
//     }
// }
