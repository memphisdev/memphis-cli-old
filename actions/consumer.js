const consumer = require("../controllers/consumer")
const isValidToken = require("../utils/validateToken")
const login = require("../controllers/login")

const handleConsumerActions = (action, options) => {
    switch (action[0]) {
        case "ls":
            if(!options.station)
                consumer.getConsumers()
            else if(options.station)
                consumer.getConsumersByStation(options.station)
            else
            console.log("Use command:\nmem consumer ls\nOR\nmem consumer ls --station <station-name>")
            break;
        default:
            return
    }
}

exports.consumerMenu = (action, options) => {
    if (!isValidToken()) {
        login()
            .then(res => {
                handleConsumerActions(action, options)
            })
            .catch((error) => {
                if (error.status === 666){
                    console.log(error.errorObj.message);
               } else{
                    console.log("Failed to connect to Memphis control plane.")
                }
            })
    }
    else handleConsumerActions(action, options)
};

