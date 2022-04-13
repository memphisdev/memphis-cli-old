const ApiEndpoint = require("../apiEndpoints")
const httpRequest = require("../services/httpRequest")
const fs = require('fs');

exports.getProducers = async () => {
    try {
        const data = fs.readFileSync('.memconfig', 'utf8')
        if (data.length == 0) {
            return
        }
        const credentials = JSON.parse(data.toString())
        httpRequest({
            method: "GET",
            url: `${credentials.server}${ApiEndpoint.GET_ALL_PRODUCERS}`,
            headers: { 'Authorization': 'Bearer ' + credentials.jwt },
            bodyParams: null,
            queryParams: null,
            timeout: 0,
        })
            .then(res => {
                if (res.length === 0){
                    console.table([{ 
                            name: ' ',
                            type: ' ',
                            created_by_user: ' ',
                            station_name: ' ',
                            factory_name: ' ',
                            creation_date: ' ',
                            }]
                    )
                }
                else{
                    console.table(
                        res.map(producer => {
                            return {
                                "name": producer.name,
                                "type": producer.type,
                                "created_by_user": producer.created_by_user,
                                "station_name": producer.station_name,
                                "factory_name": producer.factory_name,
                                "creation_date": producer.creation_date,
                            };
                        }))
                }
                
            })
            .catch((error) => {
                if (error.status === 666){
                    console.log(error.errorObj.message);
                } else {
                    console.log("Failed to fetch all producers")
                }
            })
    } catch (error) {
        if (error.status === 666){
            console.log(error.errorObj.message);
        } else {
            console.log("Failed to fetch all producers")
        }
    }
}


exports.getProducersByStation = async (station) => {
    try {
        const data = fs.readFileSync('.memconfig', 'utf8')
        if (data.length == 0) {
            return
        }
        const credentials = JSON.parse(data.toString())
        httpRequest({
            method: "GET",
            url: `${credentials.server}${ApiEndpoint.GET_ALL_PRODUCERS_BY_STATION}${station}`,
            headers: { 'Authorization': 'Bearer ' + credentials.jwt },
            bodyParams: null,
            queryParams: null,
            timeout: 0,
        })
            .then(res => {
                if (res.length === 0){
                    console.table([{ 
                            name: ' ',
                            type: ' ',
                            created_by_user: ' ',
                            station_name: ' ',
                            factory_name: ' ',
                            creation_date: ' ',
                            }]
                    )
                }
                else{
                    console.table(
                        res.map(producer => {
                            return {
                                "name": producer.name,
                                "type": producer.type,
                                "created_by_user": producer.created_by_user,
                                "station_name": producer.station_name,
                                "factory_name": producer.factory_name,
                                "creation_date": producer.creation_date,
                            };
                        }))
                }
                
            })
            .catch((error) => {
                if (error.status === 666){
                    console.log(error.errorObj.message);
                } else {
                    console.log(`Failed to fetch all producers of station ${station}.`)
                }
            })
    } catch (error) {
        if (error.status === 666){
            console.log(error.errorObj.message);
        } else {
            console.log(`Failed to fetch all producers of station ${station}.`)
        }
    }
}
