import { SectionWrapper, ArtistsGrid } from "../components"
import { useState, useEffect } from "react"
import { getTopArtists } from "../spotify";
import { catchErrors } from '../utils';

export default function TopArtists({ topArtists }) {
    const [activeRange, setActiveRange] = useState(null);
    const [artistsObj, setArtistsObj] = useState({
        'short_term': [],
        'medium_term': [],
        'long_term': []
    });

    useEffect(() => {
        if (topArtists && topArtists.items && topArtists.items.length > 1) {
            // console.log('setting top artists')
            setActiveRange(state => topArtists.items);
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
    }, [topArtists])

    function changeActiveRange (range) {
        console.log('range', range)
        setActiveRange(state => artistsObj[range])
    }
    // console.log(artistsObj)
    // console.log('active range', activeRange)

    return (
        <main>
            <ul>
                <li><button onClick={() => changeActiveRange('short_term')} >This Month</button></li>
                <li><button onClick={() => changeActiveRange('medium_term')} >Last 6 Months</button></li>
                <li><button onClick={() => changeActiveRange('long_term')} >All Time</button></li>
            </ul>
            {topArtists && (
                <SectionWrapper title="Top Artists" breadcrumb="true">
                    <ArtistsGrid artists={activeRange && activeRange.slice(0, 10)} />
                </SectionWrapper>
            )}
        </main>
    )
}