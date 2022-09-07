// Copyright 2021-2022 The Memphis Authors
// Licensed under the MIT License (the "License");
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// This license limiting reselling the software itself "AS IS".
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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
