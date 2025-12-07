import { Component } from "@bsgbryan/rnzlr"
import { readTags } from "./functions"
import type { RemixOfOSTTrack } from "./types"

import Collection from "./Collection"
import OST from "./OST"
import Track from "./Track"
import Published from "./Published"
import Artists from "./Artists"
import CoverArt from "./CoverArt"
import Encoders from "./Encoders"
import Lyrics from "./Lyrics"

import "./styles.scss"

const Section = ({
	artists,
	collection,
	cover_art,
	encoded_by,
	ost,
	published,
	track,
	album,
	catalog_number,
	lyrics,
	title,
	webpage,
}: RemixOfOSTTrack) =>
	<section id="song">
		<div clazz="fields">
			<div clazz="field album">
				<h3>Album</h3>
				<p>{album}</p>
			</div>
			<div clazz="field title">
				<h3>Title</h3>
				<p>{title}</p>
			</div>
			<Track {...track} />
			<Collection {...collection} />
			<Published {...published} />
			<div clazz="field catalog-number">
				<h3>Catalog Number</h3>
				<p>{catalog_number}</p>
			</div>
			<div clazz="field webpage">
				<h3>Webpage</h3>
				<p>{webpage}</p>
			</div>
		</div>
		<OST {...ost} />
		<div clazz="fields">
			<Artists {...artists} />
			<Encoders people={encoded_by} />
		</div>
		<CoverArt {...cover_art} />
		<Lyrics lines={lyrics} />
	</section>

type Props = {
	callbacks: {
		render: CallableFunction
	}
}

const init = ({ callbacks: { render }}: Props) =>
	<form name="upload">
		<input type="file" id="file" onChange={readTags(render(Section))} />
	</form>

export default Component(init)
