import { SectionWrapper, ArtistsGrid } from "../components"
import { useState, useEffect } from "react"
import { getTopArtists } from "../spotify";
import { catchErrors } from '../utils';

export default function TopArtists({ topArtists }) {
    const [activeRange, setActiveRange] = useState(null);
    const [activestate, setActiveState] = useState('short_term');
    const [artistsObj, setArtistsObj] = useState({
        'short_term': [],
        'medium_term': [],
        'long_term': []
    });

    useEffect(() => {
        if (topArtists && topArtists.items && topArtists.items.length > 1) {
            setActiveRange(state => topArtists.items);
            setArtistsObj(state => ({
                ...state,
                'short_term': topArtists.items
            }))
        }
        async function fetchArtists() {
            const mediumTermTopArtists = await getTopArtists('medium_term');
            const longTermTopArtists = await getTopArtists('long_term');
            setArtistsObj(state => ({
                ...state,
                'medium_term': mediumTermTopArtists.data.items,
                'long_term': longTermTopArtists.data.items
            }))
        }
        if (topArtists) { catchErrors(fetchArtists()) };
    }, [topArtists])

    function changeActiveRange(range) {
        setActiveState(state => range);
        setActiveRange(state => artistsObj[range])
    }

    return (
        <main>
            <ul>
                <li>
                    <button className={activestate === 'short_term' ? 'active' : ''} onClick={() => changeActiveRange('short_term')} >This Month</button>
                </li>
                <li>
                    <button className={activestate === 'medium_term' ? 'active' : ''} onClick={() => changeActiveRange('medium_term')} >Last 6 Months</button>
                </li>
                <li>
                    <button className={activestate === 'long_term' ? 'active' : ''} onClick={() => changeActiveRange('long_term')} >All Time</button>
                </li>
            </ul>
            {topArtists && (
                <SectionWrapper title="Top Artists" breadcrumb="true">
                    <ArtistsGrid artists={activeRange && activeRange.slice(0, 10)} />
                </SectionWrapper>
            )}
        </main>
    )
}