import {
	describe,
	expect,
	it,
} from "bun:test"

import {
  TagName,
	TextData,
	type ID3Tags,
	type Tag,
} from "../ID3Tag/types"

import artists from "."

const comment = (text: string): TextData => ({
	language: "english",
	short_description: "A comment used for testing",
	text,
})

const tag = (data: string): Tag<string, TagName.TPE1> => ({
	data,
	description: "A tag used for testing",
	id: TagName.TPE1,
	size: 42,
})

describe('artists', () => {
	it('returns an object with a primary property and a featuring property', () => {
		const tags: ID3Tags = { TPE1: tag('Bon JonJovy') }
		const result = artists(tags)

		expect(result.primary).toBeDefined()
		expect(result.featuring).toBeDefined()
	})

	describe('the primary property', () => {
		it('is an object whose keys are artist names', () => {
			const tags: ID3Tags = { TPE1: tag('Bon JonJovy') }
			const result = artists(tags)

			expect(result.primary).toEqual({
				'Bon JonJovy': []
			})
		})

		it('reads the TPE1 property as a comma-delimited list', () => {
			const tags: ID3Tags = { TPE1: tag('Bon JonJovy, Com Truise') }
			const result = artists(tags)

			expect(result.primary).toEqual({
				'Bon JonJovy': [],
				'Com Truise': [],
			})
		})

		it('looks for contributions per-artist in the comment property', () => {
			const tags: ID3Tags = {
				comment: comment('http://example.url\r\n\r\nBon JonJovy: guitar, vocals\r\nCom Truise: the need, for speed'),
				TPE1: tag('Bon JonJovy, Com Truise'),
			}

			const result = artists(tags)

			expect(result.primary).toEqual({
				'Bon JonJovy': ['guitar', 'vocals'],
				'Com Truise': ['the need', 'for speed'],
			})
		})
	})

	describe('the featuring property', () => {
		it('reads any name after the token "feat." as a featured artist name', () => {
			const tags: ID3Tags = { TPE1: tag('Bon JonJovy feat. Com Truise') }
			const result = artists(tags)

			expect(result.featuring).toEqual({
				'Com Truise': []
			})
		})

		it('is an object whose keys are artist names', () => {
			const tags: ID3Tags = { TPE1: tag('Bon JonJovy feat. Com Truise') }
			const result = artists(tags)

			expect(result.featuring).toEqual({
				'Com Truise': []
			})
		})

		it('reads the text after "feat." in the TPE1 property as a comma-delimited list', () => {
			const tags: ID3Tags = { TPE1: tag('Bon JonJovy feat. Com Truise, FooBar') }
			const result = artists(tags)

			expect(result.featuring).toEqual({
				'Com Truise': [],
				'FooBar': [],
			})
		})

		it('looks for contributions per-artist in the comment property', () => {
			const tags: ID3Tags = {
				comment: comment('http://example.url\r\n\r\nBon JonJovy: guitar, vocals\r\nCom Truise: the need, for speed'),
				TPE1: tag('Bon JonJovy feat. Com Truise'),
			}

			const result = artists(tags)

			expect(result.featuring).toEqual({
				'Com Truise': ['the need', 'for speed'],
			})
		})
	})
})
