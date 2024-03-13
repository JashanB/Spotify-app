import { logout } from '../spotify';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

const StyledLoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledLoginButton = styled(Link)`
  display: inline-block;
  background-color: var(--green);
  color: var(--white);
  border-radius: var(--border-radius-pill);
  font-weight: 700;
  font-size: var(--fz-lg);
  padding: var(--spacing-sm) var(--spacing-xl);

  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
  }
`;

const LOGIN_URI =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8000/login'
    : 'https://spotify-app.herokuapp.com/login';


export default function Login(props) {

  return (
    <>
      {!props.token && (
        <StyledLoginContainer>
          <StyledLoginButton href={LOGIN_URI}>
            Log in to Spotify
          </StyledLoginButton>
        </StyledLoginContainer>
      )}
    </>
    // <div>
    //     {!props.token ? (
    //         <StyledLoginContainer>
    //             <StyledLoginButton to="http://localhost:8000/login">Log in to Spotify</StyledLoginButton>
    //         </StyledLoginContainer>

    //     ) : (
    //         <div>
    //             <button onClick={logout}>Log Out</button>
    //             {props.profile && (
    //                 <div>
    //                     <h1>{props.profile.display_name}</h1>
    //                     <p>{props.profile.followers.total} Followers</p>
    //                     {props.profile.images.length && props.profile.images[0].url && (
    //                         <img src={props.profile.images[0].url} alt="Avatar" />
    //                     )}
    //                 </div>
    //             )}
    //         </div>
    //     )}
    // </div>
  )
}