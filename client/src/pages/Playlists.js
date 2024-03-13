import { SectionWrapper, PlaylistsGrid, Loader } from "../components"
import { useState, useEffect } from "react";
import axios from 'axios';
import { catchErrors } from '../utils';

export default function Playlists({ playlists }) {
    const [playlistArray, setPlaylistArray] = useState([]);
    const [currentPlaylistData, setCurrentPlaylistData] = useState(null);

    useEffect(() => {
        if (playlists && playlistArray && playlistArray.length === 0) {
            setPlaylistArray(state => playlists.items);
            setCurrentPlaylistData(state => playlists);
        };
    }, [playlists]);

    useEffect(() => {
        if (!playlists) { return }
        const fetchMoreData = async () => {
            if (currentPlaylistData && currentPlaylistData.next) {
                const { data } = await axios.get(currentPlaylistData.next);
                setCurrentPlaylistData(state => data);
                setPlaylistArray(state => [...state, ...data.items],)
            }
        }
        catchErrors(fetchMoreData());
    }, [currentPlaylistData])

    return (
        <main>
            <SectionWrapper title="Public Playlists" breadcrumb={true}>
                {playlists ? (
                    <PlaylistsGrid playlists={playlistArray.length && playlistArray} />
                ) :
                    (
                        <Loader />
                    )}
            </SectionWrapper>
        </main>
    );
}