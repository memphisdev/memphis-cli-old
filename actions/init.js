const isValidToken = require("../utils/validateToken")
const login = require("../controllers/login")
const fs = require('fs');

const writeProjectFiles = (language) => {
    global.__basedir = __dirname;
    try {
        switch (language){
            case "nodejs":
                const consumer = 'consumer.js';
                const producer = 'producer.js';
                const package = 'package.json';
                const consumerData = fs.readFileSync(global.__basedir + '/memphis_code_examples/nodejs/consumer.js');
                const producerData = fs.readFileSync(global.__basedir + '/memphis_code_examples/nodejs/producer.js');
                const packageData = fs.readFileSync(global.__basedir + '/memphis_code_examples/nodejs/package.json');
                fs.writeFileSync(consumer, consumerData);
                fs.writeFileSync(producer, producerData);
                fs.writeFileSync(package, packageData);
        }
        console.log(`Example project was created.`); 

    } catch (error) {
        console.log(error);
        console.log(`Failed to create project`);
    }
    
}

const handleInitActions = (action, options) => {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });
    let language = options.lang || "nodejs"
    const allowedLang = ["nodejs"]
    if(!allowedLang.includes(language)){
        console.log(`\nThe language you selected is not supported yet\n\nCurrently supported languages: ${allowedLang}.\n\nFor more help use 'mem init -h'.\n`);
        readline.close();
    }
    else{
        console.log(`\n'mem init' creates an example project for connecting an app with Memphis.\n\nThe default language is nodejs.\nIf you want to use different language use 'mem init -l/--language <language>'.\nCurrently supported languages: ${allowedLang}.\n\nFor more help use 'mem init -h'.\n`);
        readline.question(`The project will be created in directory ${process.cwd()}\n\n***Note: Please run npm install before running the project*** \ncontinue? Y/n    ->    `, answer => {
            if (answer.toString().trim().toLowerCase() === "y" || !answer){
                writeProjectFiles(language);
            }
            else{
                console.log(`aborted.`);
            }
            readline.close();
          });
        
    }
}

exports.initMenu = (action, options) => {
    handleInitActions(action, options)
};

