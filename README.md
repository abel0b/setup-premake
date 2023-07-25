# setup-premake
GitHub action to setup premake on Linux, Windows and MacOS.

## Usage
To setup premake, add a step to your GitHub workflow configuration :
```yaml
- uses: abel0b/setup-premake@v2.3
  with:
    version: "5.0.0-beta2"
```

Premake is added to the path so you can run any premake commands after.
For example, to compile your project using gmake2 generator, add a step :
```yaml
- name: Compile my project
  run:
    - premake5 gmake2
    - make
```

By default, premake is installed in `.premake` directory relative to the GitHub workspace.
You can optionnally change it using the `path` input.
