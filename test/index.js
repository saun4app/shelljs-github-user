import github_user from '../src/index';

describe('promise_github_user', () => {
    it('returns github_obj.name', () => {
        github_user().then((github_obj) => {
            expect(_is_valid(github_obj)).toBe(true);
        });

        function _is_valid(github_obj) {
            let valid_result = true;
            valid_result = !(typeof (github_obj.name) === 'string') ? false : valid_result;
            valid_result = !((github_obj.name).length >= 2) ? false : valid_result;

            return valid_result;
        }
    });
});
