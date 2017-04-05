// @flow

import {
    hash,
    generateUserToken,
    tryLoadUserToken
} from './Util';

class Stab {
    _config = {};
    _groups = {};
    _userToken = tryLoadUserToken() || generateUserToken();

    configure(config) {

    }

    _calculateGroup(testName: string): number {
        const fraction = hash(this._userToken + testName);
        const distribution = config[testName] || [1];
    }

    _getGroupFrom

    configure(config) {

    }

    groupA(testName: string): boolean {
        return Stab.groupNum(testName) === 1;
    }

    groupB(testName: string): boolean {
        return Stab.groupNum(testName) === 2;
    }

    groupNum(testName: string): number {
        return 1; // TODO
    }

    getGroups(): [testName: string]: string {
        const result = {};

        for (var testName in config) {
            if (result.hasOwnProperty(testName)) {
                result[testName] = Stab.groupNum(testName);
            }
        }
    }
}

export default Stab;