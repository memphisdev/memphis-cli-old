// Copyright 2021-2022 The Memphis Authors
// Licensed under the GNU General Public License v3.0 (the “License”);
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// https://www.gnu.org/licenses/gpl-3.0.en.html
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
    const allowedLang = ['nodejs', 'go'];
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
