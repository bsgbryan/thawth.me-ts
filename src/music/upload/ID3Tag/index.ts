import artists from "../artists"
import encoders from "../encoders"
import titles from "../titles"
import webpage from "../webpage"

import {
	type OST,
	type RemixOfOSTTrack,
} from "../types"

import {
	type ID3Tags,
} from "./types"

export const process = (input: ID3Tags): RemixOfOSTTrack => {
	const set = input.TPOS?.data?.split('/') ?? []
	const track = input.TRCK?.data?.split('/') ?? []
	const title = titles(input)

	const ost: OST = {
		composer: input.TCOM?.data,
		console: input.TOPE?.data,
		copyright: input.TCOP?.data,
		game: input.TOAL?.data,
		title: title.original,
	};

	return {
		accompaniment: input.TPE2?.data,
		album: input.TALB?.data,
		artists: artists(input),
		catalog_number: input.TXXX?.data?.data,
		collection: {
			position: set[0] ? parseInt(set[0]) : undefined,
			count: set[1] ? parseInt(set[1]) : undefined,
		},
		cover_art: {
			format: input.APIC?.data?.format,
			data: input.APIC?.data?.data,
		},
		encoded_by: encoders(input),
		ost,
		published: {
			by: input.TPUB?.data,
			year: input.TYER?.data ? parseInt(input.TYER?.data) : undefined,
		},
		title: title.remix,
		track: {
			position: track[0] ? parseInt(track[0]) : undefined,
			count: track[1] ? parseInt(track[1]) : undefined,
		},
		webpage: webpage(input),
	}
}
