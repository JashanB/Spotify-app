import logo from './logo.svg';
import './App.css';
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

  return (
    <div className="App">
      <header className="App-header">
      {!token ? (
          <a className="App-link" href="http://localhost:8000/login">
            Log in to Spotify
          </a>
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
