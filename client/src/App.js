import styled, { createGlobalStyle } from 'styled-components/macro';
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { access_token, getCurrentUserProfile } from './spotify';
import { catchErrors } from './utils';
import {Login} from './pages';
import {Playlist} from './pages';
import {Playlists} from './pages';
import {Profile} from './pages';
import {TopArtists} from './pages';
import {TopTracks} from './pages';

const GlobalStyle = createGlobalStyle`
  :root {
    --black: #121212;
    --green: #1DB954;
    --white: #ffffff;

    --font: 'Circular Std', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  }

  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: var(--black);
    color: var(--white);
    font-family: var(--font);
  }
`;

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(state => access_token);

    async function fetchData() {
        const { data } = await getCurrentUserProfile();
        setProfile(state => data);
        console.log(data);
    };
    if (access_token) {catchErrors(fetchData())};
  }, []);

  return (
    <div className="App">
      <GlobalStyle/>
      <header className="App-header">
          <Router>
            <Routes>
              <Route path="/top-artists" element={<TopArtists />}/>
              <Route path="/top-tracks" element={<TopTracks />}/>
              <Route path="/playlists/:id" element={<Playlist />}/>
              <Route path="/playlists" element={<Playlists />}/>
              <Route path="/" element={<Login token={token} profile={profile}/>}/>
            </Routes>
          </Router>
      </header>
    </div>
  );
}

export default App;
