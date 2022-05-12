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
// limitations under the License.

const fs = require('fs');

const ApiEndpoint = require('../apiEndpoints');
const httpRequest = require('../services/httpRequest');
const configDir = require('../utils/configDir');

exports.getFactories = async () => {
    try {
        const memConfigDir = configDir();
        if (memConfigDir === null) {
            console.log(`No support for this OS`);
            return;
        }
        const data = fs.readFileSync(memConfigDir + '.memconfig', 'utf8');
        if (data.length == 0) {
            return;
        }
        const credentials = JSON.parse(data.toString());
        httpRequest({
            method: 'GET',
            url: `${credentials.server}${ApiEndpoint.GET_ALL_FACTORIES}`,
            headers: { Authorization: 'Bearer ' + credentials.jwt },
            bodyParams: null,
            queryParams: null,
            timeout: 0
        })
            .then((res) => {
                if (res.length === 0) {
                    console.table([
                        {
                            name: ' ',
                            description: ' ',
                            created_by_user: ' ',
                            creation_date: ' '
                        }
                    ]);
                } else {
                    console.table(
                        res.map((factory) => {
                            return {
                                name: factory.name,
                                description: factory.description,
                                created_by_user: factory.created_by_user,
                                creation_date: factory.creation_date
                            };
                        })
                    );
                }
            })
            .catch((error) => {
                if (error.status === 666) {
                    console.log(error.message);
                } else {
                    console.log('Failed to fetch all factories');
                }
            });
    } catch (error) {
        if (error.status === 666) {
            console.log(error.message);
        } else {
            console.log('Failed to fetch all factories');
        }
    }
};

exports.createFactory = async (factory, options) => {
    try {
        const memConfigDir = configDir();
        if (memConfigDir === null) {
            console.log(`No support for this OS`);
            return;
        }
        const data = fs.readFileSync(memConfigDir + '.memconfig', 'utf8');
        if (data.length == 0) {
            return;
        }
        const credentials = JSON.parse(data.toString());
        httpRequest({
            method: 'POST',
            url: `${credentials.server}${ApiEndpoint.CREATE_FACTORY}`,
            headers: { Authorization: 'Bearer ' + credentials.jwt },
            bodyParams: {
                name: factory,
                description: options.desc
            },
            queryParams: null,
            timeout: 0
        })
            .then((res) => {
                console.log(`Factory ${res.name} was created.`);
            })
            .catch((error) => {
                if (error.status === 666) {
                    console.log(error.message);
                } else {
                    console.log(`Failed to create ${factory} factory.`);
                }
            });
    } catch (error) {
        if (error.status === 666) {
            console.log(error.message);
        } else {
            console.log(`Failed to create ${factory} factory.`);
        }
    }
};

exports.editFactory = async (factory, options) => {
    try {
        const memConfigDir = configDir();
        if (memConfigDir === null) {
            console.log(`No support for this OS`);
            return;
        }
        const data = fs.readFileSync(memConfigDir + '.memconfig', 'utf8');
        if (data.length == 0) {
            return;
        }
        const credentials = JSON.parse(data.toString());
        httpRequest({
            method: 'PUT',
            url: `${credentials.server}${ApiEndpoint.EDIT_FACTORY}`,
            headers: { Authorization: 'Bearer ' + credentials.jwt },
            bodyParams: {
                factory_name: factory,
                factory_new_name: options.name,
                factory_new_description: options.desc
            },
            queryParams: null,
            timeout: 0
        })
            .then((res) => {
                console.log(`Factory ${res.name} was edited.`);
            })
            .catch((error) => {
                if (error.status === 666) {
                    console.log(error.message);
                } else {
                    console.log(`Failed to edit ${factory} factory.`);
                }
            });
    } catch (error) {
        if (error.status === 666) {
            console.log(error.message);
        } else {
            console.log(`Failed to edit ${factory} factory.`);
        }
    }
};

exports.removenFactory = async (factory) => {
    try {
        const memConfigDir = configDir();
        if (memConfigDir === null) {
            console.log(`No support for this OS`);
            return;
        }
        const data = fs.readFileSync(memConfigDir + '.memconfig', 'utf8');
        if (data.length == 0) {
            return;
        }
        const credentials = JSON.parse(data.toString());
        httpRequest({
            method: 'DELETE',
            url: `${credentials.server}${ApiEndpoint.REMOVE_FACTORY}`,
            headers: { Authorization: 'Bearer ' + credentials.jwt },
            bodyParams: {
                factory_name: factory
            },
            queryParams: null,
            timeout: 0
        })
            .then((res) => {
                Object.keys(res).length === 0 ? console.log(`Factory ${factory} was removed.`) : console.log(`Failed to remove ${factory} factory.`);
            })
            .catch((error) => {
                if (error.status === 666) {
                    console.log(error.message);
                } else {
                    console.log(`Failed to remove ${factory} factory.`);
                }
            });
    } catch (error) {
        if (error.status === 666) {
            console.log(error.message);
        } else {
            console.log(`Failed to remove ${factory} factory.`);
        }
    }
};
