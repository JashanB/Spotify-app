import { SectionWrapper, TrackList } from "../components"
import { getPlaylistById, getAudioFeaturesForTracks } from "../spotify"
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
    const [audioFeatures, setAudioFeatures] = useState(null);
    const [sortValue, setSortValue] = useState('');
    const [sortOptions, setSortOptions] = useState(['danceability', 'tempo', 'energy']);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getPlaylistById(id);
            setPlaylist(data);
            //make copy of data to modify for fetch more data
            setTracksData(data.tracks);
            //create array of tracks
            if (data.tracks.items) { setTracksArray(data.tracks.items) };
        };
        catchErrors(fetchData());
    }, [id]);

    useEffect(() => {
        if (!playlist) { return }
        const fetchMoreData = async () => {
            if (tracksData && tracksData.next) {
                const { data } = await axios.get(tracksData.next);
                if (data.items && tracksArray && tracksArray.length + data.items.length <= data.total) {
                    setTracksArray(state => [...state, ...data.items]);
                    setTracksData(data);
                }
            }
        }
        catchErrors(fetchMoreData());

        const fetchAudioFeatures = async () => {
            console.log(tracksData)
            const ids = tracksData.items.map(({ track }) => track.id).
                join(',');
            const { data } = await getAudioFeaturesForTracks(ids);
            console.log(data)
            setAudioFeatures(audioFeatures => ([
                ...audioFeatures ? audioFeatures : [],
                ...data['audio_features']
            ]));
        }
        catchErrors(fetchAudioFeatures());

    }, [tracksData]);

    const tracksForTracklist = useMemo(() => {
        if (!tracksArray) {
            return;
        }
        return tracksArray.map(({ track }) => track);
    }, [tracksArray]);

    // Map over tracks and add audio_features property to each track
    const tracksWithAudioFeatures = useMemo(() => {
        if (!tracksArray || !audioFeatures) {
            return null;
        }

        return tracksArray.map(({ track }) => {
            const trackToAdd = track;

            if (!track.audio_features) {
                const audioFeaturesObj = audioFeatures.find(item => {
                    if (!item || !track) {
                        return null;
                    }
                    return item.id === track.id;
                });

                trackToAdd['audio_features'] = audioFeaturesObj;
            }

            return trackToAdd;
        });
    }, [tracksArray, audioFeatures]);

    // Sort tracks by audio feature to be used in template
    const sortedTracks = useMemo(() => {
        if (!tracksWithAudioFeatures) {
            return null;
        }

        return [...tracksWithAudioFeatures].sort((a, b) => {
            const aFeatures = a['audio_features'];
            const bFeatures = b['audio_features'];

            if (!aFeatures || !bFeatures) {
                return false;
            }

            return bFeatures[sortValue] - aFeatures[sortValue];
        });
    }, [sortValue, tracksWithAudioFeatures]);

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
                            <div>
                                <label className="sr-only" htmlFor="order-select">Sort tracks</label>
                                <select
                                    name="track-order"
                                    id="order-select"
                                    onChange={e => setSortValue(e.target.value)}
                                >
                                    <option value="">Sort tracks</option>
                                    {sortOptions.map((option, i) => (
                                        <option value={option} key={i}>
                                            {`${option.charAt(0).toUpperCase()}${option.slice(1)}`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {sortedTracks && (
                                <TrackList tracks={sortedTracks} />
                            )}
                        </SectionWrapper>
                    </main>
                </>
            )}
        </>
    )
}