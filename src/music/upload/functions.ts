import { process } from "./ID3Tag"

import type {
	OST,
	PositionInCount,
	Published,
	RemixOfOSTTrack,
} from "./types"

import "./styles.scss"

const artist = (name: string, contributions: string[], element: HTMLElement) => {
	const node = document.createElement('li')
	const name_element = document.createElement('p')
	const contributions_node = document.createElement('ul')

	name_element.textContent = name

	for (const c of contributions) {
		const contribution_node = document.createElement('li')
		const contributions_element = document.createElement('p')

		contributions_element.textContent = c

		contribution_node.appendChild(contributions_element)
		contributions_node.appendChild(contribution_node)
	}

	node.appendChild(name_element)
	node.appendChild(contributions_node)

	element.appendChild(node)
}

const artists = (data: RemixOfOSTTrack) => {
	const primary_element = document.querySelector('#song .artists.field ul.primary')! as HTMLImageElement
	const primary = data.artists.primary

	for (const [name, contributions] of Object.entries(primary))
		artist(name, contributions, primary_element)

	const featuring_element = document.querySelector('#song .artists.field ul.featuring')! as HTMLImageElement
	const featuring = data.artists.featuring

	for (const [name, contributions] of Object.entries(featuring))
		artist(name, contributions, featuring_element)
}

const cover_art = (data: RemixOfOSTTrack) => {
	if (data.cover_art.data) {
		const cover_art = document.querySelector('#song .cover-art.field img')! as HTMLImageElement
		const url = URL.createObjectURL(new Blob([new Uint8Array(data.cover_art.data).buffer]))
		cover_art.src = url
		cover_art.onload = e => URL.revokeObjectURL(url)
	}
}

const encoder = (name?: string, email?: string) => {
	const node = document.createElement('li')

	if (name) {
		const nameNode = document.createElement('p')

		nameNode.setAttribute('class', 'name')
		nameNode.textContent = name

		node.appendChild(nameNode)
	}

	if (email) {
		const emailNode = document.createElement('p')

		emailNode.setAttribute('class', 'email')
		emailNode.textContent = email

		node.appendChild(emailNode)
	}

	return node
}

const encoders = (data: RemixOfOSTTrack) => {
	const element = document.querySelector('#song .encoders.field ul')!

	for (const e of data.encoded_by) element.appendChild(encoder(e.name, e.email))
}

const field = (name: keyof RemixOfOSTTrack, data: RemixOfOSTTrack) => {
	if (data[name]) {
		const album = document.querySelector(`#song .${(name as string).replaceAll('_', '-')}.field p`)!

		album.textContent = data[name] as string
	}
}

const lyrics = (data: RemixOfOSTTrack) => {
	if (data.lyrics) {
		const root = document.querySelector(`#song .lyrics.field`) as HTMLOListElement

		let lines = 0
		let node

		for (const l of data.lyrics) {
			if (lines++ === 0 || l === "" || lines === data.lyrics.length) {
				if (node) root.appendChild(node)
				if (lines < data.lyrics.length) node = document.createElement('ol')
			}

			if (l !== "") {
				const li = document.createElement('li')
				const p = document.createElement('p')

				p.textContent = l

				li.appendChild(p)
				node?.appendChild(li)
			}
		}
	}
}

const ost = (data: RemixOfOSTTrack) => {
	subfield<OST>('ost', 'copyright', data)
	subfield<OST>('ost', 'composer', data)
	subfield<OST>('ost', 'console', data)
	subfield<OST>('ost', 'game', data)
	subfield<OST>('ost', 'title', data)
}

const position_in_count = (name: 'collection' | 'track', data: RemixOfOSTTrack) => {
	subfield<PositionInCount>(name, 'position', data)
	subfield<PositionInCount>(name, 'count', data)
}

const subfield = <T,>(name: keyof RemixOfOSTTrack, inner: keyof T, data: RemixOfOSTTrack) => {
	// @ts-expect-error I don't know how to make TS happy here
	if (data[name][inner]) {
		const album = document.querySelector(`#song .${(name as string).replaceAll('_', '-')}.field .${String(inner)}`)!

		// @ts-expect-error I don't know how to make TS happy here
		album.textContent = String(data[name][inner])
	}
}

const published = (data: RemixOfOSTTrack) => {
	for (const f of ['by', 'year']) {
		if (data.published[f as keyof Published]) {
			const field = document.querySelector(`#song .published.field .${f}`)!

			field.textContent = String(data.published[f as keyof Published])
		}
	}
}

const update = (data: RemixOfOSTTrack) => {
	field('album', data)
	artists(data)
	field('catalog_number', data)
	position_in_count('collection', data)
	cover_art(data)
	encoders(data)
	lyrics(data)
	ost(data)
	published(data)
	field('title', data)
	position_in_count('track', data)
	field('webpage', data)
}

// @ts-expect-error
export const readTags = (rerender: CallableFunction) => (event) => {
	const file = event.target.files[0]
	// @ts-expect-error
	window.jsmediatags.read(file, {
		// @ts-expect-error
	  onSuccess: (obj) => rerender(process(obj.tags)),
		onError: console.log
	})
}