import artists from "../artists"
import encoders from "../encoders"
import titles from "../titles"
import webpage from "../../webpage"

import { Console, type OST, type RemixOfOSTTrack } from "../types"
import { ImageFormat, type ID3Tags } from "./types"

export const process = (input: ID3Tags): RemixOfOSTTrack => {
	const set = input.TPOS?.data?.split('/') ?? []
	const track = input.TRCK?.data?.split('/') ?? []
	const title = titles(input)

	const ost: OST = {
		composer: input.TCOM?.data ?? "Unknown",
		console: input.TOPE?.data ?? Console.Unknown,
		copyright: input.TCOP?.data ?? "Unknown",
		game: input.TOAL?.data ?? "Unknown",
		title: title.original,
	};

	return {
		accompaniment: input.TPE2?.data ?? "Unknown",
		album: input.TALB?.data ?? "Unknown",
		artists: artists(input),
		catalog_number: input.TXXX?.data?.data ?? "Unknown",
		collection: {
			position: parseInt(set[0] ?? "-1"),
			count: parseInt(set[1] ?? "-1"),
		},
		cover_art: {
			format: input.APIC?.data?.format ?? ImageFormat.unknown,
			data: input.APIC?.data?.data ?? new Uint8Array(),
		},
		encoded_by: encoders(input),
		ost,
		published: {
			by: input.TPUB?.data ?? "Unknown",
			year: parseInt(input.TYER?.data ?? "-1"),
		},
		title: title.remix,
		track: {
			position: parseInt(track[0] ?? "-1"),
			count: parseInt(track[1] ?? "-1"),
		},
		webpage: webpage(input),
	}
}
