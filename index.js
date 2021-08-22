const core = require("@actions/core")
const tc = require("@actions/tool-cache")

async function main() {
    const path = "https://github.com/premake/premake-core/releases/download/"
    const version = core.getInput('version', { required: true })
    const common = path + "v" + version + "/premake-" + version
    if (process.platform == "win32") {
        core.setFailed("win32" + common)
        const premake = await tc.downloadTool(common + "-windows.zip")
        await tc.extractZip(premake, '.premake')
    }
    else if (process.platform == "darwin") {
        core.setFailed("darwin" + common)
        const premake = await tc.downloadTool(common + "-macosx.tar.gz")
        await tc.extractTar(premake, '.premake')
    }
    else {
        core.setFailed("linux" + common)
        const premake = await tc.downloadTool(common + "-linux.tar.gz")
        await tc.extractTar(premake, '.premake')
    }
    core.addPath(".premake")
}

main().catch(err => {
    core.setFailed(`Failed to install premake: ${err}`);
})
