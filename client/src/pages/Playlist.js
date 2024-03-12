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
    const [tracksArray, setTracksArray] = useState([]);
    //make initial data state to save initial api call information - playlist


    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getPlaylistById(id);
            console.log('old data', data)
            setPlaylist(data);
            //make copy of data to modify for fetch more data
            setTracksData(data.tracks);
            //create array of tracks
            if (data.tracks.items) {setTracksArray(data.tracks.items)};
        };
        catchErrors(fetchData());
    }, [id]);

    useEffect(() => {
        if (!playlist) { return }
        const fetchMoreData = async () => {
            if (tracksData && tracksData.next && tracksArray && tracksArray.length < tracksData.total) {
                console.log('tracks array', tracksArray.length)
                console.log('total', tracksData.total)
                console.log('i ran')
                console.log(tracksData.next)
                const {data} = await axios.get(tracksData.next);
                // console.log('new data', data)
                setTracksData(data);
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