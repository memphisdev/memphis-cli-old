const factoryDesc = `Factory is the place to bind stations that have some close business logic`

const factoryHelp = `Factory Commands:
   ls                List of factories
   create            Create new factory  
   edit              Edit factory name and/or description
   del               Delete a factory
`
const stationDesc = `Station is Memphis' queue/topic/channel/subject`

const stationHelp = `Station Commands:
   ls                List of stations
   create            Create new station  
   info              Specific station's info
   del               Delete a station
`
const userDesc = `Manage users and premissions`

const userHelp =    `User Commands:
   ls                List of users
   add               Add new user  
   del               Delete user
  `

const connectDesc = `Connection configuration to Memphis control plane`


const producerDesc = `Producer is the entity who can send messages into stations`

const producerHelp = `Producer Commands:
   ls                List of Producers
`

const consumerDesc = `Consumer is the entity who can consume messages from stations`

const consumerHelp = `Consumer Commands:
   ls                List of Consumers
`

const initDesc = `Creates an example project for working with Memphis`


// const hubDesc = `Memphis built-in components (connectors and functions)`

// const hubHelp =     `Hub Commands:
//    login             Login to Hub
// `

exports.factoryDesc = factoryDesc;
exports.factoryHelp = factoryHelp;

exports.stationDesc = stationDesc;
exports.stationHelp = stationHelp;

exports.userDesc = userDesc;
exports.userHelp = userHelp;

exports.connectDesc = connectDesc;

// exports.hubDesc = hubDesc;
// exports.hubHelp = hubHelp

exports.producerDesc = producerDesc;
exports.producerHelp = producerHelp;

exports.consumerDesc = consumerDesc;
exports.consumerHelp = consumerHelp;

exports.initDesc = initDesc;