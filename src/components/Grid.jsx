function Grid(props) {
    let cells = []

    for (let i = 0; i < props.size; i++) {
        for (let y = 0; y < props.size; y++) {
            if(i === 2 && y === 4) {
                cells.push(
                    <div className="h-5 w-5 bg-gray-400 m-auto rounded-sm animate-pulse"></div>
                )
            } else {
                cells.push(
                    <div className="h-5 w-5 bg-gray-400 m-auto rounded-sm"></div>
                ) 
            }      
        }
    }

    return (
        <div className={`grid grid-cols-${props.size} grid-rows-${props.size} h-${props.size*6} w-${props.size*6}`}>
            {cells}
        </div>
    );
}

export default Grid;