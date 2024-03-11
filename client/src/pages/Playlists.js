import { SectionWrapper, PlaylistsGrid } from "../components"
import { useState, useEffect } from "react";
import axios from 'axios';
import { catchErrors } from '../utils';

export default function Playlists({ playlists, setPlaylists }) {
    const [playlistArray, setPlaylistArray] = useState([]);

    useEffect(() => {
        if (playlists) {setPlaylistArray(state => playlists.items)};
    }, [playlists]);
    if (playlists) {console.log('next', playlists.next)}

    useEffect(() => {
        if (!playlists) { return }
        const fetchMoreData = async () => {
            if (playlists.next) {
                console.log('next', playlists.next)
                const {data} = await axios.get(playlists.next);
                setPlaylists(state => data);
                setPlaylistArray(state => [...state, ...playlists.items], )

            }
        }
        catchErrors(fetchMoreData());
    }, [playlists])
    console.log(playlistArray)

    return (
        <main>
            <SectionWrapper title="Public Playlists" breadcrumb={true}>
                {playlists && (
                    <PlaylistsGrid playlists={playlists && playlists.items} />
                )}
            </SectionWrapper>
        </main>
    );
}