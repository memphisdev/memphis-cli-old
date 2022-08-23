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

const factory = require('../controllers/factory');
const validateToken = require('../utils/validateToken');

const handleFactoryActions = (action, options) => {
    switch (action[0]) {
        case 'ls':
            factory.getFactories();
            break;
        case 'create':
            if (!action[1]) {
                console.log('\nFactory name is required. Use command:\n\nmem factory create <factory-name> [options]\n');
                console.log('Options:\n-d, --desc <factory-description>', 'Factory description\n');
            } else factory.createFactory(action[1], options);
            break;
        case 'edit':
            if (!action[1])
                console.log('\nFactory name is required. Use command:\n\nmem factory edit <factory-name> --name <new-factory-name> --desc <new-factory-description>\n');
            else if (!(options.name || options.desc))
                console.log(
                    'New factory name or description is required. Use command:\nmem factory edit <factory-name> --name <new-factory-name> --desc <new-factory-description>'
                );
            else factory.editFactory(action[1], options);
            break;
        case 'del':
            if (!action[1]) console.log('Factory name is required. Use command:\nmem factory del <factory-name> ');
            else factory.removenFactory(action[1]);
            break;
        default:
            return;
    }
};

exports.factoryMenu = async (action, options) => {
    try {
        await validateToken();
        handleFactoryActions(action, options);
    } catch (error) {
        console.log('Please check your credentials and connect again');
        if (error.response?.status === 666) {
            console.log(error.response.data.message);
        }
    }
};
