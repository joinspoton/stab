import {error} from '../Util';

test('error()', () => {
    global.console = {error: jest.fn()};

    error('boo!');

    expect(global.console.error).toBeCalled();
});