import React, {useState, useEffect} from 'react';
import Cell from './Cell';
import Snake from './Snake';
import Food from './Food';

function Grid(props) {

    // différent states utilisés par la grille
    const [snake, setSnake] = useState(props.snakeStart);
    const [food, setFood] = useState(props.foodStart);
    const [lost, setLost] = useState(false);
    const [snakeBuffer, setSnakeBuffer] = useState('');
    //const [reset, setReset] = useState(props.reset);

    // timer pour le setInterval
    const [time, setTime] = useState(0);

    // export du score pour l'affichage à N+1
    function exportScore() {
        props.setScore(snake.length)
    }

    // parcours de la grille et export d'un composant différent en fonction de l'état
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

    // génération d'un nouvel emplacement de nourriture
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
        const foodSet = setFood.bind(this);

        if(localStorage.key('snake') && localStorage.key('food')){
            snakeSet(JSON.parse(localStorage.getItem('snake')));
            foodSet(JSON.parse(localStorage.getItem('food')));
        }
    }, [])

    // utilisation de useEffect pour ne modifier le composant qu'après son montage
    useEffect(() => {
        const snakeSet = setSnake.bind(this);
        const lostSet = setLost.bind(this);
        const foodSet = setFood.bind(this);
        //const resetSet = setReset.bind(this);

        
        function startingInterval() {
            return setInterval(() => {
                setTime(time => time + 1);

                if(time %10 === 0) {
                    props.storage.setItem('snake', JSON.stringify(snake));
                    props.storage.setItem('food', JSON.stringify(food));
                }
    
                if(Array.isArray(snake) && snake.length > 0) {
                    if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(snakeBuffer)){
                        switch (snakeBuffer) {
                            case 'ArrowUp':
                                if(snake[0].y-1 !== -1){
                                    let tempSnake = snake;
                                    if(snake.findIndex(part => part.x === tempSnake[0].x && part.y === tempSnake[0].y-1) !== -1){
                                        lostSet(true);
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
                                    lostSet(true);
                                    break;
                                }
                                break;
                            case 'ArrowDown':
                                if(snake[0].y+1 < props.size){
                                    let tempSnake = snake;
                                    if(snake.findIndex(part => part.x === tempSnake[0].x && part.y === tempSnake[0].y+1) !== -1){
                                        lostSet(true);
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
                                    lostSet(true);
                                    break;
                                }
                                break;
                            case 'ArrowRight':
                                if(snake[0].x+1 < props.size){
                                    let tempSnake = snake;
                                    if(snake.findIndex(part => part.x === tempSnake[0].x+1 && part.y === tempSnake[0].y) !== -1){
                                        lostSet(true);
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
                                    lostSet(true);
                                    break;
                                }
                                break;
                            case 'ArrowLeft':
                                if(snake[0].x-1 !== -1){
                                    let tempSnake = snake;
                                    if(snake.findIndex(part => part.x === tempSnake[0].x-1 && part.y === tempSnake[0].y) !== -1){
                                        lostSet(true);
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
                                    lostSet(true);
                                    break;
                                }
                                break;
                            default:
                                break;
                        }
                    }    
                }
            }, 225)
        } 

        let gameStartInterval = startingInterval();

        if(lost) {
            setSnakeBuffer('');
            clearInterval(gameStartInterval);
            props.onLost();
        }

        if(props.reset){
            setSnake([
                {x: props.snakeStart.x, y: props.snakeStart.y}
            ]);
    
            setFood({
                x: props.foodStart.x, y: props.foodStart.y
            });
    
            setLost(false);

            props.endReset();
            props.endLost();
        }

        return () => {
            clearInterval(gameStartInterval);
        };
        
    }, [food, snakeBuffer, lost, time, snake, props.reset])

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