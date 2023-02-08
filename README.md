# genelic 

![](https://user-images.githubusercontent.com/64204135/190658005-2dcefd5a-1af3-4d4e-9ed8-8872b44d67a2.png)

`genelic` is a command line tool to generate a license file for your project easily.

You can choose from all the licenses in [choosealicense.com](https://choosealicense.com/appendix/).

## Install

### Deno (Recommended)

```shell
deno install --allow-read --allow-write --allow-env -n genelic https://raw.githubusercontent.com/fus1ondev/genelic/deno/mod.ts
```

### Homebrew

```shell
brew install fus1ondev/tap/genelic
```

## Usage

```shell
$ genelic -h

  Usage:   genelic [id]
  Version: 1.0.0       

  Description:

    Generate a license file for your project.

  Options:

    -h, --help               - Show this help.                                                
    -V, --version            - Show the version number for this program.                      
    -o, --output   <output>  - Output file name.                          (Default: "LICENSE")
    -f, --force              - Overwrite existing license file.                               
    -i, --info               - Log license info.                                              
    -p, --parents            - Create parent directories as needed.                           

  Commands:

    info  [id]  - Show license info.
    list        - List all licenses.
```

The full list of license identifiers can be found on the [`github/choosealicense.com`](https://github.com/github/choosealicense.com/tree/gh-pages/_licenses) repository.

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