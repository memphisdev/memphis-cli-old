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
