const core = require("@actions/core")
const tc = require("@actions/tool-cache")

async function main() {
    const path = "https://github.com/premake/premake-core/releases/download/"
    const version = core.getInput('version', { required: true })
    const common = path + "v" + version + "/premake-" + version
    if (process.platform == "win32") {
        const premake = await tc.downloadTool(common + "-windows.zip")
        core.info("win32" + common)
        await tc.extractZip(premake, '.premake')
    }
    else if (process.platform == "darwin") {
        const premake = await tc.downloadTool(common + "-macosx.tar.gz")
        core.info("darwin" + common)
        await tc.extractTar(premake, '.premake')
    }
    else {
        const premake = await tc.downloadTool(common + "-linux.tar.gz")
        core.info("linux" + common)
        await tc.extractTar(premake, '.premake')
    }
    core.addPath(".premake")
}

main().catch(err => {
    core.setFailed(`Failed to install premake: ${err}`);
})
