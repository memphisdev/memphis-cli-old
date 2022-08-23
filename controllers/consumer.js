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

exports.getAllConsumers = async (state = 'all') => {
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
                            consumers_group: ' ',
                            created_by_user: ' ',
                            creation_date: ' ',
                            status: '',
                            IP: '',
                            is_active: '',
                            is_deleted: '',
                            client_address: '',
                            max_ack_time_ms: '',
                            max_msg_deliveries: '2'
                        }
                    ]);
                } else {
                    let consumers = [];
                    let connectedConsumers = [];
                    let deletedConsumers = [];
                    let disconnectedConsumers = [];
                    for (let consumer of res) {
                        if (consumer.is_active) {
                            consumer['status'] = 'connected';
                            connectedConsumers.push(consumer);
                        } else if (consumer.is_deleted) {
                            consumer['status'] = 'deleted';
                            deletedConsumers.push(consumer);
                        } else {
                            consumer['status'] = 'disconnected';
                            disconnectedConsumers.push(consumer);
                        }
                    }
                    switch (state) {
                        case 'connected':
                            consumers = connectedConsumers.reverse();
                            break;
                        case 'deleted':
                            consumers = deletedConsumers.reverse();
                            break;
                        case 'disconnected':
                            consumers = disconnectedConsumers.reverse();
                            break;
                        default:
                            consumers = [].concat(connectedConsumers.reverse(), disconnectedConsumers.reverse(), deletedConsumers.reverse());
                    }
                    if (consumers.length === 0) {
                        console.table([
                            {
                                name: ' ',
                                consumers_group: ' ',
                                created_by_user: ' ',
                                creation_date: ' ',
                                status: '',
                                IP: '',
                                max_ack_time_ms: '',
                                max_msg_deliveries: '2'
                            }
                        ]);
                    } else {
                        console.table(
                            consumers.map((consumer) => {
                                return {
                                    name: consumer.name,
                                    consumers_group: consumer.consumers_group,
                                    created_by_user: consumer.created_by_user,
                                    creation_date: consumer.creation_date,
                                    status: consumer.status,
                                    IP: consumer.client_address,
                                    max_ack_time_ms: consumer.max_ack_time_ms,
                                    max_msg_deliveries: consumer.max_msg_deliveries
                                };
                            })
                        );
                    }
                }
            })
            .catch((error) => {
                console.log('Failed to fetch all consumers');
                if (error.response?.status === 666) {
                    console.log(error.response.data.message);
                }
            });
    } catch (error) {
        console.log('Failed to fetch all consumers');
        if (error.response?.status === 666) {
            console.log(error.response.data.message);
        }
    }
};

exports.getConsumersByStation = async (station, state = 'all') => {
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
                            consumers_group: ' ',
                            created_by_user: ' ',
                            creation_date: ' ',
                            status: '',
                            IP: '',
                            max_ack_time_ms: '',
                            max_msg_deliveries: ''
                        }
                    ]);
                } else {
                    let consumers = [];
                    let connectedConsumers = [];
                    let deletedConsumers = [];
                    let disconnectedConsumers = [];
                    for (let consumer of res) {
                        if (consumer.is_active) {
                            consumer['status'] = 'connected';
                            connectedConsumers.push(consumer);
                        } else if (consumer.is_deleted) {
                            consumer['status'] = 'deleted';
                            deletedConsumers.push(consumer);
                        } else {
                            consumer['status'] = 'disconnected';
                            disconnectedConsumers.push(consumer);
                        }
                    }
                    switch (state) {
                        case 'connected':
                            consumers = connectedConsumers.reverse();
                            break;
                        case 'deleted':
                            consumers = deletedConsumers.reverse();
                            break;
                        case 'disconnected':
                            consumers = disconnectedConsumers.reverse();
                            break;
                        default:
                            consumers = [].concat(connectedConsumers.reverse(), disconnectedConsumers.reverse(), deletedConsumers.reverse());
                    }
                    if (consumers.length === 0) {
                        console.table([
                            {
                                name: ' ',
                                consumers_group: ' ',
                                created_by_user: ' ',
                                creation_date: ' ',
                                status: '',
                                IP: '',
                                max_ack_time_ms: '',
                                max_msg_deliveries: ''
                            }
                        ]);
                    } else {
                        console.table(
                            consumers.map((consumer) => {
                                return {
                                    name: consumer.name,
                                    consumers_group: consumer.consumers_group,
                                    created_by_user: consumer.created_by_user,
                                    creation_date: consumer.creation_date,
                                    status: consumer.status,
                                    IP: consumer.client_address,
                                    max_ack_time_ms: consumer.max_ack_time_ms,
                                    max_msg_deliveries: consumer.max_msg_deliveries
                                };
                            })
                        );
                    }
                }
            })
            .catch((error) => {
                console.log(`Failed to fetch all consumers of station ${station}.`);
                if (error.response?.status === 666) {
                    console.log(error.response.data.message);
                }
            });
    } catch (error) {
        console.log(`Failed to fetch all consumers of station ${station}.`);
        if (error.response?.status === 666) {
            console.log(error.response.data.message);
        }
    }
};

