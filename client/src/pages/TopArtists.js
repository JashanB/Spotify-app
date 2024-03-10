import { SectionWrapper, ArtistsGrid } from "../components"
import { useState, useEffect } from "react"
import { getTopArtists } from "../spotify";
import { catchErrors } from '../utils';

export default function TopArtists({ topArtists }) {
    const [activeRage, setActiveRange] = useState(null);
    const [artistsObj, setArtistsObj] = useState({
        'short_term': [],
        'medium_term': [],
        'long_term': []
    });

    useEffect(() => {
        if (topArtists && topArtists.items && topArtists.items.length > 1) {
            // console.log('setting top artists')
            setArtistsObj(state => ({
                ...state,
                'short_term': topArtists.items
            }))
        }
        async function fetchArtists() {
            const mediumTermTopArtists = await getTopArtists('medium_term');
            const longTermTopArtists = await getTopArtists('long_term');
            // console.log(mediumTermTopArtists)
            // console.log(longTermTopArtists)
            setArtistsObj(state => ({
                ...state,
                'medium_term': mediumTermTopArtists.data.items,
                'long_term': longTermTopArtists.data.items
            }))
            // console.log('setting artists obj')
            // console.log({artistsObj})

        }
        if (topArtists) {
            // console.log('calling fetch art')
            catchErrors(fetchArtists())
        };
    }, [])
    //currently fetching short range artists
    //want to fetch medium and long term 
    //can fetch all in background, or fetch when clicked
    //set active range array to artists when needed
    //make obj with artists 
    console.log(artistsObj)

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