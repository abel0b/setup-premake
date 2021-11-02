const core = require("@actions/core")
const tc = require("@actions/tool-cache")

async function main() {
    path = "https://github.com/premake/premake-core/releases/download/"
    version = "5.0.0-beta1"
    common = path + "v" + version + "/premake-" + version
    if (process.platform == "win32") {
        const premake = await tc.downloadTool(common + "-windows.zip")
        await tc.extractZip(premake, '.premake')
    }
    else if (process.platform == "darwin") {
        const premake = await tc.downloadTool(common + "-macosx.tar.gz")
        await tc.extractTar(premake, '.premake')
    }
    else {
        const premake = await tc.downloadTool(common + "-linux.tar.gz")
        await tc.extractTar(premake, '.premake')
    }
    core.addPath(".premake")
}

main().catch(err => {
    core.setFailed(`Failed to install premake: ${err}`);
})
