// @flow

const USER_TOKEN_KEY = 'abUserToken';

export function hash(str: string): number {
    // http://www.cse.yorku.ca/~oz/hash.html
    // djb2 algorithm
    let hash = 5381;
    let c;

    for (let i = 0; i < str.length; i++) {
        c = str.charCodeAt(i);
        hash = ((hash << 5) + hash + c) | 0;
    }

    return hash;
}

export function generateUserToken(): string {
    return 'TODO';
}

export function tryLoadUserToken(): ?string {
    let result;

    try {
        result = localStorage.getItem(USER_TOKEN_KEY);
    } catch (e) {
        // silently fail if local storage doesn't work
    }

    return result;
}