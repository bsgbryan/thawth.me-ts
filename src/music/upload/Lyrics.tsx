type LineProps = {
	words: string
}

const Line = ({ words }: LineProps) =>
	<li><p>{words}</p></li>

type LyricsProps = {
	lines?: string[]
}

const Verse = ({ lines }: LyricsProps) =>
	<ol>{lines?.map(l => <Line words={l} />)}</ol>

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

	return <div clazz="field lyrics">
		<h3>Lyrics</h3>
		<>{verses.map(v => <Verse lines={v} />)}</>
	</div>
}

export default Lyrics
