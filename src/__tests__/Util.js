import {error} from '../Util';

declare var jest: any;

test('error()', () => {
  global.console = {error: jest.fn()};

  error('boo!');

  expect(global.console.error).toBeCalled();
});