// @flow

import {
    generateUserToken,
    tryLoadUserToken,
    getFraction
} from './Util';

class Stab {
    _config = {};
    _groups = {};
    _userToken = tryLoadUserToken() || generateUserToken();

    configure(config) {
        this._config = config;

        this._calculateGroups();
    }

    _calculateGroups() {
        this._groups = {};

        Object.keys(this._config).forEach((testName: string) => {
            this._groups[testName] = this._calculateGroup(testName);
        });
    }

    _calculateGroup(testName: string): number {
        let fraction = getFraction(this._userToken + testName);
        const distribution = this._config[testName] || [1];
        const total = distribution.reduce((a, b) => a + b, 0);

        for (var i = 0; i < distribution.length; i++) {
            const part = distribution[i] / total;

            fraction -= part;

            if (fraction <= 0) return i;
        }

        throw new Error();
    }

    groupA(testName: string): boolean {
        return this.groupNum(testName) === 1;
    }

    groupB(testName: string): boolean {
        return this.groupNum(testName) === 2;
    }

    groupNum(testName: string): number {
        return this._groups[testName] || 0;
    }

    getGroups(): {[string]: string} {
        return this._groups;
    }
}

export default Stab;