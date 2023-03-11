import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  function search() {
    axios.get("core/users/", {"data": "test"})
      .then(response  => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={search}>Click</button>
      </header>
    </div>
  );
}

export default App;
