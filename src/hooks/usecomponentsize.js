import { useState, useCallback, useLayoutEffect } from 'react'

const getSize =  (element) =>
    ({
	width: element ? element.offsetWidth : 0,
	height: element ? element.offsetHeight : 0,
    })

const useComponentSize = ref => {
    const [ size, setSize ] = useState(() => getSize(ref.current))
    const handleResize = useCallback(() => {
	setSize(getSize(ref.current))
    }, [ ref ])
    useLayoutEffect(() => {
	handleResize()
	window.addEventListener('resize', handleResize)
	return () => window.removeEventListener('resize', handleResize)
    }, [ handleResize ])
    return size
}

export default useComponentSize
