import type { Encoder, ID3Tags } from "./ID3Tag/types"

export default (input: ID3Tags): Encoder[] =>
	input.TENC.data.split(',').map(e => {
		const tokens = e.split('(')
		const name = tokens[0]?.trim()!
		const t = tokens[1]?.trim()
		const email = t?.substring(0, t.length - 1)!

		return { name, email }
	})