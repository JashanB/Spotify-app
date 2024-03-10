import { SectionWrapper, ArtistsGrid } from "../components"
import { useState, useEffect } from "react"
import { getTopArtists } from "../spotify";

export default function TopArtists({ topArtists }) {
    const [activeRage, setActiveRange] = useState(null);
    const [artistsObj, setArtistsObj] = useState({
        'short_term': [],
        'medium_term': [],
        'long_term': []
    });

    useEffect(() => {
        if (topArtists && topArtists.items && topArtists.items.length > 1) {
            setArtistsObj(state => ({
                ...state,
                'short_term': topArtists.items
            }))
        }
        console.log(artistsObj)
        async function fetchArtists() {
            const mediumTermTopArtists = await getTopArtists('medium_term');
            const longermTopArtists = await getTopArtists('long_term');
            // setTopArtists(state => usersTopArtists.data);

        }
    }, [])
    //currently fetching short range artists
    //want to fetch medium and long term 
    //can fetch all in background, or fetch when clicked
    //set active range array to artists when needed
    //make obj with artists 

    return (
        <main>
            <ul>
                <li><button >This Month</button></li>
                <li><button >Last 6 Months</button></li>
                <li><button >All Time</button></li>
            </ul>
            {topArtists && (
                <SectionWrapper title="Top Artists" breadcrumb="true">
                    <ArtistsGrid artists={topArtists.items.slice(0, 10)} />
                </SectionWrapper>
            )}
        </main>
    )
}