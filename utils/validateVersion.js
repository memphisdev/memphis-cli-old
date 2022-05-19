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

const packageDetails = require('../package.json');
const httpRequest = require('../services/httpRequest');

module.exports = async () => {
    try {
        const res = await httpRequest({
            method: 'GET',
            url: `https://api.github.com/repos/Memphis-OS/memphis-cli/releases`
        });
        const version = res[0].name.replace('v', '');
        if (version !== packageDetails.version) {
            console.log(
                '\x1b[33m',
                `\nMemphis CLI is out of date, we strongly recommend upgrading it\nThe version installed is ${packageDetails.version} but current version is ${version}`
            );
            console.log('\x1b[0m', '');
        }
    } catch (ex) {
        return;
    }
};
