# eslint-nibble

[![npm][npm-badge]][npm-badge-url]
[![dependency status][versioneye-badge]][versioneye-badge-url]

Sometimes running ESLint against an existing project and fixing the hundreds or thousands of errors is biting off more than you can chew.  This will give a quick overview of your failing rules, and then show the detailed error reports for one rule at a time.


## Installation

```bash
$ npm install eslint-nibble
```

## Usage

Add something like the following to your `package.json` file:

```json
scripts: {
  "nibble": "eslint-nibble lib/ tests/ index.js"
}
```

This will run eslint against javascript files in the `lib/` and `tests/` directories, as well as `index.js`.  If you don't provide any arguments, all javascript files in your project will be linted.

Then, to run eslint-nibble, you can use:

```bash
$ npm run nibble
```

Eslint-nibble will then display a rundown of the rules that are failing, using the [eslint-stats](https://github.com/ganimomer/eslint-stats) format, and will ask you to pick a rule to work on:

![eslint-stats-screenshot](docs/eslint-stats-screenshot.png)

Type in the name of the rule, and then a detailed list of the errors will be presented, using [eslint-friendly-formatter](https://github.com/royriojas/eslint-friendly-formatter).  If you are using iTerm2 or Guake, you can set them up so that your text editor opens to the right line when you click on the filename.

![eslint-friendly-formatter-screenshot](docs/eslint-friendly-formatter-screenshot.png)

## Notes

This module does not make any decisions about which ESLint rules to run.  Make sure your project has a .eslintrc file if you want something other than the default ESLint rules to execute.

[npm-badge]: https://img.shields.io/npm/v/eslint-nibble.svg
[npm-badge-url]: https://www.npmjs.com/package/eslint-nibble
[versioneye-badge]: https://www.versioneye.com/user/projects/558f4ff7316338001e000259/badge.svg?style=flat
[versioneye-badge-url]: https://www.versioneye.com/user/projects/558f4ff7316338001e000259#dialog_dependency_badge
