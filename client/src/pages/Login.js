import { logout } from '../spotify';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

const StyledLoginButton = styled(Link)`
background-color:green;
color: white;
padding: 10px 20px;
margin: 20px auto;
border-radius: 30px;
display: inline-block;
`

export default function Login(props) {

    return (
        <div>
            {!props.token ? (
                <StyledLoginButton to="http://localhost:8000/login">Log in to Spotify</StyledLoginButton>
                // <Link to="http://localhost:8000/login">Log in to Spotify</Link>

            ) : (
                <div>
                    <button onClick={logout}>Log Out</button>
                    {props.profile && (
                        <div>
                            <h1>{props.profile.display_name}</h1>
                            <p>{props.profile.followers.total} Followers</p>
                            {props.profile.images.length && props.profile.images[0].url && (
                                <img src={props.profile.images[0].url} alt="Avatar" />
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}