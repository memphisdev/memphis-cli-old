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

module.exports = {
    //User management
    LOGIN: '/api/usermgmt/login',
    ADD_USER: '/api/usermgmt/addUser',
    GET_ALL_USERS: '/api/usermgmt/getAllUsers',
    REMOVE_USER: '/api/usermgmt/removeUser',
    // EDIT_HUB_CREDS: '/api/usermgmt/editHubCreds',

    //Stations
    GET_STATION_INFO: '/api/stations/getStation',
    CREATE_STATION: '/api/stations/createStation',
    REMOVE_STATION: '/api/stations/removeStation',
    GET_ALL_STATIONS: '/api/stations/getAllStations',
    GET_STATION_OVERVIEW: '/api/monitoring/getStationOverviewData',

    //Producers
    GET_ALL_PRODUCERS: '/api/producers/getAllProducers',
    GET_ALL_PRODUCERS_BY_STATION: '/api/producers/getAllProducersByStation?station_name=',

    //Consumers
    GET_ALL_CONSUMERS: '/api/consumers/getAllConsumers',
    GET_ALL_CONSUMERS_BY_STATION: '/api/consumers/getAllConsumersByStation?station_name=',

    //Cluster Info
    GET_CLUSTER_INFO: '/api/monitoring/getClusterInfo'
};
