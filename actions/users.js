const users = require("../controllers/users")
const inputValidation = require("../utils/inputValidations")
const isValidToken = require("../utils/validateToken")
const login = require("../controllers/login")

const handleUserActions = (action, options) => {
    switch (action[0]) {
        case "ls":
            users.getUsers()
            break;
        case "add":
            if (!options.name)
                console.log(`User name is required. Use command:\nmem user add --name <user-name> --password <user-password> --type <user-type> --avatar <avatar-id>\nNote:\ntype values: application/management\n* Password is not required for type application *`) //--hubuser <hub-username> --hubpass <hub-password>`)
            else if((!options.password && options.type === 'management'))
                console.log(`Password is required for user of type management. Use command:\nmem user add --name <user-name> --password <user-password> --type management --avatar <avatar-id>`)
            else if((options.password && options.type === 'application'))
                console.log(`Password is not required for user of type application. Use command:\nmem user add --name <user-name> --type application --avatar <avatar-id>`)
            else if(!options.type || options.type === 'management' || options.type === 'application')
                users.addUser(options)
            else
                console.log(` Use command:\nmem user add --name <user-name> --password <user-password> --type <user-type> --avatar <avatar-id>\nNote:\ntype values: application/management`);
            break;
        case "del":
            if (!action[1])
                console.log("User name is required. Use command:\nmem user del <user-name> ")
            else
                users.removeUser(action[1])
            break;
        // case "edithubcred":
        //     if (!options.hubuser || !options.hubpass)
        //         console.log("Hub user name or hub user password is required. Use command:\nmem user edithubcred --hubuser <hub-username> --hubpass <hub-password>")
        //     else
        //         users.edithubcred(options)
        //     break;
        default:
            return
    }
}

exports.userMenu = (action, options) => {
    if (!isValidToken()) {
        login()
            .then(res => {
                handleUserActions(action, options)
            })
            .catch((error) => {
                if (error.status === 666){
                    console.log(error.errorObj.message);
                } else { 
                    console.log("Failed to connect to Memphis control plane.")
                }
            })
    }
    else handleUserActions(action, options)
};
