import { logout } from '../spotify';
import styled from 'styled-components/macro';

export default function Login(props) {

    const StyledLoginButton = styled.a`
    background-color:green;
    color: white;
    padding: 10px 20px;
    margin: 20px auto;
    border-radius: 30px;
    display: inline-block;
    `

    return (
        <div>
            {!props.token ? (
                <StyledLoginButton href="/login">Log in to Spotify</StyledLoginButton>
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