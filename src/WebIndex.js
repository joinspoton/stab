import Stab from './Stab';
import {error} from './Util';

declare var mixpanel: any;
declare var __SITEVARS__: any;

let groups = {};

if (typeof __SITEVARS__ !== 'undefined' && __SITEVARS__.abTests) {
  groups = __SITEVARS__.abTests;
}

const stab = new Stab(groups);

if (typeof mixpanel !== 'undefined') {
  mixpanel.register_once(stab.getGroups());
}

export default stab;