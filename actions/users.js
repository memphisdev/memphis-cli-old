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

const users = require('../controllers/users');
const validateToken = require('../utils/validateToken');

const handleUserActions = (action, options) => {
    switch (action[0]) {
        case 'ls':
            users.getUsers();
            break;
        case 'add':
            if (!options.username)
                console.log(
                    `Username is required. Use command:\nmem user add --username <username> [--password <password>] --type <user-type>\nNote:\ntype values: application/management\n* Password is not required for type application *`
                );
            else if (!options.password && options.type === 'management')
                console.log(`Password is required for user of type management. Use command:\nmem user add --username <username> --password <password> --type management`);
            // else if (options.password && options.type === 'application')
            //     console.log(`Password is not required for user of type application. Use command:\nmem user add --username <username> --type application`);
            else if (!options.type || options.type === 'management' || options.type === 'application') users.addUser(options);
            else console.log(` Use command:\nmem user add --username <username> [--password <password>] --type <user-type>\nNote:\ntype values: application/management`);
            break;
        case 'del':
            if (!action[1]) console.log('Username is required. Use command:\nmem user del <username> ');
            else users.removeUser(action[1]);
            break;
        default:
            return;
    }
};

exports.userMenu = async (action, options) => {
    try {
        await validateToken();
        handleUserActions(action, options);
    } catch (error) {
        console.log('Please check your credentials and connect again');
        if (error.response?.status === 666) {
            console.log(error.response.data.message);
        }
    }
};
