import './index.css';
import Grid from './components/Grid';
import {useState} from 'react';

function App() {
  const size = 12;
  const snakeStart = {
    x: Math.floor(Math.random()*size),
    y: Math.floor(Math.random()*size),
  };
  const foodStart = {
    x: Math.floor(Math.random()*size),
    y: Math.floor(Math.random()*size)
  }
  const [score, setScore] = useState(1);

  return (
    <div className="App container h-screen w-screen grid content-center justify-center">
      <div className="">Score : {score} point{score > 0 ? 's' : ''}</div>
      <Grid size={size} snakeStart={snakeStart} foodStart={foodStart} setScore={setScore.bind(this)}></Grid>
    </div>
  );
}

export default App;
