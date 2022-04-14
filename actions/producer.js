const producer = require("../controllers/producer")
const isValidToken = require("../utils/validateToken")
const login = require("../controllers/login")

const handleProducerActions = (action, options) => {
    switch (action[0]) {
        case "ls":
            if(!options.station)
                producer.getProducers()
            else if(options.station)
                producer.getProducersByStation(options.station)
            else
            console.log("Use command:\nmem producer ls\nOR\nmem producer ls --station <station-name>")
            break;
        default:
            return
    }
}

exports.producerMenu = (action, options) => {
    if (!isValidToken()) {
        login()
            .then(res => {
                handleProducerActions(action, options)
            })
            .catch((error) => {
                if (error.status === 666){
                    console.log(error.errorObj.message);
                } else {
                    console.log("Failed to connect to Memphis control plane.")
                }
            })
    }
    else handleProducerActions(action, options)
};

