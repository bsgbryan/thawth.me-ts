import { ImageFormat } from './ID3Tag/types'

export type Artist = {
	[name: string]: string[]
}

export type Artists = {
	primary: Credits
	featuring: Credits
}

export enum Console {
	SNES = 'SNES',
}

export type CoverArt = {
	data?: Uint8Array,
	format?: ImageFormat,
}

export type Credits = {
	[name: string]: string[]
}

export type Encoder = {
	name?: string
	email?: string
}

export type OST = {
	copyright?: string
	composer?: string
	console?: Console
	game?: string
	title?: string
}

export type PositionInCount = {
	count?: number
	position?: number
}

export type Published = {
	by?: string
	year?: number
}

export type RemixOfOSTTrack = {
	accompaniment?: string
	album?: string
	artists: Artists
	catalog_number?: string
	collection: PositionInCount
	cover_art: CoverArt
	encoded_by: Encoder[],
	lyrics?: string[]
	ost: OST
	published: Published
	title?: string
	track: PositionInCount
	webpage?: string
}

export type Titles = {
	original?: string
	remix?: string
}
