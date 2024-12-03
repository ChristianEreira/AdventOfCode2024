// Get data

const file = Bun.file('./data/day1.txt');
const dataText = await file.text();
const dataSplit = dataText.split('\n');

const list1 = [];
const list2 = [];

dataSplit.forEach(line => {
    const entries = line.split('   ');
    list1.push(entries[0]);
    list2.push(entries[1]);
});

list1.sort();
list2.sort();

// Part 1

const totalDistance = list1.reduce((prev, current, i) => prev + Math.abs(current - list2[i]), 0);
console.log("Distance:", totalDistance);

// Part2

const totalSimilarity = list1.reduce((prev, current) => {
    return prev + (current * list2.filter(entry => entry === current).length);
}, 0);
console.log("Similarity:", totalSimilarity);