const {  readdirSync, existsSync ,writeFileSync} = require('fs')
const chalk = require('chalk');

// -- --command ls-pkg --rootDir ./abc
const skipNodeModulesPath = "node_modules/"

const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => source + "/" + dirent.name);

const checkForExclusionList = (singleDirec) => {
    let returnedBool = true;
    
    exclusionList.forEach(singlePath => {
        
        if(singleDirec.indexOf(singlePath) !== -1) {
            returnedBool = false;
        }
    })
    return returnedBool;
}
// get all nested directories
const getAllDirec = (packageList = [], finalList, callBack, packageResultList = []) => {
    let localList = [];
    packageList.forEach((singleDirec) => {
        if (singleDirec.indexOf(skipNodeModulesPath) == -1 && checkForExclusionList(singleDirec)) {
            // not considering monorepos (nested ones)
            if (!existsSync(singleDirec + "/package.json")) {
                let localDirs = getDirectories(singleDirec);
                localList = localList.concat(localDirs);
            } else {
                
                packageResultList.push(singleDirec);
            }
        }

    });
    if (localList.length > 0) {
        finalList = finalList.concat(localList);
        getAllDirec(localList, finalList, callBack, packageResultList)
    } else {
        callBack(packageResultList);
    }
}


let exclusionList = [];
const getAllNestedPackages = (source, options) => {
    if (!source) {
        console.error(chalk.red(`no  rootDir was provided`));
        return;
    }
    if (options.cL) {
        let packageFileContent = require(process.cwd() + "/" + options.cL);
        exclusionList = exclusionList.concat(packageFileContent.packagesInWS);
        exclusionList = exclusionList.concat(packageFileContent.specialPackages);
    }
    let finalList = [];
    const directories = getDirectories(source);
    if (directories.length > 0) {
        finalList = finalList.concat(directories);
        getAllDirec(directories, finalList, (resp) => {
            if(options && options.cmd && options.cmd === "replace-packages-not-in-ws" && options.pL) {
                
                let packageFileContent = require(process.cwd() + "/" + options.pL);
                packageFileContent.workspaces = resp;
                writeFileSync(process.cwd()+"/"+options.pL,JSON.stringify(packageFileContent, null, 4))
            }
            console.log("Final Packages Not In WS ", resp)
        });
    }
}
//npm run test -- --cmd replace-pkgs-not-in-ws --rootDir ./node_modules  --pL ./package.json
//npm run test -- --cmd ls-pkg --rootDir ./node_modules 
module.exports = getAllNestedPackages;


