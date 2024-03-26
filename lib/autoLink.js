import { exec } from 'child_process';
import { log } from './logger.js';
import { existsSync, rmSync } from 'fs';
import { chdir } from 'process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// MAKE CHANGES TO projectConfig
// EXAMPLE CONFIG
// Will link kinsale/forms -> kinsale/dynamic-components -> aspera-pi-portal && kinsale/forms -> aspera-pi-portal
const projectConfig = {
    projectPath: "C:\\Users\\jonathan.mcdonnell\\WebstormProjects\\aspera-pi-portal",
    packageName: "",
    linksTo: [
        // {
        //     projectPath: "C:\\Users\\jonathan.mcdonnell\\WebstormProjects\\dynamic-component-framework",
        //     packageName: "@kinsale/dynamic-components",
        //     linksTo: [
        //         {
        //             projectPath: "C:\\Users\\jonathan.mcdonnell\\IdeaProjects\\kinsale-forms",
        //             packageName: "@kinsale/forms",
        //         }
        //     ]
        // },
        {
            projectPath: "C:\\Users\\jonathan.mcdonnell\\IdeaProjects\\kinsale-forms",
            packageName: "@kinsale/forms",
        }
    ]
}

const linksCreated = [];
const childProcesses = [];
let baseProjectName;

// Change cwd to this lib dir
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);
chdir(__dirname)

const setup = async (projectConfig) => {

    const projectName = projectConfig.projectPath.split("\\").pop();
    if (!baseProjectName) {
        baseProjectName = projectName;
    }

    if (linksCreated.includes(projectName)) {
        return;
    }

    if (projectConfig.linksTo?.length > 0) {
        let packageNamesToLink = "";
        const linksTo = projectConfig.linksTo;

        for (let i = 0; i < linksTo.length; i++) {
            await setup(projectConfig.linksTo[i]);
            packageNamesToLink += linksTo[i].packageName + " ";
        }

        await LinkToProject(projectConfig.projectPath, packageNamesToLink);
    }

    if (baseProjectName !== projectName) {
        await buildProject(projectConfig.projectPath);
    } else {
        log("base project, build skipped", projectConfig.projectPath);
    }

    if (baseProjectName !== projectName) {
        await createLink(projectConfig.projectPath);
        linksCreated.push(projectName);
    }

}

const LinkToProject = (projectPath, packageNamesToLink) => {
    return new Promise((resolve, reject) => {
        // TODO: Pass in path to nodevars.bat
        const process = exec(`%cd%/../bat/linkTo.bat ${projectConfig.projectPath} ${packageNamesToLink}`, function (error) {
            if (error) {
                log(`failed to link: ${error}`, projectPath, 2)
                reject();
            }
        });

        childProcesses.push(process);
        
        process.stdout.on('close', () => {
            log(`linked to ${packageNamesToLink}`, projectPath);
            resolve();
        })
    })
}

const buildProject = (projectPath) => {
    return new Promise((resolve, reject) => {
        const process = exec(`%cd%/../bat/buildProject.bat ${projectPath}`, function (error) {
            if (error) {
                log(projectPath, `failed to build: ${error}`, 2)
            }
        });

        childProcesses.push(process)

        // clean dist dir in project
        rmSync(projectPath + "\\dist", { recursive: true, force: true })

        // detect when dist folder is created, signifies end of build
        log("compiling...", projectPath);
        let isFinished = false;

        while (!isFinished) {
            let distExists = existsSync(projectPath + "\\dist")
            if (distExists) {
                log("finished, watching for changes", projectPath);
                isFinished = true;
                resolve();
            }
        }
    })
}

const createLink = (projectPath) => {
    return new Promise((resolve, reject) => {
        const process = exec(`%cd%/../bat/createLink.bat ${projectPath}`, function(error) {
            if (error) {
                log(`failed to create link: ${error}`, projectPath, 2)
            }
        });

        childProcesses.push(process)

        process.stdout.on('close', () => {
            log("link created", projectPath);
            resolve();
        })
    })
}

// Start setup
(async function() {
    log("initial setup begin");
    const startTime = Date.now();
    await setup(projectConfig);
    const timeTaken = Date.now() - startTime;
    log(`initial setup finished in ${timeTaken}ms`);
})();

// clean exit on ctrl-c
process.on('SIGINT', () => {
    process.exit();
})

// clean exit on kill
process.on('SIGTERM', () => {
    process.exit();
})

process.on('exit', () => {
    log(`Process exit detected, killing ${childProcesses.length} child process${childProcesses.length > 1 ? 'es' : ''}`)
    childProcesses.forEach(child => {
        child.kill();
    })
})
