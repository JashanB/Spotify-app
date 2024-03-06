import styled, { createGlobalStyle } from 'styled-components/macro';
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import { GlobalStyle } from './styles';
import { access_token, getCurrentUserProfile } from './spotify';
import { catchErrors } from './utils';
import {Login} from './pages';
import {Playlist} from './pages';
import {Playlists} from './pages';
import {Profile} from './pages';
import {TopArtists} from './pages';
import {TopTracks} from './pages';

// Scroll to top of page when changing routes
// https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

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
            <ScrollToTop/>
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
