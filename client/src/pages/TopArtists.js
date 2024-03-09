import { SectionWrapper, ArtistsGrid } from "../components"

export default function TopArtists({ topArtists }) {
    return (
        <>
            {topArtists && (
                <SectionWrapper title="Top artists this month" seeAllLink="/top-artists">
                    <ArtistsGrid artists={topArtists.items.slice(0, 10)} />
                </SectionWrapper>
            )}
        </>
    )
}