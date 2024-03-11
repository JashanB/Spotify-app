import { SectionWrapper, PlaylistsGrid } from "../components"
import { useState, useEffect } from "react";
import axios from 'axios';
import { catchErrors } from '../utils';

export default function Playlists({ playlists }) {
    const [playlistArray, setPlaylistArray] = useState([]);
    const [currentPlaylistData, setCurrentPlaylistData] = useState(null);

    useEffect(() => {
        if (playlists) {
            setPlaylistArray(state => playlists.items);
            setCurrentPlaylistData(state => playlists);
        };
    }, [playlists]);

    if (playlists) {console.log('next', playlists.next)}

    useEffect(() => {
        if (!playlists) { return }
        const fetchMoreData = async () => {
            if (currentPlaylistData.next) {
                console.log('next', currentPlaylistData.next)

                const {data} = await axios.get(currentPlaylistData.next);
                setCurrentPlaylistData(state => data);
                setPlaylistArray(state => [...state, ...currentPlaylistData.items], )
            }
        }
        catchErrors(fetchMoreData());
    }, [currentPlaylistData])

    console.log(playlistArray)

    return (
        <main>
            <SectionWrapper title="Public Playlists" breadcrumb={true}>
                {playlists && (
                    <PlaylistsGrid playlists={playlistArray.length > 1 && playlistArray} />
                )}
            </SectionWrapper>
        </main>
    );
}