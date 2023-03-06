# genelic 

> ⚖️ Generate a license file for your project easily

![](./assets/screenshot.png)

`genelic` is a command line tool to generate a license file for your project easily.

You can choose from all the licenses in [choosealicense.com](https://choosealicense.com/appendix/).

## Install

### Deno (Recommended)

```shell
deno install --allow-read --allow-write --allow-env --allow-sys -n genelic https://raw.githubusercontent.com/fus1ondev/genelic/main/mod.ts
```

### Homebrew

```shell
brew install fus1ondev/tap/genelic
```

### npm

> **Warning**
> Currently v1 cannot be exported to npm, so the version of what can be installed from npm is out of date.

```shell
npm install -g genelic
```

## Features

### Automatic selection of the licence in use

If a license field is found in the following files, the license will be automatically selected.

- `package.json`
- `Cargo.toml`
- `pyproject.toml`

### Autocompletion of fields

Most licences have fields that require detailed information to be entered.

It asks for these values when the file is generated, but the following sources are used to automatically fill in the fields.

- local or global git config
- `package.json`
- `Cargo.toml`
- `pyproject.toml`

## Usage

```shell
$ genelic -h

  Usage:   genelic [id]
  Version: 1.2.0

  Description:

    Generate a license file for your project.

  Options:

    -h, --help               - Show this help.
    -V, --version            - Show the version number for this program.
    -t, --title    <title>   - Use title instead of id.
    -o, --output   <output>  - Output file name.                          (Default: "LICENSE")
    -f, --force              - Overwrite existing license file.
    -p, --parents            - Create parent directories as needed.

  Commands:

    info     [id]  - Show license info.
    preview  [id]  - Preview license.
    list           - List all licenses.
```

The full list of license identifiers can be found on the [`github/choosealicense.com`](https://github.com/github/choosealicense.com/tree/gh-pages/_licenses) repository.

## Advanced Usage

### Use with fzf

By using the [fzf](https://github.com/junegunn/fzf) command, you can select a license with a graphical fuzzy finder.

The width of the `info` and `preview` commands is automatically adjusted to the width of the fzf preview window.

#### Example

```sh
genelic list -i | fzf --preview "genelic info {} ; genelic preview {}" --bind "enter:become(genelic {})"
```

If you want to use license names instead of IDs as titles of the list:

```sh
genelic list -t | fzf --preview "genelic info -t {} ; genelic preview -t {}" --bind "enter:become(genelic -t {})"
```

## Development

```sh
git clone --recursive https://github.com/fus1ondev/genelic

cd genelic

deno task run [...]
```

### Update license data

```sh
deno task generate-data
```

## License

MIT