import { SectionWrapper, PlaylistsGrid } from "../components"
import { useState, useEffect } from "react";
import { axios } from 'axios';


export default function Playlists({ playlists }) {
    const [playlistArray, setPlaylistArray] = useState([]);

    console.log(playlists)
    useEffect(() => {
        setPlaylistArray(state => playlists.items);
    }, [])
    useEffect(() => {
        if (!playlists) { return }
        const fetchMoreData = async () => {
            if (playlists.next) {
                const {data} = await axios.get(playlists.next);


            }
        }
    }, [])
    return (
        <main>
            <SectionWrapper title="Public Playlists" breadcrumb={true}>
                {playlists && (
                    <PlaylistsGrid playlists={playlists.items} />
                )}
            </SectionWrapper>
        </main>
    );
}