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

exports.getAllStations = async () => {
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
            url: `${credentials.server}${ApiEndpoint.GET_ALL_STATIONS}`,
            headers: { Authorization: 'Bearer ' + credentials.jwt },
            bodyParams: null,
            queryParams: null,
            timeout: 0
        })
            .then((res) => {
                if (res.length === 0) {
                    console.table([
                        {
                            name: '',
                            'retention type': '',
                            'retentention value': '',
                            'storage type': '',
                            replicas: '',
                            'dedup enabled': '',
                            'dedup window ms': '',
                            'created by': '',
                            'creation date': '',
                            last_update: ''
                        }
                    ]);
                } else {
                    console.table(
                        res.map((station) => {
                            return {
                                name: station.name,
                                'retention type': station.retention_type,
                                'retentention value': station.retention_value,
                                'storage type': station.storage_type,
                                replicas: station.replicas,
                                'dedup enabled': station.dedup_enabled,
                                'dedup window ms': station.dedup_window_in_ms,
                                'created by': station.created_by_user,
                                'creation date': station.creation_date.substring(0, 10),
                                last_update: station.last_update.substring(0, 10)
                            };
                        })
                    );
                }
            })
            .catch((error) => {
                console.log('Failed to fetch all stations');
                if (error.response?.status === 666) {
                    console.log(error.response.data.message);
                }
            });
    } catch (error) {
        console.log('Failed to fetch all stations');
        if (error.response?.status === 666) {
            console.log(error.response.data.message);
        }
    }
};

exports.createStation = async (station, options) => {
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
        const dw = Number(options.dedupwindow ? options.dedupwindow : 0);
        const de = Boolean(options.dedupenabled ? options.dedupenabled : false);
        const r = Number(options.replicas ? options.replicas : 1);
        const s = options.storage ? options.storage : 'file';
        const rv = Number(options.retentionvalue ? options.retentionvalue : 604800);
        const rt = options.retentiontype ? options.retentiontype : 'message_age_sec';
        httpRequest({
            method: 'POST',
            url: `${credentials.server}${ApiEndpoint.CREATE_STATION}`,
            headers: { Authorization: 'Bearer ' + credentials.jwt },
            bodyParams: {
                name: station,
                retention_type: rt,
                retention_value: rv,
                storage_type: s,
                replicas: r,
                dedup_enabled: de,
                dedup_window_in_ms: dw
            },

            queryParams: null,
            timeout: 0
        })
            .then((res) => {
                console.log(`Station ${station} was created with the following details:`);
                console.table(
                    [res].map((station) => {
                        return {
                            'name ': station.name,
                            'retention type': station.retention_type,
                            'retentention value': station.retention_value,
                            'storage type': station.storage_type,
                            'replicas ': station.replicas,
                            'dedup enabled': station.dedup_enabled,
                            'dedup window ms': station.dedup_window_in_ms,
                            'created by': station.created_by_user,
                            'creation date': station.creation_date.substring(0, 10)
                        };
                    })
                );
            })
            .catch((error) => {
                console.log(`Failed to create ${station} station.`);
                if (error.response?.status === 666) {
                    console.log(error.response.data.message);
                }
            });
    } catch (error) {
        console.log(`Failed to create ${station} station.`);
        if (error.response?.status === 666) {
            console.log(error.response.data.message);
        }
    }
};

exports.getStationInfo = async (station) => {
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
            url: `${credentials.server}${ApiEndpoint.GET_STATION_INFO}?station_name=${station}`,
            headers: { Authorization: 'Bearer ' + credentials.jwt },
            bodyParams: null,
            queryParams: null,
            timeout: 0
        })
            .then((res) => {
                console.log('Station info:');
                console.log(res);
            })
            .catch((error) => {
                console.log(`Failed to fetch ${station} station details.`);
                if (error.response?.status === 666) {
                    console.log(error.response.data.message);
                }
            });
    } catch (error) {
        console.log(`Failed to fetch ${station} station details.`);
        if (error.response?.status === 666) {
            console.log(error.response.data.message);
        }
    }
};

exports.removeStation = async (station) => {
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
            method: 'DELETE',
            url: `${credentials.server}${ApiEndpoint.REMOVE_STATION}`,
            headers: { Authorization: 'Bearer ' + credentials.jwt },
            bodyParams: {
                station_names: [station]
            },
            queryParams: null,
            timeout: 0
        })
            .then((res) => {
                Object.keys(res).length === 0 ? console.log(`Station ${station} was removed.`) : console.log(`Failed to remove station ${station}.`);
            })
            .catch((error) => {
                console.log(`Failed to remove ${station} station.`);
                if (error.response?.status === 666) {
                    console.log(error.response.data.message);
                }
            });
    } catch (error) {
        console.log(`Failed to remove ${station} station.`);
        if (error.response?.status === 666) {
            console.log(error.response.data.message);
        }
    }
};
