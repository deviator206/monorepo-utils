'use strict';
const chalk = require('chalk');
const execSync = require('child_process').execSync;
const args = require('args');
const fs = require('fs');

args
    .option('util', ' Full location of the config')
    .option('cL', ' Full location of the config')
    .option('pL', ' Full location of the package')
    .option('action', ' replace the content you expect in package json');


const flags = args.parse(process.argv);


// npm run test --  --cL ./config.json  --pL ./package.json  --action ws

// node index.js --cL ./test/config.json --pL ./test/sample.json  --action notInWS
const replaceThePackageContent = () => {
    let configFileContent;
    let packageFileContent;
    let packageAction;


    if (flags.cL && flags.pL && flags.action) {

        configFileContent = require(process.cwd() + "/" + flags.cL);
        packageFileContent = require(process.cwd() + "/" + flags.pL);

        packageAction = flags.action;

        console.log(chalk.yellow(`config location ${flags.cL}`));
        console.log(chalk.yellow(`package location ${flags.pL}`));
        console.log(chalk.yellow(`action on package ${flags.action}`));
        packageFileContent.workspaces = configFileContent[flags.action];
        fs.writeFileSync(process.cwd()+"/"+flags.pL,JSON.stringify(packageFileContent),'utf8')
        console.log(chalk.yellow(` *************   REPALCED THE CONTENT ***********`));
    } else {
        console.error(chalk.red(`no  valid input provided`));
    }
}

const initateCommands = () => {
    switch (flags.util) {
        default:
            replaceThePackageContent();
            break;

    }
}

initateCommands();