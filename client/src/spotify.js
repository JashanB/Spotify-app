import axios from'axios';

const LOCALSTORAGE_KEYS = {
    accessToken: 'spotify_access_token',
    refreshToken: 'spotify_refresh_token',
    expireTime: 'spotify_token_expire_time',
    timestamp: 'spotify_token_timestamp'
}

const LOCALSTORAGE_VALUES = {
    accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
    refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
    expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
    timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
}

function hasTokenExpired() {
    const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;
    if (!accessToken || !timestamp) { return false };
    const millisecondsElapsed = Date.now() - Number(timestamp);
    return (millisecondsElapsed / 1000) > Number(expireTime);
}

export function logout () {
    for (const property in LOCALSTORAGE_KEYS) {
        window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
    }
    //Navigate to homepage
    window.location = window.location.origin;
};

async function refreshToken() {
    try {
        // Logout if there's no refresh token stored or we've managed to get into a reload infinite loop
        if (!LOCALSTORAGE_VALUES.refreshToken ||
          LOCALSTORAGE_VALUES.refreshToken === 'undefined' ||
          (Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000) < 1000
        ) {
          console.error('No refresh token available');
          logout();
        }
    
        // Use `/refresh_token` endpoint from our Node app
        const { data } = await axios.get(`/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`);
    
        // Update localStorage values
        window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token);
        window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
    
        // Reload the page for localStorage updates to be reflected
        window.location.reload();
    
      } catch (e) {
        console.error(e);
      }
}

const getAccessToken = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryParams = {
        [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
        [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
        [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
      };
    const hasError = urlParams.get('error');

    // If there's an error OR the token in localStorage has expired, refresh the token
    if (hasError || hasTokenExpired() || LOCALSTORAGE_VALUES.accessToken === 'undefined') {
        refreshToken();
    }

    // If there is a valid access token in localStorage, use that
    if (LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== 'undefined') {
        return LOCALSTORAGE_VALUES.accessToken;
    }

    // If there is a token in the URL query params, user is logging in for the first time
    if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
        // Store the query params in localStorage
        for (const property in queryParams) {
            window.localStorage.setItem(property, queryParams[property]);
        }
        // Set timestamp
        window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
        // Return access token from query params
        return queryParams[LOCALSTORAGE_KEYS.accessToken];
    }

    return false;
    // return accessToken;

    // console.log(accessToken);
    // console.log(refreshToken);

    // if (refreshToken) {
    //   fetch(`/refresh_token?refresh_token=${refreshToken}`)
    //     .then(res => res.json())
    //     .then(data => console.log(data))
    //     .catch(err => console.error(err));
    // }
}
export const access_token = getAccessToken();

/**
 * Axios global request headers
 * https://github.com/axios/axios#global-axios-defaults
 */
axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers['Authorization'] = `Bearer ${access_token}`;
axios.defaults.headers['Content-Type'] = 'application/json';