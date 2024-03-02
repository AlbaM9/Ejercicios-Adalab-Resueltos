
const numRows = prompt('Enter the number of rows:');
const rowsImput = parseInt(numRows);

const trianglePattern = generateTrianglePattern(rowsImput);
console.log(trianglePattern);


function generateTrianglePattern(rows) {

    let pattern = '';

    for (let i = 0; i <= rows; i++) {

        if (i == 0) {
            pattern += '.'.repeat(rows - i * 2 - 1);
            pattern += '★';

        } else if (i == rows) {

            pattern += '.'.repeat(rows * 1 - 1);
            pattern += "|";
        }
        else {

            pattern += '.'.repeat(rows - i);

            for (let j = 0; j < i * 2 - 1; j++) {

                pattern += '▲';
            }
        }
        pattern += '\n';

    }
    return pattern;

}


