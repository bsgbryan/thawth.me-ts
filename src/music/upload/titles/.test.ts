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

import { Titles } from "../types"

import titles from "."

const tag = <T>(data: string, type: T): Tag<string, T> => ({
	data,
	description: "A tag used for testing",
	id: type,
	size: 42,
})

describe('titles', () => {
	it('extracts the original title from the parethesised value in the TIT2 property', () => {
		const tags: ID3Tags = { TIT2: tag<TagName.TIT2>('(Intro)', TagName.TIT2) }
		const result: Titles = titles(tags)

		expect(result).toEqual({ original: 'Intro' })
	})

	it('extracts the remix title from the TIT3 property', () => {
		const tags: ID3Tags = { TIT3: tag<TagName.TIT3>('Opening', TagName.TIT3) }
		const result: Titles = titles(tags)

		expect(result).toEqual({ remix: 'Opening' })
	})

	it('extracts the remix from the TIT2 property when the TIT3 property is not available', () => {
		const tags: ID3Tags = { TIT2: tag<TagName.TIT2>('Opening', TagName.TIT2) }
		const result: Titles = titles(tags)

		expect(result).toEqual({ remix: 'Opening' })
	})

	it('gives presedence to the TIT3 property when both TIT2 & TIT3 are available', () => {
		const tags: ID3Tags = {
			TIT2: tag<TagName.TIT2>('Opening (Intro)', TagName.TIT2),
			TIT3: tag<TagName.TIT3>('Remix Title', TagName.TIT3)
		}

		const result: Titles = titles(tags)

		expect(result).toEqual({
			original: 'Intro',
			remix: 'Remix Title',
		})
	})

	it('extracts both the original & remix titles from the TIT2 property, when available', () => {
		const tags: ID3Tags = { TIT2: tag<TagName.TIT2>('Opening (Intro)', TagName.TIT2) }

		const result: Titles = titles(tags)

		expect(result).toEqual({
			original: 'Intro',
			remix: 'Opening',
		})
	})
})
