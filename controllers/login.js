// Copyright 2021-2022 The Memphis Authors
// Licensed under the GNU General Public License v3.0 (the “License”);
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// https://www.gnu.org/licenses/gpl-3.0.en.html
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const ApiEndpoint = require('../apiEndpoints');
const httpRequest = require('../services/httpRequest');
const fs = require('fs');

module.exports = async (url, username, password) => {
    return httpRequest({
        method: 'POST',
        url: `${url}${ApiEndpoint.LOGIN}`,
        headers: null,
        bodyParams: {
            username: username,
            password: password
        },
        queryParams: null,
        timeout: 0
    })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            if (error.response.status === 666) {
                console.log(error.response.data.message);
            }
            return false;
        });
};
