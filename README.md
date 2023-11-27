
# Node CBAR Currency Converter

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/node-%3E%3D%2012.0.0-brightgreen.svg)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-v8.0.0-orange.svg)](https://www.npmjs.com/package/node-cbar)

## Description

A simple Node.js module for converting currencies using [Cbar.az](https://cbar.az) data.

## Installation

```bash
npm install node-cbar
```

## Usage

```javascript
const { CBAR, CurrencyTypes } = require('node-cbar');

const cl = new CBAR();
cl.convert({ amount: 2, currencyType:CurrencyTypes.USD}).then((result) => {
    console.log(result);
});
```

## Options

- `logErrors`: Enable logging errors (default: `false`)
- `baseURL`: Base URL for CBAR data (default: `https://www.cbar.az/currencies/`)
- `date`: Date String for URL

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details.
