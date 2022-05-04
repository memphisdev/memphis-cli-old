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

const producer = require('../controllers/producer');
const isValidToken = require('../utils/validateToken');
const login = require('../controllers/login');

const handleProducerActions = (action, options) => {
    switch (action[0]) {
        case 'ls':
            if (!options.station) producer.getProducers();
            else if (options.station) producer.getProducersByStation(options.station);
            else console.log('Use command:\nmem producer ls\nOR\nmem producer ls --station <station-name>');
            break;
        default:
            return;
    }
};

exports.producerMenu = (action, options) => {
    if (!isValidToken()) {
        login()
            .then((res) => {
                handleProducerActions(action, options);
            })
            .catch((error) => {
                if (error.status === 666) {
                    console.log(error.errorObj.message);
                } else {
                    console.log('Failed to connect to Memphis.');
                }
            });
    } else handleProducerActions(action, options);
};
