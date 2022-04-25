const isValidToken = require("../utils/validateToken")
const login = require("../controllers/login")
const fs = require('fs');

const writeIndexFile = (language) => {
    global.__basedir = __dirname;
    let fileName = 'index.';
    try {
        let type;
        switch (language){
            case "nodejs":
                type = 'js'
                fileName = 'index.' + type;
                const data = fs.readFileSync(global.__basedir + '/memphis_code_examples/nodejs/index.js')
                fs.writeFileSync(fileName, data);
        }
        console.log(`${fileName} was created.`); 

    } catch (error) {
        console.log(error);
        console.log(`Failed to write file ${fileName}`);
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
        readline.question(`The project will be created in directory ${process.cwd()}\n continue? Y/n    ->    `, answer => {
            if (answer.toString().trim().toLowerCase() === "y" || !answer){
                writeIndexFile(language);
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

