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
            //--hubuser <hub-username> --hubpass <hub-password>`)
            else if (!options.password && options.type === 'management')
                console.log(`Password is required for user of type management. Use command:\nmem user add --username <username> --password <password> --type management`);
            else if (options.password && options.type === 'application')
                console.log(`Password is not required for user of type application. Use command:\nmem user add --username <username> --type application`);
            else if (!options.type || options.type === 'management' || options.type === 'application') users.addUser(options);
            else console.log(` Use command:\nmem user add --username <username> [--password <password>] --type <user-type>\nNote:\ntype values: application/management`);
            break;
        case 'del':
            if (!action[1]) console.log('Username is required. Use command:\nmem user del <username> ');
            else users.removeUser(action[1]);
            break;
        // case "edithubcred":
        //     if (!options.hubuser || !options.hubpass)
        //         console.log("Hub username or hub user password is required. Use command:\nmem user edithubcred --hubuser <hub-username> --hubpass <hub-password>")
        //     else
        //         users.edithubcred(options)
        //     break;
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
