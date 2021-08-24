import './index.css';
import Grid from './components/Grid';
import SnakeContextProvider from './context/SnakeContext';

function App() {
  return (
    <SnakeContextProvider>
      <div className="App container h-screen w-screen grid content-center justify-center">
        <Grid size={12}></Grid>
      </div>
    </SnakeContextProvider>
    
  );
}

export default App;
