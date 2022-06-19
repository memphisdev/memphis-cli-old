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

const fs = require('fs');

const ApiEndpoint = require('../apiEndpoints');
const httpRequest = require('../services/httpRequest');
const configDir = require('../utils/configDir');

exports.getProducers = async () => {
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
            url: `${credentials.server}${ApiEndpoint.GET_ALL_PRODUCERS}`,
            headers: { Authorization: 'Bearer ' + credentials.jwt },
            bodyParams: null,
            queryParams: null,
            timeout: 0
        })
            .then((res) => {
                if (res.length === 0) {
                    console.table([
                        {
                            name: ' ',
                            type: ' ',
                            created_by_user: ' ',
                            station_name: ' ',
                            factory_name: ' ',
                            creation_date: ' '
                        }
                    ]);
                } else {
                    const activeProducers = [];
                    for (let producer of res)
                        if (producer.is_active)
                            activeProducers.push(producer);

                    console.table(
                        activeProducers.map((producer) => {
                            return {
                                name: producer.name,
                                type: producer.type,
                                created_by_user: producer.created_by_user,
                                station_name: producer.station_name,
                                factory_name: producer.factory_name,
                                creation_date: producer.creation_date
                            };
                        })
                    );
                }
            })
            .catch((error) => {
                console.log('Failed to fetch all producers');
                if (error.response?.status === 666) {
                    console.log(error.response.data.message);
                }
            });
    } catch (error) {
        console.log('Failed to fetch all producers');
        if (error.response?.status === 666) {
            console.log(error.response.data.message);
        }
    }
};

exports.getProducersByStation = async (station) => {
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
            url: `${credentials.server}${ApiEndpoint.GET_ALL_PRODUCERS_BY_STATION}${station}`,
            headers: { Authorization: 'Bearer ' + credentials.jwt },
            bodyParams: null,
            queryParams: null,
            timeout: 0
        })
            .then((res) => {
                if (res.length === 0) {
                    console.table([
                        {
                            name: ' ',
                            type: ' ',
                            created_by_user: ' ',
                            station_name: ' ',
                            factory_name: ' ',
                            creation_date: ' '
                        }
                    ]);
                } else {
                    const activeProducers = [];
                    for (let producer of res)
                        if (producer.is_active)
                            activeProducers.push(producer);

                    console.table(
                        activeProducers.map((producer) => {
                            return {
                                name: producer.name,
                                type: producer.type,
                                created_by_user: producer.created_by_user,
                                station_name: producer.station_name,
                                factory_name: producer.factory_name,
                                creation_date: producer.creation_date
                            };
                        })
                    );
                }
            })
            .catch((error) => {
                console.log(`Failed to fetch all producers of station ${station}.`);
                if (error.response?.status === 666) {
                    console.log(error.response.data.message);
                }
            });
    } catch (error) {
        console.log(`Failed to fetch all producers of station ${station}.`);
        if (error.response?.status === 666) {
            console.log(error.response.data.message);
        }
    }
};
