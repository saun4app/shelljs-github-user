'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


/**
 * promise_github_user .
 * @returns {name:'sample_user_name', email:'samplemail@sample_address.com'}.
 */
// promise_github_user().then((github_info_obj) => { console.log(github_info_obj) });

const promise_github_user = function promise_github_user() {
    const promise_obj = new Promise((resolve, reject) => {
        try {
            shelljs.exec('git config -l ', { silent: true }, function (code, stdout, stderr) {
                if (0 == code) {
                    resolve(_get_github_user(stdout));
                } else {
                    reject({ 'error': code, 'stderr': stderr });
                }
            });
        } catch (err) {
            reject({ 'error': err });
        }
    });

    return promise_obj;

    function _get_github_user(result_str) {
        var result_str_array = result_str.split('\n');
        var result_item = {};

        str_array.forEach(line_str => {
            var line_array = line_str.split('=');
            if (line_array.length > 1 && line_array[0].includes('user.')) {
                var key = line_array[0].replace('user.', '');
                result_item[key] = line_array[1];
            }
        });

        return result_item;
    }
};

exports.default = promise_github_user;