import type { ID3Tags } from "../ID3Tag/types"
import type { Artists, Credits } from "../types"

export default (input: ID3Tags): Artists => {
	const tokens = input.TPE1?.data?.split('feat.') ?? []
	const comment = input.comment
	const segments = comment?.text.trim().split('\r\n') ?? []
	const blank = segments?.findIndex(s => s === '') + 1
	const listed = comment?.text.split('\r\n').slice(blank) ?? []
	const primary: Credits = {}
	const featuring: Credits = {}
	const p = tokens[0]?.
		trim().
		split(',').
		map(t => t.trim())

	const f = tokens[1]?.
		trim().
		split(',').
		map(t => t.trim())

	for (const t of p ?? []) {
		const credit = listed.find(l => l.startsWith(t))
		const contributions = credit?.
			split(':')[1]?.
			split(',').
			map(l => l.trim())

		primary[t] = contributions || []
	}

	for (const t of f ?? []) {
		const credit = listed.find(l => l.startsWith(t))
		const contributions = credit?.
			split(':')[1]?.
			split(',').
			map(l => l.trim())

		featuring[t] = contributions || []
	}

	return {
		featuring,
		primary,
	}
}
