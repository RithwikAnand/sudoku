/*
 *For a Sudoku of size N with given numbers, validate whether the number at position i is valid
 */
const validate = (N, i, numbers) => rowValidate(N, i, numbers) && columnValidate(N, i, numbers) && subgridValidate(N, i, numbers)

/*Quotient */
const row = (N, i) => Math.floor(i / N)

/*Reminder */
const col = (N, i) => i % N

/*Grid */
const subgrid = (N, i) => Math.sqrt(N) * Math.floor(row(N, i) / Math.sqrt(N)) + Math.floor(col(N, i) / Math.sqrt(N))

/*
 *For a Sudoku of size N with given numbers, check whether the number at position i does not repeat in the row
 */
const rowValidate = (N, i, numbers) => numbers
    .filter((_, index) => index !== i && (row(N, index) === row(N, i)))
    .every(number => number !== numbers[i])

/*
 *For a Sudoku of size N with given numbers, check whether the number at position i does not repeat in the column
 */
const columnValidate = (N, i, numbers) => numbers
    .filter((_, index) => index !== i && (col(N, index) === col(N, i)))
    .every(number => number !== numbers[i])

/*
 *For a Sudoku of size N with given numbers, check whether the number at position i does not repeat in the subgrid
 */
/*
 *const subgridValidate = (N, i, numbers) => numbers
 *    .filter((_, index) =>
 *        index !== i &&
 *        Math.floor(row(N, index) / Math.sqrt(N)) === Math.floor(row(N, i) / Math.sqrt(N)) &&
 *        Math.floor(col(N, index) / Math.sqrt(N)) === Math.floor(col(N, i) / Math.sqrt(N))
 *    )
 *    .every(number => number !== numbers[i])
 */

const subgridValidate = (N, i, numbers) => numbers
    .filter((_, index) => index !== i && subgrid(N, index) === subgrid(N, i))
    .every(number => number !== numbers[i])

export default validate

