import { SectionWrapper, PlaylistsGrid } from "../components"
import { useState, useEffect } from "react";
import axios from 'axios';
import { catchErrors } from '../utils';

export default function Playlists({ playlists }) {
    const [playlistArray, setPlaylistArray] = useState([]);

    console.log(playlists)
    useEffect(() => {
        if (playlists) {setPlaylistArray(state => playlists.items)};
    }, [playlists]);

    useEffect(() => {
        if (!playlists) { return }
        const fetchMoreData = async () => {
            if (playlists.next) {
                const {data} = await axios.get(playlists.next);
                console.log(data)
                setPlaylistArray(state => [...state, data], )
            }
        }
    }, [playlists])
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