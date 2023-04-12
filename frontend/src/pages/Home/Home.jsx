import logo from './logo.svg';
import './Home.css';
import MovieName from '../../components/MovieName/MovieName';
import Movies from '../../components/Movies/Movies';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <MovieName />
        <Movies />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload aaa.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Home;
