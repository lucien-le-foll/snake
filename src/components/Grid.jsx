import React, {useState, useEffect} from 'react';
import Cell from "./Cell";

function Grid(props) {
    const [rows, setRows] = useState([]);
    const [snake, setSnake] = useState([
        {x: props.startX, y: props.startY}
    ])
    const [time, setTime] = useState(3);

    let snakeBuffer = '';

    function renderGrid () {
        console.log('ici ça tick');
        return rows.rows.map((row, a) => {
            return row.map((cell, b) => {
                return(
                    <Cell type={cell === 0 ? 'BLANK' : 'SNAKE'} key={`${cell}-${a}/${b}`}></Cell>
                );
            })
        })
    }

    function placeSnake() {
        let truc = []
        for (let i = 0; i < props.size; i++) {
            let row = [];
            for (let j = 0; j < props.size; j++) {
                let cell = '';
                if (snake[0].y === i && snake[0].x === j) {
                    row.push(
                        <Cell type='SNAKE' key={`${j}/${i}`}></Cell>
                    ) 
                } else {
                    row.push(
                        <Cell type='BLANK' key={`${j}/${i}`}></Cell>
                    ) 
                }
            } 
            truc.push(row);
        }
        //setRows(truc);
        console.log(snake[0]);

        return truc;
    }

    useEffect(() => {
        const snakeSet = setSnake.bind(this);
        //placeSnake(snake);

        setInterval(() => {
            setTime(time => time + 1);
            let nextPos;
    
            if(Array.isArray(snake) && snake.length > 0) {
                if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(snakeBuffer)){
                    switch (snakeBuffer) {
                        case 'ArrowUp':
                            if(snake[0].y-1 !== -1){
                                /*let tempRows = rows;
                                tempRows[snake[0].y-1][snake[0].x] = 1;
                                tempRows[snake[0].y][snake[0].x] = 0;
                                setRows(rows => tempRows);*/
                                let tempSnake = snake;
                                tempSnake.unshift({x:snake[0].x, y:snake[0].y-1});
                                tempSnake.pop()
                                console.log(tempSnake);
                                snakeSet(tempSnake);
                            }
                            console.log(snake, rows)
                            break;
                        case 'ArrowDown':
                            nextPos = rows[snake[0].y+1][snake[0].x]
                            break;
                        case 'ArrowRight':
                            nextPos = rows[snake[0].y][snake[0].x+1]
                            break;
                        case 'ArrowLeft':
                            nextPos = rows[snake[0].y][snake[0].x-1]
                            break;
                        default:
                            break;
                    }
                }    
            }
        }, 1000)
        
    }, [])

    function changeSnakeBuffer(e) {
        if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            snakeBuffer = e.key;
        }
    }
    
    document.addEventListener('keydown', changeSnakeBuffer);

    const grid = placeSnake();

    return (
        <div className={`grid grid-cols-${props.size} grid-rows-${props.size} h-${props.size*6} w-${props.size*6}`}>
            {grid}
        </div>
    );
}

export default Grid;