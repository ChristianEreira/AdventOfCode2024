// Get data

const file = Bun.file('./data/day3.txt');
const dataText = await file.text();

// Part 1

const multiplications = dataText.match(/mul\(\d{1,3},\d{1,3}\)/g);

const sumMultiplications = (multiplications) => multiplications.reduce((prev, curr) => {
    const digits = curr.match(/\d{1,3}/g);
    if (!digits) return prev;
    return prev + Number(digits[0]) * Number(digits[1]);
}, 0)

console.log("Sum of multiplications:", sumMultiplications(multiplications));

// Part 2

const splitAtDont = dataText.split("don't()");
const dataTextWithConditionals = splitAtDont.map((section, i) => {
    if (i === 0) return section;
    const doIndex = section.search('do()');
    return doIndex === -1 ? '' : section.substring(doIndex);
});

const multiplicationsWithConditionals = dataTextWithConditionals.flatMap(text => text.match(/mul\(\d{1,3},\d{1,3}\)/g) || []);

console.log("Sum of multiplications with conditionals:", sumMultiplications(multiplicationsWithConditionals));