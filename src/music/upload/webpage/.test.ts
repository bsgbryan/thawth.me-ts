import {
	describe,
	expect,
	it,
} from "bun:test"

import {
  TagName,
  type TextData,
	type ID3Tags,
	type Tag,
} from "../ID3Tag/types"

import webpage from "."

const comment = (text: string): TextData => ({
	language: "english",
	short_description: "A comment used for testing",
	text,
})

const tag = (data: string): Tag<string, TagName.WOAR> => ({
	data,
	description: "A tag used for testing",
	id: TagName.WOAR,
	size: 42,
})

describe('webpage', () => {
	it('extracts the webpage url from the WOAR property, when present', () => {
		const tags: ID3Tags = { WOAR: tag('https://example.com') }
		const result = webpage(tags)

		expect(result).toEqual('https://example.com')
	})
	
	it('extracts the webpage url from the comment property, when present', () => {
		const tags: ID3Tags = { comment: comment('https://example.com') }
		const result = webpage(tags)

		expect(result).toEqual('https://example.com')
	})
	
	it('gives preference to the comment property, when both WOAR & comment are present', () => {
		const tags: ID3Tags = {
			WOAR: tag('https://example.com'),
			comment: comment('https://used.example.com'),
		}

		const result = webpage(tags)

		expect(result).toEqual('https://used.example.com')
	})
})
