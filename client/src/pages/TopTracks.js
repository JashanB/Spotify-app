import { SectionWrapper, TrackList, TimeRangeButtons } from "../components"
import { useState, useEffect } from "react"
import { getTopTracks } from "../spotify";
import { catchErrors } from '../utils';

export default function TopTracks({ topTracks }) {
    const [activeRange, setActiveRange] = useState(null);
    const [activestate, setActiveState] = useState('short_term');
    const [tracksObj, setTracksObj] = useState({
        'short_term': [],
        'medium_term': [],
        'long_term': []
    });

    useEffect(() => {
        if (topTracks && topTracks.items && topTracks.items.length > 1) {
            setActiveRange(state => topTracks.items);
            setTracksObj(state => ({
                ...state,
                'short_term': topTracks.items
            }))
        }
        async function fetchArtists() {
            const mediumTermTopTracks = await getTopTracks('medium_term');
            const longTermTopTracks = await getTopTracks('long_term');
            setTracksObj(state => ({
                ...state,
                'medium_term': mediumTermTopTracks.data.items,
                'long_term': longTermTopTracks.data.items
            }))
        }
        if (topTracks) { catchErrors(fetchArtists()) };
    }, [topTracks])

    console.log(tracksObj)
    return (
        <main>
            {topTracks && (
                <SectionWrapper title="Top Tracks" breadcrumb="true">
                    <TimeRangeButtons
                        activestate={activestate}
                        setActiveState={setActiveState}
                        setActiveRange={setActiveRange}
                        tracksObj={tracksObj}
                        parent="tracks"
                    />
                    <TrackList tracks={activeRange && activeRange.slice(0, 10)} />
                </SectionWrapper>
            )}
        </main>
    )
}