import Stab from './Stab';

const el = document.getElementById('ab-testing-json');
let groups = {};

if (el) {
    groups = JSON.parse(el.innerHTML);
}

export default new Stab(groups.abTests);