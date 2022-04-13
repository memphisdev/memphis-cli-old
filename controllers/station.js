const ApiEndpoint = require("../apiEndpoints")
const httpRequest = require("../services/httpRequest")
const fs = require('fs');

const stations = [{
    factory_name: "factory1",
    application_name: "application1",
    retention_type: "time",
    retentention_value: "1 week",
    max_throughput_type: "messsages",
    max_throughput_value: "100000",
}, {
    factory_name: "factory2",
    application_name: "application1",
    retention_type: "time",
    retentention_value: "1 day",
    max_throughput_type: "bytes",
    max_throughput_value: "100000",
},
{
    factory_name: "factory3",
    application_name: "application1",
    retention_type: "time",
    retentention_value: "1 week",
    max_throughput_type: "bytes",
    max_throughput_value: "5000000",
},
{
    factory_name: "factory4",
    application_name: "application2",
    retention_type: "time",
    retentention_value: "1 week",
    max_throughput_type: "bytes",
    max_throughput_value: "500000",
},
{
    factory_name: "factory5",
    application_name: "application3",
    retention_type: "time",
    retentention_value: "1 week",
    max_throughput_type: "messsages",
    max_throughput_value: "15000",
},
]


exports.getAllStations = async () => {
    try {
        const data = fs.readFileSync('.memconfig', 'utf8')
        if (data.length == 0) {
            return
        }
        const credentials = JSON.parse(data.toString())
        httpRequest({
            method: "GET",
            url: `${credentials.server}${ApiEndpoint.GET_ALL_STATIONS}`,
            headers: { 'Authorization': 'Bearer ' + credentials.jwt },
            bodyParams: null,
            queryParams: null,
            timeout: 0,
        })
            .then(res => {
                console.table(
                    res.map(station => {
                        return {
                            "name": station.name,
                            "factory": station.factory_name,
                            "retention type": station.retention_type,
                            "retentention value": station.retention_value,
                            "storage type": station.storage_type,
                            "replicas": station.replicas,
                            "dedup enabled": station.dedup_enabled,
                            "dedup window ms": station.dedup_window_in_ms,
                            "created by": station.created_by_user,
                            "creation date": station.creation_date.substring(0,10),
                            "last_update": station.last_update.substring(0,10),
                        };
                    })
                )
            })
            .catch((error) => {
                if (error.status === 666){
                    console.log(error.errorObj.message);
                } else {
                    console.log("Failed to fetch all stations")
                }
            })
    } catch (error) {
        if (error.status === 666){
            console.log(error.errorObj.message);
        } else {
            console.log("Failed to fetch all stations")
        }
    }
}

exports.createStation = async (station, options) => {
    try {
        const data = fs.readFileSync('.memconfig', 'utf8')
        if (data.length == 0) {
            return
        }
        const credentials = JSON.parse(data.toString())
        httpRequest({
            method: "POST",
            url: `${credentials.server}${ApiEndpoint.CREATE_STATION}`,
            headers: { 'Authorization': 'Bearer ' + credentials.jwt },
            bodyParams: {
                "name": station,
                "factory_name": options.factory,
                "retention_type": options.retentiontype,
                "retention_value": options.retentionvalue,
                "storage_type": options.storage,
                "replicas": options.replicas,
                "dedup_enabled": options.dedupenabled,
                "dedup_window_in_ms": options.dedupwindow
            },
            
            queryParams: null,
            timeout: 0,
        })
            .then(res => {
                console.log(`Station ${station} was created with the following details:`);
                console.table(
                    [res].map(station => {
                        return {
                            "name": station.name,
                            "retention type": station.retention_type,
                            "retentention value": station.retention_value,
                            "storage type": station.storage_type,
                            "replicas": station.replicas,
                            "dedup enabled": station.dedup_enabled,
                            "dedup window ms": station.dedup_window_in_ms,
                            "created by": station.created_by_user,
                            "creation date": station.creation_date.substring(0,10),
                        };
                    })
                )
            })
            .catch((error) => {
                if (error.status === 666){
                    console.log(error.errorObj.message);
                } else {
                    console.log(`Failed to create ${station} station.`)
                }
            })
    } catch (error) {
        if (error.status === 666){
            console.log(error.errorObj.message);
        } else {
            console.log(`Failed to create ${station} station.`)
        }
    }
}

exports.getStationInfo = async (station) => {
    try {
        const data = fs.readFileSync('.memconfig', 'utf8')
        if (data.length == 0) {
            return
        }
        const credentials = JSON.parse(data.toString())
        httpRequest({
            method: "GET",
            url: `${credentials.server}${ApiEndpoint.GET_STATION_INFO}?station_name=${station}`,
            headers: { 'Authorization': 'Bearer ' + credentials.jwt },
            bodyParams: null,
            queryParams: null,
            timeout: 0,
        })
            .then(res => {
                console.log("Station info:")
                console.log(res)
            })
            .catch((error) => {
                if (error.status === 666){
                    console.log(error.errorObj.message);
                } else {
                    console.log(`Failed to fetch ${station} station details.`)
                }
            })
    } catch (error) {
        if (error.status === 666){
            console.log(error.errorObj.message);
        } else {
            console.log(`Failed to fetch ${station} station details.`)
        }
    }
}

exports.removeStation = async (station) => {
    try {
        const data = fs.readFileSync('.memconfig', 'utf8')
        if (data.length == 0) {
            return
        }
        const credentials = JSON.parse(data.toString())
        httpRequest({
            method: "DELETE",
            url: `${credentials.server}${ApiEndpoint.REMOVE_STATION}`,
            headers: { 'Authorization': 'Bearer ' + credentials.jwt },
            bodyParams: {
                "station_name": station,
            },
            queryParams: null,
            timeout: 0,
        })
            .then(res => {
                Object.keys(res).length === 0 ? console.log(`Statoin ${station} was removed.`) : console.log(`Failed to remove station ${station}.`)
            })
            .catch((error) => {
                if (error.status === 666){
                    console.log(error.errorObj.message);
                } else {
                    console.log(`Failed to remove ${station} station.`)
                }
            })
    } catch (error) {
        if (error.status === 666){
            console.log(error.errorObj.message);
        } else {
            console.log(`Failed to remove ${station} station.`)
        }
    }
}