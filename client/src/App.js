import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Landing from './Components/Landing';
import Home from './Components/Home';
import VideogameCreate from './Components/VideogameCreate';
import Detail from './Components/Detail';
import NavBar from './Components/NavBar';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Landing/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/videogame' element={<VideogameCreate/>}></Route>
          <Route path='/videogame/:id' element={<Detail/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
