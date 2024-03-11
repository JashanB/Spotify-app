import { SectionWrapper, TrackList } from "../components"
import { getPlaylistById } from "../spotify"
import { useState, useEffect, useMemo } from 'react';
import { useParams } from "react-router-dom"
import { StyledHeader } from "../styles"
import { catchErrors } from "../utils"
import axios from "axios";

export default function Playlist() {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [tracksData, setTracksData] = useState(null);
    // const [tracks, setTracks] = useState(null);
    const [tracksArray, setTracksArray] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getPlaylistById(id);
            setPlaylist(data);
            setTracksData(data.tracks);
            setTracksArray(data.tracks.items)
        };

        catchErrors(fetchData());
    }, [id]);
    // console.log(playlist)
    console.log('old data', playlist)
    // When tracksData updates, compile arrays of tracks and audioFeatures
    useEffect(() => {
        if (!playlist) { return }
        const fetchMoreData = async () => {
            if (tracksData && tracksData.next) {
                const {data} = await axios.get(tracksData.next);
                console.log('new data', data)
                setTracksData(state => data);
                if  (data.items) {setTracksArray(state => [...state, ...data.items] )};
            }
        }
        catchErrors(fetchMoreData());
    }, [tracksData]);

    if (tracksArray) {console.log(tracksArray.length)}
    // const tracksForTracklist = useMemo(() => {
    //     if (!tracks) {
    //         return;
    //     }
    //     return tracks.map(({ track }) => track);
    // }, [tracks]);

    return (
        <>
            {playlist && (
                <>
                    <StyledHeader breadcrumb="true">
                        <div className="header__inner">
                            {playlist.images.length && playlist.images[0].url && (
                                <img className="header__img" src={playlist.images[0].url} alt="Playlist Artwork" />
                            )}
                            <div>
                                <div className="header__overline">Playlist</div>
                                <h1 className="header__name">{playlist.name}</h1>
                                <p className="header__meta">
                                    {playlist.followers.total ? (
                                        <span>{playlist.followers.total} {`follower${playlist.followers.total !== 1 ? 's' : ''}`}</span>
                                    ) : null}
                                    <span>{playlist.tracks.total} {`song${playlist.tracks.total !== 1 ? 's' : ''}`}</span>
                                </p>
                            </div>
                        </div>
                    </StyledHeader>
{/* 
                    <main>
                        <SectionWrapper title="Playlist" breadcrumb={true}>
                            {tracksForTracklist && (
                                <TrackList tracks={tracksForTracklist} />
                            )}
                        </SectionWrapper>
                    </main> */}
                </>
            )}
        </>
    )
}