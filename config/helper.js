// Credit for The NATS.IO Authors
// Copyright 2021-2022 The Memphis Authors
// Licensed under the Apache License, Version 2.0 (the “License”);
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.package server

const stationDesc = `Station is Memphis' queue/topic/channel/subject`;

const stationHelp = `Station Commands:
   ls                List of stations
   create            Create new station  
   info              Specific station's info
   del               Delete a station
`;
const userDesc = `Manage users and permissions`;

const userHelp = `User Commands:
   ls                List of users
   add               Add new user  
   del               Delete user
  `;

const connectDesc = `Connection configuration to Memphis`;

const producerDesc = `Producer is the entity who can send messages into stations`;

const producerHelp = `Producer Commands:
   ls                List of Producers
`;

const consumerDesc = `Consumer is the entity who can consume messages from stations`;

const consumerHelp = `Consumer Commands:
   ls                List of Consumers
`;

const initDesc = `Creates an example project for working with Memphis`;

// const hubDesc = `Memphis built-in components (connectors and functions)`

// const hubHelp =     `Hub Commands:
//    login             Login to Hub
// `

const clusterDesc = `Memphis Cluster`;
const clusterHelp = `Cluster Commands:
   info              Get information about the Memphis cluster
`;

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

exports.clusterDesc = clusterDesc;
exports.clusterHelp = clusterHelp;
