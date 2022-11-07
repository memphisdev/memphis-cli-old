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

const station = require('../controllers/station');
const validateToken = require('../utils/validateToken');

const handleStationActions = (action, options) => {
    switch (action[0]) {
        case 'ls':
            station.getAllStations();
            break;
        case 'create':
            if (!action[1]) {
                console.log('\nStation name is required. Use command:\nmem station create <station-name> [options]\n');
                console.log('Options:\n');
                console.log('-rt, --retentiontype <retention-type>', 'Retention type');
                console.log('-rv, --retentionvalue <retention-value>', 'Retention value');
                console.log('-s, --storage <storage-type>', 'Storage type');
                console.log('-r, --replicas <replicas>', 'Replicas');
                console.log('-de, --dedupenabled <dedup-enabled>', 'Dedup enabled');
                console.log('-dw, --dedupwindow <dedup-window-in-ms>', 'Dedup window in ms');
                console.log('\nNote:\n');
                console.log('retentiontype values: time/messages/bytes');
                console.log('dedupenabled values: true/false');
                console.log('storage values: file/memory\n');
            } else station.createStation(action[1], options);
            break;
        case 'info':
            if (!action[1]) console.log('\nStation name is required. Use command:\nmem station info <station-name>\n'); //Add retention and throughput
            else station.getStationInfo(action[1]);
            break;
        case 'del':
            if (!action[1]) console.log('Station name is required. Use command:\nmem del <station-name>');
            else station.removeStation(action[1], options);
            break;
        default:
            return;
    }
};

exports.stationMenu = async (action, options) => {
    try {
        await validateToken();
        handleStationActions(action, options);
    } catch (error) {
        console.log('Please check your credentials and connect again');
        if (error.response?.status === 666) {
            console.log(error.response.data.message);
        }
    }
};
