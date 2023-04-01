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

exports.getAllProducers = async (state = 'all') => {
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
                            created_at: ' ',
                            status: '',
                            IP: ''
                        }
                    ]);
                } else {
                    let producers = [];
                    let connectedProducers = [];
                    let deletedProducers = [];
                    let disconnectedProducers = [];
                    for (let producer of res) {
                        if (producer.is_active) {
                            producer['status'] = 'connected';
                            connectedProducers.push(producer);
                        } else if (producer.is_deleted) {
                            producer['status'] = 'deleted';
                            deletedProducers.push(producer);
                        } else {
                            producer['status'] = 'disconnected';
                            disconnectedProducers.push(producer);
                        }
                    }
                    switch (state) {
                        case 'connected':
                            producers = connectedProducers.reverse();
                            break;
                        case 'deleted':
                            producers = deletedProducers.reverse();
                            break;
                        case 'disconnected':
                            producers = disconnectedProducers.reverse();
                            break;
                        default:
                            producers = [].concat(connectedProducers.reverse(), disconnectedProducers.reverse(), deletedProducers.reverse());
                    }
                    if (producers.length === 0) {
                        console.table([
                            {
                                name: ' ',
                                type: ' ',
                                created_by_user: ' ',
                                station_name: ' ',
                                created_at: ' ',
                                status: '',
                                IP: ''
                            }
                        ]);
                    } else {
                        console.table(
                            producers.map((producer) => {
                                return {
                                    name: producer.name,
                                    type: producer.type,
                                    created_by_user: producer.created_by_username,
                                    station_name: producer.station_name,
                                    created_at: producer.created_at,
                                    status: producer.status,
                                    IP: producer.client_address
                                };
                            })
                        );
                    }
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

exports.getProducersByStation = async (station, state = 'all') => {
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
                            created_at: ' ',
                            status: ''
                        }
                    ]);
                } else {
                    let producers = [];
                    let connectedProducers = [];
                    let deletedProducers = [];
                    let disconnectedProducers = [];
                    for (let producer of res) {
                        if (producer.is_active) {
                            producer['status'] = 'connected';
                            connectedProducers.push(producer);
                        } else if (producer.is_deleted) {
                            producer['status'] = 'deleted';
                            deletedProducers.push(producer);
                        } else {
                            producer['status'] = 'disconnected';
                            disconnectedProducers.push(producer);
                        }
                    }
                    switch (state) {
                        case 'connected':
                            producers = connectedProducers.reverse();
                            break;
                        case 'deleted':
                            producers = deletedProducers.reverse();
                            break;
                        case 'disconnected':
                            producers = disconnectedProducers.reverse();
                            break;
                        default:
                            producers = [].concat(connectedProducers.reverse(), disconnectedProducers.reverse(), deletedProducers.reverse());
                    }
                    if (producers.length === 0) {
                        console.table([
                            {
                                name: ' ',
                                type: ' ',
                                created_by_user: ' ',
                                created_at: ' ',
                                status: ''
                            }
                        ]);
                    } else {
                        console.table(
                            producers.map((producer) => {
                                return {
                                    name: producer.name,
                                    type: producer.type,
                                    created_by_user: producer.created_by_username,
                                    created_at: producer.created_at,
                                    status: producer.status
                                };
                            })
                        );
                    }
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
