module.exports = {
    //User management
    LOGIN: '/api/usermgmt/login',
    ADD_USER: '/api/usermgmt/addUser',
    GET_ALL_USERS: '/api/usermgmt/getAllUsers',
    REMOVE_USER: '/api/usermgmt/removeUser',
    // EDIT_HUB_CREDS: '/api/usermgmt/editHubCreds',

    //Factories:
    CREATE_FACTORY: '/api/factories/createFactory',
    GET_ALL_FACTORIES: '/api/factories/getAllFactories',
    REMOVE_FACTORY: '/api/factories/removeFactory',
    EDIT_FACTORY: '/api/factories/editFactory',

    //Stations
    GET_STATION_INFO: '/api/stations/getStation',
    CREATE_STATION: '/api/stations/createStation',
    REMOVE_STATION: '/api/stations/removeStation',
    GET_ALL_STATIONS: '/api/stations/getAllStations',

    //Producers
    GET_ALL_PRODUCERS: '/api/producers/getAllProducers',
    GET_ALL_PRODUCERS_BY_STATION: '/api/producers/getAllProducersByStation?station_name=',

    //Consumers
    GET_ALL_CONSUMERS: '/api/consumers/getAllConsumers',
    GET_ALL_CONSUMERS_BY_STATION: '/api/consumers/getAllConsumersByStation?station_name='
}