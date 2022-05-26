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

const producer = require('../controllers/producer');
const validateToken = require('../utils/validateToken');

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

exports.producerMenu = async (action, options) => {
    try {
        await validateToken();
        handleProducerActions(action, options);
    } catch (error) {
        if (error.status === 666) {
            console.log(error.message);
        } else {
            console.log('Please check your credentials and connect again');
        }
    }
};
