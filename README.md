# shelljs-github-user

[![Generated with nod](https://img.shields.io/badge/generator-nod-2196F3.svg?style=flat-square)](https://github.com/diegohaz/nod) [![NPM version](https://img.shields.io/npm/v/shelljs-github-user.svg?style=flat-square)](https://npmjs.org/package/shelljs-github-user) [![Build Status](https://img.shields.io/travis/saun4app/shelljs-github-user/master.svg?style=flat-square)](https://travis-ci.org/saun4app/shelljs-github-user) [![Coverage Status](https://img.shields.io/codecov/c/github/saun4app/shelljs-github-user/master.svg?style=flat-square)](https://codecov.io/gh/saun4app/shelljs-github-user/branch/master)

`shelljs-github-user` uses `shelljs` and `git config` to retrieve user git properties from the local machine.

## Install

```
$ npm install --save shelljs-github-user
```

## Usage

```javascript
import github_user from 'shelljs-github-user';

github_user().then((github_obj) => {
  console.log(github_obj);
  // {name:'sample_user_name', email:'samplemail@sample_address.com'}
});
```

## Yeoman Generator user-interactions Use-case.

Adding `gitInfo` to `Yeoman Generator` [**user-interactions**](http://yeoman.io/authoring/user-interactions.html) example.


```javascript

const Generator = require('yeoman-generator');
const github_user = require('shelljs-github-user');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }

    prompting() {
        let self = this;
        var done = this.async();

        github_user().then((github_obj) => {
            self.gitInfo = github_obj;
            _prompt_project_info();
        }).catch((reason) => {
            self.log(reason);
            _prompt_project_info(); // skip gitInfo
        });

        function _prompt_project_info() {
            self.prompt([{
                type: 'input',
                name: 'name',
                message: 'Your project name',
                default: this.appname // Default to current folder name
            }, {
                type: 'confirm',
                name: 'cool',
                message: 'Would you like to enable the Cool feature?'
            }]).then((answers) => {
                self.log('app name', answers.name);
                self.log('cool feature', answers.cool);
                done();
            });
        }
    }
}
```

## Background
[@robwierzbowski](https://github.com/robwierzbowski) offers the following approach in [issues/190](https://github.com/yeoman/generator/issues/190):

```javascript
this.gitInfo = {
   name: shelljs.exec('git config user.name', {silent: true}).output.replace(/\n/g, ''),
   email: shelljs.exec('git config user.email', {silent: true}).output.replace(/\n/g, ''),
   github: shelljs.exec('git config github.user', {silent: true}).output.replace(/\n/g, ''),
};
```
This approach works for [**shelljs**](https://www.npmjs.com/package/shelljs) prior to version `"shelljs": "^0.6"`. `shelljs-github-user` intends to provide a solution for `"shelljs": "^0.7.6"`.


## Thanks
`shelljs-github-user` is created using [**nod**](https://github.com/diegohaz/nod).

## License

MIT © [saun4app](https://github.com/saun4app)
