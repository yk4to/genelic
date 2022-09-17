# genelic 

![](https://user-images.githubusercontent.com/64204135/190658005-2dcefd5a-1af3-4d4e-9ed8-8872b44d67a2.png)

`genelic` is a simple command line tool to generate a license file for your project easily.

You can choose from all the licenses in [SPDX License List](https://spdx.org/licenses/).

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

### Basic Usage

```shell
genelic <id>
```

The full list of license identifiers can be found on the [SPDX website](https://spdx.org/licenses/).

### Commands

```shell
genelic select
```

You can choose from all licenses like this:

![](https://user-images.githubusercontent.com/64204135/190841310-1048be61-791f-4ad0-b7d9-2750a4924137.png)


### Options

#### `-f`,`--force`

Force file overwrite

#### `-m`,`--markdown`

Create a Markdown file

## License

MIT