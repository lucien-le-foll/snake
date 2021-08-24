import React, {useContext} from 'react';
import Cell from "./Cell";
import {SnakeContext} from '../context/SnakeContext';

function Grid(props) {
    const {grid, snake, snakeBuffer} = useContext(SnakeContext.grid);

    grid.cells = []
    grid.snake = {
        cells : [],
        length: 1
    };

    grid.snakeBuffer = '';

    const start = {
        x: Math.floor(Math.random()*10),
        y: Math.floor(Math.random()*10),
    }

    for (let i = 0; i < props.size; i++) {
        for (let y = 0; y < props.size; y++) {
            let cell;
            
            if (start.y === i && start.x === y) {
                cell = <Cell type="SNAKE" x={i} y={y}></Cell>
                grid.snake.cells.push(cell)
            } else {
                cell = <Cell type="BLANK" x={i} y={y}></Cell>
            }
            grid.cells.push(cell);
        }
    }

    function changeSnakeBuffer(e) {
        if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            grid.snakeBuffer = e.key;
        }
    }

    setInterval(() => {
        let snakePos = grid.cells.filter((cell) => {
            return cell === grid.snake.cells[0];
        });

        let nextPos;
        console.log(snakePos);
    }, 1000)
    
    document.addEventListener('keydown', changeSnakeBuffer);

    return (
        <div className={`grid grid-cols-${props.size} grid-rows-${props.size} h-${props.size*6} w-${props.size*6}`}>
            {grid.cells}
        </div>
    );
}

export default Grid;