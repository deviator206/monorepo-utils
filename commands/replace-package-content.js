const fs = require('fs');
const chalk = require('chalk');

// npm run test --  --cL ./config.json  --pL ./package.json  --action ws
// node index.js --cL ./test/config.json --pL ./test/sample.json  --action notInWS
const replaceThePackageContent = (cL, pL, action) => {
    let configFileContent;
    let packageFileContent;
    let packageAction;
    if (cL && pL && action) {
        configFileContent = require(process.cwd() + "/" + cL);
        packageFileContent = require(process.cwd() + "/" + pL);

        packageAction = action;

        console.log(chalk.yellow(`config location ${cL}`));
        console.log(chalk.yellow(`package location ${pL}`));
        console.log(chalk.yellow(`action on package ${action}`));
        packageFileContent.workspaces = configFileContent[action];
        fs.writeFileSync(process.cwd()+"/"+pL,JSON.stringify(packageFileContent, null, 4))
        console.log(chalk.yellow(` *************   REPALCED THE CONTENT ***********`));
    } else {
        console.error(chalk.red(`no  valid input provided`));
    }
}

module.exports = replaceThePackageContent;