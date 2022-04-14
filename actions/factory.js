const factory = require("../controllers/factory")
const isValidToken = require("../utils/validateToken")
const login = require("../controllers/login")

const handleFactoryActions = (action, options) => {
    switch (action[0]) {
        case "ls":
            factory.getFactories()
            break;
        case "create":
            if (!action[1]){
                console.log("\nFactory name is required. Use command:\n\nmem factory create <factory-name> [options]\n")
                console.log("Options:\n-d, --desc <factory-description>", "Factory description\n");
            }
            else
                factory.createFactory(action[1], options)
            break;
        case "edit":
            if (!action[1])
                console.log("\nFactory name is required. Use command:\n\nmem factory edit <factory-name> --name <new-factory-name> --desc <new-factory-description>\n")
            else if (!(options.name || options.desc))
                console.log("New factory name or description is required. Use command:\nmem factory edit <factory-name> --name <new-factory-name> --desc <new-factory-description>")
            else
                factory.editFactory(action[1], options)
            break;
        case "del":
            if (!action[1])
                console.log("Factory name is required. Use command:\nmem factory del <factory-name> ")
            else
                factory.removenFactory(action[1])
            break;
        default:
            return
    }
}

exports.factoryMenu = (action, options) => {
    if (!isValidToken()) {
        login()
            .then(res => {
                handleFactoryActions(action, options)
            })
            .catch((error) => {
                if (error.status === 666){
                    console.log(error.errorObj.message);
                } else {
                    console.log("Failed to connect to Memphis control plane.")
                }
            })
    }
    else handleFactoryActions(action, options)
};

