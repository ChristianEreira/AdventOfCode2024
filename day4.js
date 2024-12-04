// Get data

const file = Bun.file('./data/day4.txt');
const dataText = await file.text();

const grid = dataText.split('\n').map(line => line.split(''));

// Part 1

let xmasCount = 0;

const isWord = (x, y, xDir, yDir, word, progress = 0) => {
    if (grid[x + (xDir * progress)]?.[y + (yDir * progress)] !== word[progress]) return false;
    return progress === word.length - 1 || isWord(x, y, xDir, yDir, word, progress + 1);
}

const directions = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
grid.forEach((line, lineI) => {
    line.forEach((_, charI) => {
        directions.forEach(dir => {
            if (isWord(charI, lineI, dir[0], dir[1], 'XMAS')) xmasCount++;
        })
    })
});

console.log("XMAS count:", xmasCount);

// Part 2

let masCount = 0;

grid.forEach((line, lineI) => {
    line.forEach((char, charI) => {
        if (char === "A") {
            const diag1 = [grid[lineI - 1]?.[charI - 1], grid[lineI + 1]?.[charI + 1]];
            const diag2 = [grid[lineI - 1]?.[charI + 1], grid[lineI + 1]?.[charI - 1]];
            if (diag1.sort().join('') === "MS" && diag2.sort().join('') === "MS") masCount++;
        }
    })
});

console.log("X-MAS count:", masCount);