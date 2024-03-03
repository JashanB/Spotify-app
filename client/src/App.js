import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';


function App() {

  useEffect(() => {
    const querystring = window.location.search;
    const urlParams = new URLSearchParams(querystring);
    const accessToken = urlParams.get('access_token');
    const refreshToken = urlParams.get('refresh_token');
    if (refreshToken) {
      fetch(`http://localhost:8000/refresh_token?refresh_token=
      ${refreshToken}`)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err))
    }
  }, [])
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
