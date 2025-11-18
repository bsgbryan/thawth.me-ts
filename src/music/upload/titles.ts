import type { ID3Tags } from "./ID3Tag/types"

import type { Titles } from "./types"

export default (input: ID3Tags): Titles => {
	const tokens = input.TIT2?.data?.split('(') ?? []
	const remix = input.TIT3?.data ?? tokens[0]?.trim() ?? "Unknown"
	const t = tokens[1]?.trim()
	const original = t?.substring(0, t.length - 1) ?? "Unknown"

	return {
		original,
		remix,
	}
}
