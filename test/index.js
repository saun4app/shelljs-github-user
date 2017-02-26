import github_user from '../src'

describe('promise_github_user', () => {
    it('returns github_obj.name', () => {
        github_user().then((github_obj) => {
            const _result = typeof(github_obj.name) === 'string';
            expect(_result).toBe(true)
        });
    })
});
