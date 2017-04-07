import Stab from './Stab';

// TODO: better error handling
const el = document.getElementById('ab-testing-json');
const groups = JSON.parse(el.innerHTML);

export default new Stab(groups.abTests);