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
