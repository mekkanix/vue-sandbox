# <center>VueSandbox</center>

A tool for live-testing Vue.js components in a sandbox environment.

## Introduction

VueSandbox is a node-based utility that allows you to live-test and play with your Vue.js components.  
It is designed to generate live-testing forms by parsing components' props directly from your source files.

## Compatibility

### Operating System

- **Debian/Ubuntu**

*Windows & Mac supports will be added in a next release.*

### Browser

This tool works with main modern web browsers. You can find below the minimum required version
for each browser.

**Desktop**

| Chrome | Firefox | Safari | IE         | Edge | Opera |
|:------:|:-------:|:------:|:----------:|:----:|:-----:|
| 18     | 14      | 6.1    | No support | 12   | 15    |

**Smartphone/Tablet**

Not usable on mobile devices for the moment.

### Components

Your components can only use supported formats & languages (described below) in order to be correctly parsed.

:warning: Nested child components are not supported for the moment.

#### Format

This tool only works with [Single-File Components](https://vuejs.org/v2/guide/single-file-components.html) for the moment.  

*A support to other definition formats will be added in a next release.*

#### Languages

Only a few code languages are supported for the moment.  
You can find all of these language-specific formats & preprocessors below.

| HTML      | CSS          | JavaScript |
|:---------:|:------------:|:----------:|
| - vanilla | - vanilla    | - vanilla  |
|           | - SASS, SCSS |            |

## Installation

Download and run the remote installation script from the VueSandbox's website:

```sh
curl -sS https://mekkanix.github.io/vue-sandbox/install.sh | sh
```

*You'll be asked for your password during installation because some commands need root privileges to install packages through APT.*

This script will check for & install required engines on your system (git, nodejs, npm).

## Usage

1. Once installed, you'll just need to run the following command in the VueSandbox's root directory to.

```sh
cd /path/to/vue-sandbox/
yarn vstool
```

2. Place the `.vue` component files you want to test in the `public/` directory, that is constantly watched by VueSandbox when running.
   Any update to it (e.g. files addition, code updated...) will automatically trigger a new parsing operation.  
  *Note: You can use nested directories to organize your components.*

3. Open your favorite browser and go to [`http://localhost:9000`](http://localhost:9000) to access to the tool GUI.  
   You see and navigate through all of your components in the homepage.

## Configuration

N/A

## Licensing

Released under the [MIT](https://opensource.org/licenses/MIT) license.

## Contribute

Soon...
