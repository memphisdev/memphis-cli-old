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
                console.log('Failed to fetch all factories');
                if (error.response?.status === 666) {
                    console.log(error.response.data.message);
                }
            });
    } catch (error) {
        console.log('Failed to fetch all factories');
        if (error.response?.status === 666) {
            console.log(error.response.data.message);
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
                console.log(`Failed to create ${factory} factory.`);
                if (error.response?.status === 666) {
                    console.log(error.response.data.message);
                }
            });
    } catch (error) {
        console.log(`Failed to create ${factory} factory.`);
        if (error.response?.status === 666) {
            console.log(error.response.data.message);
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
                console.log(`Failed to edit ${factory} factory.`);
                if (error.response?.status === 666) {
                    console.log(error.response.data.message);
                }
            });
    } catch (error) {
        console.log(`Failed to edit ${factory} factory.`);
        if (error.response?.status === 666) {
            console.log(error.response.data.message);
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
                console.log(`Failed to remove ${factory} factory.`);
                if (error.response?.status === 666) {
                    console.log(error.response.data.message);
                }
            });
    } catch (error) {
        console.log(`Failed to remove ${factory} factory.`);
        if (error.response?.status === 666) {
            console.log(error.response.data.message);
        }
    }
};
