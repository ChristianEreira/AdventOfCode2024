// Get data

const file = Bun.file('./data/day5.txt');
const dataText = await file.text();

let [rules, updates] = dataText.split('\n\n').map(section => section.split('\n'));
rules = rules.map(rule => rule.split('|').map(num => Number(num)));
updates = updates.map(update => update.split(',').map(num => Number(num)));

// Part 1

const checkMatchesRules = update => rules.every(rule => {
    return !update.includes(rule[0]) || !update.includes(rule[1]) || update.indexOf(rule[0]) < update.indexOf(rule[1]);
});

const correctUpdates = updates.filter(checkMatchesRules);

const sumOfMiddleNums = correctUpdates.reduce((prev, curr) => prev + curr[(curr.length - 1) / 2], 0);

console.log("Sum of middle numbers:", sumOfMiddleNums);

// Part 2

const incorrectUpdates = updates.filter(update => !checkMatchesRules(update));

const fixedUpdates = incorrectUpdates.map(update => {
    let fixedUpdate = [];

    update.forEach(num => {
        for (let i = 0; i < update.length; i++) {
            const tempUpdate = [...fixedUpdate].toSpliced(i, 0, num);
            if (checkMatchesRules(tempUpdate)) {
                fixedUpdate = tempUpdate;
                break;
            }
        }
    });

    return fixedUpdate;
});

const sumOfFixedMiddleNums = fixedUpdates.reduce((prev, curr) => prev + curr[(curr.length - 1) / 2], 0);
console.log("Sum of Fixed middle numbers:", sumOfFixedMiddleNums);