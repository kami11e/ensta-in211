/* eslint-disable prettier/prettier */
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import { Root } from './components/Root/Root';
import Users from './pages/Users/Users';
import Films from './pages/Films/Films';
import FilmDetail from './pages/FilmDetail/FilmDetail';
import Login from './components/Login/Login';
import UserSpace from './pages/UserSpace/UserSpace';

function App() {
  return (
    <Root>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users" element={<Users />} />
        <Route path="about" element={<About />} />
        <Route path="films" element={<Films />} />
        <Route path="filmpage/:mvid" element={<FilmDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="userspace" element={<UserSpace />} />
      </Routes>
    </Root>
  );
}

export default App;
