import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {useState} from "react"; 

function App() {
  const [email, setEmail] = useState("");
  
  const [password, setPassword] = useState("");

  

  function search() {
    console.log(email)
    console.log(password)
    axios.post('core/create_user/', {"email": email, "password":password})
    .then(response => {
      console.log(response)
    }).catch(error=> {
      console.log(error)
    })

    // axios.get("core/users/", {"data": "test"})
    //   .then(response  => {
    //     console.log(response)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
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
        
        <input type="text" onChange={(e) => { setEmail(e.target.value) }}/>
        <input type="text" onChange={(e) => { setPassword(e.target.value)}} />
        

        <button onClick={search}>Click</button>
      </header>
    </div>
  );
}

export default App;
