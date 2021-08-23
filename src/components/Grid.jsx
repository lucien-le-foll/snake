import Cell from "./Cell";

function Grid(props) {
    let cells = []
    let snake = {
        cells : [],
        length: 1
    };

    const start = {
        x: Math.floor(Math.random()*10),
        y: Math.floor(Math.random()*10),
    }

    function onKeyDown(e) {
        console.log({e})
    }

    document.addEventListener('keydown', onKeyDown);

    snake.cells.push(start);

    console.log({snake})
    for (let i = 0; i < props.size; i++) {
        for (let y = 0; y < props.size; y++) {
            cells.push(
                <Cell snake={snake.cells[0].y === i && snake.cells[0].x === y}></Cell>
            )
         
        }
    }

    return (
        <div className={`grid grid-cols-${props.size} grid-rows-${props.size} h-${props.size*6} w-${props.size*6}`}>
            {cells}
        </div>
    );
}

export default Grid;