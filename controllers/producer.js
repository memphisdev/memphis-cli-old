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
                            factory_name: ' ',
                            creation_date: ' ',
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
                                factory_name: ' ',
                                creation_date: ' ',
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
                                    created_by_user: producer.created_by_user,
                                    station_name: producer.station_name,
                                    factory_name: producer.factory_name,
                                    creation_date: producer.creation_date,
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
                            station_name: ' ',
                            factory_name: ' ',
                            creation_date: ' ',
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
                                station_name: ' ',
                                factory_name: ' ',
                                creation_date: ' ',
                                status: ''
                            }
                        ]);
                    } else {
                        console.table(
                            producers.map((producer) => {
                                return {
                                    name: producer.name,
                                    type: producer.type,
                                    created_by_user: producer.created_by_user,
                                    station_name: producer.station_name,
                                    factory_name: producer.factory_name,
                                    creation_date: producer.creation_date,
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
