import { useState, useEffect } from 'react';
import { catchErrors } from '../utils';
import { getCurrentUserProfile } from '../spotify';

const Profile = ({ profile }) => {
    //   const [profile, setProfile] = useState(null);

    //   useEffect(() => {
    //     const fetchData = async () => {
    //       const { data } = await getCurrentUserProfile();
    //       setProfile(state => data);
    //     };

    //     catchErrors(fetchData());
    //   }, []);

    return (
        <>
            {profile && (
                <div className='container'>
                    <div className='picture'> {profile.images.length && profile.images[0].url && (
                        <img src={profile.images[0].url} alt="Avatar" />
                    )}</div>
                    <div className='info'>
                        <h1>{profile.display_name}</h1>
                        <p>{profile.followers.total} Followers</p>
                    </div>
                </div>


                // <div>
                //   <h1>{profile.display_name}</h1>
                //   <p>{profile.followers.total} Followers</p>
                //   {profile.images.length && profile.images[0].url && (
                //     <img src={profile.images[0].url} alt="Avatar"/>
                //   )}
                // </div>
            )}
        </>
    )
};

export default Profile;