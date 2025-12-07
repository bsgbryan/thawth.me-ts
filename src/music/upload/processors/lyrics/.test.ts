import {
	describe,
	expect,
	it,
} from "bun:test"

import {
	type ID3Tags,
	type LyricData,
} from "../ID3Tag/types"

const tag = (text: string): LyricData => ({
	descriptor: "???",
	language: "english",
	text,
})

import lyrics from "."

describe('lyrics', () => {
	it('extracts the contents of the lyrics proeprty', () => {
		const tags: ID3Tags = { lyrics: tag('Example\r\nLa la la') }
		const result = lyrics(tags)
		
		expect(result).toEqual(['Example', 'La la la'])
	})
})