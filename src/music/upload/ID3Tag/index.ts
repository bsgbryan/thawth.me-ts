import artists from "../artists"
import encoders from "../encoders"
import titles from "../titles"
import webpage from "../../webpage"

import type { OST, RemixOfOSTTrack } from "../types"
import type { ID3Tags } from "./types"

export const process = (input: ID3Tags): RemixOfOSTTrack => {
	const set = input.TPOS.data.split('/')
	const track = input.TRCK.data.split('/')
	const title = titles(input)

	const ost: OST = {
		composer: input.TCOM.data,
		console: input.TOPE.data,
		copyright: input.TCOP.data,
		game: input.TOAL.data,
		title: title.original,
	};

	return {
		accompaniment: input.TPE2.data,
		album: input.TALB.data,
		artists: artists(input),
		catalog_number: input.TXXX.data.data,
		collection: {
			position: parseInt(set[0]!),
			count: parseInt(set[1]!),
		},
		cover_art: {
			format: input.APIC.data.format,
			data: input.APIC.data.data,
		},
		encoded_by: encoders(input),
		ost,
		published: {
			by: input.TPUB.data,
			year: parseInt(input.TYER.data),
		},
		title: title.remix,
		track: {
			position: parseInt(track[0]!),
			count: parseInt(track[1]!),
		},
		webpage: webpage(input),
	}
}
