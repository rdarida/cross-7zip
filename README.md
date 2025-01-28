<img src="https://repository-images.githubusercontent.com/919105664/7efca389-6d8f-412f-853e-afffe36d42a8">
<p align="center">
  <a href="https://npmjs.com/package/cross-7zip/" target="_blank">
    <img src="https://img.shields.io/npm/v/cross-7zip.svg" />
  </a>

  <a href="https://rdarida.github.io/cross-7zip/" target="_blank">
    <img src="https://img.shields.io/badge/website-blue?style=flat" />
  </a>

  <a href="https://github.com/rdarida/cross-7zip" target="_blank">
    <img src="https://img.shields.io/badge/-repository-222222?style=flat&logo=github" />
  </a>

  <a href="https://github.com/rdarida/cross-7zip/actions/workflows/release.yml" target="_blank" alt="GitHub Actions">
    <img src="https://github.com/rdarida/cross-7zip/actions/workflows/release.yml/badge.svg" alt="Release" />
  </a>

  <a href="https://sonarcloud.io/dashboard?id=rdarida_cross-7zip" target="_blank" alt="SonarCloud">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=rdarida_cross-7zip&metric=coverage" alt="coverage" />
  </a>

  <img src="https://img.shields.io/librariesio/release/npm/cross-7zip" />
</p>
<hr>

## Installation

### Package manager

Using npm:
```bash
npm install cross-7zip
```

Using yarn:
```bash
yarn add cross-7zip
```

Using pnpm:
```bash
pnpm add cross-7zip
```

## API

### `sevenUnzip`
Extracts files from a specified zipped file **asynchronously**.
[Example](https://rdarida.github.io/cross-7zip/functions/sevenUnzip.html#example)

### `sevenUnzipSync`
Extracts files from a specified zipped file **synchronously**.
[Example](https://rdarida.github.io/cross-7zip/functions/sevenUnzipSync.html#example)

### `sevenZip`
Compresses multiple files into a zipped file **asynchronously**.
[Example](https://rdarida.github.io/cross-7zip/functions/sevenZip.html#example)

### `sevenZipSync`
Compresses multiple files into a zipped file **synchronously**.
[Example](https://rdarida.github.io/cross-7zip/functions/sevenZipSync.html#example)

## CLI Tool Usage

This package also includes a CLI tool for quick and simple operations with 7-Zip. Below are some examples of how to use it:

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

## Documentation

See documentation [here](https://rdarida.github.io/cross-7zip/).

## Supported Platforms and Architectures

This library relies on the 7-Zip executables, which support the following
platforms and architectures:

- **Windows**: `arm64`, `x86`, `x64`
- **macOS**: `arm64`, `x86, x64`
- **Linux**: `arm`, `arm64`, `x86`, `x64`

<hr>

<details>
  <summary>
    <strong>Resources<strong>
  </summary>

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
  <a href="LICENSE" target="_blank">
    <img src="https://img.shields.io/badge/license-MIT-green" />
  </a>
</p>
