const station = require("../controllers/station")
const isValidToken = require("../utils/validateToken")
const login = require("../controllers/login")

const handleStatoionActions = (action, options) => {
    switch (action[0]) {
        case "ls":
            station.getAllStations()
            break;
        case "create":
            if (!action[1] || !options.factory) {
                console.log("\nStation name and factory name are required. Use command:\nmem station create <station-name> -f/--factory <factory> [options]\n")
                console.log("Options:\n");
                console.log("-rt, --retentiontype <retention-type>", "Retention type")
                console.log("-rv, --retentionvalue <retention-value>", "Retention value")
                console.log("-s, --storage <storage-type>", "Storage type")
                console.log("-r, --replicas <replicas>", "Replicas")
                console.log("-de, --dedupenabled <dedup-enabled>", "Dedup enabled")
                console.log("-dw, --dedupwindow <dedup-window-in-ms>", "Dedup window in ms")
                console.log("\nNote:\n")
                console.log("retentiontype values: time/messages/bytes")
                console.log("dedupenabled values: true/false")
                console.log("storage values: file/memory\n")
            }
            else
                station.createStation(action[1], options)
            break;
        case "info":
            if (!action[1])
                console.log("\nStation name is required. Use command:\nmem station info <station-name>\n") //Add retention and throughput
            else
                station.getStationInfo(action[1])
            break;
        case "del":
            if (!action[1])
                console.log("Station name is required. Use command:\nmem del <station-name>")
            else
                station.removeStation(action[1], options)
            break;
        default:
            return
    }
}

exports.stationMenu = (action, options) => {
    if (!isValidToken()) {
        login()
            .then(res => {
                handleStatoionActions(action, options)
            })
            .catch((error) => {
                if (error.status === 666){
                    console.log(error.errorObj.message);
               } else {
                   console.log("Failed to connect to Memphis control plane.")
               }
            })
    }
    else handleStatoionActions(action, options)
};

