import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { access_token } from './spotify';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
   setToken(state => access_token);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="http://localhost:8000/login"
          target="_blank"
          rel="noopener noreferrer"
        >
          Log in to spotify
        </a>
      </header>
    </div>
  );
}

export default App;
