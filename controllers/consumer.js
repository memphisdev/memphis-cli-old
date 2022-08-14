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

const { log } = require('console');
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
                    var consumers = [];
                    var liveConsumers = [];
                    var destroyedConsumers = [];
                    var disconnectedConsumers = [];
                    for (let consumer of res) {
                        if (consumer.is_active) {
                            consumer['status'] = 'live';
                            liveConsumers.push(consumer);
                        } else if (consumer.is_deleted) {
                            consumer['status'] = 'destroyed';
                            destroyedConsumers.push(consumer);
                        } else {
                            consumer['status'] = 'disconnected';
                            disconnectedConsumers.push(consumer);
                        }
                    }
                    switch (state) {
                        case 'live':
                            consumers = liveConsumers.reverse();
                            break;
                        case 'destroyed':
                            consumers = destroyedConsumers.reverse();
                            break;
                        case 'disconnected':
                            consumers = disconnectedConsumers.reverse();
                            break;
                        default:
                            consumers = [].concat(liveConsumers.reverse(), disconnectedConsumers.reverse(), destroyedConsumers.reverse());
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
                    var consumers = [];
                    var liveConsumers = [];
                    var destroyedConsumers = [];
                    var disconnectedConsumers = [];
                    for (let consumer of res) {
                        if (consumer.is_active) {
                            consumer['status'] = 'live';
                            liveConsumers.push(consumer);
                        } else if (consumer.is_deleted) {
                            consumer['status'] = 'destroyed';
                            destroyedConsumers.push(consumer);
                        } else {
                            consumer['status'] = 'disconnected';
                            disconnectedConsumers.push(consumer);
                        }
                    }
                    switch (state) {
                        case 'live':
                            consumers = liveConsumers.reverse();
                            break;
                        case 'destroyed':
                            consumers = destroyedConsumers.reverse();
                            break;
                        case 'disconnected':
                            consumers = disconnectedConsumers.reverse();
                            break;
                        default:
                            consumers = [].concat(liveConsumers.reverse(), disconnectedConsumers.reverse(), destroyedConsumers.reverse());
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
                    var consumers = [];
                    var liveConsumers = [];
                    var destroyedConsumers = [];
                    var disconnectedConsumers = [];

                    for (let cg of res.disconnected_cgs) {
                        for (let consumer of cg.disconnected_consumers) {
                            consumer['status'] = 'disconnected';
                            consumer['cg_status'] = 'disconnected';
                            disconnectedConsumers.push(consumer);
                        }
                        for (let consumer of cg.deleted_consumers) {
                            consumer['status'] = 'destroyed';
                            consumer['cg_status'] = 'disconnected';
                            destroyedConsumers.push(consumer);
                        }
                        for (let consumer of cg.connected_consumers) {
                            consumer['status'] = 'live';
                            consumer['cg_status'] = 'disconnected';
                            liveConsumers.push(consumer);
                        }
                    }

                    for (let cg of res.connected_cgs) {
                        for (let consumer of cg.disconnected_consumers) {
                            consumer['status'] = 'disconnected';
                            consumer['cg_status'] = 'live';
                            disconnectedConsumers.push(consumer);
                        }
                        for (let consumer of cg.deleted_consumers) {
                            consumer['status'] = 'destroyed';
                            consumer['cg_status'] = 'live';
                            destroyedConsumers.push(consumer);
                        }
                        for (let consumer of cg.connected_consumers) {
                            consumer['status'] = 'live';
                            consumer['cg_status'] = 'live';
                            liveConsumers.push(consumer);
                        }
                    }

                    for (let cg of res.deleted_cgs) {
                        for (let consumer of cg.disconnected_consumers) {
                            consumer['status'] = 'disconnected';
                            consumer['cg_status'] = 'destroyed';
                            disconnectedConsumers.push(consumer);
                        }
                        for (let consumer of cg.deleted_consumers) {
                            consumer['status'] = 'destroyed';
                            consumer['cg_status'] = 'destroyed';
                            destroyedConsumers.push(consumer);
                        }
                        for (let consumer of cg.connected_consumers) {
                            consumer['status'] = 'live';
                            consumer['cg_status'] = 'destroyed';
                            liveConsumers.push(consumer);
                        }
                    }
                    switch (state) {
                        case 'live':
                            consumers = liveConsumers.reverse();
                            break;
                        case 'destroyed':
                            consumers = destroyedConsumers.reverse();
                            break;
                        case 'disconnected':
                            consumers = disconnectedConsumers.reverse();
                            break;
                        default:
                            consumers = [].concat(liveConsumers.reverse(), disconnectedConsumers.reverse(), destroyedConsumers.reverse());
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
