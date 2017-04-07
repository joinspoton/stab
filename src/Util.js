// @flow

const USER_TOKEN_KEY = 'abUserToken';
const FRACTION_MODULO = 0xFFFF;

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

/**
 * Return a pseudo-random number in the range [0, 1)
 * 
 * @export
 * @param {string} str 
 * @returns {number} 
 */
export function getFraction(str: string): number {
  const absHash = Math.abs(hash(str));

  return (absHash % FRACTION_MODULO) / FRACTION_MODULO;
}

export function generateUserToken(): string {
  return String(Math.random());
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

export function trySaveUserToken(token: string) {
  try {
    localStorage.setItem(USER_TOKEN_KEY, token);
  } catch (e) {
        // silently fail if local storage doesn't work
  }
}

export function error(message: string) {
  console.error(`Stab: ${message}`);
}