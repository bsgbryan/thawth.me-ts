import type { Credits, Artists as OCRemixArtists } from "./types"

type ArtistProps = {
	name: string
	contributions: string[]
}

const Artist = ({
	contributions,
	name,
}: ArtistProps) =>
	<li>
		<p>{name}</p>
		<ul clazz="contributions">
			{contributions?.map(c => <li><p>{c}</p></li>)}
		</ul>
	</li>

type ArtistsProps = {
	primary?: Credits
	featuring?: Credits
}

const Artists = ({
	featuring,
	primary,
}: ArtistsProps) =>
	<div clazz="field artists">
		<h3>Artists</h3>
		<h5>Primary</h5>
		<ul clazz="primary">
			{Object.entries(primary ?? {})
				.map(([name, contributions]) =>
					<Artist name={name} contributions={contributions} />
				)}
		</ul>
		<h5>Featuring</h5>
		<ul clazz="featuring">
			{Object.entries(featuring ?? {})
				.map(([name, contributions]) =>
					<Artist name={name} contributions={contributions} />
				)}
		</ul>
	</div>

export default Artists
