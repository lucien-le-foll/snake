import { useState } from 'react';

function Cell(props){
    const [cellType, setCellType] = useState(props.type);
    let className = 'h-5 w-5 m-auto';

    if(cellType === "BLANK") {
        className += ' bg-gray-300 rounded-sm';
    } else if (cellType === "SNAKE") {
        className += ' bg-gray-500 rounded-sm animate-pulse-fast';
    } else if (cellType === "FOOD") {
        className += ' bg-yellow-500 rounded-full';
    }

    function componentDidUpdate(prevProps){
        console.log(prevProps);
    }

    return (
        <div className={className}></div>
    )
}

export default Cell;