exports.getConsumersByStationOverView = async (station, state = 'all') => {
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
            url: `${credentials.server}${ApiEndpoint.GET_STATION_OVERVIEW}?station_name=${station}`,
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
                            consumers_group: ' ',
                            cg_status: ' ',
                            created_by_user: ' ',
                            creation_date: ' ',
                            status: '',
                            IP: '',
                            max_ack_time_ms: '',
                            max_msg_deliveries: ''
                        }
                    ]);
                } else {
                    let consumers = [];
                    let connectedConsumers = [];
                    let deletedConsumers = [];
                    let disconnectedConsumers = [];

                    for (let cg of res.connected_cgs) {
                        for (let consumer of cg.connected_consumers) {
                            consumer['status'] = 'connected';
                            consumer['cg_status'] = 'connected';
                            connectedConsumers.push(consumer);
                        }
                        for (let consumer of cg.disconnected_consumers) {
                            consumer['status'] = 'disconnected';
                            consumer['cg_status'] = 'connected';
                            disconnectedConsumers.push(consumer);
                        }
                        for (let consumer of cg.deleted_consumers) {
                            consumer['status'] = 'deleted';
                            consumer['cg_status'] = 'connected';
                            deletedConsumers.push(consumer);
                        }
                    }

                    for (let cg of res.disconnected_cgs) {
                        for (let consumer of cg.disconnected_consumers) {
                            consumer['status'] = 'disconnected';
                            consumer['cg_status'] = 'disconnected';
                            disconnectedConsumers.push(consumer);
                        }
                        for (let consumer of cg.deleted_consumers) {
                            consumer['status'] = 'deleted';
                            consumer['cg_status'] = 'disconnected';
                            deletedConsumers.push(consumer);
                        }
                        for (let consumer of cg.connected_consumers) {
                            consumer['status'] = 'connected';
                            consumer['cg_status'] = 'disconnected';
                            connectedConsumers.push(consumer);
                        }
                    }

                    for (let cg of res.deleted_cgs) {
                        for (let consumer of cg.disconnected_consumers) {
                            consumer['status'] = 'disconnected';
                            consumer['cg_status'] = 'deleted';
                            disconnectedConsumers.push(consumer);
                        }
                        for (let consumer of cg.deleted_consumers) {
                            consumer['status'] = 'deleted';
                            consumer['cg_status'] = 'deleted';
                            deletedConsumers.push(consumer);
                        }
                        for (let consumer of cg.connected_consumers) {
                            consumer['status'] = 'connected';
                            consumer['cg_status'] = 'deleted';
                            connectedConsumers.push(consumer);
                        }
                    }
                    switch (state) {
                        case 'connected':
                            consumers = connectedConsumers.reverse();
                            break;
                        case 'deleted':
                            consumers = deletedConsumers.reverse();
                            break;
                        case 'disconnected':
                            consumers = disconnectedConsumers.reverse();
                            break;
                        default:
                            consumers = [].concat(connectedConsumers.reverse(), disconnectedConsumers.reverse(), deletedConsumers.reverse());
                    }
                    if (consumers.length === 0) {
                        console.table([
                            {
                                name: ' ',
                                consumers_group: ' ',
                                cg_status: ' ',
                                created_by_user: ' ',
                                creation_date: ' ',
                                status: '',
                                IP: '',
                                is_active: '',
                                is_deleted: '',
                                max_ack_time_ms: '',
                                max_msg_deliveries: ''
                            }
                        ]);
                    } else {
                        console.table(
                            consumers.map((consumer) => {
                                return {
                                    name: consumer.name,
                                    consumers_group: consumer.consumers_group,
                                    cg_status: consumer.cg_status,
                                    created_by_user: consumer.created_by_user,
                                    creation_date: consumer.creation_date,
                                    status: consumer.status,
                                    IP: consumer.client_address,
                                    max_ack_time_ms: consumer.max_ack_time_ms,
                                    max_msg_deliveries: consumer.max_msg_deliveries
                                };
                            })
                        );
                    }
                }
            })
            .catch((error) => {
                console.log(`Failed to fetch all consumers of station ${station}.`);
                if (error.response?.status === 666) {
                    console.log(error.response.data.message);
                }
            });
    } catch (error) {
        console.log(`Failed to fetch all consumers of station ${station}.`);
        if (error.response?.status === 666) {
            console.log(error.response.data.message);
        }
    }
};
