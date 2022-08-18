# eslint-nibble Changelog

### 8.1.0
- (Feature) Add --resolve-plugins-relative-to option by @ehoogeveen-medweb in #99
- 

### 8.0.2
- (Fix) Update cli.js with latest ESLint API changes by @brunoselvacj in #97
- (Dep) Bump hosted-git-info from 2.8.5 to 2.8.9 by @dependabot in #80

### 8.0.1
- (Fix) Correctly report results of autofix (#91)

### 8.0.0
- (Breaking) Require ESLint >= 7 (to support ESLint 8) (#88)
- (Build) Remove babel compilation step (#89)

### 7.0.0
- (Breaking) Drop node < 12 (#83)
- (Feature) Adds `--fixable-only` option to only show fixable results (#82)
- (Dep) Update dependencies (#83)

### 6.1.0
- (Feature) Adds `--rulesdir` option to load custom rules at runtime (#76)
- (Build) Update versions of node to run in Travis CI.

### 6.0.0
- (Breaking) Requires node 8 or higher due to upgrades of internal dependencies. (#60)
- (Feature) Adds `--no-interactive` flag for use in CI environment (#61)
- (Feature) Adds `--format` flag to control output when using `--no-interactive` (#61)
- (Feature) Adds `--multi` flag to allow selection of multiple rules in interactive mode (#73)
- (Dep) Update dependencies, replace github fork

### 6.0.0-beta.3
Fixed build

### 6.0.0-beta.2
Note: do not use, broken build

### 6.0.0-beta.1
Note: do not use, broken build
- (Dep) Use namespaced @ianvs/eslint-stats

### 6.0.0-beta.0
- (Breaking) Requires node 8 or higher due to upgrades of internal dependencies. (#60)
- (Feature) Adds `--no-interactive` flag for use in CI environment (#61)
- (Feature) Adds `--format` flag to control output when using `--no-interactive` (#61)

### 5.1.0
- (Feature) Add `--no-warnings` option

### 5.0.0
Here are the main changes in 5.0.0, for details, see the notes for each beta

- (Breaking) Move eslint to a peer dependency (#52).  You should install eslint
yourself, and eslint-nibble will use the version that you've installed.  This should
prevent confusion about which version this tool installed, and avoid potential problems
when removing this tool and adding eslint itself.
- (Breaking) Drop support for Node < 6 (#51).
- A `--cache` option has been added to allow caching the results of linting.
This should result in _much_ faster operation, even when only running one time,
because of the way that eslint-nibble works internally.  Highly recommended to use.
- Added `--rule` flag to the command line, to limit which rules are shown in the list.

### 5.0.0-beta.4
- (Feature) Add `--rule` flag
- (Fix) Remove attempts to fix npx without local installation

### 5.0.0-beta.3
- Added some logging to try to troubleshoot npx

### 5.0.0-beta.2
- (Fix) Another attempt for remote npx

### 5.0.0-beta.1
- (Fix) Fix npx when run without local installation (#53)

### 5.0.0-beta.0
- (Breaking) Move eslint to a peer dependency (#52)
- (Breaking) Drop support for Node < 6 (#51)
- (Fix) Fix bad formatting of small error stats (#51)
- (Feature) Add cache flags (#42)
- (Dep) Upgrade dependencies (#51)

### 4.2.1
- (Dep) Use ESLint version ^4.2.0

### 4.2.0
- (Feature) Add per-rule autofixing (#35)

### 4.1.0
- (Feature) Allow arrowing through results

### 4.0.0
- (Breaking) Update to ESLint ^4.1.0

### 3.1.2
- (Fix) Fix error about missing function

### 3.1.1
- (Dep) Upgrade dependencies (#29)

### 3.1.0
- (Enhance) Allow a custom eslint config file to be specified.

### 3.0.0
- (Breaking) Update to ESLint ^3.0.0
- (Dep) Bump versions of inquirer & eslint-friendly-formatter

### 2.1.0
- (Enhance)  Add `--ext` option
- (Build) Drop node `0.10` & `0.12` from CI, and add `4`, `5`, & `6`

### 2.0.0
- (Breaking) Update to ESLint ^2.0.0

### 1.0.1
- (Build) Add Travis CI
- (Fix) Prevent formatter resolution error when dependencies are flattened
- (Dep) Bump inquirer

### 1.0.0
- (Breaking) Update to ESLint 1.0.0

### 0.3.0
- (Enhance) Improve fatal error handling
- (Enhance) Add tests

### 0.2.0
- (Breaking) Use optionator for parsing cli arguments.  Stop defaulting to `cwd`

### 0.1.1
- (Fix) Remove require for babel polyfill

### 0.1.0
- (Fix) Update eslint-stats repo to avoid out-of-date deps notice

### 0.0.6
- (Fix) Check for warnings as well as errors, before giving the all clear

### 0.0.5
- (Fix) Import chalk correctly

### 0.0.4
- (Enhance) Eslint-stats now shows warnings as well as errors
- (Enhance) Added a summary to the report using eslint-summary


### 0.0.3
- (Docs) Update usage instructions to avoid global installation
- (Fix)  Check for first message existence before checking for fatal


### 0.0.2
- (Fix) Use Babel to precompile ES6 down to ES5 for npm


### 0.0.1
- (Enhance) Initial Release
