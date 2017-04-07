import Stab from '../Stab';

// sure it's random, but if you run it enough times it's
// definitely probably going to be reliable
const TEST_RUNS = 10000;
const ERROR_MARGIN = 0.05;

describe('Stab', () => {
    test('Loads with empty config', () => {
        const stab = new Stab({});
    });

    test('Picks up test names from config', () => {
        const groups = new Stab({
            foo: [1],
            bar: [1]
        }).getGroups();

        expect(groups).toHaveProperty('test_foo');
        expect(groups).toHaveProperty('test_bar');
    });

    test('Picks correct bucket for deterministic test groups', () => {
        for (let i = 0; i < TEST_RUNS; i++) {
            const stab = new Stab({
                alwaysA: [1],
                alwaysB: [0, 5],
                alwaysC: [0, 0, 0.001, 0, 0, 0, 0]
            });
            const groups = stab.getGroups();

            expect(groups).toEqual({
                test_alwaysA: 1,
                test_alwaysB: 2,
                test_alwaysC: 3
            });
        }
    });

    describe('Group read functions are accurate', () => {
        const stab = new Stab({
            alwaysA: [],
            alwaysB: [0, 1234, 0, 0],
            alwaysC: [0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0]
        });

        test('Tests not in config', () => {
            expect(stab.groupA('nope')).toEqual(true);
            expect(stab.groupB('nope')).toEqual(false);
            expect(stab.groupNum('nope')).toEqual(1);
        });

        test('groupA()', () => {
            expect(stab.groupA('alwaysA')).toEqual(true);
            expect(stab.groupA('alwaysB')).toEqual(false);
            expect(stab.groupA('alwaysC')).toEqual(false);
        });

        test('groupB()', () => {
            expect(stab.groupB('alwaysA')).toEqual(false);
            expect(stab.groupB('alwaysB')).toEqual(true);
            expect(stab.groupB('alwaysC')).toEqual(false);
        });

        test('groupNum()', () => {
            expect(stab.groupNum('alwaysA')).toEqual(1);
            expect(stab.groupNum('alwaysB')).toEqual(2);
            expect(stab.groupNum('alwaysC')).toEqual(3);
        });
    });

    test('Non-deterministic bucketing is accurate', () => {
        let fiftyFiftyHits = 0;
        let quarterHits = 0;

        for (var i = 0; i < TEST_RUNS; i++) {
            const stab = new Stab({
                fiftyFifty: [0, 20, 20, 0, 0],
                quarter: [1, 3]
            });

            if (stab.groupB('fiftyFifty')) fiftyFiftyHits += 1;
            if (stab.groupA('quarter')) quarterHits += 1;
        }

        const fiftyFiftyRate = fiftyFiftyHits / TEST_RUNS;
        const quarterRate = quarterHits / TEST_RUNS;

        expect(fiftyFiftyRate).toBeGreaterThan(0.5 - ERROR_MARGIN);
        expect(fiftyFiftyRate).toBeLessThan(0.5 + ERROR_MARGIN);

        expect(quarterRate).toBeGreaterThan(0.25 - ERROR_MARGIN);
        expect(quarterRate).toBeLessThan(0.25 + ERROR_MARGIN);
    });
});