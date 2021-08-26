import React, {useState, useEffect} from 'react';
import Cell from './Cell';
import Snake from './Snake';
import Food from './Food';

function Grid(props) {
    const [snake, setSnake] = useState([
        {x: props.snakeStart.x, y: props.snakeStart.y}
    ])

    const [food, setFood] = useState({
        x: props.foodStart.x, y: props.foodStart.y
    })

    const [time, setTime] = useState(0)

    const [snakeBuffer, setSnakeBuffer] = useState('')

    function exportScore() {
        props.setScore(snake.length)
    }
    function placeSnake() {
        let rows = []
        for (let i = 0; i < props.size; i++) {
            let row = [];
            for (let j = 0; j < props.size; j++) {
                if(snake.findIndex(morceau => morceau.x === j && morceau.y ===i) !== -1) {
                    row.push(
                        <Snake key={`h${i}/l${j}`}></Snake>
                    ) 
                } else if (food.x === j && food.y === i) {
                    row.push(
                        <Food key={`h${i}/l${j}`}></Food>
                    ) 
                } else {
                    row.push(
                        <Cell key={`h${i}/l${j}`}></Cell>
                    ) 
                }
            } 
            rows.push(row);
        }

        return rows;
    }

    function placeFood() {
        setFood({
            x: Math.floor(Math.random()*props.size),
            y: Math.floor(Math.random()*props.size)
        });

        exportScore();
        return true;
    }

    useEffect(() => {
        const snakeSet = setSnake.bind(this);

        const gameStartInterval = setInterval(() => {
            setTime(time => time + 1);

            if(Array.isArray(snake) && snake.length > 0) {
                if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(snakeBuffer)){
                    switch (snakeBuffer) {
                        case 'ArrowUp':
                            if(snake[0].y-1 !== -1){
                                let tempSnake = snake;
                                if(snake.findIndex(part => part.x === tempSnake[0].x && part.y === tempSnake[0].y-1) !== -1){
                                    alert('ded');
                                    break;
                                }
                                tempSnake.unshift({x:snake[0].x, y:snake[0].y-1});
                                if(snake[0].x === food.x && snake[0].y === food.y){
                                    placeFood();
                                } else {
                                    tempSnake.pop()
                                }
                                snakeSet(tempSnake);
                            } else {
                                alert('ded');
                                break;
                            }
                            break;
                        case 'ArrowDown':
                            if(snake[0].y+1 < props.size){
                                let tempSnake = snake;
                                if(snake.findIndex(part => part.x === tempSnake[0].x && part.y === tempSnake[0].y+1) !== -1){
                                    alert('ded');
                                    break;
                                }
                                tempSnake.unshift({x:snake[0].x, y:snake[0].y+1});
                                if(snake[0].x === food.x && snake[0].y === food.y){
                                    placeFood();

                                } else {
                                    tempSnake.pop()
                                }
                                snakeSet(tempSnake);
                            } else {
                                alert('ded');
                                break;
                            }
                            break;
                        case 'ArrowRight':
                            if(snake[0].x+1 < props.size){
                                let tempSnake = snake;
                                if(snake.findIndex(part => part.x === tempSnake[0].x+1 && part.y === tempSnake[0].y) !== -1){
                                    alert('ded');
                                    break;
                                }
                                tempSnake.unshift({x:snake[0].x+1, y:snake[0].y});
                                if(snake[0].x === food.x && snake[0].y === food.y){
                                    placeFood();
                                } else {
                                    tempSnake.pop()
                                }
                                snakeSet(tempSnake);
                            } else {
                                alert('ded');
                                break;
                            }
                            break;
                        case 'ArrowLeft':
                            if(snake[0].x-1 !== -1){
                                let tempSnake = snake;
                                if(snake.findIndex(part => part.x === tempSnake[0].x-1 && part.y === tempSnake[0].y) !== -1){
                                    alert('ded');
                                    break;
                                }
                                tempSnake.unshift({x:snake[0].x-1, y:snake[0].y});
                                if(snake[0].x === food.x && snake[0].y === food.y){
                                    placeFood();
                                } else {
                                    tempSnake.pop()
                                }
                                snakeSet(tempSnake);
                            } else {
                                alert('ded');
                                break;
                            }
                            break;
                        default:
                            break;
                    }
                }    
            }
        }, 300)

        return () => {
            clearInterval(gameStartInterval);
        };
        
    }, [food, snakeBuffer])

    function changeSnakeBuffer(e) {
        if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            setSnakeBuffer(e.key);
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