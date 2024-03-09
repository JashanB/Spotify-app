import { StyledHeader } from '../styles';
import { ArtistsGrid, SectionWrapper } from '../components';

const Profile = ({ profile, playlists, topArtists }) => {

    return (
        <>
            {profile && (
                <>
                    <StyledHeader type="user">
                        <div className="header__inner">
                            {profile.images.length && profile.images[0].url && (
                                <img className="header__img" src={profile.images[0].url} alt="Avatar" />
                            )}
                            <div>
                                <div className="header__overline">Profile</div>
                                <h1 className="header__name">{profile.display_name}</h1>
                                <p className="header__meta">
                                    {playlists && (
                                        <span>{playlists.total} Playlist{playlists.total !== 1 ? 's' : ''}</span>
                                    )}
                                    <span>
                                        {profile.followers.total} Follower{profile.followers.total !== 1 ? 's' : ''}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </StyledHeader>
                </>
            )}
            {topArtists && (
                <main>
                    <SectionWrapper title="Top Artists this month" seeAllLink="/top-artists">
                        <ArtistsGrid artists={topArtists.items.slice(0, 10)}></ArtistsGrid>
                    </SectionWrapper>
                </main>
            )}
        </>
    )
};

export default Profile;