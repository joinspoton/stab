# Stab
*STanza A-B testing*

# Test Configuration
`Stab` expects an object specifying which tests to run, and which percentage of users should be in each group. Most ofen, you'll want to just test with two groups per test.


```javascript
type ABConfig = {
    [testName: string]: Array<Number>
};
```

Eg:

```javascript
const config = {
    homepageText: [4, 1], // 4/5ths of users in group A, 1/5th of users in group B
    addButton: [1, 1], // 50/50
    landingPage: [1, 2, 1, 1] // 20% 40% 20% 20% split
};
```

```javascript
Stab.configure(config: ABConfig)
```

```javascript
Stab.groupA(testName: string): boolean
Stab.groupB(testName: string): boolean
```


```javascript
Stab.groupNum(testName: string): number
```

```javascript
Stab.getGroups(): [key: string]: string
```