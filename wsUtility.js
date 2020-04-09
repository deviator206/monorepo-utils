'use strict';
const args = require('args');
const replaceThePackageContent = require('./commands/replace-package-content');
const getAllNestedPackages = require("./commands/ls-packages");


args
    .option('cmd', ' Which Command Action: replace-pkgs-not-in-ws | ls-pkg | replace-from-config')
    .option('cL', ' Full location of the config')
    .option('pL', ' Full location of the package')
    .option('action', ' replace which module from config file to package json')
    .option('rootDir', ' Root directory path');

const flags = args.parse(process.argv);

const initateCommands = () => {
    console.log(flags.cmd)
    switch (flags.cmd) {
        case 'replace-pkgs-not-in-ws':
            getAllNestedPackages(flags.rootDir, 
                {
                    cmd:"replace-packages-not-in-ws",
                    pL: flags.pL,
                    cL:flags.cL
                });
            break;
        case 'ls-pkg':
            getAllNestedPackages(flags.rootDir);
            break;    
        case 'replace-from-config':
            replaceThePackageContent(flags.cL, flags.pL, flags.action);
        default:
            replaceThePackageContent(flags.cL, flags.pL, flags.action);
            break;

    }
}

initateCommands();