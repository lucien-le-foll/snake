import './index.css';
import Grid from './components/Grid';

function App() {
  const size = 12;
  const start = {
    x: Math.floor(Math.random()*size),
    y: Math.floor(Math.random()*size),
  };

  return (
    <div className="App container h-screen w-screen grid content-center justify-center">
      <Grid size={size} startX={start.x} startY={start.y}></Grid>
    </div>
  );
}

export default App;
