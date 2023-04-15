/* eslint-disable prettier/prettier */
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import './App.css';
import { Root } from './components/Root/Root';
import Counter from './pages/Counter/Counter';
import Users from './pages/Users/Users';
import Films from './pages/Films/Films';
import FilmDetail from './pages/FilmDetail/FilmDetail';
import Login from './components/Login/Login';

function App() {
  return (
    <Root>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="counter" element={<Counter />} />
        <Route path="users" element={<Users />} />
        <Route path="about" element={<About />} />
        <Route path="films" element={<Films />}/>
        <Route path="filmpage/:mvid" element={<FilmDetail />}/>
        <Route path="login" element={<Login />}/>
      </Routes>
    </Root>
  );
}

export default App;
