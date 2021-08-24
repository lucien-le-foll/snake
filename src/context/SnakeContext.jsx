import React, {createContext, useState} from 'react';

export const SnakeContext = createContext();

const SnakeContextProvider = props => {
    const [grid, setGrid] = useState([]);
    const [snakeBuffer, setSnakeBuffer] = useState('');
    const [snake, setSnake] = useState();

    return(
        <SnakeContext.Provider value={{grid, snakeBuffer, snake}}>
            {props.children}
        </SnakeContext.Provider>
    )
}

export default SnakeContextProvider;