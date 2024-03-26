const log = (message, projectPath = "", level) => {
    const projectName = projectPath.split("\\").pop();
    const timestamp = new Date().toLocaleTimeString();
    let logLevel;

    switch (level) {
        case 1:
            logLevel = "WARN"
            break;
        case 2:
            logLevel = "ERROR"
            break;
        default:
            logLevel = "INFO"
    }

    console.log(`[${timestamp}] - ${logLevel}: [autoLinker][${projectName}] ${message}`);
}

export { log }
