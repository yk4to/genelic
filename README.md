# genelic 

![](https://user-images.githubusercontent.com/64204135/190658005-2dcefd5a-1af3-4d4e-9ed8-8872b44d67a2.png)

`genelic` is a command line tool to generate a license file for your project easily.

You can choose from all the licenses in [choosealicense.com](https://choosealicense.com/appendix/).

## Install

### Homebrew

```shell
brew install Fus1onDev/tap/genelic
```

### npm

```shell
npm install genelic -g
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
```

The full list of license identifiers can be found on the [`github/choosealicense.com`](https://github.com/github/choosealicense.com/tree/gh-pages/_licenses) repository.

## Build Locally

```sh
git clone --recursive https://github.com/fus1ondev/genelic

cd genelic

deno task build
```

## License

MIT