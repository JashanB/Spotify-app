import { SectionWrapper, ArtistsGrid } from "../components"

export default function TopArtists({ topArtists }) {
    return (
        <main>
            <ul>
                <li><button onClick={}>This Month</button></li>
                <li><button onClick={}>Last 6 Months</button></li>
                <li><button onClick={}>All Time</button></li>
            </ul>
            {topArtists && (
                <SectionWrapper title="Top Artists" breadcrumb="true">
                    <ArtistsGrid artists={topArtists.items.slice(0, 10)} />
                </SectionWrapper>
            )}
        </main>
    )
}