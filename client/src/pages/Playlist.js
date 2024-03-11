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
    }, [id])

    return (
        <>
            {playlist && (
                <>
                    <StyledHeader>
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
                </>
            )}

        </>
    )
}