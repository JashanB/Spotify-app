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

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getPlaylistById(id);
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
            if (tracksData && tracksData.next) {
                const {data} = await axios.get(tracksData.next);
                if (data.items && tracksArray && tracksArray.length + data.items.length <= data.total) {
                    setTracksArray(state => [...state, ...data.items]);
                    setTracksData(data);
                }
            }
        }
        catchErrors(fetchMoreData());
      
    }, [tracksData]);
    
    const tracksForTracklist = useMemo(() => {
        if (!tracksArray) {
            return;
        }
        return tracksArray.map(({ track }) => track);
    }, [tracksArray]);

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

                    <main>
                        <SectionWrapper title="Playlist" breadcrumb={true}>
                            {tracksArray && (
                                <TrackList tracks={tracksForTracklist} />
                            )}
                        </SectionWrapper>
                    </main>
                </>
            )}
        </>
    )
    // const { id } = useParams();
    // const [playlist, setPlaylist] = useState(null);
    // const [tracksData, setTracksData] = useState(null);
    // const [tracks, setTracks] = useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const { data } = await getPlaylistById(id);
    //         setPlaylist(data);
    //         setTracksData(data.tracks);
    //     };

    //     catchErrors(fetchData());
    // }, [id]);
    // // console.log(tracksData)
    // // When tracksData updates, compile arrays of tracks and audioFeatures
    // useEffect(() => {
    //     if (!tracksData) {
    //         return;
    //     }

    //     // When tracksData updates, check if there are more tracks to fetch
    //     // then update the state variable
    //     const fetchMoreData = async () => {
    //         if (tracksData.next) {
    //           const { data } = await axios.get(tracksData.next);
    //           setTracksData(data);
    //         }
    //       };

    //     setTracks(state => ([
    //         ...state ? state : [],
    //         ...tracksData.items
    //     ]));

    //     catchErrors(fetchMoreData());
    // }, [tracksData]);

    // const tracksForTracklist = useMemo(() => {
    //     if (!tracks) {
    //         return;
    //     }
    //     return tracks.map(({ track }) => track);
    // }, [tracks]);
    
    // //have total # of tracks
    // //if total 150, have 100 initial and then next will return 50 so track length = 150. 
    // //make up system so if adding new tracks will set track length > total, don't
    // return (
    //     <>
    //         {playlist && (
    //             <>
    //                 <StyledHeader>
    //                     <div className="header__inner">
    //                         {playlist.images.length && playlist.images[0].url && (
    //                             <img className="header__img" src={playlist.images[0].url} alt="Playlist Artwork" />
    //                         )}
    //                         <div>
    //                             <div className="header__overline">Playlist</div>
    //                             <h1 className="header__name">{playlist.name}</h1>
    //                             <p className="header__meta">
    //                                 {playlist.followers.total ? (
    //                                     <span>{playlist.followers.total} {`follower${playlist.followers.total !== 1 ? 's' : ''}`}</span>
    //                                 ) : null}
    //                                 <span>{playlist.tracks.total} {`song${playlist.tracks.total !== 1 ? 's' : ''}`}</span>
    //                             </p>
    //                         </div>
    //                     </div>
    //                 </StyledHeader>

    //                 <main>
    //                     <SectionWrapper title="Playlist" breadcrumb={true}>
    //                         {tracksForTracklist && (
    //                             <TrackList tracks={tracksForTracklist} />
    //                         )}
    //                     </SectionWrapper>
    //                 </main>
    //             </>
    //         )}
    //     </>
    // )
}