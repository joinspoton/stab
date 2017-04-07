// @flow

import {
    generateUserToken,
    tryLoadUserToken,
    getFraction,
    trySaveUserToken
} from './Util';

const DEFAULT_GROUP_NUM = 1;

const getGroupKey = (testName: string) => `test_${testName}`;

class Stab {
  _config: {[string]: Array<number>};
  _groups = {};
  _userToken = tryLoadUserToken() || generateUserToken();

  constructor(config: {[string]: Array<number>}) {
    this._config = config;

    this._calculateGroups();

    trySaveUserToken(this._userToken);
  }

  _calculateGroups() {
    this._groups = {};

    Object.keys(this._config).forEach((testName: string) => {
      this._groups[getGroupKey(testName)] = this._calculateGroup(testName);
    });
  }

  _calculateGroup(testName: string): number {
    let fraction = getFraction(this._userToken + testName);
    const distribution = this._config[testName] || [1];
    const total = distribution.reduce((a, b) => a + b, 0);
    let result;

    for (var i = 0; i < distribution.length && !result; i++) {
      const part = distribution[i] / total;

      fraction -= part;

      if (fraction < 0) {
        result = i + 1;
      }
    }

    return result || DEFAULT_GROUP_NUM;
  }

  groupA(testName: string): boolean {
    return this.groupNum(testName) === 1;
  }

  groupB(testName: string): boolean {
    return this.groupNum(testName) === 2;
  }

  groupNum(testName: string): number {
    return this._groups[getGroupKey(testName)] || DEFAULT_GROUP_NUM;
  }

  getGroups(): {[string]: string} {
    return this._groups;
  }
}

export default Stab;