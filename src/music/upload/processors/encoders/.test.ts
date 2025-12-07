import {
	describe,
	expect,
	it,
} from "bun:test"

import {
  TagName,
	type ID3Tags,
	type Tag,
} from "../ID3Tag/types"

import { Encoder } from "../types"

import encoders from "."

const tag = (data: string): Tag<string, TagName.TENC> => ({
	data,
	description: "A tag used for testing",
	id: TagName.TENC,
	size: 42,
})

describe('encoders', () => {
	it('extracts a list of names from the TENC property', () => {
		const tags: ID3Tags = { TENC: tag('Morgoth, Frodo') }
		const result: Encoder[] = encoders(tags)

		expect(result).toEqual([
			{ name: 'Morgoth' },
			{ name: 'Frodo' },
		])
	})

	it('extracts a list of email addresses from the TENC property', () => {
		const tags: ID3Tags = { TENC: tag('(mgoth@middle.earth), (frodo420@hotmail.net)') }
		const result: Encoder[] = encoders(tags)

		expect(result).toEqual([
			{ email: 'mgoth@middle.earth' },
			{ email: 'frodo420@hotmail.net' },
		])
	})

	it('extracts a list of names and email addresses from the TENC property', () => {
		const tags: ID3Tags = { TENC: tag('Morgoth (mgoth@middle.earth), Frodo (frodo420@hotmail.net)') }
		const result: Encoder[] = encoders(tags)

		expect(result).toEqual([{
			email: 'mgoth@middle.earth',
			name: 'Morgoth'
		}, {
			email: 'frodo420@hotmail.net',
			name: 'Frodo',
		},
		])
	})
})
