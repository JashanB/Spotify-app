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
       {!token ? (
        <a
          className="App-link"
          href="http://localhost:8000/login"
          target="_blank"
          rel="noopener noreferrer"
        >
          Log in to spotify
        </a>
       ) : (
        <h1>Logged in!</h1>
       )}
      </header>
    </div>
  );
}

export default App;
