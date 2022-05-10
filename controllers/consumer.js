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

const ApiEndpoint = require('../apiEndpoints');
const httpRequest = require('../services/httpRequest');
const configDir = require('../utils/configDir');

exports.getConsumers = async () => {
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
            url: `${credentials.server}${ApiEndpoint.GET_ALL_CONSUMERS}`,
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
                            consumer_group: ' ',
                            created_by_user: ' ',
                            consumer_group: ' ',
                            station_name: ' ',
                            factory_name: ' ',
                            creation_date: ' '
                        }
                    ]);
                } else {
                    console.table(
                        res.map((consumer) => {
                            return {
                                name: consumer.name,
                                type: consumer.type,
                                consumer_group: consumer.consumer_group,
                                created_by_user: consumer.created_by_user,
                                consumer_group: consumer.consumer_group,
                                station_name: consumer.station_name,
                                factory_name: consumer.factory_name,
                                creation_date: consumer.creation_date
                            };
                        })
                    );
                }
            })
            .catch((error) => {
                if (error.status === 666) {
                    console.log(error.errorObj.message);
                } else {
                    console.log('Failed to fetch all consumers');
                }
            });
    } catch (error) {
        if (error.status === 666) {
            console.log(error.errorObj.message);
        } else {
            console.log('Failed to fetch all consumers');
        }
    }
};

exports.getConsumersByStation = async (station) => {
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
            url: `${credentials.server}${ApiEndpoint.GET_ALL_CONSUMERS_BY_STATION}${station}`,
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
                            consumer_group: ' ',
                            created_by_user: ' ',
                            consumer_group: ' ',
                            station_name: ' ',
                            factory_name: ' ',
                            creation_date: ' '
                        }
                    ]);
                } else {
                    console.table(
                        res.map((consumer) => {
                            return {
                                name: consumer.name,
                                type: consumer.type,
                                consumer_group: consumer.consumer_group,
                                created_by_user: consumer.created_by_user,
                                consumer_group: consumer.consumer_group,
                                station_name: consumer.station_name,
                                factory_name: consumer.factory_name,
                                creation_date: consumer.creation_date
                            };
                        })
                    );
                }
            })
            .catch((error) => {
                if (error.status === 666) {
                    console.log(error.errorObj.message);
                } else {
                    console.log(`Failed to fetch all consumers of station ${station}.`);
                }
            });
    } catch (error) {
        if (error.status === 666) {
            console.log(error.errorObj.message);
        } else {
            console.log(`Failed to fetch all consumers of station ${station}.`);
        }
    }
};
