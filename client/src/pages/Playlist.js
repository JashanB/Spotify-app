import { SectionWrapper } from "../components"
import { getPlaylistById } from "../spotify"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { StyledHeader } from "../styles"
import { catchErrors } from "../utils"

export default function Playlist() {
    const { id } = useParams();;
    const [playlist, setPlaylist] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const { data } = await getPlaylistById(id);
            setPlaylist(state => data);
        }
        catchErrors(fetchData());
    })
    return (
        <>

        </>
    )
}