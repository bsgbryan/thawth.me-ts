enum TagName {
	APIC = 'APIC',
	COMM = 'COMM',
	TALB = 'TALB',
	TCMP = 'TCMP',
	TCOM = 'TCOM',
	TCON = 'TCON',
	TCOP = 'TCOP',
	TENC = 'TENC',
	TIT1 = 'TIT1',
	TIT2 = 'TIT2',
	TIT3 = 'TIT3',
	TOAL = 'TOAL',
	TOPE = 'TOPE',
	TPE1 = 'TPE1',
	TPE2 = 'TPE2',
	TPOS = 'TPOS',
	TPUB = 'TPUB',
	TRCK = 'TRCK',
	TXXX = 'TXXX',
	TYER = 'TYER',
	WOAR = 'WOAR',
	WXXX = 'WXXX',
}

enum ImageFormat {
	png = 'image/png',
}

type Tag<D, N = TagName> = {
	data: D
	description: string
	id: N
	size: number
}

type ImageData = {
	data: ArrayBuffer
	description: string
	format: ImageFormat
	type: string
}

type TextData = {
	language: string
	short_description: string
	text: string
}

type DescriptionData = {
	data: string
	user_description: string
}

export type ID3Tags = {
	APIC: Tag<			ImageData, TagName.APIC>
	COMM: Tag< 			 TextData, TagName.COMM>
	TALB: Tag<	 			 string, TagName.TALB>
	TCMP: Tag<	 			 string, TagName.TCMP>
	TCOM: Tag<	 			 string, TagName.TCOM>
	TCON: Tag<	 			 string, TagName.TCON>
	TCOP: Tag<	 			 string, TagName.TCOP>
	TENC: Tag<	 			 string, TagName.TENC>
	TIT1: Tag<	 			 string, TagName.TIT1>
	TIT2: Tag<	 			 string, TagName.TIT2>
	TIT3: Tag<	 			 string, TagName.TIT3>
	TOAL: Tag<	 			 string, TagName.TOAL>
	TOPE: Tag<	 			Console, TagName.TOPE>
	TPE1: Tag<	 			 string, TagName.TPE1>
	TPE2: Tag<	 			 string, TagName.TPE2>
	TPOS: Tag<	 			 string, TagName.TPOS>
	TPUB: Tag<	 			 string, TagName.TPUB>
	TRCK: Tag<	 			 string, TagName.TRCK>
	TXXX: Tag<DescriptionData, TagName.TXXX>
	TYER: Tag<	 			 string, TagName.TYER>
	WOAR: Tag<	 			 string, TagName.WOAR>
	WXXX: Tag<	 			 string, TagName.WXXX>
}

type PositionInCount = {
	count: number
	position: number
}

export enum Console {
	SNES = 'SNES',
}

export type Encoder = {
	name: string
	email: string
}

export type OST = {
	composer: string
	console: Console
	game: string
	title: string
	copyright: string
}

type Published = {
	by: string
	year: number
}

export type RemixOfOSTTrack = {
	album: string
	artist: string
	catalog_number: string
	collection: PositionInCount
	// copyright: string
	cover_art: {
		data: ArrayBuffer,
		format: ImageFormat,
	}
	encoded_by: Encoder[],
	// game: string
	ost: OST
	published: Published
	title: string
	track: PositionInCount
	webpage: string
}
