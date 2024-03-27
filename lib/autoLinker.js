import { exec } from 'child_process';
import { log } from './logger.js';
import { existsSync, rmSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { chdir } from 'process';

const projectConfig = JSON.parse(process.argv[2]);
const linksCreated = [];
let baseProjectName;

// TODO: is this still needed?
// Change cwd to this lib dir
const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename);
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
        const process = exec(`%cd%/bat/linkTo.bat ${projectConfig.projectPath} ${packageNamesToLink}`, function (error) {
            if (error) {
                log(`failed to link: ${error}`, projectPath, 2)
                reject();
            }
        });
        
        process.stdout.on('close', () => {
            log(`linked to ${packageNamesToLink}`, projectPath);
            resolve();
        })
    })
}

const buildProject = (projectPath) => {
    return new Promise((resolve, reject) => {
        const process = exec(`%cd%/bat/buildProject.bat ${projectPath}`, function (error) {
            if (error) {
                log(projectPath, `failed to build: ${error}`, 2)
            }
        });

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
        const process = exec(`%cd%/bat/createLink.bat ${projectPath}`, function(error) {
            if (error) {
                log(`failed to create link: ${error}`, projectPath, 2)
            }
        });

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
