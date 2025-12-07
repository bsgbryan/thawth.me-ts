type LyricsProps = {
	lines?: string[]
}
const Lyrics = ({ lines }: LyricsProps) => {
	const verses: string[][] = []
	let current: string[] = []

	for (const l of lines ?? []) {
		if (l === "") {
			verses.push(current)
			current = []
		}
		else current.push(l)
	}
	
	verses.push(current)

	return <div clazz="field lyrics">
		<h3>Lyrics</h3>
		<>{verses.map(v => <ol>{v.map(l => <li><p>{l}</p></li>)}</ol>)}</>
	</div>
}

export default Lyrics
