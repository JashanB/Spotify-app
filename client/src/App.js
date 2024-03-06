import logo from './logo.svg';
import styled from 'styled-components/macro';
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { access_token, logout, getCurrentUserProfile } from './spotify';
import { catchErrors } from './utils';
import {Login} from './pages';
import {Playlist} from './pages';
import {Playlists} from './pages';
import {Profile} from './pages';
import {TopArtists} from './pages';
import {TopTracks} from './pages';

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
    catchErrors(fetchData());
  }, []);

  const StyledLoginButton = styled.a`
  background-color:green;
  color: white;
  padding: 10px 20px;
  margin: 20px auto;
  border-radius: 30px;
  display: inline-block;
  `

  return (
    <div className="App">
      <header className="App-header">
      {!token ? (
          <StyledLoginButton href="/login">Log in to Spotify</StyledLoginButton>
        ) : (
          <Router>
            <Routes>
              <Route path="/top-artists" element={<TopArtists />}/>
              <Route path="/top-tracks" element={<TopTracks />}/>
              <Route path="/playlists/:id" element={<Playlist />}/>
              <Route path="/playlists" element={<Playlists />}/>
              <Route path="/" element={<Login profile={profile}/>}/>
            </Routes>
          </Router>
        )}
      </header>
    </div>
  );
}

export default App;
