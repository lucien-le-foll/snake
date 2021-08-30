import './index.css';
import Grid from './components/Grid';
import {useState, useEffect} from 'react';

function App() {
  const size = 12;
  const [snakeStart, setSnakeStart] = useState([{
    x: Math.floor(Math.random()*size),
    y: Math.floor(Math.random()*size),
  }]);
  const [foodStart, setFoodStart] = useState({
    x: Math.floor(Math.random()*size),
    y: Math.floor(Math.random()*size)
  });
  const [score, setScore] = useState(1);
  const [lost, setLost] = useState(false);
  const [reset, setReset] = useState(false);  

  function displayLost(){
    setLost(true);
  }

  function resetGame() {
    setSnakeStart({
      x: Math.floor(Math.random()*size),
      y: Math.floor(Math.random()*size),
    });

    setFoodStart({
      x: Math.floor(Math.random()*size),
      y: Math.floor(Math.random()*size)
    });

    setScore(1);
    setReset(true);
    setLost(false);
  }

  return (
    <div className="App container h-screen w-screen grid content-center justify-center">
      <div className="">
        Score : {score} point{score > 1 ? 's' : ''}
        {lost && 
        <button onClick={resetGame} className="float-right bg-red-500 p-2 rounded-sm mb-2 text-white">
          Recommencer
        </button>}
      </div>
      <div className="">
        <Grid 
          storage={localStorage}
          endReset={() => setReset(false)}
          endLost={() => setLost(false)}
          reset={reset}
          size={size} 
          snakeStart={snakeStart} 
          foodStart={foodStart} 
          setScore={setScore.bind(this)}
          onLost={displayLost.bind(this)}
        >
        </Grid>
      </div>
    </div>
  );
}

export default App;
