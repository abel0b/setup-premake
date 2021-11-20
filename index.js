const core = require("@actions/core")
const tc = require("@actions/tool-cache")

async function main() {
    const version = core.getInput('version', { required: true })
    const pathPrefix = "https://github.com/premake/premake-core/releases/download/" + "v" + version + "/premake-" + version
    if (process.platform == "win32") {
        const premake = await tc.downloadTool(pathPrefix + "-windows.zip")
        await tc.extractZip(premake, '.premake')
    }
    else if (process.platform == "darwin") {
        const premake = await tc.downloadTool(pathPrefix + "-macosx.tar.gz")
        await tc.extractTar(premake, '.premake')
    }
    else {
        const premake = await tc.downloadTool(pathPrefix + "-linux.tar.gz")
        await tc.extractTar(premake, '.premake')
    }
    core.addPath(".premake")
}

main().catch(err => {
    core.setFailed(`Failed to install premake: ${err}`);
})
