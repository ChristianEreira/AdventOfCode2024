// Get data

const file = Bun.file('./data/day2.txt');
const dataText = await file.text();
const dataSplit = await dataText.split('\n');

const reports = dataSplit.map(report => report.split(' ').map(num => Number(num)));

// Part 1

const totalSafe = reports.reduce((prev, report) => {
    const isIncrementing = report[0] < report[1];
    return report.reduce((prev, curr, i) => {
        const diff = isIncrementing ? curr - report[i - 1] : report[i - 1] - curr;
        return prev && diff >= 1 && diff <= 3;
    }) ? prev + 1 : prev
}, 0);

console.log("Safe:", totalSafe);

// Part 2

const totalSafeWithDampener = reports.reduce((prev, report) => {
    const reportPermutations = [report, ...report.map((_ ,i) => report.filter((_, permI) => permI !== i))];
    return reportPermutations.some(permutation => permutation.reduce((prev, curr, i) => {
        const isIncrementing = permutation[0] < permutation[1];
        const diff = isIncrementing ? curr - permutation[i - 1] : permutation[i - 1] - curr;
        return prev && diff >= 1 && diff <= 3;
    })) ? prev + 1 : prev
}, 0);

console.log("Safe with dampener:", totalSafeWithDampener);