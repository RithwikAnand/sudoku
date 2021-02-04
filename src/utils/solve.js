import validate from './validate'

// Given an index, returns the position of closest editable cell with a lesser index
const prevEditableIndex = (cells, index) =>
    cells.reduce((result, { editable }, i) => i < index && editable ? i : result, -1)

// Given the grid size and a cells configuration, returns solution cells configuration
const solve = (N, cells) => {
    let i = 0
    while (i < N ** 2) {
	const { value, editable } = cells[i]
	// Advance on occurance of non-editable cells
	if (!editable) {
	    i++
	} else {
	    // Can the value be incremented?
	    if (value + 1 <= N) {
		cells = [
		    ...cells.slice(0, i),
		    { value: value + 1, editable },
		    ...cells.slice(i + 1)
		]
		const numbers = cells.map(({ value }) => value)
		// Advance if the cells configuration with incremented value is valid
		if (validate(N, i, numbers)) {
		    i++
		}
	    // Backtrack
	    } else {
		// Reset the current cell
		cells = [
		    ...cells.slice(0, i),
		    { value: 0, editable },
		    ...cells.slice(i + 1)
		]
		const backIndex = prevEditableIndex(cells, i)
		// No solutions exist if we exhaust all backtrackable indices
		if (backIndex < 0) {
		    console.log('Invalid Sudoku!')
		    break
		} else {
		    // Reset iterator to index of previous editable cell
		    i = backIndex
		}
	    }
	}
    }
    return cells
}

export default solve
