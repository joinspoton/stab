import Stab from './Stab';
import {error} from './Util';

const el = document.getElementById('ab-testing-json');
let json = {};

if (el) {
    json = JSON.parse(el.innerHTML);
} else {
    error('Error parsing JSON');
}

const stab = new Stab(json.abTests || {});

if (typeof mixpanel !== 'undefined') {
    mixpanel.register_once(stab.getGroups());
} else {
    error('Mixpanel not found');
}

export default stab;