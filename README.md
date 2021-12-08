# <center>VueSandbox</center>

A tool for live-testing Vue.js components in a sandbox environment.

## Introduction

This tool is (currently) provided as a local web-based utility that you can use to live-test your Vue.js components.
By simply placing your components in a dedicated folder, VueSandbox is able to detect, parse (including styles) & fully render your components in a dedicated area, by allowing you to update its props on-the-fly.

## Compatibility

Here are the minimum browser versions required for this package to work.

### Browser

**Desktop**

| Chrome | Firefox | Safari | IE         | Edge | Opera |
|:------:|:-------:|:------:|:----------:|:----:|:-----:|
| 18     | 14      | 6.1    | No support | 12   | 15    |

**Smartphone/Tablet**

N/A

### Components

Your components can only use supported formats & languages in order to be able to be tested with this utility.

#### Format

This tool only works with [Single-File Components](https://vuejs.org/v2/guide/single-file-components.html) for the moment.  
A support to other definition formats will be added in a next release.

#### Languages

Only some languages are supported by this tool for the moment.  
You can find all of these language-specific formats & preprocessors below.

**HTML** - vanilla

**CSS** - SASS (SASS, SCSS)  
*ℹ️ Support to LESS and Stylus will be added soon.*

**JS** - vanilla

:warning: Nested child components are not supported for the moment.

## Installation

As this tool is only available through a complete local tool, the prefered way for installing is to simply `git clone` the project wherever you want on your system.

Once downloaded, you'll need to install tool's dependencies by running one of the following commands in the project root: `npm install` or `yarn install`

<!-- You can use either `npm` or `yarn` to install this tool locally.

```
npm i vue-ctx-injector --save
```

```
yarn add vue-ctx-injector
```

Once downloaded, you'll need to install tool's dependencies by running one of the following commands: `npm install` or `yarn install` -->

## Usage

1. To start the program, run the local tool by using either `npm run serve` or `yarn serve`

2. Place the `.vue` component files you want to test in the `public/` directory. This folder is constantly watched by VueSandbox when running, and any update to it (e.g. addition, deletion, code updated...) will trigger a new parsing operation.  
  *Note: Nested directories are allowed in this folder.*

3. Open your favorite browser and go to [`http://localhost:9000`](http://localhost:9000) to access to the tool GUI.  
  You see and navigate through all of your components in the homepage.

## Configuration

N/A

## Licensing

Released under the [MIT](https://opensource.org/licenses/MIT) license.

## Contribute

Soon...
