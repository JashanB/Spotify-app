import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { access_token, logout, getCurrentUserProfile } from './spotify';
import { catchErrors } from './utils';

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
          <a
            className="App-link"
            href="http://localhost:8000/login"
            target="_blank"
            rel="noopener noreferrer"
          >
            Log in to spotify
          </a>
        ) : (
          <div>
            <h1>Logged in!</h1>
            <button onClick={logout}>Log out</button>
            {profile && (
              <div>
                <h1>{profile.display_name}</h1>
                <p>Followers: {profile.followers.total}</p>
                {profile.images.length > 0 && profile.images[0].url && (
                  <img src={profile.images[0].url} alt="avatar"></img>
                )
                }
              </div>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
