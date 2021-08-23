function Cell(props){

    return (
        <div className={`h-5 w-5 bg-gray-400 m-auto rounded-sm ${props.snake ? 'animate-pulse-fast' : ''}`}></div>
    )
}

export default Cell;