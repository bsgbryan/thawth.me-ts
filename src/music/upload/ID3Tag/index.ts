import type { Encoder, ID3Tags, OST, RemixOfOSTTrack } from "./types"

export const process = (input: ID3Tags): RemixOfOSTTrack => {
	const set = input.TPOS.data.split('/')
	const track = input.TRCK.data.split('/')
	const encoders: Encoder[] = input.TENC.data.split(',').map(e => {
		const tokens = e.split('(')
		const name = tokens[0]?.trim()!
		const t = tokens[1]?.trim()
		const email = t?.substring(0, t.length - 1)!

		return { name, email }
	})
	
	const tokens = input.TIT2.data.split('(')
	const remix = tokens[0]?.trim()
	const t = tokens[1]?.trim()
	const original = t?.substring(0, t.length - 1)
	
	const ost: OST = {
		composer: input.TCOM.data,
		console: input.TOPE.data,
		copyright: input.TCOP.data,
		game: input.TOAL.data,
		title: original!,
	};

	return {
		album: input.TALB.data,
		artist: input.TPE1.data,
		catalog_number: input.TXXX.data.data,
		collection: {
			position: parseInt(set[0]!),
			count: parseInt(set[1]!),
		},
		cover_art: {
			format: input.APIC.data.format,
			data: input.APIC.data.data,
		},
		encoded_by: encoders,
		ost,
		published: {
			by: input.TPUB.data,
			year: parseInt(input.TYER.data),
		},
		title: remix!,
		track: {
			position: parseInt(track[0]!),
			count: parseInt(track[1]!),
		},
		webpage: input.WOAR.data,
	}
}
