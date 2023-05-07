import MoviesTable from '../../components/MoviesTable/MoviesTable';
import './Home.css';
function Home() {
  return (
    <div className="App">
      <h1>Movie list</h1>

      <MoviesTable />
    </div>
  );
}

export default Home;
