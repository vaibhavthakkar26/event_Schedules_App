import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import CreateEvents from './Components/Events/CreateEvents';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CreateEvents/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
