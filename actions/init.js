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

const writeProjectFiles = (language) => {
    global.__basedir = __dirname;
    try {
        let consumer;
        let producer;
        let consumerData;
        let producerData;
        switch (language) {
            case 'nodejs':
                consumer = 'consumer.js';
                producer = 'producer.js';
                consumerData = fs.readFileSync(global.__basedir + '/memphis_code_examples/nodejs/consumer.js');
                producerData = fs.readFileSync(global.__basedir + '/memphis_code_examples/nodejs/producer.js');
                fs.writeFileSync(consumer, consumerData);
                fs.writeFileSync(producer, producerData);
                break;
            case 'go':
                consumer = 'consumer.go';
                producer = 'producer.go';
                consumerData = fs.readFileSync(global.__basedir + '/memphis_code_examples/go/consumer.go');
                producerData = fs.readFileSync(global.__basedir + '/memphis_code_examples/go/producer.go');
                fs.writeFileSync(consumer, consumerData);
                fs.writeFileSync(producer, producerData);
                break;
            case 'python':
                consumer = 'consumer.py';
                producer = 'producer.py';
                consumerData = fs.readFileSync(global.__basedir + '/memphis_code_examples/python/consumer.py');
                producerData = fs.readFileSync(global.__basedir + '/memphis_code_examples/python/producer.py');
                fs.writeFileSync(consumer, consumerData);
                fs.writeFileSync(producer, producerData);
                break;
        }
        console.log(`Example project was created.`);
    } catch (error) {
        console.log(error);
        console.log(`Failed to create project`);
    }
};

const handleInitActions = (action, options) => {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    let language = options.lang || 'nodejs';
    const allowedLang = ['nodejs', 'go', 'python'];
    if (!allowedLang.includes(language)) {
        console.log(`\nThe language you selected is not supported yet\n\nCurrently supported languages: ${allowedLang}.\n\nFor more help use 'mem init -h'.\n`);
        readline.close();
    } else {
        console.log(
            `\n'mem init' creates an example project for connecting an app with Memphis.\n\nThe default language is nodejs.\nIf you want to use different language use 'mem init -l/--language <language>'.\nCurrently supported languages: ${allowedLang}.\n\nFor more help use 'mem init -h'.\n`
        );
        readline.question(`You chose ${language} language.\nThe project will be created in directory ${process.cwd()}\n\ncontinue? Y/n    ->    `, (answer) => {
            if (answer.toString().trim().toLowerCase() === 'y' || !answer) {
                writeProjectFiles(language);
            } else {
                console.log(`aborted.`);
            }
            readline.close();
        });
    }
};

exports.initMenu = (action, options) => {
    handleInitActions(action, options);
};
