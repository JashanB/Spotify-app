import styled, { createGlobalStyle } from 'styled-components/macro';
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import { GlobalStyle } from './styles';
import { access_token, getCurrentUserProfile, logout, getCurrentUserPlaylists, getTopArtists, getTopTracks } from './spotify';
import { catchErrors } from './utils';
import { Login, Profile, Playlist, Playlists, TopArtists, TopTracks } from './pages';

// Scroll to top of page when changing routes
// https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const StyledLogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0,0,0,.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }
`;

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null)
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);

  useEffect(() => {
    setToken(state => access_token);

    async function fetchData() {
      const userProfile = await getCurrentUserProfile();
      setProfile(state => userProfile.data);
      console.log(userProfile.data);

      const userPlaylists = await getCurrentUserPlaylists();
      setPlaylists(state => userPlaylists.data);
      console.log(userPlaylists.data)

      const usersTopArtists = await getTopArtists();
      setTopArtists(state => usersTopArtists.data);
      console.log(usersTopArtists.data)

      const usersTopTracks = await getTopTracks();
      setTopTracks(state => usersTopTracks.data);
      console.log(usersTopTracks.data)

    };
    if (access_token) { catchErrors(fetchData()) };

  }, []);

  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
        <Router>
          <ScrollToTop />
          {token && <StyledLogoutButton onClick={logout}>Logout</StyledLogoutButton>}
          <Routes>
            <Route path="/top-artists" element={<TopArtists topArtists={topArtists} />} />
            <Route path="/top-tracks" element={<TopTracks topTracks={topTracks}/>} />
            <Route path="/playlists/:id" element={<Playlist />} />
            <Route path="/playlists" element={<Playlists />} />
            {!token ? (<Route path="/" element={<Login token={token} profile={profile} />} />
            ) : (<Route path="/" element={<Profile
              profile={profile}
              playlists={playlists}
              topArtists={topArtists}
              topTracks={topTracks}
            />} />)}
            {/* <Route path="/" element={<Login token={token} profile={profile}/>}/>
              <Route path="/" element={<Profile profile={profile}/>}/> */}
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
