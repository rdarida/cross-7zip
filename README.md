<img src="https://repository-images.githubusercontent.com/919105664/7efca389-6d8f-412f-853e-afffe36d42a8" alt="Cover" />

<p align="center">
  <a href="https://npmjs.com/package/cross-7zip/" target="_blank" alt="NPM">
    <img src="https://img.shields.io/npm/v/cross-7zip.svg" alt="NPM Badge" />
  </a>

  <a href="https://github.com/rdarida/cross-7zip" target="_blank" alt="GitHub Repository">
    <img src="https://img.shields.io/badge/-repository-222222?style=flat&logo=github" alt="GitHub Repository Badge" />
  </a>

  <a href="https://github.com/rdarida/cross-7zip/actions/workflows/publish.yml" target="_blank" alt="GitHub Actions">
    <img src="https://github.com/rdarida/cross-7zip/actions/workflows/publish.yml/badge.svg" alt="Publish Badge" />
  </a>

  <a href="https://sonarcloud.io/dashboard?id=rdarida_cross-7zip" target="_blank" alt="SonarCloud">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=rdarida_cross-7zip&metric=coverage" alt="Coverage Badge" />
  </a>

  <img src="https://img.shields.io/librariesio/release/npm/cross-7zip" alt="Dependencies Badge" />
</p>
<hr>

# cross-7zip
Cross-platform 7-Zip for Node.js

## Installation

Install **cross-7zip** via [npm](https://www.npmjs.com/package/cross-7zip).

```sh
npm i cross-7zip
```

or

```sh
npm i -g cross-7zip
```

## API

### `SevenZip`
A wrapper class for creating 7-Zip archives using the command-line tool.
[Example](https://rdarida.github.io/cross-7zip/classes/SevenZip.html#example)

### `SevenUnzip`
A wrapper class for extracting files from a 7-Zip archive using the command-line tool.
[Example](https://rdarida.github.io/cross-7zip/classes/SevenUnzip.html#example)

### `sevenZip`
Compresses multiple files into a zipped file **asynchronously**.
[Example](https://rdarida.github.io/cross-7zip/functions/sevenZip.html#example)

### `sevenUnzip`
Extracts files from a specified zipped file **asynchronously**.
[Example](https://rdarida.github.io/cross-7zip/functions/sevenUnzip.html#example)

### `sevenZipSync`
Compresses multiple files into a zipped file **synchronously**.
[Example](https://rdarida.github.io/cross-7zip/functions/sevenZipSync.html#example)

### `sevenUnzipSync`
Extracts files from a specified zipped file **synchronously**.
[Example](https://rdarida.github.io/cross-7zip/functions/sevenUnzipSync.html#example)

## CLI Tool Usage

This package also includes a CLI tool for quick and simple operations with 7-Zip.
Below are some examples of how to use it:

### Installation

Make sure the package is installed globally to access the CLI tool:

```bash
npm install -g cross-7zip
```

### Commands

**Create an Archive**

To compress files or directories into an archive, use the `zip` command:

```bash
seven zip <output_archive> <file_paths...>
```

**Extract Files from an Archive**

To extract files from an archive, use the `unzip` command:

```bash
seven unzip <input_archive> [destination]
```

### Examples

**Create `example.7z` from `file1.txt` `folder`**

```bash
seven zip example.7z file1.txt folder
```

**Extract Files from the `example.7z` into the `ouput` folder**

```bash
seven unzip example.7z ouput
```

## Supported Platforms and Architectures

This library relies on the 7-Zip executables, which support the following
platforms and architectures:

- **Windows**: `arm64`, `x86`, `x64`
- **macOS**: `arm64`, `x86, x64`
- **Linux**: `arm`, `arm64`, `x86`, `x64`

For details, click [here](https://github.com/rdarida/cross-7zip/blob/main/7zip/README.md).

<hr>

<details>
  <summary>
    <strong>Resources<strong>
  </summary>

- [Documentation](https://rdarida.github.io/cross-7zip/)
- [7-Zip](https://www.7-zip.org/)
- [execFileSync](https://nodejs.org/api/child_process.html#child_process_child_process_execfilesync_file_args_options)
- **Windows**
  * [Compress-Archive](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.archive/compress-archive?view=powershell-7.4&viewFallbackFrom=powershell-7.1)
  * [Expand-Archive](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.archive/expand-archive?view=powershell-7.4&viewFallbackFrom=powershell-7.1)
- **Unix**
  * [zip](https://linux.die.net/man/1/zip)
  * [unzip](https://linux.die.net/man/1/unzip)
</details>
<hr>

<p align="center">
  <a href="LICENSE" target="_blank" alt="License">
    <img src="https://img.shields.io/badge/license-MIT-green" alt="License Badge" />
  </a>
</p>
