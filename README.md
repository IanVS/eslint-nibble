# eslint-nibble

Sometimes running ESLint against an existing project and fixing the hundreds or thousands of errors is biting off more than you can chew.  With this module, you can get a quick overview of your failing rules, and then helps you pick one at a time to focus on.


## Installation

```bash
$ npm install -g eslint-nibble
```

## Usage

Just give eslint-nibble a list of files or directories to run ESLint on:

```
$ eslint-nibble [space seperated dirs or files, default='.']
```

eslint-nibble will then display a rundown of the rules that are failing, using the [eslint-stats](https://github.com/ganimomer/eslint-stats) format, and will ask you to pick a rule to work on:

![eslint-stats-screenshot](docs/eslint-stats-screenshot.png)

Type in the name of the rule, and then a detailed list of the errors will be presented, using [eslint-friendly-formatter](https://github.com/royriojas/eslint-friendly-formatter).  If you are using iTerm2 or Guake, you can set them up so that your text editor opens to the right line when you click on the filename.

![eslint-friendly-formatter-screenshot](docs/eslint-friendly-formatter-screenshot.png)

## Notes

This module does not make any decisions about which ESLint rules to run.  Make sure your project has a .eslintrc file if you want something other than the default ESLint rules to execute.

Currently, this module does not work if you use alternative parsers like `babel-eslint`, or shared configs like `eslint-config-standard`.

There are likely to be other bugs, please report them as you find them.  I'd like to make this tool useful for as many people as possible.
