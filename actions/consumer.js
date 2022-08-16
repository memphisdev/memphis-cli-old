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

const consumer = require('../controllers/consumer');
const validateToken = require('../utils/validateToken');

const handleConsumerActions = (action, options) => {
    switch (action[0]) {
        case 'ls':
            if (!options.station) {
                if (options.connected) consumer.getAllConsumers('connected');
                else if (options.disconnected) consumer.getAllConsumers('disconnected');
                else if (options.deleted) consumer.getAllConsumers('deleted');
                else consumer.getAllConsumers();
            } else {
                if (options.connected) consumer.getConsumersByStationOverView(options.station, 'connected');
                else if (options.disconnected) consumer.getConsumersByStationOverView(options.station, 'disconnected');
                else if (options.deleted) consumer.getConsumersByStationOverView(options.station, 'deleted');
                else consumer.getConsumersByStationOverView(options.station);
            }
            break;
        default:
            console.log('Use command:\nmem consumer ls\nOR\nmem consumer ls --station <station-name>');
            return;
    }
};

exports.consumerMenu = async (action, options) => {
    try {
        await validateToken();
        handleConsumerActions(action, options);
    } catch (error) {
        console.log('Please check your credentials and connect again');
        if (error.response?.status === 666) {
            console.log(error.response.data.message);
        }
    }
};
