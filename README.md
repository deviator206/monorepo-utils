# monorepo-utils
Utility providing various options for a monorepo

During migration to Monorepo , or even after migrating we will require couple of utilities. Below are the list of utilities 

## Config File Structure
Config File to be supplied, should be like this
<pre>
{
    "specialPackages":[
        "escape-string-regexp"
    ],
    "packagesInWS":[
        "camelcase"
    ],
    "excludedPackages":[
        "abc"
    ],
    "appliedRules":[
        "has-prefix"
    ]
}
</pre>

# How to Use ?
Install the package
<pre>
 npm install monorepo-utils --save-dev
</pre>

Add it in script
<pre>
"scripts": {
        "helper": "monorepo-utils"
    },
</pre>

Run the commands
<pre>
npm run helper -- --cmd ls-pkg --rootDir ./directoryname
</pre>

# Replace workspace with packages not in Config

Consider a scenario wherein there are few packages in workspace and few are not, and we want to process process it(build & release it) we can use below command
<pre>
 --cmd replace-pkgs-not-in-ws --rootDir ./nodeDirec  
 --pL ./package.json 
 --cL ./config.json
</pre>


# Print List of Modules in the directories
<pre>
 --cmd ls-pkg
 --rootDir ./nodeDirec  
</pre>

