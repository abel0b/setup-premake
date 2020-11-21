const core = require("@actions/core")
const tc = require("@actions/tool-cache")

async function main() {
    if (process.platform == "win32") {
        const premake = await tc.downloadTool("https://github.com/premake/premake-core/releases/download/v5.0.0-alpha15/premake-5.0.0-alpha15-windows.zip")
        await tc.extractZip(premake, '.premake')
    }
    else if (process.platform == "darwin") {
        const premake = await tc.downloadTool("https://github.com/premake/premake-core/releases/download/v5.0.0-alpha15/premake-5.0.0-alpha15-macosx.tar.gz")
        await tc.extractTar(premake, '.premake')
    }
    else {
        const premake = await tc.downloadTool("https://github.com/premake/premake-core/releases/download/v5.0.0-alpha15/premake-5.0.0-alpha15-linux.tar.gz")
        await tc.extractTar(premake, '.premake')
    }
    core.addPath(".premake")
}

main().catch(err => {
    core.setFailed(`Failed to install premake: ${err}`);
})
