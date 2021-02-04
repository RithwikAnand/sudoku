import React, { useState, useCallback, useRef, useEffect } from 'react'
import usePrevious from './hooks/useprevious'
import useComponentSize from './hooks/usecomponentsize'
import solve from './utils/solve'
import './App.css';

const Header =  () => <div className="Header">Sudoku</div>

const Cell = ({
    value,
    editable,
    onChange,
    leftBorder,
    topBorder,
    disabled,
    N
}) => {
    // Input change listener with validation
    const handleChange = useCallback((e) => {
        const { value } = e.target
        const intValue = parseInt(value, 10)
        if (value === '' || (!isNaN(intValue) && intValue >= 1 && intValue <= N)) {
            onChange(value === '' ? 0 : intValue)
        }
    }, [ N, onChange ])
    return (
	<input
	    type="number"
	    value={value || ''}
	    onChange={handleChange}
	    className={`${leftBorder ? 'LeftBorder' : ''} ${topBorder ? 'TopBorder' : ''} `}
	    disabled={disabled}
	/>
    )
}

const PADDING = 20
const blankCells = N => Array(N ** 2).fill({ value: 0, editable: true })

const Sudoku = ({ N, stage })  => {
    // Intialize with blank cells
    const [ cells, setCells ] = useState(blankCells(N))
    // Compute dimensions
    const containerEle = useRef(null)
    const size = useComponentSize(containerEle)
    const width = size.width - PADDING
    const height = size.height - PADDING
    // Input change listener
    const handleChange = useCallback(index => value => {
	setCells(cells.map((n, i) => i === index ? ({ value, editable: stage === 'SOLUTION' || !value }) : n))
    }, [ cells, stage ])
    // Effects to run on stage toggle
    const previousStage = usePrevious(stage)
    useEffect(() => {
	if (stage === 'SOLUTION' && previousStage === 'PREPARATION') {
	    const solvedCells = solve(N, cells)
	    setCells(solvedCells)
	}
	if (stage === 'PREPARATION' && previousStage === 'SOLUTION') {
	    setCells(blankCells(N))
	}
    }, [ previousStage, N, stage, cells ])
    return (
	<div className="Sudoku" ref={containerEle}>
	    <div
		style={{
		    width: Math.min(width, height),
		    height: Math.min(width, height),
		    gridTemplateRows: `repeat(${N}, ${100 / N}%)`,
		    gridTemplateColumns: `repeat(${N}, ${100 / N}%)`
		}}
		className="Container"
	    >
		{cells.map(({ value, editable }, i) => (
		    <Cell
			key={i}
			value={value}
			editable={editable}
			onChange={handleChange(i)}
			leftBorder={i % Math.sqrt(N) === 0}
			topBorder={Math.floor(i / N) % Math.sqrt(N) === 0}
			disabled={stage === 'SOLUTION' && !editable}
			N={N}
		    />
		))}
	    </div>
	</div>
    )
}

const Footer = ({ stage, onSolve, onNew }) =>
    <div className="Footer">
	{stage === 'PREPARATION' ? (
	    <button className="Button" onClick={onSolve}>
		Solve
	    </button>
	) : (
	    <button className="Button" onClick={onNew}>
		New
	    </button>
	)}
    </div>

const App = () => {
    /*
     *The app can either be in PREPARATION stage or SOLUTION stage
     *In PREPARATION stage, the user enters the non-editable/fixed values
     *In SOLUTION stage, user can view the solution
     */
    const [ stage, setStage ] = useState('PREPARATION')
    const handleSolve = () => setStage('SOLUTION')
    const handleNew = () => setStage('PREPARATION')
    return (
	<div className="App">
	    <Header />
	    <Sudoku N={9} stage={stage}/>
	    <Footer stage={stage} onSolve={handleSolve} onNew={handleNew} />
	</div>
    )
}

export default App
